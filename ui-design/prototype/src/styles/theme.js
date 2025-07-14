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

// Define custom gradients
export const primaryGradient = 'linear-gradient(135deg, #562CE6 0%, #8F74FF 100%)';
export const secondaryGradient = 'linear-gradient(135deg, #1AC6A1 0%, #5EEFD0 100%)';
export const warningGradient = 'linear-gradient(135deg, #F4B740 0%, #FFCF6B 100%)';
export const errorGradient = 'linear-gradient(135deg, #FF4D4F 0%, #FF7A7C 100%)';
export const successGradient = 'linear-gradient(135deg, #16C784 0%, #4EDBA7 100%)';
export const darkGradient = 'linear-gradient(135deg, #1A1A1A 0%, #2F3136 100%)';

// Create theme
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
      paper: '#2F3136',
      card: '#26282C',
      elevation1: '#2F3136',
      elevation2: '#34373C',
      elevation3: '#3A3D42'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C7C9D3',
      disabled: '#6B7280',
      hint: '#9CA3AF'
    },
    divider: '#4A4C57',
    action: {
      active: '#FFFFFF',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none'
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 6px 12px rgba(0, 0, 0, 0.14)',
    '0px 8px 16px rgba(0, 0, 0, 0.16)',
    '0px 10px 20px rgba(0, 0, 0, 0.18)',
    '0px 12px 24px rgba(0, 0, 0, 0.2)',
    '0px 14px 28px rgba(0, 0, 0, 0.22)',
    '0px 16px 32px rgba(0, 0, 0, 0.24)',
    '0px 18px 36px rgba(0, 0, 0, 0.26)',
    '0px 20px 40px rgba(0, 0, 0, 0.28)',
    '0px 22px 44px rgba(0, 0, 0, 0.3)',
    '0px 24px 48px rgba(0, 0, 0, 0.32)',
    '0px 26px 52px rgba(0, 0, 0, 0.34)',
    '0px 28px 56px rgba(0, 0, 0, 0.36)',
    '0px 30px 60px rgba(0, 0, 0, 0.38)',
    '0px 32px 64px rgba(0, 0, 0, 0.4)',
    '0px 34px 68px rgba(0, 0, 0, 0.42)',
    '0px 36px 72px rgba(0, 0, 0, 0.44)',
    '0px 38px 76px rgba(0, 0, 0, 0.46)',
    '0px 40px 80px rgba(0, 0, 0, 0.48)',
    '0px 42px 84px rgba(0, 0, 0, 0.5)',
    '0px 44px 88px rgba(0, 0, 0, 0.52)',
    '0px 46px 92px rgba(0, 0, 0, 0.54)',
    '0px 48px 96px rgba(0, 0, 0, 0.56)'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.grey[600],
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: colors.grey[500]
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'
          }
        },
        containedPrimary: {
          background: primaryGradient,
          '&:hover': {
            background: 'linear-gradient(135deg, #4A25C5 0%, #7F63E8 100%)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;
