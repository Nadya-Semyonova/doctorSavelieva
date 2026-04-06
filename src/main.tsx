import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/variables.css";
import App from "./app/App";

// Инициализация EmailJS - замените на свой PUBLIC KEY
// emailjs.init('YOUR_PUBLIC_KEY');

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
