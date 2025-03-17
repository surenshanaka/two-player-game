import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'], 
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
      }
    }
  }
} as UserConfig)
