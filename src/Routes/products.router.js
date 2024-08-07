import { Router } from "express"
import { ProductManager } from "../Managers/ProductManager.js"

const productManager = new ProductManager('./src/data/productos.json')

const router = Router()


//RUTAS:

//Metodo GET
router.get("/", async (req, res)=>{
    const limit = req.query.limit;
    try {
        const arrayProductos = await productManager.getProducts();
        if (limit){
            res.send(arrayProductos.slice(0, limit));
        }else{
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Ocurrio un error.")
    }
})

//Metodo GET por id: 
router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 

    try{
        const productoBuscado = await productManager.getProductById(parseInt(id)) 

        if(productoBuscado) {
            res.send(productoBuscado); 
        } else {
            res.send("No se encuentra el producto solicitado."); 
        }
    }catch(error){
        res.send("ocurrio un error al obtener un producto por id.")
    }

})


//Metodo POST
router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).send("Producto agregado correctamente.")
    } catch (error) {
        res.status(500).send("Ocurrio un error.")
    } 
})


// Método PUT 
router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const nuevosDatos = req.body;

     // Validar que el ID no sea modificado
    if (nuevosDatos.id) {
        return res.status(400).send("No se puede modificar el ID del producto.");
    }

    try {
        await productManager.updateProduct(id, nuevosDatos);
        res.send("Producto actualizado exitosamente.");
    } catch (error) {
        res.status(500).send("Ocurrió un error al actualizar el producto.");
    }
});


// Método DELETE 
router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        await productManager.deleteProduct(id);
        res.send("Producto eliminado con éxito.");
    } catch (error) {
        res.status(500).send("Ocurrió un error al eliminar el producto.");
    }
});

export default router; 