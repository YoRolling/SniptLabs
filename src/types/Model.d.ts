type Base = {
  id?: string
  createdAt?: string
  updatedAt?: string
  deprecated?: boolean
}
type Snippent = Base & {
  name: string
  language?: string
  content?: string
  description?: string
  color?: string
  folerId?: number
}

type Folder = Base & {
  name: string
}
