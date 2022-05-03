import db from '@/utils/db'

export async function selectAll(): Promise<Tag[]> {
  return await db.select('SELECT * FROM snippets where deprecated = 0')
}
