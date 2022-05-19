import * as monaco from 'monaco-editor'
import { forwardRef, useEffect, useRef, useState } from 'react'
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
  Menu,
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
  const colorScheme = useColorScheme()
  const clipboard = useClipboard({ timeout: 500 })
  const [language, updateLanguage] = useState<string>('plaintext')

  const [position, setPosition] = useState<monaco.Position>({
    lineNumber: 1,
    column: 1,
  } as monaco.Position)
  useEffect(() => {
    if (editorRef.current) {
      editor.current = monaco.editor.create(editorRef.current, {
        value: '// Type your code here',
        language: language || 'plaintext',
        theme: colorScheme === 'light' ? 'vs' : 'vs-dark',
        minimap: {
          enabled: true,
          size: 'fit',
        },
        // readOnly: true,
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
      editor.current?.onDidChangeCursorPosition(() => {
        const position = editor.current?.getPosition()
        if (position) {
          setPosition(position)
        }
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

  useEffect(() => {
    if (editor.current) {
      monaco.editor.setModelLanguage(editor.current!.getModel()!, language)
    }
  }, [language])

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
    const data = {} as Snippet
    const name = nameRef.current?.value
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
  const LanguageSelector = forwardRef<HTMLButtonElement>(
    function LanguageSelector(props, ref) {
      return (
        <UnstyledButton
          className='font-mono text-xs flex items-center gap-3px'
          ref={ref}
          {...props}
        >
          {language}
          <Selector size={12} />
        </UnstyledButton>
      )
    }
  )
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
        <Menu
          control={<LanguageSelector />}
          position='top'
          withArrow
          size='sm'
          classNames={{
            body: 'max-h-sm overflow-auto',
          }}
        >
          {languages.map((v) => (
            <Menu.Item
              onClick={() => {
                updateLanguage(v.value)
              }}
              key={v.value}
              className='font-mono'
            >
              {v.label}
            </Menu.Item>
          ))}
        </Menu>
        <Group spacing='sm' className='flex-none ml-auto'>
          <span className='text-xs font-mono'>line: {position.lineNumber}</span>
          <span className='text-xs font-mono'>column: {position.column}</span>
        </Group>
      </div>
    </Stack>
  )
}
