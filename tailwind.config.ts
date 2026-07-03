import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6edff',
          200: '#d4e2ff',
          300: '#b8ccff',
          400: '#94a8ff',
          500: '#6d7dff',
          600: '#5555ff',
          700: '#4a42d4',
          800: '#3d36ad',
          900: '#342d8f',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9ff',
          200: '#dcd0ff',
          300: '#c5b0ff',
          400: '#a880ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        dark: {
          50: '#f9f9fa',
          100: '#f3f3f4',
          200: '#ececf1',
          300: '#d9d9e3',
          400: '#bebebc',
          500: '#a0a0a4',
          600: '#808086',
          700: '#696969',
          800: '#404041',
          900: '#191919',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      backdropFilter: {
        'glass': 'blur(10px) saturate(180%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(109, 125, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow': '0 0 40px rgba(109, 125, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(109, 125, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(109, 125, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [animate],
}
export default config
