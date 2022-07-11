module.exports = {
  content: [
    './src/**/*.{html,js,ts}'
  ],
  safelist: [
    {
      pattern: /grid-(cols|rows)-(2|3|4)/
    },
    {
      pattern: /(w|h)-page-(2|3|4)-(desktop|mobile)/,
      variants: ['mobile']
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
      width: {
        'page-2-desktop': '308px',
        'page-2-mobile': '188px',
        'page-3-desktop': '452px',
        'page-3-mobile': '276px',
        'page-4-desktop': '596px',
        'page-4-mobile': '364px'
      },
      height: {
        'card-desktop': '178.67px',
        'card-mobile': '111.67px',
        'page-2-desktop': '409.31px',
        'page-2-mobile': '251.31px',
        'page-3-desktop': '603.97px',
        'page-3-mobile': '370.97px'
      },
      screens: {
        'mobile': '480px',
      }
    }
  },
  plugins: []
};
