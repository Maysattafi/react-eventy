import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("http://localhost:3000/api/events");
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

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setEvents(events.filter((event) => event.id_event !== id));
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Could not delete this event.");
    }
  }

  if (loading) {
  return <p className="status list-section">Loading events...</p>;
}

if (error) {
  return <p className="error list-section">{error}</p>;
}

return (
  <section className="list-section">
    <div className="section-header">
      <div className="section-label">Full agenda</div>
      <h2 className="section-title">All events</h2>
    </div>
    {events.length === 0 && <p className="status">No events yet.</p>}
    <div className="events-carousel">
      {events.map((event, index) => (
        <EventCard
          key={event.id_event}
          event={event}
          index={index}
          onDelete={user?.role === "admin" ? handleDelete : undefined}
        />
      ))}
    </div>
  </section>
);}

export default EventsPage;