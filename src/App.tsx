import "./App.css";
import Hero from "./pages/Hero";
import Navbar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Doctors from "./pages/DoctorPage";
import DoctorProfile from "./pages/DoctorProfile";
import Footer from "./Components/Footer";
import { SignIn, SignUp } from "./Components/DoctorAuth";
import ProtectedRoute, { ProtectedRouteV2 } from "./Components/ProtectedRoute";
import PatientQueue from "./pages/DoctorAdmin/PatientQueue";
import DoctorDashboard from "./pages/DoctorAdmin/Dashboard";
import PatientsPage from "./pages/DoctorAdmin/MyPatients";
import PaymentsPage from "./pages/DoctorAdmin/Payment";
import DoctorSettings from "./pages/DoctorAdmin/DoctorSettings";
import SubscriptionPage from "./pages/DoctorAdmin/Subscriptions";
import ServicesPage from "./pages/Services";

function App() {
  return (
    <Router>
      <main className="min-h-screen">
        <div>
          <Navbar />
          <Routes>
            
            <Route path="/" element={<ProtectedRouteV2><Hero /></ProtectedRouteV2>} />
            {/* <Route path="/services" element={<Services />} /> */}
            <Route path="/doctors" element={<ProtectedRouteV2><Doctors /></ProtectedRouteV2>} />
            <Route path="/doctors/:id" element={<ProtectedRouteV2><DoctorProfile /></ProtectedRouteV2>} />
            <Route path="/signin" element={<ProtectedRouteV2><SignIn /></ProtectedRouteV2>} />
            <Route path="/signup" element={<ProtectedRouteV2><SignUp /></ProtectedRouteV2>} />
            <Route path="/services" element={<ProtectedRouteV2><ServicesPage /></ProtectedRouteV2>} />
            
            <Route
              path="/queue"
              element={
                <ProtectedRoute>
                  <PatientQueue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mypatients"
              element={
                <ProtectedRoute>
                  <PatientsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <PaymentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DoctorSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <ProtectedRoute>
                  <SubscriptionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </main>
    </Router>
  );
}

export default App;
