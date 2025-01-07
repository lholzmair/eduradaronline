// components/calendar.js
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function Calendar() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
      if (!response.ok) throw new Error('Fehler beim Abrufen der Events.');

      const data = await response.json();
      const formattedEvents = data.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start_date,
        end: event.end_date,
        classNames: [getCategoryClass(event.category)],
        extendedProps: {
          description: event.description,
          category: event.category,
          location: event.location,
          school_id: event.school_id,
        },
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Fehler beim Laden der Events:', error);
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Tag der offenen Tür':
        return 'tag-der-offenen-tuer';
      case 'Schulevent':
        return 'schulevent';
      case 'Ferien':
        return 'ferien';
      default:
        return 'sonstiges';
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventDidMount = (info) => {
    if (!info.el) {
      console.error('Event element is undefined:', info);
      return;
    }

    const tooltipContent = `
      <strong>${info.event.title}</strong><br>
      <small>Beschreibung: ${info.event.extendedProps.description || 'Keine Beschreibung verfügbar'}</small><br>
      <small>Ort: ${info.event.extendedProps.location || 'Kein Ort angegeben'}</small>
    `;

    tippy(info.el, {
      content: tooltipContent,
      allowHTML: true,
      placement: 'top',
    });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="de"
      events={events}
    eventContent={(arg) => (
    <div style={{ backgroundColor: arg.backgroundColor, padding: '5px', borderRadius: '3px' }}>
      <span>{arg.event.title}</span>
    </div>
    )}
      eventDidMount={handleEventDidMount}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
      }}
    />
  );
}
