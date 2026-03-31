import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import "./App.css";
import PrivacyPolicy from "../pages/documents/PrivacyPolicy";
import OfferAgreement from "../pages/documents/OfferAgreement";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/offer-agreement" element={<OfferAgreement />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
// позже вынести роуты в отдельный файл
