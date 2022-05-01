import db from '@/utils/db'

/**
 *
 * @returns {Promise<void>}
 */
export async function selectAllFolders(): Promise<Folder[]> {
  return db
    .select('SELECT * FROM folder where deprecated = 0')
    .then((res) => {
      return res as Folder[]
    })
}
