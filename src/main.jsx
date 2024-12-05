import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxStore from './store/reduxStore.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter> 
    <Provider store={reduxStore}>
      <App />
    </Provider>
   </BrowserRouter>
  </StrictMode>,
)
