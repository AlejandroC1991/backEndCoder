import fs from "fs";

class ProductManager {
    constructor(archivo) {

        this.path = archivo;
        
    }
 

     getProductById = async (id) => {
         let carrito = await fs.promises.readFile(this.path, "utf-8");
         carrito = JSON.parse(carrito);
        let itemId =  carrito.find(item => item.id === id);
        if (itemId) {

            return itemId;
        } else {
            console.log('Not Found');
        }

    }

    getProducts = async() => {
        let traerProducto = await fs.promises.readFile(this.path, "utf-8");
        traerProducto = JSON.parse(traerProducto);
        return traerProducto;
    }

    addProduct = async (producto) => {
        
        let modificarArchivo = await fs.promises.readFile(this.path, "utf-8");
        modificarArchivo = JSON.parse(modificarArchivo);
        if (modificarArchivo.length === 0) {
            producto.id = 1;
        } else {
            producto.id = modificarArchivo[modificarArchivo.length - 1].id + 1;

        }
        modificarArchivo.push(producto);
        modificarArchivo = JSON.stringify(modificarArchivo, null, "\t");
        console.log(modificarArchivo);
        await fs.promises.writeFile(this.path, modificarArchivo);
    }

    deleteProduct = async (idABorrar) => {
        let traerProducto = await fs.promises.readFile(this.path, "utf-8");
        traerProducto = JSON.parse(traerProducto);


        let indiceABorrar = traerProducto.findIndex(e=>e.id === idABorrar);
        traerProducto.splice(indiceABorrar,1)
        console.log(traerProducto);

        traerProducto = JSON.stringify(traerProducto, null, "\t");
        
        await fs.promises.writeFile(this.path, traerProducto);
    }

    updateProduct = async(id, prop, nuevoValor) => {
        const producto = await getProducts()
        const productoValor = producto.find(elemento => elemento.id === id)
        productoValor[prop] = nuevoValor
        return producto
        }

}
let producto = {
    "id": 2,
    "title": "Manzana",
    "description": "Fruta ",
    "price": 50,
    "thumbnail": "BackEnd",
    "code": "#2",
    "stock": 10
}

const manejadorEventos = new ProductManager('./files/UsuariosEntrega.json');
// manejadorEventos.addProduct();
await manejadorEventos.addProduct(producto);
console.log(await manejadorEventos.getProducts());
manejadorEventos.getProductById(1);
// console.log(await manejadorEventos.getProductById());
// console.log(await manejadorEventos.deleteProduct());