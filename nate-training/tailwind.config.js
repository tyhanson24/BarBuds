/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0a0a0a',
          800: '#141414',
          700: '#1f1f1f',
          600: '#2a2a2a',
          500: '#3a3a3a',
        },
        ripon: {
          DEFAULT: '#c8102e',
          light: '#e63950',
          dark: '#9a0c24',
        },
        cream: '#f5f1e8',
        steel: '#8a8a8a',
        signal: {
          green: '#00d27a',
          amber: '#ffb020',
          red: '#e63950',
        },
        phase: {
          1: '#c8102e',
          2: '#ff6b35',
          3: '#ffb020',
          4: '#00d27a',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Archivo"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
