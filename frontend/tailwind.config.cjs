/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // In Tailwind v4, colors are defined in CSS with @theme directive
  // Only keeping non-color theme extensions here
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        sm: ['0.875rem', { lineHeight: '1.6', letterSpacing: '-0.008em' }],
        base: ['1rem', { lineHeight: '1.75', letterSpacing: '-0.011em' }],
        lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.012em' }],
        xl: ['1.25rem', { lineHeight: '1.7', letterSpacing: '-0.013em' }],
        '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '1.5', letterSpacing: '-0.018em' }],
        '4xl': ['2.25rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.022em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        mono: [
          '"SF Mono"',
          'Monaco',
          '"Cascadia Code"',
          '"Roboto Mono"',
          '"Courier New"',
          'monospace',
        ],
        display: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
