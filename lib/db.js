'use_strict'

const {
    MongoClient
} = require('mongodb')

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_NAME
} = process.env

//const uri = `mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0-iikkq.mongodb.net/test?retryWrites=true&w=majority`
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
let connection

async function connectDB() {
    if (connection) return connection

    let client

    try {
        client = await MongoClient.connect(uri, {
            useUnifiedTopology: true
        })
        connection = client.db(DB_NAME)
    } catch (error) {
        console.error('No se pudo conectar a la db', uri, error)
        process.exit(1);
    }
    return connection
}

module.exports = connectDB