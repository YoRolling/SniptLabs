type Base = {
  id?: string
  createdAt?: string
  updatedAt?: string
  deprecated?: boolean
}
type Snippent = Base & {
  name: string
  tags?: Tag[]
  language?: string
  code?: string
  description?: string
  color?: string
}

type Tag = Base & {
  name: string
}
type Folder = Base & {
  name: string
}