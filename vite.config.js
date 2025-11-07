import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { viteSingleFile } from "vite-plugin-singlefile";
import postcssUrl from 'postcss-url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Inline JS and CSS into the HTML
    viteSingleFile(),
    ViteMinifyPlugin({})
  ],
  css: {
    postcss: {
      // Inline url(...) references (including SVG) into CSS as data URIs
      plugins: [
        postcssUrl({ url: 'inline', maxSize: Infinity })
      ]
    }
  },
  build: {
    // Force inlining of assets referenced from JS (base64). SVGs in CSS are handled by postcss-url
    assetsInlineLimit: 100000000, // ~100MB, effectively inline all small/medium assets
  },
});
