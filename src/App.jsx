import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicCatalogue from "./pages/MusicCatalogue";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import ArtistDashboard from "./pages/ArtistDashboard";
import OwnedMusicPage from "./pages/OwnedMusicPage";
import ProfilePage from "./pages/ProfilePage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ArtistAgreement from "./pages/ArtistAgreement";
import CopyrightLicensing from "./pages/CopyrightLicensing";
import RevenuePolicy from "./pages/RevenuePolicy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: "1" }}>
          <Routes>
            <Route path="/" element={<MusicCatalogue />} />

            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <UploadPage />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ArtistDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/owned-music"
              element={
                <PrivateRoute>
                  <OwnedMusicPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            {/* Legal and Compliance Pages */}
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/artist-agreement" element={<ArtistAgreement />} />
            <Route path="/copyright-licensing" element={<CopyrightLicensing />} />
            <Route path="/revenue-policy" element={<RevenuePolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

