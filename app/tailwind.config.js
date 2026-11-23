/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#2C0404',
          card: '#3A0A0A',
          elevated: '#451111',
          outer: '#150101',
        },
        accent: {
          DEFAULT: '#D7CC8F',
          dim: 'rgba(215, 204, 143, 0.55)',
          faint: 'rgba(215, 204, 143, 0.3)',
        },
        gold: {
          bright: '#F0E3A8',
        },
        cinema: {
          red: '#B91C1C',
          'red-deep': '#8B1A1A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        body: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        logo: '0.35em',
        poster: '0.15em',
        label: '0.2em',
        btn: '0.12em',
      },
      boxShadow: {
        warm: '0 8px 32px rgba(0, 0, 0, 0.45)',
        glow: '0 0 18px rgba(240, 227, 168, 0.45)',
      },
    },
  },
  plugins: [],
}
