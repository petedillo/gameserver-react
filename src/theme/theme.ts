export const theme = {
  name: 'DIO Aero Glass',
  description: 'A modern Windows Vista Aero Glass inspired theme with neon accents and glass morphism effects',
  colorPalette: {
    primary: {
      main: '#00f7ff',
      light: '#4dffff',
      dark: '#00c4cc',
      rgb: '0, 247, 255',
      contrastText: '#0a0a1a',
    },
    secondary: {
      main: '#9c27b0',
      light: '#d05ce3',
      dark: '#6a0080',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff3366',
      light: '#ff6b8b',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a1a',
      paper: 'rgba(10, 15, 30, 0.6)',
      glass: 'rgba(25, 25, 45, 0.7)',
      overlay: 'rgba(10, 10, 26, 0.85)',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
      disabled: '#6c6c6c',
      hint: '#888888',
    },
    border: {
      light: 'rgba(0, 247, 255, 0.3)',
      main: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.2)',
    },
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
    button: '0 0 15px rgba(0, 247, 255, 0.2)',
    buttonHover: '0 0 25px rgba(0, 247, 255, 0.4)',
    textGlow: '0 0 10px rgba(0, 247, 255, 0.8)',
    textShadow: '0 0 15px rgba(0, 247, 255, 0.6)',
  },
  gradients: {
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    buttonHover: 'linear-gradient(135deg, rgba(0, 247, 255, 0.2), rgba(0, 200, 210, 0.1))',
    vistaGlow: 'radial-gradient(circle at 50% 50%, rgba(0, 247, 255, 0.15), transparent 70%)',
  },
  typography: {
    fontFamily: {
      primary: '"Rajdhani", "Segoe UI", sans-serif',
      heading: '"Orbitron", "Arial Black", sans-serif',
      monospace: '"Fira Code", "Courier New", monospace',
    },
    h1: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '0.25px',
    },
    body1: {
      fontFamily: 'var(--font-primary)',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.15px',
    },
    button: {
      fontFamily: 'var(--font-primary)',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
  },
  components: {
    button: {
      borderRadius: '30px',
      padding: '12px 24px',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 15px rgba(0, 247, 255, 0.2)',
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 0 25px rgba(0, 247, 255, 0.4)',
        background: 'rgba(0, 247, 255, 0.1)',
      },
      active: {
        transform: 'translateY(0)',
        boxShadow: '0 0 10px rgba(0, 247, 255, 0.3)',
      },
      primary: {
        background: 'rgba(25, 25, 45, 0.7)',
        color: '#00f7ff',
        border: '1px solid rgba(0, 247, 255, 0.3)',
      },
      secondary: {
        background: 'rgba(156, 39, 176, 0.7)',
        color: '#ffffff',
        border: '1px solid rgba(156, 39, 176, 0.5)',
      },
    },
    card: {
      background: 'rgba(10, 15, 30, 0.6)',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      padding: '2rem',
      margin: '1rem 0',
    },
    input: {
      background: 'rgba(25, 25, 45, 0.5)',
      border: '1px solid rgba(0, 247, 255, 0.3)',
      borderRadius: '6px',
      color: '#e0e0e0',
      padding: '12px 16px',
      transition: 'all 0.3s ease',
      focus: {
        outline: 'none',
        borderColor: '#00f7ff',
        boxShadow: '0 0 0 2px rgba(0, 247, 255, 0.2)',
      },
      placeholder: {
        color: '#6c6c6c',
      },
    },
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  spacing: {
    unit: 8,
    section: '4rem',
  },
} as const;

export type Theme = typeof theme;
