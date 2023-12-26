import React from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider} from 'antd'
import {AuthProvider} from './hooks/useAuth.js';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './main.css'
import { AccountsProvider } from './hooks/useAccounts.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={ANTD_THEME}>
        <AuthProvider>
          <AccountsProvider>
            <App />
          </AccountsProvider>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
