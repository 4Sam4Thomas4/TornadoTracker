import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Warnings from './pages/Warnings'
import Safety from './pages/Safety'
import News from './pages/News'
import Videos from './pages/Videos'
import Facts from './pages/Facts'

// Create a custom theme with tornado-inspired colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for storms
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f57c00', // Orange for warnings
      light: '#ffb74d',
      dark: '#ef6c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/warnings" element={<Warnings />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/news" element={<News />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/facts" element={<Facts />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App 