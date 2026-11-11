import { Routes, Route } from "react-router";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import AdminRoute from "./components/AdminRoute";
import AddEventPage from "./pages/AddEventPage";
import RegistrationsPage from "./pages/RegistrationsPage";



function App() {
  return (
    <>
     <Header />
     <main>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<EventsPage/>} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
            path="/admin/events/new"
            element={
        <AdminRoute>
          <AddEventPage />
        </AdminRoute>
            }
      />
      <Route
          path="/admin/events/:id/registrations"
          element={
        <AdminRoute>
        <RegistrationsPage />
        </AdminRoute>
         }
      />
    </Routes>
    </main>
    <Footer />
    </>
  );
}

export default App;