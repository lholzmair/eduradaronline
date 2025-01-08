const express = require('express');
const next = require('next');
const mysql = require('mysql2');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production'; // Entwicklungsmodus prüfen
const nextApp = next({ dev }); // Next.js-App initialisieren
const handle = nextApp.getRequestHandler(); // Next.js-Routing

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL-Verbindung
const connection = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// Utility-Funktion für Promises
const queryAsync = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Verbindung testen
connection.getConnection((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
    } else {
        console.log('Datenbank erfolgreich verbunden!');
    }
});

// Verbindung für events.js schaffen
const eventsRoutes = require('./routes/events')(connection);
app.use('/api/events', eventsRoutes);

// API-Endpunkt mit Paginierung und Suche
app.get('/api/data', async (req, res) => {
    const { page = 1, limit = 9, search = '', category, province, bundesland, schoolType } = req.query;
    const start = (page - 1) * limit;

    try {
        let query = `
            SELECT s.*, GROUP_CONCAT(sub.focus SEPARATOR ', ') AS subjects
            FROM schools s
            LEFT JOIN school_subjects ss ON s.id = ss.school_id
            LEFT JOIN subjects sub ON ss.subject_id = sub.id
            WHERE (s.name LIKE ? OR sub.focus LIKE ?)`;
        const params = [`%${search}%`, `%${search}%`];

        if (category) {
            query += ` AND (sub.cat_one = ? OR sub.cat_two = ? OR sub.cat_three = ?)`;
            params.push(category, category, category);
        }
        if (province) {
            query += ` AND s.province = ?`;
            params.push(province);
        }
        if (bundesland) {
            query += ` AND s.province IN (SELECT bezirk FROM states WHERE bundesland = ?)`;
            params.push(bundesland);
        }
        if (schoolType) {
            query += ` AND s.school_type = ?`;
            params.push(schoolType);
        }

        query += ` GROUP BY s.id LIMIT ?, ?`;
        params.push(parseInt(start), parseInt(limit));

        const results = await queryAsync(query, params);

        // Abrufen der Gesamtanzahl
        const countQuery = `
            SELECT COUNT(DISTINCT s.id) AS total
            FROM schools s
            LEFT JOIN school_subjects ss ON s.id = ss.school_id
            LEFT JOIN subjects sub ON ss.subject_id = sub.id
            WHERE (s.name LIKE ? OR sub.focus LIKE ?)`;
        const countParams = params.slice(0, -2);
        const countResults = await queryAsync(countQuery, countParams);

        res.json({
            schools: results,
            total: countResults[0].total,
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        res.status(500).send('Ein Fehler ist aufgetreten.');
    }
});


// API-Endpunkt für Filteroptionen
app.get('/api/filters', async (req, res) => {
    try {
        const categoriesQuery = `
            SELECT DISTINCT cat_one AS category FROM subjects
            UNION
            SELECT DISTINCT cat_two FROM subjects
            UNION
            SELECT DISTINCT cat_three FROM subjects
            WHERE cat_three IS NOT NULL
        `;

        const provincesQuery = `
            SELECT DISTINCT province FROM schools
        `;

        const statesQuery = `
            SELECT DISTINCT state
            FROM states
            WHERE province IN (SELECT DISTINCT province FROM schools)
            ORDER BY state
        `;

        const schoolTypesQuery = `
            SELECT DISTINCT school_type FROM schools
        `;

        // Führt alle Abfragen parallel aus
        const [categories, provinces, states, schoolTypes] = await Promise.all([
            queryAsync(categoriesQuery),
            queryAsync(provincesQuery),
            queryAsync(statesQuery),
            queryAsync(schoolTypesQuery),
        ]);

        res.json({
            categories: categories.map(row => row.category),
            provinces: provinces.map(row => row.province),
            states: states.map(row => row.state),
            schoolTypes: schoolTypes.map(row => row.school_type),
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Filteroptionen:', error);
        res.status(500).send('Ein Fehler ist aufgetreten.');
    }
});

app.get('/api/districts', (req, res) => {
    const { state } = req.query;

    if (!state) {
        res.status(400).send('Bundesland ist erforderlich.');
        return;
    }

    const sql = `
        SELECT province
        FROM states
        WHERE state = ?
        ORDER BY province
    `;

    connection.query(sql, [state], (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Bezirke:', err);
            res.status(500).send('Ein Fehler ist aufgetreten.');
        } else {
            res.json(results.map(row => row.province));
        }
    });
});

// API-Endpunkt zum Abrufen aller Schulen
app.get('/api/all-schools', (req, res) => {
    const sql = `
        SELECT s.*, GROUP_CONCAT(sub.focus SEPARATOR ', ') AS subjects
        FROM schools s
        LEFT JOIN school_subjects ss ON s.id = ss.school_id
        LEFT JOIN subjects sub ON ss.subject_id = sub.id
        GROUP BY s.id`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen aller Schulen:', err);
            res.status(500).send('Ein Fehler ist aufgetreten.');
        } else {
            res.json(results);
        }
    });
});


// API-Endpunkt für Schul-Details (nach ID)
app.get('/api/data/:id', (req, res) => {
    const schoolId = req.params.id;

    const sql = `
        SELECT s.*, GROUP_CONCAT(sub.focus SEPARATOR ', ') AS subjects
        FROM schools s
        LEFT JOIN school_subjects ss ON s.id = ss.school_id
        LEFT JOIN subjects sub ON ss.subject_id = sub.id
        WHERE s.id = ?
        GROUP BY s.id`;

    connection.query(sql, [schoolId], (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Schul-Details:', err);
            res.status(500).send('Ein Fehler ist aufgetreten.');
        } else {
            res.json(results[0]);
        }
    });
});

// API-Endpunkt für ähnliche Schulen
app.get('/api/similar-schools/:id', (req, res) => {
    const schoolId = req.params.id;

    const sql = `
        SELECT s.id, s.name, s.image_url, s.school_type, GROUP_CONCAT(sub.focus SEPARATOR ', ') AS subjects
        FROM schools s
        LEFT JOIN school_subjects ss ON s.id = ss.school_id
        LEFT JOIN subjects sub ON ss.subject_id = sub.id
        WHERE s.school_type = (SELECT school_type FROM schools WHERE id = ?)
        AND s.id != ?
        GROUP BY s.id
        ORDER BY RAND()
        LIMIT 3`;

    connection.query(sql, [schoolId, schoolId], (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen ähnlicher Schulen:', err);
            res.status(500).send('Ein Fehler ist aufgetreten.');
        } else {
            res.json(results);
        }
    });
});

// API-Endpunkt für zufällige Schulen
app.get('/api/random-schools', (req, res) => {
    const sql = `
        SELECT s.*, GROUP_CONCAT(sub.focus SEPARATOR ', ') AS subjects
        FROM schools s
        LEFT JOIN school_subjects ss ON s.id = ss.school_id
        LEFT JOIN subjects sub ON ss.subject_id = sub.id
        GROUP BY s.id
        ORDER BY RAND()
        LIMIT 3`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen zufälliger Schulen:', err);
            res.status(500).send('Ein Fehler ist aufgetreten.');
        } else {
            res.json(results);
        }
    });
});

// Server starten
// Next.js übernimmt alle anderen Routen
nextApp.prepare().then(() => {
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(port, () => {
        console.log(`Server läuft auf http://localhost:${port}`);
    });

})