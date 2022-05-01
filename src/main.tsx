import React from 'react'
import ReactDOM from 'react-dom'
import 'virtual:windi.css'
import App from './App'
import './index.css'
import '@/utils/db'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
