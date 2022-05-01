import db from '@/utils/db';

export async function selectAll() {
    return db.execute('SELECT * FROM snippets where deprecated = 0')
}