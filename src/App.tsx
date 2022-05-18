import Layout from '@/components/Layout/Layout'
import Index from '@/pages/Home/Index'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { lazy, Suspense, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import { ThreeBody } from '@uiball/loaders'
import './App.css'
const Editor = lazy(() => import('@/components/Editor/Editor'))
import { ColorSchemeContext } from './context/ThemeContext'
import { NotificationsProvider } from '@mantine/notifications'
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
                    <Route path='dash' element={<Index />}>
                      <Route path=':id' element={<Outlet />}>
                        <Route
                          index
                          element={
                            <Suspense
                              fallback={
                                <div className='wrap'>
                                  <ThreeBody
                                    size={35}
                                    speed={1.1}
                                    color='black'
                                  />
                                </div>
                              }
                            >
                              <Editor />
                            </Suspense>
                          }
                        />
                      </Route>
                    </Route>
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
