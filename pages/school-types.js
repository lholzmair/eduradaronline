import Link from 'next/link';
import Layout from '../components/layout';

const schoolTypes = [
  {
    image: '/img/schultypen/ahs.png',
    link: '/u-ahs',
    short: 'AHS',
    name: 'Allgemeinbildende Höhere Schule',
    description:
      'Die Allgemeinbildende Höhere Schule (AHS) ist eine Schule, die eine allgemeine und breite Bildung vermittelt. Sie dauert acht Jahre und schließt mit der Matura ab.',
  },
  {
    image: '/img/schultypen/hbla.jpg',
    short: 'HBLA',
    link: '/u-hbla',
    name: 'Höhere Bundeslehranstalt',
    description: 'Die Berufsbildende Höhere Schule (BHS) ist eine Schule, die eine berufliche und allgemeine Bildung vermittelt. Sie dauert fünf Jahre und schließt mit der Reife- und Diplomprüfung ab.',
  },
  {
    image: '/img/schultypen/htl.jpg',
    short: 'HTL',
    link: '/u-htl',
    name: 'Höhere Technische Lehranstalt',
    description: 'Die Höhere Technische Lehranstalt (HTL) ist eine Schule, die eine technische und allgemeine Bildung vermittelt. Sie dauert fünf Jahre und schließt mit der Reife- und Diplomprüfung ab.',
  },
  {
    image: '/img/schultypen/hak.jpg',
    short: 'HAK & HAS',
    link: '/u-hak',
    name: 'Handelsakademie & Handelsschule',
    description:
      'Die Allgemeinbildende Höhere Schule (AHS) ist eine Schule, die eine allgemeine und breite Bildung vermittelt. Sie dauert acht Jahre und schließt mit der Matura ab.',
  },
  {
    image: '/img/schultypen/bms.jpg',
    short: 'BMS',
    name: 'Berufsbildende Mittlere Schule',
    description: 'Die Berufsbildende Höhere Schule (BHS) ist eine Schule, die eine berufliche und allgemeine Bildung vermittelt. Sie dauert fünf Jahre und schließt mit der Reife- und Diplomprüfung ab.',
  },
  {
    image: '/img/schultypen/poly.jpg',
    short: 'Poly',
    name: 'Polytechnische Schule',
    description: 'Die Höhere Technische Lehranstalt (HTL) ist eine Schule, die eine technische und allgemeine Bildung vermittelt. Sie dauert fünf Jahre und schließt mit der Reife- und Diplomprüfung ab.',
  },
];

function SchoolTypeCard({ image, short, name, description, link }) {
  return (
    <Link href={`${link}`}>
    <div className="card">
      <div className="card-inner">
        {/* Vorderseite */}
        <div
          className="card-front"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-block">
            <h3  style={{color: 'white'}}>{short}</h3>{name}
          </div>
        </div>
        

        {/* Rückseite */}
        <div className="card-back">
          <h3>{short}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default function SchoolTypes({link, index}) {
  return (
    <Layout>
      <div className="sub">
        <div className="container section-title" data-aos="fade-up">
          <h2>Die Schultypen</h2>
          <p>Erkunde die verschiedenen Schultypen und ihre Besonderheiten.</p>
        </div>

        <div className="grid" data-aos="fade-up" data-aos-delay="200">
          {schoolTypes.map((type, index) => (
            <SchoolTypeCard
              key={index}
              link={type.link}
              image={type.image}
              short={type.short}
              name={type.name}
              description={type.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
