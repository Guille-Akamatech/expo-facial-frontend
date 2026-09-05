import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración estándar de Vite para una SPA de React.
// El puerto 5173 es el default de Vite; puedes cambiarlo si lo necesitas.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
