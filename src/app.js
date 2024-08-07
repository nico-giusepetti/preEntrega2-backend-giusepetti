import express from "express"
import productRouter from "./Routes/products.router.js"; 
import cartRouter from "./Routes/carts.router.js";
import viewRouter from "./Routes/views.router.js"
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./Managers/ProductManager.js"

const productManager = new ProductManager('./src/data/productos.json')


const app = express()
const PUERTO = 8080

// Configuracion de express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middleware
app.use(express.json()) //Para enviar informacion en formato JSON
app.use(express.static("./src/public"))


//Listen
const httpServer = app.listen(PUERTO, (req, res)=>{
    console.log("Escuchando en el puerto 8080")
})

// Websocket
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("conectadooo");
    // Enviamos los productos a realTimeProducts
    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        
        io.sockets.emit("productos", await productManager.getProducts())
    });

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        io.sockets.emit("productos", await productManager.getProducts())
    });

})



//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);







