'use strict'

const connectDb = require('../../db')
const { ObjectID } = require('mongodb')
const bcrypt = require('bcrypt')
const adminMutation = {
    crearAdmin: async (root, { input }) => {
        const defaults = {
            fechaactualizacion: '',
            estado: 'A',
            activo: true,
            fechacreacion: new Date().toISOString()
        }
        input.clave = await bcrypt.hash(input.clave, 10);
        const newAdmin = Object.assign(defaults, input)
        let db
        let admin
        try {
            db = await connectDb()
            admin = await db.collection('admin').insertOne(newAdmin)
            newAdmin._id = admin.insertedId
        } catch (error) {
            console.error(error)
        }

        return newAdmin;
    },
    eliminarAdmin: async (root, { _id }) => {

        let db
        let result;
        try {
            db = await connectDb()
            await db.collection('admin').updateOne(
                { _id: ObjectID(_id) },
                { $set: { activo: false } });
            result = {
                code: "success",
                message: "Admin eliminado correctamnete"
            }
        } catch (error) {
            console.error(error)
            result = {
                code: "error",
                message: error.message
            }
        }

        return result;
    },
    validaradmin: async (root, { usuario, clave }) => {
        let db;
        let admin = null;
        try {
            db = await connectDb()
            admin = await db.collection('admin').findOne({ cuenta: usuario });
            if (admin != null) {
                let validarcontrasena = await bcrypt.compare(clave, admin.clave);

                if (!validarcontrasena) {
                    return null;
                }
            }
        } catch (error) {
            console.log(error)
        }

        // let result = {
        //     code: "success",
        //     message: "Admin eliminado correctamnete"
        // }

        return admin;
    }

}

module.exports = adminMutation