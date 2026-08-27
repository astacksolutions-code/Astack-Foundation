/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C3E50',
          50: '#EBEEF1',
          100: '#D2D9E0',
          200: '#A5B3C1',
          300: '#788DA2',
          400: '#4C6683',
          500: '#2C3E50',
          600: '#243342',
          700: '#1C2833',
          800: '#141C24',
          900: '#0C1116',
        },
        secondary: {
          DEFAULT: '#E67E22',
          50: '#FCF1E7',
          100: '#FAE1C9',
          200: '#F4C393',
          300: '#EFA55D',
          400: '#E98F3D',
          500: '#E67E22',
          600: '#C2660F',
          700: '#8F4B0B',
          800: '#5C3007',
          900: '#291503',
        },
        accent: '#ECF0F1',
        ink: '#1A2530',
        success: '#27AE60',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        waveShift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease-out both',
        waveShift: 'waveShift 18s linear infinite',
      }
    },
  },
  plugins: [],
}
