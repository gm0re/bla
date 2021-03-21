const theme = {
  colors: {
    dark: {
      background: {
        primary: '#000000',
        secondary: '#101010',
        tertiary: '#080808'
      },
      border: '1px #2f3336 solid',
      boxShadow: '0px 9px 10px #2525258c',
      button: {
        hover: '#101010',
        inactive: '#000000'
      },
      link: {
        unvisited: '#1da1f2',
        visited: '#1da1f2'
      },
      text: {
        primary: '#ffffff',
        secondary: '#808080'
      },
      type: 'dark',
      waveform: {
        background: '#000000',
        position: '#00000026',
        progress: '#00c5ff',
        wave: '#c4cfd6'
      }
    },
    light: {
      background: {
        primary: '#ffffff',
        secondary: '#f7f7f7',
        tertiary: '#e0dede'
      },
      border: '1px #c4cfd6 solid',
      boxShadow: '0px 9px 10px #eaeaea8c',
      button: {
        hover: '#f7f7f7',
        inactive: '#ffffff'
      },
      link: {
        unvisited: '#1da1f2',
        visited: '#1da1f2'
      },
      text: {
        primary: '#000000',
        secondary: '#101010'
      },
      type: 'light',
      waveform: {
        background: '#ffffff',
        position: '#00000026',
        progress: '#00c5ff',
        wave: '#c4cfd6'
      }
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
