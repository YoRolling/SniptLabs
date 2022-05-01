import Database from 'tauri-plugin-sql-api'
const db: Database = await getDB()
async function getDB(): Promise<Database> {
  return await Database.load('sqlite:SniptBank.db')
}
export default db
