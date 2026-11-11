import { useState } from "react";
import { useNavigate } from "react-router";

function AddEventPage() {
  const [form, setForm] = useState({
    titre: "",
    description: "",
    date_event: "",
    n_sale: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Sorry, something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add an event</h1>
      <input name="titre" placeholder="Title" value={form.titre} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="date_event" type="date" value={form.date_event} onChange={handleChange} required />
      <input name="n_sale" placeholder="Room" value={form.n_sale} onChange={handleChange} required />
      <input name="category" placeholder="Category (optional)" value={form.category} onChange={handleChange} />
      <button type="submit">Add</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default AddEventPage;