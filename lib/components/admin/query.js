const connectDb = require('../../db')
const { ObjectID } = require('mongodb')
const bcrypt = require('bcrypt');
const adminQuery = {
    admins: async () => {
        let db, adminsList = []
        try {
            db = await connectDb()
            adminsList = await db.collection('admin').find().toArray()

        } catch (error) {
            console.log(error);
        }
        return adminsList
    }
}

module.exports = adminQuery;

