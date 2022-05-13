import { atom } from 'jotai'
const navFilterAtom = atom<NavFilter>({ type: 'inbox' })
const navFilterReducer = (state: NavFilter, action: NavFilter) => {
  if (action.type === 'folder') {
    return Object.assign({}, state, action)
  } else {
    return Object.assign({}, state, { type: action.type, params: undefined })
  }
}
export { navFilterAtom, navFilterReducer }
