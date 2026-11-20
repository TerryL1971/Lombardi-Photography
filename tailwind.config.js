// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Charcoal / white / silver palette, after pictureitbyterry.com
        ink: {
          DEFAULT: '#222222',
          soft: '#2a2a2a',
          muted: '#333333',
        },
        paper: {
          DEFAULT: '#ffffff',
          soft: '#eeeeee',
        },
        clay: {
          DEFAULT: '#c0c6cc',
          deep: '#888888',
        },
        dim: '#555555',
      },
      fontFamily: {
        // Mulish stands in for FreightNeo Pro, Josefin Sans Light for Blakely,
        // Allura for P22 Allyson (the originals are Adobe Fonts only). Self-hosted via @fontsource.
        serif: ['"Mulish Variable"', 'Mulish', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Mulish Variable"', 'Mulish', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Josefin Sans"', 'ui-sans-serif', 'sans-serif'],
        script: ['Allura', 'cursive'],
      },
      letterSpacing: {
        widest: '0.28em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
