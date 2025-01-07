import Layout from '../components/layout';
import RandomSchools from '../lib/random-schools';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets/js/random-schools.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
        
        <>
  {/* About Section */}
  <section id="about" className="about section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>About</h2>
      <p>Who we are</p>
    </div>
    {/* End Section Title */}
    <div className="container">
      <div className="row gy-4">
        <div
          className="col-lg-6 content"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul>
            <li>
              <i className="bi bi-check2-circle" />{" "}
              <span>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </span>
            </li>
            <li>
              <i className="bi bi-check2-circle" />{" "}
              <span>
                Duis aute irure dolor in reprehenderit in voluptate velit.
              </span>
            </li>
            <li>
              <i className="bi bi-check2-circle" />{" "}
              <span>Ullamco laboris nisi ut aliquip ex ea commodo</span>
            </li>
          </ul>
        </div>
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
          <p>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.{" "}
          </p>
          <Link href="/story" className="read-more">
            <span>Read More</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
    <section id="story" className="story section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Input</h2>
        <p style={{ color: "#cc2b43" }}>Story of Datenbanken</p>
      </div>
      {/* End Section Title */}
      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 content"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <img
              style={{
                float: "left",
                width: "90%",
                marginRight: 20,
                marginBottom: 20
              }}
              alt="classroom"
              src="img/classroom.jpg"
            />
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua.{" "}
            </p>
            <Link href="story_two" className="read-more">
              <span>Read More</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </section>
  {/* Faq Section */}
  <div id="faq" className="faq section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Die Schultypen</h2>
      <p style={{ color: "#4d88ff" }}>In der Übersicht</p>
    </div>
    {/* End Section Title */}
    {/* Box Section */}
    <div className="box_container" data-aos="fade-up">
      <a
        className="subpage-link"
        id="u-ahs"
        href="u-ahs.html"
        data-title="AHS - Überblick"
      >
        <div className="box1" style={{ backgroundColor: "#4d88ff" }}>
          {" "}
          <strong> AHS - Allgemeinbildende Höhere Schulen </strong>
          <hr />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </div>
      </a>
      <a
        className="subpage-link"
        id="u-bms"
        href="u-bms.html"
        data-title="BMS - Überblick"
      >
        <div className="box1" style={{ backgroundColor: "#a036d1" }}>
          {" "}
          <strong> BMS - Berufsbildende Mittlere Schulen </strong>
          <hr />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </div>
      </a>
      <a
        className="subpage-link"
        id="u-bhs"
        href="u-bhs.html"
        data-title="BHS - Überblick"
      >
        <div className="box1" style={{ backgroundColor: "#cc2b43" }}>
          {" "}
          <strong> BHS - Berufsbildende Höhere Schulen </strong>
          <hr />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </div>
      </a>
      <a
        className="subpage-link"
        id="u-pts"
        href="u-pts.html"
        data-title="PTS - Überblick"
      >
        <div className="box1" style={{ backgroundColor: "#FFAE00" }}>
          {" "}
          <strong> PTS - Polytechnische Schulen </strong>
          <hr />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </div>
      </a>
    </div>
    {/* End Box Section */}
    {/* End Tab Content Item */}
    <section id="features" className="features section">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <div className="custom-accordion" id="accordion-faq">
              <div className="accordion-item">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    id="headingOne"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-faq-1"
                  >
                    Allgemeinbildende Höhere Schulen - FAQ
                  </button>
                </h2>
                <div
                  id="collapse-faq-1"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion-faq"
                >
                  <div className="accordion-body">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                  </div>
                </div>
              </div>
              {/* .accordion-item */}
              <div className="accordion-item">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    id="headingTwo"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-faq-2"
                  >
                    Berufsbildende Höhere Schule - FAQ
                  </button>
                </h2>
                <div
                  id="collapse-faq-2"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion-faq"
                >
                  <div className="accordion-body">
                    When she reached the first hills of the Italic Mountains,
                    she had a last view back on the skyline of her hometown
                    Bookmarksgrove, the headline of Alphabet Village and the
                    subline of her own road, the Line Lane. Pityful a rethoric
                    question ran over her cheek, then she continued her way.
                  </div>
                </div>
              </div>
              {/* .accordion-item */}
              <div className="accordion-item">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    id="headingThree"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-faq-3"
                  >
                    Berufsbildende Mittlere Schule - FAQ
                  </button>
                </h2>
                <div
                  id="collapse-faq-3"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion-faq"
                >
                  <div className="accordion-body">
                    When she reached the first hills of the Italic Mountains,
                    she had a last view back on the skyline of her hometown
                    Bookmarksgrove, the headline of Alphabet Village and the
                    subline of her own road, the Line Lane. Pityful a rethoric
                    question ran over her cheek, then she continued her way.
                  </div>
                </div>
              </div>
              {/* .accordion-item */}
              <div className="accordion-item">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    id="headingFour"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-faq-4"
                  >
                    Polytechnische Schulen - FAQ
                  </button>
                </h2>
                <div
                  id="collapse-faq-4"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordion-faq"
                >
                  <div className="accordion-body">
                    When she reached the first hills of the Italic Mountains,
                    she had a last view back on the skyline of her hometown
                    Bookmarksgrove, the headline of Alphabet Village and the
                    subline of her own road, the Line Lane. Pityful a rethoric
                    question ran over her cheek, then she continued her way.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Faq Section */}


      {/* Schools Section */}
      <section id="schools" className="schools section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Unsere Schulen</h2>
          <p style={{ color: '#FFAE00' }}>Ein paar Schulen zum Kennenlernen</p>
        </div>
        <RandomSchools />
      </section>


  </div>
</>

</Layout>
);
}
