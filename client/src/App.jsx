import { Routes, Route } from "react-router";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <Routes>
      {/* TODO 1: path "/" shows EventsPage */}
      <Route path="/" element={<EventsPage/>} />
      {/* TODO 2: path "/events/:id" shows EventDetailsPage */}
      <Route path="/events/:id" element={<EventDetailsPage />} />
    </Routes>
  );
}

export default App;