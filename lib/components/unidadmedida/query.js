const connectDb = require('../../db')
const { ObjectID } = require('mongodb')
const bcrypt = require('bcrypt');
const unidadMedidaQuery = {
    unidadesmedida: async () => {
        let db, unidadList = []
        try {
            db = await connectDb()
            unidadList = await db.collection('unidadmedida').find().toArray()

        } catch (error) {
            console.log(error);
        }
        return unidadList
    },
    unidadmedida: async (root, { id }) => {

        let db;
        let unidad;
        try {
            db = await connectDb()
            unidad = await db.collection('unidadmedida').findOne({ _id: ObjectID(id) })
            // unidad = await db.collection('unidadmedida').findOne({ _id: ObjectID(id) });

        } catch (error) {
            console.log(error);
        }
        return unidad
    },
    obtenerUnidadesFiltradas: async () => {
        let db;
        let unidades = [];
        let unidadesTotal = [];
        let total = 0;
        try {
            db = await connectDb()
            unidades = await db.collection('unidadmedida')
                .find({
                    $and: [
                        { $or: [{ 'nombre': { $regex: '' } }] },
                        { $or: [{ 'estado': { $regex: ''} }] },
                        { activo: true }
                    ]

                })
                .skip(0)
                .limit(10)
                .toArray();

            unidadesTotal = await db.collection('unidadmedida')
                .find({
                    $and: [
                        { $or: [{ 'nombre': { $regex: '' } }] },
                        { $or: [{ 'estado': { $regex: '' } }] },
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

module.exports = unidadMedidaQuery;
