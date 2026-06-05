import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ConsentForDataProcessing from "../pages/documents/ConsentForDataProcessing";
import OfferAgreement from "../pages/documents/OfferAgreement";
import PrivacyPolicy from "../pages/documents/PrivacyPolicy";
import { SchoolPage } from "../pages/SchoolPage/SchoolPage";
import "./App.css";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/offer-agreement", element: <OfferAgreement /> },
  {
    path: "/consent-personal-data",
    element: <ConsentForDataProcessing />,
  },
  { path: "/school", element: <SchoolPage /> },
];

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
}
