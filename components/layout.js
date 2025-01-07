import Head from 'next/head';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Roboto, Raleway, Poppins } from 'next/font/google';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


// Fonts laden
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--default-font',
  weight: ['300', '400', '500', '700'],
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--heading-font',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--nav-font',
  weight: ['300', '400', '500', '600', '700'],
});


// Bootstrap laden
  export default function Layout({ children }) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
          });
      const handleScroll = () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

// Aktiven Link markieren
const isActive = (path) => {

  if (router.pathname === path) return true;

  return router.pathname.startsWith(path);
};

 // Scroll to top
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
  
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);


    // Tippy
    useEffect(() => {
      tippy('[data-tippy-content]', {
        placement: 'bottom',
        theme: 'light',
        animation: 'fade',
        arrow: true,
        appendTo: document.body,
      });
    }); 
    

    // Scrollfunktion
    const router = useRouter(); // Initialisiert den Router

    const handleRouteChange = (url) => {
        if (url !== '/' && url !== '/home') {
          const headerHeight = 450; 
          window.scrollTo({ top: headerHeight, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };
      
      useEffect(() => {
        if (router.events) {
          router.events.on('routeChangeComplete', handleRouteChange);
          return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
          };
        } else {
          console.error('Router events not available');
        }
      }, [router]);
      

  return (
    <>
      <Head>
        <title>Willkommen auf Edu-Radar!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="index-page">
        {/* Header */}
        <header id="header" className="header d-flex align-items-center fixed-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <Link
        id="home"
        href="/home"
        className="logo d-flex align-items-center subpage-link"
        data-title="Home -Edu-Radar"
      >
        <img src="/img/logo-trans-sans.png" alt="logo" />
        <h1 className="sitename">Edu-Radar</h1>
      </Link>
      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
          <Link legacyBehavior href="/home"><a className={`subpage-link ${isActive('/home') ? 'active' : ''}`}>
            .home</a></Link>
          </li>
          <li>
          <Link legacyBehavior href="/about"><a className={`subpage-link ${isActive('/about') ? 'active' : ''}`}>
            .wer wir sind</a></Link>
          </li>
          <li>
          <Link legacyBehavior href="/schools"><a className={`subpage-link ${isActive('/schools') ? 'active' : ''}`}>
            .die schulen</a></Link>
          </li>
          <li className="dropdown subpage-link">
          <Link legacyBehavior href="/school-types"><a className={` ${isActive('/school-types') ? 'active' : ''}`}>
              <span>.schultypen</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
            </Link>
            <ul>
              <li>
              <Link legacyBehavior href="/u-ahs">
              <a className={`subpage-link ${isActive('/u-ahs') ? 'active' : ''}`}>
                Allgemeinbildende Höhere Schule
              </a>
              </Link>
              </li>
              <li className="dropdown subpage-link">
              <Link legacyBehavior href="/u-bhs">
              <a className={`subpage-link ${isActive('/u-bhs') ? 'active' : ''}`}>
                  <span>Berufsbildende Höhere Schule</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                  </a>
                  </Link>
                <ul>
                  <li>
                  <Link legacyBehavior href="/u-hak">
              <a className={`subpage-link ${isActive('/u-hak') ? 'active' : ''}`}>
                Handelsakademie & Handelsschule
              </a>
              </Link>
                  </li>
                  <li>
                  <Link legacyBehavior href="/u-htl">
              <a className={`subpage-link ${isActive('/u-htl') ? 'active' : ''}`}>
                Höhere Technische Schule
              </a>
              </Link>
                  </li>
                  <li>
                  <Link legacyBehavior href="/u-hbla">
              <a className={`subpage-link ${isActive('/u-hbla') ? 'active' : ''}`}>
                Höhere Bundeslehranstalt
              </a>
              </Link>
                  </li>
                  <li>
                  <Link legacyBehavior href="/u-kolleg">
              <a className={`subpage-link ${isActive('/u-kolleg') ? 'active' : ''}`}>
                Abendschule & Kolleg
              </a>
              </Link>
                  </li>
                  <li>
                  <Link legacyBehavior href="/u-sonstige">
              <a className={`subpage-link ${isActive('/u-sonstige') ? 'active' : ''}`}>
                Sonstige
              </a>
              </Link>
                  </li>
                </ul>
              </li>
              <li>
              <Link legacyBehavior href="/u-poly">
              <a className={`subpage-link ${isActive('/u-poly') ? 'active' : ''}`}>
                Polytechnische Schule
              </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/u-bms">
              <a className={`subpage-link ${isActive('/u-bms') ? 'active' : ''}`}>
                Berufsbildende Mittlere Schule
              </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/u-lehre">
              <a className={`subpage-link ${isActive('/u-lehre') ? 'active' : ''}`}>
                Lehre
              </a>
              </Link>
              </li>
            </ul>
          </li>
          <li>
          <Link legacyBehavior href="/calendar"><a id="load-calendar"
              data-title="Veranstaltungskalender" className={`subpage-link ${isActive('/calendar') ? 'active' : ''}`}>
          .eventkalender</a></Link>
          </li>
          <li>
          <Link legacyBehavior href="/quiz"><a className={`subpage-link ${isActive('/quiz') ? 'active' : ''}`}>
            .edu-radar</a></Link>
          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list" />
      </nav>
    </div>
  </header>
  <main className="main">
    {/* Hero Section */}
    <section id="hero" className="hero section dark-background">
      <div
        id="hero-carousel"
        data-bs-interval={5000}
        className="container carousel carousel-fade"
        data-bs-ride="carousel"
      >
        {/* Slide 1 */}
        <div className="carousel-item active">
          <div className="carousel-container">
            <h2 className="animate__animated animate__fadeInDown">
              Willkommen auf{" "}
              <img
                src="/img/logo-trans-sans.png"
                alt="logo"
                style={{ height: 80 }}
              />{" "}
              Edu-Radar
            </h2>
            <p className="animate__animated animate__fadeInUp">
              Deine Adresse für maßgeschneiderte Schulwahlberatung! Entdecke mit
              unserem interaktiven Quiz, die für dich passende weiterführende
              Schule und starte auf dem Bildungsweg, der deine individuellen
              Talente und Interessen optimal fördert.
            </p>
            <Link
              href="/about"
              className="btn-get-started animate__animated animate__fadeInUp scrollto"
            >
              Weiterlesen
            </Link>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="carousel-item">
          <div className="carousel-container">
            <h2 className="animate__animated animate__fadeInDown">
              Die HTL Leonding lädt wieder ein!
            </h2>
            <p className="animate__animated animate__fadeInUp">
              Sei dabei beim <strong>Abend der offenen Tür</strong>{" "}
              <i>am 23. Jänner 2025 von 17:00–20:00 Uhr</i> oder dem{" "}
              <strong>Tag der offenen Tür</strong>{" "}
              <i>am 24. Jänner 2025 von 11:00–17:00 Uhr</i>.
            </p>
            <Link
              id="carousel-read-more-2"
              href="/news"
              className="btn-get-started animate__animated animate__fadeInUp scrollto subpage-link"
            >
              Weiterlesen
            </Link>
          </div>
        </div>
        {/* Slide 3 */}
        <div className="carousel-item">
          <div className="carousel-container">
            <h2 className="animate__animated animate__fadeInDown">
              Unglaublich!
            </h2>
            <p
              style={{ float: "right" }}
              className="animate__animated animate__fadeInUp"
            >
              Team Skittles bleibt durch und durch positiv. Was ist das
              Erfolgsrezept?
            </p>
            <Link
              id="carousel-read-more-3"
              href="news_2"
              className="btn-get-started animate__animated animate__fadeInUp scrollto subpage-link"
            >
              Weiterlesen
            </Link>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bi bi-chevron-left"
            aria-hidden="true"
          />
        </a>
        <a
          className="carousel-control-next"
          href="#hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bi bi-chevron-right"
            aria-hidden="true"
          />
        </a>
      </div>
      <svg
        className="hero-waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28 "
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave1">
          <use xlinkHref="#wave-path" x={50} y={3} />
        </g>
        <g className="wave2">
          <use xlinkHref="#wave-path" x={50} y={0} />
        </g>
        <g className="wave3">
          <use xlinkHref="#wave-path" x={50} y={9} />
        </g>
      </svg>
    </section>
    

    <div className={`${roboto.variable} ${raleway.variable} ${poppins.variable}`}>
      <main>{children}</main>
    </div>





    {/* Contact Section */}
    <section id="contact" className="contact section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Contact Us</p>
      </div>
      {/* End Section Title */}
      <div className="container" data-aos="fade" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-4">
            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <i className="bi bi-instagram flex-shrink-0" />
              <div>
                <h3 style={{ color: "#4d88ff" }}>
                  Finden Sie uns auf Merjems Instagram-Page
                </h3>
                <p>instagram.com/kampfhamster</p>
              </div>
            </div>
            {/* End Info Item */}
            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <i className="bi bi-envelope flex-shrink-0" />
              <div>
                <h3 style={{ color: "#FFAE00" }}>Schreiben Sie uns</h3>
                <p>edu-radar@syppreeeee.htl-leonding.ac.at</p>
              </div>
            </div>
            {/* End Info Item */}
            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <i className="bi bi-github flex-shrink-0" />
              <div>
                <h3 style={{ color: "#cc2b43" }}>Checken Sie unsere Fails</h3>
                <p>github.com/SenadKay/EduRadar</p>
              </div>
            </div>
            {/* End Info Item */}
          </div>
          <div className="col-lg-8">
            <form
              action="forms/contact.php"
              method="post"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Ihr Name"
                    required=""
                  />
                </div>
                <div className="col-md-6 ">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Ihre E-Mail"
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Betreff"
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={6}
                    placeholder="Nachricht"
                    required=""
                    defaultValue={""}
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="loading">Wird geladen</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Ihre Nachricht wurde versandt!
                  </div>
                  <button type="submit">Verschicken</button>
                </div>
              </div>
            </form>
          </div>
          {/* End Contact Form */}
        </div>
      </div>
    </section>
    {/* /Contact Section */}
  </main>
  <footer id="footer" className="footer dark-background">
    <div className="container">
      <h3 className="sitename">
        {" "}
        <img
          src="/img/logo-trans-sans.png"
          style={{ height: 60 }}
          alt="logo"
        />{" "}
        Edu-Radar
      </h3>
      <p>
        Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi
        fuga maxime saepe commodi placeat.
      </p>
      <div className="social-links d-flex justify-content-center">
        <a href="https://github.com/SenadKay/EduRadar" target="_blank">
          <i className="bi bi-github social-icons" />
        </a>
        <a href="">
          <i className="bi bi-facebook social-icons" />
        </a>
        <a href="">
          <i className="bi bi-instagram social-icons" />
        </a>
        <a href="">
          <i className="bi bi-linkedin social-icons" />
        </a>
      </div>
      <div className="container">
        <div className="copyright">
          <span>Copyright</span>
          <img
            src="/img/logo-trans-sans.png"
            style={{ height: 20, marginLeft: 6 }}
            alt="logo"
          />
          <a className="px-1 sitename">
            <strong />
          </a>
          <strong>
            <Link
              className="subpage-link"
              id="impressum"
              href="/impressum"
              data-title="Impressum - Edu-Radar"
            >
              Edu-Radar{" "}
            </Link>
          </strong>{" "}
          <span> All Rights Reserved</span>
        </div>
      </div>
    </div>
  </footer>

{/* Scroll Top */}
<div>
  <a
    href="#"
    id="scroll-top"
    className={`scroll-top d-flex align-items-center justify-content-center ${isVisible ? 'active' : ''}`}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <i className="bi bi-arrow-up-short" />
  </a>
</div>
      </div>
    </>
  );
}
