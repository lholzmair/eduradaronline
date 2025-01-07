import Layout from '../components/layout';
import Calendar from '../components/calendar';

export default function CalendarPage() {
  return (
    <Layout>
        <div className="sub">
      <div className="container section-title" data-aos="fade-up">
        <h2>Veranstaltungskalender</h2>
        <p style={{ color: '#a036d1' }}>Alle Events im Überblick</p>
      </div>
      <div className="container">
        <Calendar />
      </div>
      </div>
    </Layout>
  );
}
