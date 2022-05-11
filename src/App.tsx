import Layout from '@/components/Layout/Layout'
import Index from '@/pages/Home/Index'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { lazy, Suspense, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import { ThreeBody } from '@uiball/loaders'
import './App.css'
const Editor = lazy(() => import('@/components/Editor/Editor'))
import { ColorSchemeContext } from './context/ThemeContext'
const App = () => {
  const colorScheme = useColorScheme()
  const [, updateColorScheme] = useState(() => {
    return colorScheme
  })
  const params = useParams()
  console.log(params)
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
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<Navigate to='folder/1' />} />
                  <Route path=':type/:id' element={<Index />}>
                    <Route index element={<div>home </div>} />
                    <Route path=':id' element={<div>:id</div>} />
                    <Route
                      path='editor'
                      element={
                        <Suspense
                          fallback={
                            <div className='wrap'>
                              <ThreeBody size={35} speed={1.1} color='black' />
                            </div>
                          }
                        >
                          <Editor />
                        </Suspense>
                      }
                    />
                  </Route>
                  <Route path='settings' element={<div>settings</div>} />
                </Route>
                <Route path='*' element={<div>Not found</div>} />
              </Routes>
            </BrowserRouter>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeContext.Provider>
    </>
  )
}

export default App
