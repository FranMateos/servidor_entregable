const express = require('express');
const app = express();
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

const port = 3333;

const client = require('./routes/client');
const product = require('./routes/product');

app.use('/client',client);
app.use('/product',product);

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});