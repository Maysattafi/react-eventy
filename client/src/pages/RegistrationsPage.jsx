import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

function RegistrationsPage() {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const res = await fetch(`http://localhost:3000/api/events/${id}/registrations`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        setRegistrations(data);
      } catch (err) {
        console.error(err);
        setError("Sorry, the list could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    loadRegistrations();
  }, [id]);

  if (loading) {
    return <p>Loading registrations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Link to={`/events/${id}`}>Back to the event</Link>
      <h1>Registrations</h1>
      {registrations.length === 0 ? (
        <p>Nobody has registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Motivation</th>
              <th>Registered on</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.motivation}</td>
                <td>{r.registration_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RegistrationsPage;