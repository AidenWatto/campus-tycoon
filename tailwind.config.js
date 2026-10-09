/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — Deep Academic Blue
        primary: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1f49f5',
          700: '#1738e1',
          800: '#1930b6',
          900: '#1a2f8f',
          950: '#141d57',
        },
        // Secondary — Warm Campus Gold
        secondary: {
          50: '#fdf8ed',
          100: '#faedce',
          200: '#f6d995',
          300: '#f1c55c',
          400: '#eeb03a',
          500: '#e89423',
          600: '#cf7418',
          700: '#a95616',
          800: '#884517',
          900: '#6f3a17',
          950: '#3f1d08',
        },
        // Accent — Campus Green
        accent: {
          50: '#edfcf4',
          100: '#d3fae6',
          200: '#aaf3cd',
          300: '#73e7a9',
          400: '#3dd084',
          500: '#1bb565',
          600: '#109250',
          700: '#0f7542',
          800: '#115c37',
          900: '#104c30',
          950: '#042a19',
        },
        // Success
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Warning
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Error
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Neutral — Warm grays for campus feel
        neutral: {
          50: '#f8f7f5',
          100: '#f0eeea',
          200: '#e2ddd5',
          300: '#c9c1b5',
          400: '#a89e8c',
          500: '#8a7f6b',
          600: '#6f6553',
          700: '#574f41',
          800: '#3f3930',
          900: '#2a2620',
          950: '#1a1714',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
