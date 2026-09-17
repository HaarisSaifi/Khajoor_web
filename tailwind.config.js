/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FFF8ED',
          100: '#F7E9D3',
          200: '#ECD6B8',
          300: '#DEC097',
        },
        date: {
          900: '#2A120D',
          800: '#3B1A12',
          700: '#572A1D',
          600: '#723A2A',
          500: '#8E4B37',
        },
        caramel: {
          300: '#DF9B5E',
          400: '#CA7E3C',
          500: '#B86B2B',
          600: '#9B541C',
          700: '#7B3F11',
        },
        gold: {
          300: '#E7C275',
          400: '#D5A24B',
          500: '#BD8C35',
          600: '#9F7325',
        },
        palm: {
          400: '#50835D',
          500: '#42704E',
          600: '#355B3E',
          700: '#284530',
        },
        cream: '#FFFDF8',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(42, 18, 13, 0.08)',
        'warm-md': '0 8px 24px -4px rgba(42, 18, 13, 0.12)',
        'warm-lg': '0 16px 40px -8px rgba(42, 18, 13, 0.16)',
        'warm-xl': '0 24px 64px -12px rgba(42, 18, 13, 0.22)',
        'glow-gold': '0 0 30px rgba(213, 162, 75, 0.25)',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
