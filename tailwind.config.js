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
        primary: '#174b3a', 'primary-hover': '#103d2e', 'primary-soft': '#eef3eb',
        success: '#356744', 'success-hover': '#284f34',
        danger: '#ad342c', 'danger-hover': '#8d2923',
        secondary: '#65716a', 'secondary-hover': '#526057',
        info: '#32616a', light: '#f2f5ef', dark: '#24342c',
        brand: '#174b3a', paper: '#f7f4ec', stroke: '#dbe1d8'
      },
      borderColor: { DEFAULT: '#dbe1d8' },
      boxShadow: {
        sm: '0 2px 8px rgba(21,62,47,.04)',
        card: '0 6px 24px -12px rgba(21,62,47,.14)',
        menu: '0 12px 36px -12px rgba(21,62,47,.22)'
      },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'] }
    }
  },
  plugins: []
};
