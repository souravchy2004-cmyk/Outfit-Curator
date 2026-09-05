import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F0FF',
          100: '#EBE0FF',
          200: '#D6C2FF',
          300: '#B894FF',
          400: '#9966FF',
          500: '#7C4DDB', // Primary
          600: '#6839C4',
          700: '#5429AA',
          800: '#411F8A',
          900: '#30166B',
        },
        primary: {
          DEFAULT: '#7C4DDB',
          hover: '#6A3BC8',
        },
        secondary: {
          DEFAULT: '#A77BE8',
        },
        surface: {
          bg: '#F8F6FC',
          card: '#FFFFFF',
          border: '#E8E4EF',
          muted: '#F0EBFA',
        },
        font: {
          main: '#171717',
          sub: '#777777',
        },
        accent: {
          success: '#55B87A',
          error: '#E85D75',
          warning: '#F5A623',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(124, 77, 219, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(124, 77, 219, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(124, 77, 219, 0.35)',
      }
    },
  },
  plugins: [],
};
export default config;
