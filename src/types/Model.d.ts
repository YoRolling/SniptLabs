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
  content?: string
  description?: string
  color?: string
  folerId?: number
  tsId?: number
}

type Tag = Base & {
  name: string
}
type Folder = Base & {
  name: string
}
