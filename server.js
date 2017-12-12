const express = require('express');
const GraphHTTP = require('express-graphql');
const Schema = require('./schema');

const app = express();

const PORT = 3000;


app.use('/graphql' , GraphHTTP({
    schema : Schema,
    pretty: true,
    graphiql: true
}));

app.listen(PORT, ()=>console.log("RUNNING !!!!"));