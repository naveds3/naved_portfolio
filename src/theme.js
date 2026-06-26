import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#c5a358' : '#8f6424', // Champagne Gold / Bronze Gold
        dark: mode === 'dark' ? '#af8d45' : '#734d15',
      },
      background: {
        default: mode === 'dark' ? '#080b11' : '#faf8f5', // Obsidian / Ivory Cream
        paper: mode === 'dark' ? '#0f131c' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#fcfaf7' : '#1a202c',
        secondary: mode === 'dark' ? '#a0aec0' : '#5a6578',
      },
      divider: mode === 'dark' ? 'rgba(197, 163, 88, 0.15)' : 'rgba(143, 100, 36, 0.15)',
    },
    typography: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      h1: {
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        fontWeight: 800,
      },
      h2: {
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        fontWeight: 700,
      },
      h3: {
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        fontWeight: 700,
      },
      h4: {
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        fontWeight: 700,
      },
      h5: {
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        fontWeight: 600,
      },
      h6: {
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            padding: '0.6rem 1.5rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            backgroundImage: 'none',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        },
      },
    },
  });
};
