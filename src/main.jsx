import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './ecommerce/pages/Router'

createRoot(document.getElementById('root')).render(
  <Router />
)
