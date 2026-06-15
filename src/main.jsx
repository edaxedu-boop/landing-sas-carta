import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

// Lazy-loaded components to separate CSS bundling
const App = lazy(() => import('./App.jsx'))
const AppRed = lazy(() => import('./AppRed.jsx'))
const AppPurple = lazy(() => import('./AppPurple.jsx'))

// Check if URL has color theme parameters
const isRed = window.location.search.includes('red') || window.location.search.includes('color=red');
const isPurple = window.location.search.includes('purple') || window.location.search.includes('color=purple');

let fallbackBg = '#04190b'; // Green default
if (isRed) fallbackBg = '#110202'; // Red
if (isPurple) fallbackBg = '#09020f'; // Purple

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={
      <div style={{ 
        background: fallbackBg, 
        minHeight: '100vh', 
        color: '#fff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontFamily: 'sans-serif' 
      }}>
        Cargando...
      </div>
    }>
      {isPurple ? <AppPurple /> : isRed ? <AppRed /> : <App />}
    </Suspense>
  </StrictMode>,
)
