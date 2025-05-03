import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Create a theme for your app (you can customize it as needed)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Primary color
    },
    secondary: {
      main: '#dc004e',  // Secondary color
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
