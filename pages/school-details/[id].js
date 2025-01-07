import Script from 'next/script';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function SchoolDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [school, setSchool] = useState(null);
  const [similarSchools, setSimilarSchools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSchoolDetails(id);
      fetchSimilarSchools(id);
    }
  }, [id]);

  const fetchSchoolDetails = async (schoolId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data/${schoolId}`);
      if (!response.ok) throw new Error('Fehler beim Abrufen der Schul-Details.');

      const data = await response.json();
      setSchool(data);
    } catch (err) {
      console.error(err);
      setError('Fehler beim Laden der Schul-Details.');
    }
  };

  const fetchSimilarSchools = async (schoolId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/similar-schools/${schoolId}`);
      if (!response.ok) throw new Error('Fehler beim Abrufen ähnlicher Schulen.');

      const data = await response.json();
      setSimilarSchools(data);
    } catch (err) {
      console.error(err);
    }
  };

  const initializeMap = (latitude, longitude) => {
    const location = { lat: latitude, lng: longitude };
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Karten-Element nicht gefunden.');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      zoom: 15,
      center: location,
    });

    new google.maps.Marker({
      position: location,
      map: map,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && school?.address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: school.address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          initializeMap(location.lat(), location.lng());
        } else {
          console.error('Geocoding fehlgeschlagen:', status);
        }
      });
    }
  }, [school]);

  if (error) {
    return (
      <Layout>
        <div className="container">
          <h1>Fehler</h1>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  if (!school) {
    return (
      <Layout>
        <div className="container">
          <h1>Laden...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
     <Script
  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
  strategy="lazyOnload"
  onLoad={() => {
    console.log('Google Maps API geladen.');
    if (school?.address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: school.address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          initializeMap(location.lat(), location.lng());
        } else {
          console.error('Geocoding fehlgeschlagen:', status);
          const mapDiv = document.getElementById('map');
          if (mapDiv) {
            mapDiv.innerHTML = '<p>Karte konnte nicht geladen werden.</p>';
          }
        }
      });
    }
  }}
/>

      <div className="school-container" style={{ marginTop: '50px' }}>
        <div className="main-content">
          <div id="school-details" className="school-details">

          <div className="details-head d-flex justify-content-between align-items-center">
          <div className="container section-title" data-aos="fade-up">
          <h2>Schuldetails</h2>
          <p style={{ color: '#FFAE00' }}>{school.name}</p>
          </div>
          <Link className="btn btn-dark" href="/schools">
          Zurück zur Übersicht
          </Link>
          </div>

            <div className="container justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <p>
                <strong>Fachrichtungen:</strong> {school.subjects || 'Nicht angegeben'}
              </p>
              <p>
                <strong>Schulart:</strong> {school.school_type || 'Nicht angegeben'}
              </p>
              <img
                src={school.image_url || '/img/default-school.jpg'}
                style={{ maxWidth: '400px' }}
                alt={school.name}
              />
              <p>{school.long_description || 'Keine Beschreibung verfügbar.'}</p>
            </div>
          </div>
        </div>

        <div className="sidebar justify-content-center" data-aos="fade-up" data-aos-delay="200">
          <div id="school-profile" className="school-profile">
            <h3>Steckbrief</h3>
            <div className="school-note">
              <img
                src={school.logo_url || '/img/default-logo.jpg'}
                style={{ maxWidth: '280px', marginBottom: '20px' }}
                alt={school.name}
              />
              <p>
                <strong>Adresse:</strong> {school.address || 'Nicht angegeben'}
              </p>
              <p>
                <strong>E-Mail:</strong> {school.email || 'Nicht angegeben'}
              </p>
              <p>
                <strong>Telefon:</strong> {school.telephone || 'Nicht angegeben'}
              </p>
              <a href={school.links || '#'} target="_blank" rel="noopener noreferrer">
                Weitere Informationen
              </a>
            </div>

            <div id="map" style={{ height: '200px', width: '90%', marginTop: '20px' }}></div>
          </div>

          <div id="similar-schools" className="similar-schools">
            <h3>Ähnliche Schulen</h3>
            {similarSchools.map((similarSchool) => (
              <div
                key={similarSchool.id}
                className="school-preview col-xl-4 col-md-6 row justify-content-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <article>
                  <Link
                    href={`/school-details/${similarSchool.id}`}
                    className="subpage-link"
                    data-title={`${similarSchool.name} - Details`}
                  >
                    <div className="post-img">
                      <img
                        src={similarSchool.image_url || '/img/default-school.jpg'}
                        alt={similarSchool.name}
                        className="img-fluid"
                      />
                    </div>
                  </Link>
                  <h5 className="title">
                    <Link href={`/school-details/${similarSchool.id}`} className="subpage-link">
                      {similarSchool.name}
                    </Link>
                  </h5>
                  <p className="post-category">
                    <strong>Schulart:</strong> {similarSchool.school_type || 'Nicht angegeben'}
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
        </div>
      </div>
    </Layout>
  );
}
