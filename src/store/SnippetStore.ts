import { atom } from 'jotai'
const snippets = atom<Snippet | null>(null)
export const selectedSnippetAtom = atom(
  (get) => {
    return get(snippets)
  },
  (_get, set, update: Snippet | null) => {
    set(snippetModeAtom, 'preview')
    set(snippets, update)
  }
)
export const snippetModeAtom = atom<'preview' | 'edit'>('preview')
