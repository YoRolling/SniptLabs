type NavFilterType = 'inbox' | 'pinned' | 'folder'

type NavFilter = {
  type: NavFilterType
  params?: { id: string; [key: string]: unknown }
}
