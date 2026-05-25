/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: '#1D4ED8',
        slate: '#0F172A'
      }
    }
  },
  plugins: []
};
