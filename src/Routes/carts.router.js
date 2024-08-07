import { Router } from "express";
import { CartManager } from "../Managers/CartManager.js"; 

const cartManager = new CartManager("./src/data/carts.json"); 

const router = Router();


//RUTAS:

//Metodo POST, para crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.createNewCart(); 
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Ocurrio un error.");
    }
})


//Metodo GET, para obtener carrito por ID 

router.get("/:cid", async (req, res) => {
    let cartId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCartById(cartId); 
        res.json(carrito.products); 
    } catch (error) {
        res.status(500).send("Ocurrio un error al obtener los productos del carrito."); 
    }
})


//Metodo POST, para agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    let carritoId = parseInt(req.params.cid); 
    let productoId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const actualizado = await cartManager.addProductToCart(carritoId, productoId, quantity); 
        res.json(actualizado.products); 
    } catch (error) {
        res.status(500).send("Ocurrio un error al agregar un producto.");
    }
})



export default router; 