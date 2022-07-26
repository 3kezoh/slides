export default {
  root: "src",
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
  build: {
    chunkSizeWarningLimit: 1600,
    target: "es2015",
    outDir: "../dist",
  },
};
