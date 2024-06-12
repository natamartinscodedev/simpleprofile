// // config/mongodb.ts
// import mongoose from 'mongoose'
// import { MongoClient } from 'mongodb'

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//     throw new Error('Por favor, defina a variável MONGODB_URI no seu arquivo .env.local')
// }

// let cachedClient = null
// let cachedDb = null

// export const connectToDatabase = async () => {
//     if (cachedDb) {
//         return { client: cachedClient, db: cachedDb }
//     }

//     try {
//         const client = await MongoClient.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })

//         const db = client.db('create-links')
//         cachedClient = client
//         cachedDb = db

//         await mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })

//         console.log("MongoDB Atlas conectado!")

//         return { client, db }
//     } catch (error) {
//         console.error('Erro ao conectar ao MongoDB:', error)
//         throw error
//     }
// }
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    throw new Error('Por favor, defina a variável MONGODB_URI no seu arquivo .env.local')
}

let cachedClient = null
let cachedDb = null

export const connectToDatabase = async () => {
    if (cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    try {
        const client = await MongoClient.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = client.db('create-links')
        cachedClient = client
        cachedDb = db

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("MongoDB Atlas conectado!")
        return { client, db }
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error)
        throw error
    }
}
