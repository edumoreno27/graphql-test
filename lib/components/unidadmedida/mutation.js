'use strict'

const connectDb = require('../../db')
const { ObjectID } = require('mongodb')
const unidadMutation = {
    crearUnidad: async (root, { input }) => {
        const defaults = {
            fechaactualizacion: '',
            idactualizacion: 0,
            estado: 'A',
            activo: true,
            fechacreacion: new Date().toISOString()
        }
        input.idcreacion = ObjectID(input.idcreacion);
        const newUnidad = Object.assign(defaults, input)
        let db
        let unidad
        try {
            db = await connectDb()
            unidad = await db.collection('unidadmedida').insertOne(newUnidad)
            newUnidad._id = unidad.insertedId
        } catch (error) {
            console.error(error)
        }

        return newUnidad;
    },
    editarUnidad: async (root, { _id, input }) => {

        input.idactualizacion = ObjectID(input.idactualizacion);
        input.fechaactualizacion = new Date().toISOString();
        let db
        let unidad
        try {
            db = await connectDb()
            await db.collection('unidadmedida').updateOne(
                { _id: ObjectID(_id) },
                { $set: input })
            unidad = await db.collection('unidadmedida').findOne({ _id: ObjectID(_id) })
            
        } catch (error) {
            console.error(error)
        }

        return unidad;
    },
    // eliminarAdmin: async (root, { _id }) => {

    //     let db
    //     let result;
    //     try {
    //         db = await connectDb()
    //         await db.collection('admin').updateOne(
    //             { _id: ObjectID(_id) },
    //             { $set: { activo: false } });
    //         result = {
    //             code: "success",
    //             message: "Admin eliminado correctamnete"
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         result = {
    //             code: "error",
    //             message: error.message
    //         }
    //     }

    //     return result;
    // },
    filtrarUnidad: async (root, { input }) => {
        let db;
        let unidades = [];
        let unidadesTotal = [];
        let total = 0;
        try {
            db = await connectDb()
            unidades = await db.collection('unidadmedida')
                .find({
                    $and: [
                        { $or: [{ 'nombre': { $regex: input.nombre } }] },
                        { $or: [{ 'estado': { $regex: input.estado } }] },
                        { activo: true }
                    ]

                })
                .skip(input.pagina > 0 ? ((input.pagina - 1) * input.cantidad) : 0)
                .limit(input.cantidad)
                .toArray();

            unidadesTotal = await db.collection('unidadmedida')
                .find({
                    $and: [
                        { $or: [{ 'nombre': { $regex: input.nombre } }] },
                        { $or: [{ 'estado': { $regex: input.estado } }] },
                        { activo: true }
                    ]

                })
                .toArray();
            total = unidadesTotal.length;


        } catch (error) {
            console.log(error)
        }

        // let result = {
        //     code: "success",
        //     message: "Admin eliminado correctamnete"
        // }

        return {
            list: unidades,
            total: total
        };
    }

}

module.exports = unidadMutation