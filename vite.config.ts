import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "robots.txt", "Tomekeeper.png"],
            devOptions: { enabled: true },
            manifest: {
                name: "Your App Name",
                short_name: "AppShortName",
                description: "Your app description",
                theme_color: "#1e1e2e", // catppuccin-frappe mauve background?
                icons: [
                    {
                        src: "Tomekeeper500.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "Tomekeeper500.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
                screenshots: [
                    {
                        src: "screenshot.png",
                        sizes: "431x833",
                        type: "image/png",
                        form_factor: "narrow",
                        label: "Application",
                    },
                ],
            },
        }),
    ],
    server: {
        host: true,
        port: 5173,
        allowedHosts: ["sodoma"]
    },
    build: {
        outDir: "dist/react",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
