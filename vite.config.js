import { resolve } from "path";

export default {
  "root": resolve("sources"),
  "server": {
    "port": 8000,
    "host": "0.0.0.0"
  },
  "build": {
    "chunkSizeWarningLimit": 1600,
  },
};
