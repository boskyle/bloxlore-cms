import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    define: {
      __API_BASE__: JSON.stringify(env.VITE_API_BASE_URL),
      __SERVICE_NAME__: JSON.stringify(env.VITE_SERVICE_NAME),
      __SERVICE_SECRET__: JSON.stringify(env.VITE_SERVICE_SECRET),
    },
    server: {
      historyApiFallback: true, // 🧭 Ensures React Router works on refresh
      host: true, // 👈 Required for Docker access
      port: env.VITE_PORT, // 👈 Matches docker-compose
      strictPort: true, // 👈 Enforce this exact port
    },
  };
});
