/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#E8F5E9',
          100: '#C8E6C9',
          500: '#4CAF50',
          600: '#388E3C',
          700: '#2D7A3A',
          800: '#1B5E20',
          900: '#144317',
        },
        gold: {
          50:  '#FFF9C4',
          100: '#FFF3CD',
          400: '#FDD835',
          500: '#E8A020',
          600: '#F57F17',
        },
        sand: '#FDF6EC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,.12)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
