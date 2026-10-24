import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("http://localhost:3000/api/events/");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Sorry, the events could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Eventy</h1>
      {events.map((event) => (
        <EventCard key={event.id_event} event={event} />
      ))}
    </div>
  );
}
export default EventsPage;