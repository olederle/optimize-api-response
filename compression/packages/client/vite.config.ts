import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    origin: "http://0.0.0.0:8080",
    port: 8080,
    strictPort: true,
    proxy: {
      "/api": {
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
        target: "http://localhost:3000",
      },
    },
  },
});
