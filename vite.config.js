import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
    target: "es2015",
    outDir: "../dist",
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png}"],
      },
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["apple-touch-icon.png", "favicon.ico"],
      manifest: {
        name: "Slides",
        short_name: "Slides",
        description: "Réalisez des présentations en ligne",
        background_color: "#272727",
        theme_color: "#121212",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        lang: "fr",
        icons: [
          {
            src: "/static/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/static/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  root: "src",
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
});
