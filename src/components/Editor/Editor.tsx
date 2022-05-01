import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import { Button, Group, Select, Stack, TextInput } from '@mantine/core'
import { useColorScheme, useWindowEvent } from '@mantine/hooks'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TsWorker()
    if (label === 'json') return new JsonWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'html') return new HtmlWorker()
    return new EditorWorker()
  },
}
const languages = monaco.languages
  .getLanguages()
  .map((v) => ({ label: v.id, value: v.id }))
export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const colorScheme = useColorScheme()
  useEffect(() => {
    if (editorRef.current) {
      editor.current = monaco.editor.create(editorRef.current, {
        value: 'function x() {\n\tconsole.log("Hello world!")\n}',
        language: 'typescript',
        theme: colorScheme === 'light' ? 'vs' : 'vs-dark',
        minimap: {
          enabled: true,
        },
      })
    }

    return () => {
      if (editor.current) {
        const model = editor.current.getModel()
        try {
          model?.dispose()
        } catch (error) {
          // pass by
        }
        editor.current.dispose()
      }
    }
  }, [editorRef])
  const resize = () => {
    console.log('resize')
    if (editor.current) {
      console.log(editor.current.getDomNode())
      editor.current.layout()
    }
  }
  useWindowEvent('resize', resize)
  return (
    <Stack className='h-full p-4 overflow-hidden'>
      <TextInput name='title' label='名称' required className='flex-none' />
      <Group position='apart' className='flex-none'>
        <Select
          size='sm'
          label='类型'
          name='language'
          onChange={(e) => {
            console.log(e)
            const model = editor.current?.getModel() || null
            monaco.editor.setModelLanguage(model!, e!)
          }}
          data={languages}
        ></Select>
      </Group>
      <Group className='flex-none' style={{ order: 2 }}>
        <Button>Save</Button>
      </Group>
      <div
        id='editor'
        className='overflow-hidden flex-1 w-full mt-2'
        ref={editorRef}
      ></div>
    </Stack>
  )
}
