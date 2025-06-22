module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF',
        'secondary': '#60A5FA',
        'accent': '#3B82F6',
        'background': '#0F172A',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.blue.400"), 0 0 20px theme("colors.blue.700")',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
