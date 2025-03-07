import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
    <ToastContainer />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
