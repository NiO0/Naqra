// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // "class" lets parent components style the root of child components via the `class` prop
  scopedStyleStrategy: 'class',
  server: {
    // lets the dev and preview servers answer requests tunnelled through ngrok (leading dot = any subdomain)
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app'],
  },
});
