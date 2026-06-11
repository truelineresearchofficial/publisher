/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // White-based premium ground
        paper: '#FFFFFF',
        canvas: '#F6F9F9', // alt section background
        mist: '#EDF3F3', // softer panels
        // Deep ink (text + dark bands)
        ink: '#0A1A26',
        'ink-2': '#0E222F',
        'ink-soft': '#46606E',
        'ink-faint': '#76909C',
        line: '#E3ECEC',
        'line-2': '#D3E0E0',
        // Trueline brand — scientific teal/aqua
        brand: {
          50: '#EAF7F4',
          100: '#CFEDE7',
          200: '#A0DBD0',
          300: '#5FC3B5',
          400: '#2CA897',
          500: '#0E8C7F',
          600: '#0A7167',
          700: '#0A5A53',
          800: '#0B4843',
          900: '#0A3A36',
        },
        // Spectrum accents (for the magazine / flywheel motif)
        aqua: '#22C3C9',
        sky: '#3E9BE8',
        iris: '#6E7BEF',
        gold: '#E0A93C',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,26,38,0.04), 0 12px 32px -12px rgba(10,26,38,0.12)',
        'card-lg': '0 1px 2px rgba(10,26,38,0.04), 0 30px 60px -24px rgba(10,26,38,0.20)',
        ring: '0 0 0 1px rgba(10,26,38,0.06)',
        glow: '0 20px 60px -20px rgba(14,140,127,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
