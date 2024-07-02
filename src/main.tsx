import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider, StyledEngineProvider } from '@mui/joy/styles'

import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/joy/CssBaseline'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
