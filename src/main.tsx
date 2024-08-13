import {App} from './App'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Router} from './Router'
import 'virtual:uno.css'

createRoot(document.querySelector('#app') ?? document.body).render(
  <StrictMode>
    <App>
      <Router />
    </App>
  </StrictMode>,
)
