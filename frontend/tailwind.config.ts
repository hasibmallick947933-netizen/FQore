import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#040711',
        surface: '#090e1d',
        surfaceLight: '#111827',
        borderGlow: 'rgba(34, 211, 238, 0.25)',
        cyanGlow: '#22d3ee',
        blueGlow: '#3b82f6',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.3)',
        'glow-cyan-lg': '0 0 50px rgba(34, 211, 238, 0.45)',
        'glow-blue': '0 0 35px rgba(59, 130, 246, 0.35)',
        'chrome-btn': '0 4px 20px rgba(255, 255, 255, 0.15), 0 0 15px rgba(34, 211, 238, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
