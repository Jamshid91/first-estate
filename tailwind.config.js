module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '100': '30rem',
        '98': '28.5rem',
        '84': '22rem',
      },

      colors: {
        gray_dark: "#3A3C44",
        gray_light: "#F5F5F9",
        yellow: "#FDCE4D",
        red: '#E93842',
        white: '#fff',
        black: '#000',
        black_light: '#0009',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/img/png/main.jpg')",
      },

      zIndex: {
        '-1': '-1',
       },
       height: {
        '100': '713px'
       }
    },

    screens: {
      '2xl': {'max': '1535px'},

      'xl': {'max': '1279px'},

      'lg': {'max': '1024px'},

      'md': {'max': '768px'},

      'sm': {'max': '640px'},
    },

    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },

      
    fontFamily: {
      montserrat: ['Montserrat', 'serif'],
      },

      container: {
        center: true,
        maxWidth: '1280px',
      },
  },

  variants: {
    extend: {
    },
  },
  plugins: [],
}
