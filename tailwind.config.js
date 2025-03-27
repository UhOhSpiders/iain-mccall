/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': {
        100: '#ff6b35',
        200: '#ff7d4b',
        300: '#ff8f61',
        400: '#ff9f77',
        500: '#ffb08c',
        600: '#ffc0a3'
      },
      'surface': {
        100: '#07022e',
        200: '#1f1e42',
        300: '#393658',
        400: '#524f6e',
        500: '#6d6a84',
        600: '#ffe292'
      },
      'on-background': '#f7e3b1',
      
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      'body': ['"Inter"', 'Helvetica', 'sans-serif']
    }
  },
  plugins: [],
}