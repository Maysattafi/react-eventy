import { Link } from "react-router";
function EventCard({ event }) {
  return (
    <div>
        <Link to={`/events/${event.id_event}`}><h3>{ event.titre }</h3></Link>
      <p> {event.category } </p>
      <p>{ event.description }</p>
    </div>
  );
}

export default EventCard;