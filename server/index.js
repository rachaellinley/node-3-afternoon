require('dotenv').config()
const express = require('express');
const massive = require('massive');
const app = express();
const products_controller= require("./controllers/products_controller");
const { SERVER_PORT, CONNECTION_STRING } = process.env;


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    console.log("db is connected")
    
})
.catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/products',  products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT} `)
});