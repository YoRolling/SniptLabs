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
import {
  Button,
  Group,
  SimpleGrid,
  Stack,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { useClipboard, useColorScheme, useWindowEvent } from '@mantine/hooks'
import { SnippentService } from '@/services'
import { CodePlus, Copy, Edit, Pin, Selector, Trash } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

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
  const nameRef = useRef<HTMLInputElement>(null)
  const languageRef = useRef<HTMLInputElement>(null)
  const colorScheme = useColorScheme()
  const clipboard = useClipboard({ timeout: 500 })
  const language = useRef<string>('typescript')
  useEffect(() => {
    if (editorRef.current) {
      editor.current = monaco.editor.create(editorRef.current, {
        value: 'function x() {\n\tconsole.log("Hello world!")\n}',
        language: language.current || 'plaintext',
        theme: colorScheme === 'light' ? 'vs' : 'vs-dark',
        minimap: {
          enabled: true,
          size: 'fit',
        },
        readOnly: true,
        showFoldingControls: 'always',
        renderLineHighlight: 'all',
        scrollbar: {
          useShadows: false,
          horizontalScrollbarSize: 0,
          horizontalSliderSize: 0,
          verticalScrollbarSize: 0,
          verticalSliderSize: 0,
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
    if (editor.current) {
      editor.current.layout()
    }
  }
  const copy = () => {
    const model = editor.current?.getModel()
    if (model) {
      clipboard.copy(model.getValue())
      showNotification({
        title: 'Copied',
        message: 'Code copied to clipboard',
        color: 'green',
      })
    }
  }
  const save = () => {
    const data = {} as Snippent
    const name = nameRef.current?.value
    const language = languageRef.current?.value
    const model = editor.current?.getValue()
    if (name && language && model) {
      data.name = name
      data.language = language
      data.content = model
      data.folerId = 1
      SnippentService.save(data).then((res) => {
        console.log('save result ', res)
      })
    }
  }
  useWindowEvent('resize', resize)
  return (
    <Stack className='h-full p-4 overflow-hidden pb-0' spacing='xs'>
      <Group className='divide-x'>
        <TextInput
          name='title'
          required
          placeholder='Title'
          className='flex-1'
          ref={nameRef}
          variant='unstyled'
        />
        <SimpleGrid
          cols={5}
          className='justify-self-end pl-3 text-xs '
          spacing='xs'
        >
          <Button
            title='Edit'
            variant='default'
            size='xs'
            compact
            className='text-xs font-mono'
            leftIcon={<Edit size={14} />}
          >
            Edit
          </Button>
          <Button
            title='Copy'
            onClick={copy}
            variant='default'
            size='xs'
            compact
            className='text-xs font-mono'
            leftIcon={<Copy size={14} />}
          >
            Copy
          </Button>

          <Button
            variant='default'
            size='xs'
            compact
            className='text-xs font-mono'
            title='Pin'
            leftIcon={<Pin size={14} />}
          >
            Pin
          </Button>
          <Button
            variant='default'
            size='xs'
            compact
            className='text-xs font-mono'
            title='Save'
            onClick={save}
            leftIcon={<CodePlus size={14} />}
          >
            Save
          </Button>
          <Button
            // variant=''
            size='xs'
            color='red'
            compact
            className='text-xs font-mono'
            title='Delete'
            leftIcon={<Trash size={14} />}
          >
            Delete
          </Button>
        </SimpleGrid>
      </Group>
      <div className='overflow-hidden flex-1 w-full pt-2'>
        <div className='w-full h-full' id='editor' ref={editorRef} />
      </div>
      <div className='status-bar flex items-center py-2'>
        <UnstyledButton className='font-mono text-xs flex items-center gap-3px'>
          {language.current}
          <Selector size={12} />
        </UnstyledButton>
        <SimpleGrid cols={5} className='flex-none pl-3'></SimpleGrid>
      </div>
    </Stack>
  )
}
