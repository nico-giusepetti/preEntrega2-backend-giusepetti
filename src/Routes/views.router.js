import { Router } from "express"
import { ProductManager } from "../Managers/ProductManager.js"

const router = Router()
const productManager = new ProductManager('./src/data/productos.json')

// Ruta para mostarar el listado actual de productos
router.get("/products", async (req, res) =>{
    const productos = await productManager.getProducts();
    res.render("home", {productos});
})

// Ruta que muestra los productos en tiempo real
router.get("/realTimeProducts", (req, res) =>{
    res.render("realTimeProducts");
})


export default router; 