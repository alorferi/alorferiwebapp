module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js}'],
  // Course package colors arrive as class names in existing API responses.
  safelist: [
    { pattern: /^(bg|text|border)-(primary|success|danger|secondary|info|light|dark)$/ },
    { pattern: /^(bg|text|border)-(red|green|blue|yellow|gray|indigo|purple|pink|orange)-(100|200|300|400|500|600|700|800|900)$/ }
  ],
  theme: {
    screens: { sm: '576px', md: '768px', lg: '992px', xl: '1200px' },
    extend: {
      colors: {
        primary: '#007bff', success: '#28a745', danger: '#dc3545',
        secondary: '#6c757d', info: '#17a2b8', light: '#f8f9fa', dark: '#343a40',
        brand: '#174b3a', paper: '#f7f4ec'
      },
      borderColor: { DEFAULT: '#dee2e6' },
      boxShadow: { sm: '0 .125rem .25rem rgba(0,0,0,.075)' },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'] }
    }
  },
  plugins: []
};
