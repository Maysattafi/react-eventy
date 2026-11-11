import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import Comments from "../components/Comments.jsx";

function EventDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [motivation, setMotivation] = useState("");
  const [registerResult, setRegisterResult] = useState(null);

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
        setEvent(await res.json());
      } catch (err) {
        console.error(err);
        setError("Sorry, this event could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  async function handleRegister(e) {
    e.preventDefault();
    setRegisterResult(null);
    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ motivation }),
      });
      const data = await res.json().catch(() => ({}));
      setRegisterResult({
        ok: res.ok,
        text: data.message || "Sorry, something went wrong.",
      });
    } catch (err) {
      console.error(err);
      setRegisterResult({ ok: false, text: "Sorry, something went wrong." });
    }
  }

  if (loading) {
    return <p className="status event-detail-container">Loading event...</p>;
  }

  if (error) {
    return (
      <div className="event-detail-container">
        <Link to="/" className="back-link">← Back to events</Link>
        <p className="error">{error}</p>
      </div>
    );
  }

  const eventDay = String(event.date_event).slice(0, 10);
  const isOver = eventDay < new Date().toISOString().slice(0, 10);
  const prettyDate = new Date(`${eventDay}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="event-detail-container">
      <Link to="/" className="back-link">← Back to events</Link>

      <div className="event-hero">
        <div className="event-banner">{event.category || "Event"}</div>
        <div className="event-content">
          <h1 className="event-title">{event.titre}</h1>
          <div className="event-meta">
            <div><strong>📅 Date:</strong> {prettyDate}</div>
            <div><strong>📍 Room:</strong> {event.n_sale}</div>
          </div>
          <div className="description">{event.description}</div>
        </div>
      </div>

      {isOver && <Comments eventId={id} />}

      {!isOver && user?.role === "admin" && (
        <div className="registration-box">
          <h2>Registrations</h2>
          <Link to={`/admin/events/${id}/registrations`} className="btn-primary">
            See who registered
          </Link>
        </div>
      )}

      {!isOver && user && user.role !== "admin" && (
        <div className="registration-box">
          <h2>Register for this event</h2>
          <form onSubmit={handleRegister}>
            <textarea
              placeholder="Why do you want to join? (optional)"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
            <button type="submit" className="btn-primary">Confirm my registration</button>
          </form>
          {registerResult && (
            <div
              className={`alert ${registerResult.ok ? "alert-success" : "alert-error"}`}
              style={{ marginTop: 20 }}
            >
              <span className="alert-dot"></span>
              {registerResult.text}
            </div>
          )}
        </div>
      )}

      {!isOver && !user && (
        <div className="registration-box">
          <p className="status">
            <Link to="/login">Log in</Link> to register for this event.
          </p>
        </div>
      )}
    </div>
  );
}

export default EventDetailsPage;