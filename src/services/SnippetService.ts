import db from '@/utils/db'

/**
 *
 * @param id
 * @returns
 */
export async function get(id: number) {
  return db.execute('SELECT * FROM snippets where id = ?', [id])
}

export async function getRelated(id: number) {
  return db.execute('SELECT * FROM snippets where id != ? and deprecated = 0', [
    id,
  ])
}

/**
 *
 * @param snippet
 * @returns
 */
export async function save(snippet: Snippent) {
  const { id, ...data } = snippet
  const keys = Object.keys(data)
  const values = keys.map(
    (key) => (data as unknown as Record<string, unknown>)[key]
  )
  if (id) {
    const args = keys.map((v) => v + '=?').join(',')
    return db.execute(`UPDATE snippets SET ${args} WHERE id = ?`, [
      ...values,
      id,
    ])
  } else {
    return db.execute(
      `INSERT INTO snippets(${keys.join(',')}) values(?)`,
      values
    )
  }
}

export async function remove(id: number) {
  return db.execute('UPDATE snippets SET deprecated = 1 WHERE id = ?', [id])
}

export async function selectAll() {
  return db.execute('SELECT * FROM snippets where deprecated = 0')
}

export async function selectByTag(tag: string) {
  return db.execute(
    'SELECT * FROM snippets where deprecated = 0 and tags like ?',
    [`%${tag}%`]
  )
}

export async function filterByFolder(folder: string | number) {
  return db.execute(
    'SELECT * FROM snippets where deprecated = 0 and folerId = ?',
    [folder]
  )
}
