import React from 'react'
import App from './App'
import themeOverride from './themes/overrideTheme'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { MantineProvider } from '@mantine/core'

import './style.css'
import "@/styles/modal.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications'



const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <MantineProvider theme={themeOverride}>
      <BrowserRouter>
        <App />
        <Notifications/>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)
