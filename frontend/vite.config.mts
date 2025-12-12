import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: { sourcemap: true },
    define: { "process.stdout": process.stdout },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(
                __dirname,
                "./src",
            ),
        },
    },
});
