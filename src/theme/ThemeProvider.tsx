import type { ReactNode } from 'react';
import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
  
  :root {
    --font-primary: ${theme.typography.fontFamily.primary};
    --font-heading: ${theme.typography.fontFamily.heading};
    --font-monospace: ${theme.typography.fontFamily.monospace};
    
    --color-primary: ${theme.colorPalette.primary.main};
    --color-primary-light: ${theme.colorPalette.primary.light};
    --color-primary-dark: ${theme.colorPalette.primary.dark};
    --color-secondary: ${theme.colorPalette.secondary.main};
    --color-error: ${theme.colorPalette.error.main};
    --color-background: ${theme.colorPalette.background.default};
    --color-text: ${theme.colorPalette.text.primary};
    --color-text-secondary: ${theme.colorPalette.text.secondary};
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    height: 100%;
    width: 100%;
  }
  
  body {
    font-family: var(--font-primary);
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: ${theme.gradients.vistaGlow}, 
                    radial-gradient(circle at 20% 30%, rgba(0, 150, 255, 0.1), transparent 25%),
                    radial-gradient(circle at 80% 70%, rgba(200, 0, 255, 0.1), transparent 25%);
    background-attachment: fixed;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: linear-gradient(90deg, #00f7ff, #9c27b0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
  }
  
  h2 {
    font-size: 2rem;
    color: var(--color-primary);
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--color-primary-light);
      text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
    }
  }
  
  button, .button {
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 12px 24px;
    border-radius: 30px;
    border: 1px solid rgba(0, 247, 255, 0.3);
    background: rgba(25, 25, 45, 0.7);
    color: var(--color-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 247, 255, 0.2);
    backdrop-filter: blur(10px);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px rgba(0, 247, 255, 0.4);
      background: rgba(0, 247, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    &.secondary {
      background: rgba(156, 39, 176, 0.7);
      color: white;
      border: 1px solid rgba(156, 39, 176, 0.5);
      
      &:hover {
        background: rgba(156, 39, 176, 0.9);
      }
    }
  }
  
  .glass-card {
    background: rgba(10, 15, 30, 0.6);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
    padding: 2rem;
    margin: 1rem 0;
  }
  
  input, textarea, select {
    background: rgba(25, 25, 45, 0.5);
    border: 1px solid rgba(0, 247, 255, 0.3);
    border-radius: 6px;
    color: #e0e0e0;
    padding: 12px 16px;
    font-family: var(--font-primary);
    width: 100%;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #00f7ff;
      box-shadow: 0 0 0 2px rgba(0, 247, 255, 0.2);
    }
    
    &::placeholder {
      color: #6c6c6c;
    }
  }
  
  /* Animations */
  @keyframes flicker {
    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
      text-shadow: 0 0 4px #00f7ff, 0 0 11px #00f7ff, 0 0 19px #00f7ff, 0 0 40px #00f7ff;
    }
    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
      text-shadow: none;
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(0, 247, 255, 0.2); }
    50% { box-shadow: 0 0 25px rgba(0, 247, 255, 0.4); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .neon-text {
    color: #00f7ff;
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.8), 0 0 20px rgba(0, 247, 255, 0.6);
    animation: flicker 1.5s infinite alternate;
  }
  
  .pulse-glow {
    animation: pulseGlow 3s ease-in-out infinite;
  }
  
  .float {
    animation: float 6s ease-in-out infinite;
  }
`;

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
