import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import {__dirname} from './path.js'
/*import multer from 'multer'
import {engine} from 'express-handlebars'
import * as path from 'path'
import routerSocket from "./routes/socket.js"*/
import { Server } from "socket.io";
import viewsRouter from './routes/views.routes.js';

const app = express()
const PORT = 4000;
const Servidor = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = new Server(Servidor)
const Manager = new ProductManager()
   
//midd
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${dirName}/public`))
app.use('/', viewsRouter)

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)


app.set('view engine', 'hbs')
app.set('views', `${dirName}/views`)
app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
});
io.on('connection', (socket) => {
    console.log('Nueva conexión establecida.');

    io.sockets.emit('products', Manager.GetProducts())

    socket.on('AddProduct', (obj) => {
        Manager.AddProduct(obj)
        io.sockets.emit('products', Manager.GetProducts())
    })

    socket.on('DeleteProduct', (obj) => {
        Manager.DeleteProduct(obj.pid)
        io.sockets.emit('products', Manager.GetProducts())
    })
})