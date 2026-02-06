/* eslint-disable code-style/variable-naming-convention */

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({ // eslint-disable-line
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Twindix Admin",
                short_name: "Twindix Admin",
                description: "Admin panel for the Twindix platform — manage assessments, enrollments, orders, benchmarks, packages, templates, discounts, and access control. Empowering leaders with actionable insights to improve team dynamics, foster transformative leadership, and drive strategic decision-making through innovative assessments and management science.",
                theme_color: "#0025BA",
                background_color: "#F6F6F6",
                display: "standalone",
                icons: [
                    {
                        src: "/favicon-32x32.png",
                        sizes: "32x32",
                        type: "image/png",
                    },
                    {
                        src: "/apple-touch-icon.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                navigateFallback: "/offline.html",
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-cache",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "gstatic-fonts-cache",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
    resolve: { alias: { "@": "/src" } },
    build: { sourcemap: true },
});
