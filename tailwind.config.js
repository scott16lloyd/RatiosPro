const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const prefix = '';
export const theme = {
  screens: {
    sm: '360px',
    smd: '430px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
    '2xl': '1440px',
  },
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
      '4xl': '1800px',
      '5xl': '2000px',
      '6xl': '2200px',
    },
  },
  extend: {
    backgroundImage: (theme) => ({
      'green-gradient':
        'linear-gradient(90deg, hsla(120, 65%, 53%, 1), hsla(120, 100%, 37%, 1))',
    }),
    aspectRatio: {
      '4/3': '4 / 3',
    },
    gridTemplateColumns: {
      custom: 'repeat(4, minmax(80px, 1fr))',
      customSmall: 'repeat(3, minmax(80px, 1fr))',
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    fontSize: {
      xxs: '0.5rem',
      '1.5xl': '1.3rem',
      '4.5xl': '2.4rem',
      resultBoxSmall: '0.9rem',
      resultBoxMedium: '1.7rem',
      resultBoxLarge: '1.9rem',
    },
    height: {
      120: '30rem',
    },
    width: {
      120: '40rem',
      130: '50rem',
    },
    padding: {
      110: '26rem',
      130: '30rem',
    },
    maxWidth: {
      130: '100rem',
    },
  },
};
export const plugins = [
  require('tailwindcss-animate'),
  require('tailwind-scrollbar-hide'),
  addVariablesForColors,
];

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
