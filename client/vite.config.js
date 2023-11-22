import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: "dist",
    },
    server: {
      port: 3000,
    },
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
    define: {
      'process.env': env
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
  }

})
