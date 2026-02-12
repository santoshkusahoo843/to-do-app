import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import TodoIndex from './components/to-do-components/todoIndex.jsx'
import { CookiesProvider } from 'react-cookie';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
        <TodoIndex />
    </CookiesProvider>
  </StrictMode>
)
