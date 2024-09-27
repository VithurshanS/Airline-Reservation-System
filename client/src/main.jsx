import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Signup from './signup.jsx'
import Login from './login.jsx'
//import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Signup/>
    <Login/>
  </StrictMode>,
)
