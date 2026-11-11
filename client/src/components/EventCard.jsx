import { Link } from "react-router";

const COLORS = ["card-blue", "card-coral", "card-teal", "card-purple"];

function EventCard({ event, index = 0, onDelete }) {
  const colorClass = COLORS[index % COLORS.length];
  const description =
    event.description && event.description.length > 110
      ? event.description.slice(0, 110) + "..."
      : event.description;

  return (
    <article className={`event-card ${colorClass}`}>
      <div className="card-top">
        <div className="card-category">{event.category || "Event"}</div>
      </div>
      <div className="card-icon-wrap">📅</div>
      <h3 className="card-title">{event.titre}</h3>
      <p className="card-desc">{description}</p>
      <div className="card-meta">
        <span className="card-date">{String(event.date_event).slice(0, 10)}</span>
      </div>
      <Link to={`/events/${event.id_event}`} className="card-btn">See details</Link>
      {onDelete && (
        <button className="card-delete" onClick={() => onDelete(event.id_event)}>
          Delete
        </button>
      )}
    </article>
  );
}

export default EventCard;