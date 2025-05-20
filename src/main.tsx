import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router.tsx";
import { ThemeProvider } from "./common/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="frappe">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  </StrictMode>,
);
