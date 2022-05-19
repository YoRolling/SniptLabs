import Layout from '@/components/Layout/Layout'
import Index from '@/pages/Home/Index'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { ColorSchemeContext } from './context/ThemeContext'


const App = () => {
  const colorScheme = useColorScheme()
  const [, updateColorScheme] = useState(() => {
    return colorScheme
  })
  const colorSchemeProvider = useMemo(
    () => ({
      colorScheme: colorScheme,
      setColorScheme: () => {
        updateColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
      },
    }),
    [colorScheme]
  )
  return (
    <>
      <ColorSchemeContext.Provider value={colorSchemeProvider}>
        <MantineProvider
          withGlobalStyles
          theme={{
            colorScheme: colorSchemeProvider.colorScheme as never,
            fontFamily: `-apple-system, 'Microsoft YaHei', BlinkMacSystemFont, 'Segoe UI',
          'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif`,
          }}
        >
          <ModalsProvider>
            <NotificationsProvider position='top-right'>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout />}>
                    <Route index element={<Navigate to='dash' />} />
                    <Route path='dash' element={<Index />}></Route>
                    <Route path='settings' element={<div>settings</div>} />
                  </Route>
                  <Route path='*' element={<div>Not found</div>} />
                </Routes>
              </BrowserRouter>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeContext.Provider>
    </>
  )
}

export default App
