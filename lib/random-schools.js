import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RandomSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomSchools = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/random-schools`);
        if (!response.ok) throw new Error('Fehler beim Abrufen der Daten.');

        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Fehler beim Laden der Schulen:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomSchools();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="random-schools" className="row justify-content-center">
      {schools.map((school) => (
        <div
          key={school.id}
          className="school-preview col-xl-4 col-md-6 row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <article>
            <Link href={`/school-details/${school.id}`} className="subpage-link">
              <div className="post-img">
                <img
                  src={school.image_url || '/img/default-school.jpg'}
                  alt={school.name}
                  className="img-fluid"
                />
              </div>
            </Link>
            <h5 className="title">
              <Link href={`/school-details/${school.id}`} className="subpage-link">{school.name}</Link>
            </h5>
            <p className="post-category">
              <strong>Schulart:</strong> {school.school_type || 'Nicht angegeben'}
            </p>
            <p className="post-category">
                <strong>Fachrichtungen:</strong>{' '}
                {school.subjects ? (
                  <span
                    data-tippy-content={school.subjects} 
                    style={{ cursor: 'pointer' }} 
                  >
                    {school.subjects.length > 40
                      ? `${school.subjects.slice(0, 40)}...`
                      : school.subjects}
                  </span>
                ) : (
                  'Nicht angegeben'
                )}
              </p>
          </article>
        </div>
      ))}
    </div>
  );
}
