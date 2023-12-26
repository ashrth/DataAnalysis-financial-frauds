import React from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider} from 'antd'
import {AuthProvider} from './hooks/useAuth.js';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </React.StrictMode>,
)
