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
    return db.execute('SELECT * FROM snippets where id != ? and deprecated = 0', [id])
}

/**
 * 
 * @param snippet 
 * @returns 
 */
export async function save(snippet: Snippent) {
    const { id, ...data } = snippet
    if (id) {
        return db.execute('UPDATE snippets SET ? WHERE id = ?', [data, id])
    } else {
        return db.execute('INSERT INTO snippets SET ?', [data])
    }
}

export async function remove(id: number) {
    return db.execute('UPDATE snippets SET deprecated = 1 WHERE id = ?', [id])
}

export async function selectAll() {
    return db.execute('SELECT * FROM snippets where deprecated = 0')
}

export async function selectByTag(tag: string) {
    return db.execute('SELECT * FROM snippets where deprecated = 0 and tags like ?', [`%${tag}%`])
}

export async function filterByFolder(folder:string | number) {
    return db.execute('SELECT * FROM snippets where deprecated = 0 and folerId = ?', [folder])
}