import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App'
import { ThemeProvider, MotionProvider } from '@aplo/ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
