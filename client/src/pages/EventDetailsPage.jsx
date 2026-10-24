import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/api/events/${id}`);
        if (res.status === 404) {
          setError("This event does not exist.");
          return;
        }
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError("Sorry, this event could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  if (loading) {
    return <p>Loading event...</p>;
  }

  if (error) {
    return (
      <div>
        <Link to="/">Back</Link>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{event.titre}</h3>
      <p>{event.category}</p>
      <p>{event.description}</p>
    </div>
  );
}

export default EventDetailsPage;