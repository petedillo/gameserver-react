import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    description: string;
    colorPalette: {
      primary: {
        main: string;
        light: string;
        dark: string;
        rgb: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      background: {
        default: string;
        paper: string;
        glass: string;
        overlay: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        hint: string;
      };
      border: {
        light: string;
        main: string;
        dark: string;
      };
    };
    shadows: {
      glass: string;
      button: string;
      buttonHover: string;
      textGlow: string;
      textShadow: string;
    };
    gradients: {
      glass: string;
      buttonHover: string;
      vistaGlow: string;
    };
    typography: {
      fontFamily: {
        primary: string;
        heading: string;
        monospace: string;
      };
      h1: {
        fontFamily: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: number;
        letterSpacing: string;
        textTransform: string;
      };
      h2: {
        fontFamily: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: number;
        letterSpacing: string;
      };
      body1: {
        fontFamily: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: number;
        letterSpacing: string;
      };
      button: {
        fontFamily: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: number;
        letterSpacing: string;
        textTransform: string;
      };
    };
    components: {
      button: {
        borderRadius: string;
        padding: string;
        transition: string;
        boxShadow: string;
        hover: {
          transform: string;
          boxShadow: string;
          background: string;
        };
        active: {
          transform: string;
        };
        primary: {
          background: string;
          color: string;
          border: string;
        };
        secondary: {
          background: string;
          color: string;
          border: string;
        };
      };
      card: {
        background: string;
        backdropFilter: string;
        borderRadius: string;
        border: string;
        boxShadow: string;
        padding: string;
        margin: string;
      };
      input: {
        background: string;
        border: string;
        borderRadius: string;
        color: string;
        padding: string;
        transition: string;
        focus: {
          outline: string;
          borderColor: string;
          boxShadow: string;
        };
        placeholder: {
          color: string;
        };
      };
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      unit: number;
      section: string;
    };
  }
}
