import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function Comments({ eventId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await fetch(`http://localhost:3000/api/events/${eventId}/comments`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        setComments(await res.json());
      } catch (err) {
        console.error(err);
        setError("Sorry, the comments could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [eventId, refresh]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/api/events/${eventId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: text, rating: Number(rating) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.message || "Sorry, something went wrong.");
        return;
      }
      setText("");
      setRating(5);
      setRefresh(refresh + 1);
    } catch (err) {
      console.error(err);
      setMessage("Sorry, something went wrong.");
    }
  }

  return (
    <section className="comments-section">
      <h2>💬 Participants' comments ({comments.length})</h2>

      {loading && <p className="status">Loading comments...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && comments.length === 0 && (
        <p className="comments-empty">Be the first to leave a comment on this event!</p>
      )}

      {comments.map((c) => (
        <div className="comment" key={c.id}>
          <div className="comment-header">
            <strong>{c.name}</strong>
            <span className="rating">{"★".repeat(c.rating || 0)}</span>
          </div>
          <p>{c.comment}</p>
        </div>
      ))}

      {user ? (
        <div className="comment-form">
          <h3>Add your comment</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What did you think of this event?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value={5}>5 ★ Excellent</option>
              <option value={4}>4 ★ Very good</option>
              <option value={3}>3 ★ Good</option>
              <option value={2}>2 ★ Average</option>
              <option value={1}>1 ★ Needs improvement</option>
            </select>
            <button type="submit" className="btn-primary">Post my comment</button>
            {message && (
              <div className="alert alert-error" style={{ marginTop: 20 }}>
                <span className="alert-dot"></span>
                {message}
              </div>
            )}
          </form>
        </div>
      ) : (
        <p className="status">
          <Link to="/login">Log in</Link> to leave a comment.
        </p>
      )}
    </section>
  );
}

export default Comments;