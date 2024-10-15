// lib/mongodb.js
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cachedClient: MongoClient | null = null

export const clientPromise = async (): Promise<MongoClient> => {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(MONGODB_URI)

  await client.connect()
  cachedClient = client // Armazena o cliente para reutilização futura
  return cachedClient
}
