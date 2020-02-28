'use strict'

const connectDb = require('./db');
const adminMutation = require('./components/admin/mutation');
const unidadMutation = require('./components/unidadmedida/mutation');
module.exports = {
    ...adminMutation,
    ...unidadMutation
}