import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>

<div className="sub">
  {/* Section Title */}
  <div className="container section-title" data-aos="fade-up">
    <h2>HAK</h2>
    <p>Handelsakademie</p>
  </div>
  {/* End Section Title */}
  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay={100}>
        <img
          style={{
            float: "left",
            width: "90%",
            marginRight: 20,
            marginBottom: 20
          }}
          alt="classroom"
          src="img/reading.jpg"
        />
      </div>
      <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
        <h1>HAKs in Österreich</h1>
        <p>
          HAK steht für <strong>"Handelsakademie"</strong> und ist eine
          Schulform in Österreich, die eine wirtschaftliche und kaufmännische
          Ausbildung auf der Ebene der höheren Schulen bietet. HAKs sind darauf
          ausgelegt, Schüler:innen auf eine Karriere in wirtschaftlichen Berufen
          oder für ein Studium im Bereich Wirtschaft vorzubereiten.
        </p>
        <p>
          Die Dauer der Ausbildung beträgt in der Regel fünf Jahre und endet mit
          der Reife- und Diplomprüfung. Der Unterricht umfasst sowohl
          allgemeinbildende Fächer als auch fachspezifische Themen, die je nach
          Spezialisierung variieren können, wie z.B. Betriebswirtschaft,
          Rechnungswesen, Marketing oder internationale Wirtschaft.
        </p>
        <p>
          HAKs legen großen Wert auf praxisorientierte Ausbildung, Projekte und
          die Anwendung von wirtschaftlichen Standards, um sicherzustellen, dass
          die Schüler:innen nicht nur theoretisches Wissen erwerben, sondern
          auch praktische Fähigkeiten entwickeln. Absolvent:innen der HAK haben
          gute berufliche Perspektiven in der Wirtschaft und können auch in
          tertiären Bildungseinrichtungen wie Fachhochschulen oder Universitäten
          weiterstudieren.
        </p>
      </div>
    </div>
  </div>
</div>


</Layout>
);
}
