const theme = {
  colors: {
    dark: {},
    light: {
      background: {
        primary: '#ffffff',
        secondary: '#f7f7f7',
        tertiary: '#e0dede'
      },
      border: '1px #c4cfd6 solid',
      boxShadow: '0px 9px 10px #eaeaea8c',
      button: {
        hover: 'grey',
        inactive: '#ffffff'
      },
      link: {
        unvisited: '#1da1f2',
        visited: '#1da1f2'
      },
      text: '#000000'
    }
  },
  global: {
    borderRadius: {
      l: '16px',
      m: '8px',
      s: '4px'
    },
    button: {
      borderRadius: '10%',
      cursor: 'pointer'
    },
    font: {
      family: 'sans-serif',
      size: {
        l: 'larger',
        m: 'medium',
        s: 'small',
        xl: 'larger'
      },
      weight: {
        bold: 'bolder',
        light: 'lighter'
      }
    },
    icon: {
      size: {
        m: '48px',
        s: '24px'
      }
    },
    link: {
      cursor: 'pointer'
    },
    space: {
      margin: {
        l: '6px',
        m: '4px',
        s: '2px',
        xl: '8px',
        xxl: '16px'
      },
      padding: {
        l: '6px',
        m: '4px',
        s: '2px',
        xl: '8px',
        xxl: '16px'
      }
    }
  }
};

export default theme;
