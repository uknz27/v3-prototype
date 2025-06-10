import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles'

// Define a more M3-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF', // A clear, modern blue (Azure Radiance)
    },
    // We can add secondary, error, warning, info, success as needed
    // Background and surface colors are also key in M3
    background: {
      default: '#f4f6f8', // A light grey for the main background
      paper: '#ffffff',   // White for paper elements like Cards
    },
    text: {
      primary: '#1A2027', // Dark grey for primary text, good contrast on light backgrounds
      secondary: '#5A6C7A', // Lighter grey for secondary text
    }
  },
  shape: {
    borderRadius: 12, // More rounded corners, common in M3
  },
  typography: {
    // M3 uses specific typography scales. We can adjust later if needed.
    // For now, default Material UI typography will be used with new colors.
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif', // Ensuring consistency
    h1: { fontSize: '2.5rem', fontWeight: 600 }, // Example: Adjusting typography scale
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 500 }, // Used in Cards
    h6: { fontSize: '1.1rem', fontWeight: 500 }, // Used in AppBar
    // body1, body2, button, caption, overline can also be customized
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // Default card style: subtle shadow, or could be variant: 'outlined'
          // For a flatter M3 look, reduce elevation or use outlined cards
          // elevation: 1, // Example of a very subtle shadow
          // To make outlined cards the default, you would typically apply this where Cards are used
          // or by setting defaultProps variant: 'outlined'.
          // Let's ensure cards use the new background.paper color
          // backgroundColor: '#ffffff', // Already handled by palette.background.paper for <Card>
        },
      },
      defaultProps: {
        elevation: 2, // A slightly less pronounced shadow than default MUI cards (often 1 for flat, 4-8 for raised)
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '100px', // M3 often uses pill-shaped buttons for some types
        },
        // Different variants can have different borderRadii
        contained: {
          // borderRadius: 12, // If contained buttons should use theme.shape.borderRadius
        },
        outlined: {
          // borderRadius: 12, 
        }
      },
      defaultProps: {
        // Common M3 button variants are 'filled', 'tonal', 'outlined', 'text'
        // MUI maps these to 'contained', (no direct tonal), 'outlined', 'text'
        // variant: 'contained', // If we want to change the default button variant
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({ // Access theme for palette colors
          backgroundColor: currentTheme.palette.background.paper, 
          color: currentTheme.palette.text.primary, // Ensure text color contrasts with paper background
        }),
      },
      defaultProps: {
        elevation: 0, // Flat AppBar consistent with M3 surface behavior
        // color prop is now less relevant as we set backgroundColor directly
      }
    }
    // We can add more component customizations here (TextFields, etc.)
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
