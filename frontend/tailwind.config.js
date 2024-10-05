import tailwindcss from '@catppuccin/tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      hack: ['Hack', 'monospace'],
    },
  },
  plugins: [tailwindcss()],
};
