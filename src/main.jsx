import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { store } from './utils/store/store.jsx'
import { Images } from './helpers/images.jsx'

const favicon = document.querySelector('link[rel="icon"]');
if (favicon) {
  favicon.href = Images.logoNci;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
