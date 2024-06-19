import mongoose from 'mongoose';
const MONGODBURI = process.env.MONGODB_URI;

export const ConnectToDatabase = async () => {
    if (!MONGODBURI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local',
        )
    }
    try {
        await mongoose.connect(MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res) => {
            console.log("MongoDB Atlas Conectado!")
            return res
        })
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw error;
    }
};

// import mongoose from 'mongoose';
// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//     if (cached.conn) {
//         return cached.conn;
//     }
//     if (!cached.promise) {
//         const opts = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         };

//         cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//             console.log("MongoDB Atlas Conectado!");
//             return mongoose;
//         });
//     }
//     try {
//         cached.conn = await cached.promise;
//     } catch (error) {
//         cached.promise = null;
//         console.error('Erro ao conectar ao MongoDB:', error);
//         throw error;
//     }

//     return cached.conn;
// }
