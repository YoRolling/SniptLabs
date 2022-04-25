import Layout from '@/components/Layout/Layout'
import Index from '@/pages/Home/Index'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Editor from './components/Editor/Editor'
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
    <ColorSchemeContext.Provider value={colorSchemeProvider}>
      <MantineProvider
        withGlobalStyles
        theme={{ colorScheme: colorSchemeProvider.colorScheme as any }}
      >
        <ModalsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='*' element={<Index />}>
                  <Route index element={<div>home </div>} />
                  <Route path=':id' element={<div>:id</div>} />
                  <Route path='editor' element={<Editor />} />
                </Route>
                <Route path='settings' element={<div>settings</div>} />
              </Route>
              <Route path='*' element={<div>Not found</div>} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  )
}

export default App
