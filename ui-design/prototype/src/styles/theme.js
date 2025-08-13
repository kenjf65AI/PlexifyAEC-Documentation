import { createTheme } from '@mui/material/styles';

// Define color palette
const colors = {
  primary: {
    main: '#562CE6',
    light: '#8F74FF',
    dark: '#3A1AB9',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#1AC6A1',
    light: '#5EEFD0',
    dark: '#0B9A7A',
    contrastText: '#FFFFFF'
  },
  error: {
    main: '#FF4D4F',
    light: '#FF7A7C',
    dark: '#CC3E3F',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#F4B740',
    light: '#FFCF6B',
    dark: '#D19A35',
    contrastText: '#000000'
  },
  success: {
    main: '#16C784',
    light: '#4EDBA7',
    dark: '#0FA06A',
    contrastText: '#FFFFFF'
  },
  info: {
    main: '#2D9CDB',
    light: '#5BB7E5',
    dark: '#1A7DB1',
    contrastText: '#FFFFFF'
  },
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    A100: '#F3F4F6',
    A200: '#E5E7EB',
    A400: '#9CA3AF',
    A700: '#374151'
  }
};

// Define primary gradient for use in components
export const primaryGradient = 'linear-gradient(135deg, #562CE6 0%, #8F74FF 100%)';

// Create simplified theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    success: colors.success,
    info: colors.info,
    grey: colors.grey,
    background: {
      default: '#1A1A1A',
      paper: '#2F3136'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C7C9D3',
      disabled: '#6B7280'
    },
    divider: '#4A4C57'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem'
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '0.875rem'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none'
        },
        contained: {
          boxShadow: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;
