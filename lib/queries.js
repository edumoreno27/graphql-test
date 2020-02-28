'use strict'

const connectDb = require('./db')
const adminQuery = require('./components/admin/query');
const unidadMedidaQuery = require('./components/unidadmedida/query');
module.exports = {
    ...adminQuery,
    ...unidadMedidaQuery
}