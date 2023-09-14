import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Configura tu tema aquí, incluyendo las propiedades de color como 'hover'.
});


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={theme}>

    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
