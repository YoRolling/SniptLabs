import db from '@/utils/db'

/**
 *
 * @returns {Promise<void>}
 */
export async function selectAllFolders(): Promise<Folder[]> {
  return db.select('SELECT * FROM folder where deprecated = 0').then((res) => {
    return res as Folder[]
  })
}

/**
 *
 * @param { String } name  文件夹名称
 * @returns
 */
export async function createFolder(name: string): Promise<number> {
  return db
    .execute('INSERT INTO folder(name) values(?)', [name])
    .then((res) => {
      return res.lastInsertId
    })
}
/**
 * @author YoRolling
 * @param id  文件夹id
 * @returns
 */
export async function delById(id: number | string) {
  return db
    .execute('UPDATE folder SET deprecated = 1 WHERE id = ?', [id])
    .then(({ rowsAffected }) => {
      return rowsAffected > 0
    })
}

export async function patchById(id: number | string, name: string) {
  return db
    .execute('UPDATE folder SET name = ? WHERE id = ?', [name, id])
    .then(({ rowsAffected }) => {
      return rowsAffected > 0
    })
}
