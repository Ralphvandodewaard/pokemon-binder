module.exports = {
  content: [
    './src/**/*.{html,js,ts}'
  ],
  safelist: [
    {
      pattern: /grid-(cols|rows)-(2|3|4)/
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      colors: {
        primary: {
          DEFAULT: '#3A549F',
          dark: '#2B2D53'
        },
        cloud: '#F5F9FB',
        disabled: '#E3E6EB',
        green: '#54D39D',
        red: '#DA4658'
      },
      gridTemplateColumns: {
        settings: '112px, minmax(0, 1fr)'
      },
      screens: {
        'mobile': '480px',
      }
    }
  },
  plugins: []
};
