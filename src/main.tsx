import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app.tsx"

import "./styles/index.css"
import "@rainbow-me/rainbowkit/styles.css"

const rootElement = document.getElementById("root")

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  console.error("Root element not found")
}
