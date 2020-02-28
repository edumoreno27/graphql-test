'user strict'

require('dotenv').config()

const {
    makeExecutableSchema
} = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const {
    readFileSync
} = require('fs')
const {
    join
} = require('path')
const cors = require("cors");
const resolvers = require('./lib/resolver')

const app = express()
const port = process.env.port || 3000


const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use(cors());
app.use('/api', gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
})