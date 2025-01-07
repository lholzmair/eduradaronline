const express = require('express');

// Exportiere eine Funktion, die die MySQL-Verbindung entgegennimmt
module.exports = (connection) => {
    const router = express.Router();

    // API: Alle Events abrufen
    router.get('/', (req, res) => {
        const { category, school_id, start_date, end_date } = req.query;

        let query = `
            SELECT e.*, s.address AS school_address
            FROM events e
            LEFT JOIN schools s ON e.school_id = s.id
            WHERE 1=1
        `;
        const params = [];

        if (category) {
            query += ` AND e.category = ?`;
            params.push(category);
        }

        if (school_id) {
            query += ` AND e.school_id = ?`;
            params.push(school_id);
        }

        if (start_date && end_date) {
            query += ` AND e.start_date BETWEEN ? AND ?`;
            params.push(start_date, end_date);
        }

        query += ` ORDER BY e.start_date ASC`;

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen der Events:', err);
                return res.status(500).send('Ein Fehler ist aufgetreten.');
            }
            res.json(results);
        });
    });

    // API: Neues Event hinzufügen
    router.post('/', (req, res) => {
        const { title, description, category, start_date, end_date, location, school_id } = req.body;

        if (!title || !category || !start_date) {
            return res.status(400).send('Titel, Kategorie und Startdatum sind erforderlich.');
        }

        if (!location && school_id) {
            const schoolQuery = `SELECT address FROM schools WHERE id = ?`;
            connection.query(schoolQuery, [school_id], (err, results) => {
                if (err) {
                    console.error('Fehler beim Abrufen der Schul-Adresse:', err);
                    return res.status(500).send('Ein Fehler ist aufgetreten.');
                }

                if (results.length === 0) {
                    return res.status(404).send('Keine Schule mit der angegebenen ID gefunden.');
                }

                const schoolAddress = results[0].address;

                const eventQuery = `
                    INSERT INTO events (title, description, category, start_date, end_date, location, school_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                connection.query(eventQuery, [title, description, category, start_date, end_date, schoolAddress, school_id], (err, result) => {
                    if (err) {
                        console.error('Fehler beim Hinzufügen des Events:', err);
                        return res.status(500).send('Ein Fehler ist aufgetreten.');
                    }
                    res.status(201).send('Event erfolgreich hinzugefügt.');
                });
            });
        } else {
            const query = `
                INSERT INTO events (title, description, category, start_date, end_date, location, school_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(query, [title, description, category, start_date, end_date, location, school_id], (err, result) => {
                if (err) {
                    console.error('Fehler beim Hinzufügen des Events:', err);
                    return res.status(500).send('Ein Fehler ist aufgetreten.');
                }
                res.status(201).send('Event erfolgreich hinzugefügt.');
            });
        }
    });

    // API: Event aktualisieren
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { title, description, category, start_date, end_date, location, school_id } = req.body;

        const query = `
            UPDATE events
            SET title = ?, description = ?, category = ?, start_date = ?, end_date = ?, location = ?, school_id = ?
            WHERE id = ?
        `;

        connection.query(query, [title, description, category, start_date, end_date, location, school_id, id], (err, result) => {
            if (err) {
                console.error('Fehler beim Aktualisieren des Events:', err);
                return res.status(500).send('Ein Fehler ist aufgetreten.');
            }
            res.send('Event erfolgreich aktualisiert.');
        });
    });

    // API: Event löschen
    router.delete('/:id', (req, res) => {
        const { id } = req.params;

        const query = `DELETE FROM events WHERE id = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Fehler beim Löschen des Events:', err);
                return res.status(500).send('Ein Fehler ist aufgetreten.');
            }
            res.send('Event erfolgreich gelöscht.');
        });
    });

    // API: Ein spezifisches Event abrufen
    router.get('/:id', (req, res) => {
        const { id } = req.params;

        const query = `
            SELECT e.*, s.address AS school_address
            FROM events e
            LEFT JOIN schools s ON e.school_id = s.id
            WHERE e.id = ?
        `;

        connection.query(query, [id], (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen des Events:', err);
                return res.status(500).send('Ein Fehler ist aufgetreten.');
            }

            if (results.length === 0) {
                return res.status(404).send('Event nicht gefunden.');
            }

            res.json(results[0]);
        });
    });

    return router;
};
