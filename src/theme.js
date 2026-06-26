import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#14b8a6' : '#0d9488', // teal / accent
        dark: mode === 'dark' ? '#0d9488' : '#0f766e',
      },
      background: {
        default: mode === 'dark' ? '#0b0f19' : '#f8fafc',
        paper: mode === 'dark' ? '#111827' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
        secondary: mode === 'dark' ? '#94a3b8' : '#475569',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
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
