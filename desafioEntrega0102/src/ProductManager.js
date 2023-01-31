import fs from "fs";

export default class ProductManager {
    constructor(archivo) {

        this.path = archivo;

    }


    getProductById = async (id) => {
        try {
            let carrito = await fs.promises.readFile(this.path, "utf-8");
            carrito = JSON.parse(carrito);
            let itemId = carrito.find(item => item.id === id);
            if (itemId) {
                return itemId;
            } else {
                return 'Not Found';
            }

        } catch (error) {
            console.log('error en la ruta')

        }

    }

    getProducts = async () => {
        try {
            let traerProducto = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(traerProducto);

        } catch (error) {
            console.log('error en la ruta');
        }

    }

    addProduct = async (producto) => {
        try {
            let modificarArchivo = await fs.promises.readFile(this.path, "utf-8");

            modificarArchivo = JSON.parse(modificarArchivo);

            if (modificarArchivo.length === 0) {
                producto.id = 1;
            } else {
                producto.id = modificarArchivo[modificarArchivo.length - 1].id + 1;

            }
            modificarArchivo.push(producto);
            let archivoModJSON = JSON.stringify(modificarArchivo, null, "\t");
            await fs.promises.writeFile(this.path, archivoModJSON);
            return modificarArchivo;

        } catch (error) {
            console.log('error en la ruta');
        }

    }

    deleteProduct = async (idABorrar) => {
        try {
            let traerProducto = await fs.promises.readFile(this.path, "utf-8");
            traerProducto = JSON.parse(traerProducto);


            let indiceABorrar = traerProducto.findIndex(e => e.id === idABorrar);
            if (indiceABorrar == -1) {
                return 'ID INCORRECTO';
            }
            let productoEliminado = traerProducto.splice(indiceABorrar, 1)
            traerProducto = JSON.stringify(traerProducto, null, "\t");

            await fs.promises.writeFile(this.path, traerProducto);
            return productoEliminado;

        } catch (error) {
            console.log('error en la ruta');
        }

    }

    updateProduct = async (id, prop, nuevoValor) => {
        try {
            const arrayDeProductos = await this.getProducts()
            const productoValor = arrayDeProductos.find(elemento => elemento.id === id)
            // console.log(productoValor);
            if (productoValor == undefined) {
                return 'ID INCORRECTO';
            }
            if (productoValor[prop] === undefined) {
                return "Propiedad Incorrecta";
            }
            productoValor[prop] = nuevoValor


            let archivoModJSON = JSON.stringify(arrayDeProductos, null, "\t");
            await fs.promises.writeFile(this.path, archivoModJSON);
            return arrayDeProductos;

        } catch (error) {
            console.log('error en la ruta');
        }

    }

}
// let producto = {
//     "id": 2,
//     "title": "Manzana",
//     "description": "Fruta ",
//     "price": 50,
//     "thumbnail": "BackEnd",
//     "code": "#2",
//     "stock": 10
// }

const manejadorEventos = new ProductManager('./files/Usuarios.json');
// console.log(await manejadorEventos.addProduct(producto));
// console.log(await manejadorEventos.getProducts());
// console.log(await manejadorEventos.updateProduct(2, "descripcion", "fruta color rojo"));
// console.log(await manejadorEventos.getProductById());
// console.log(await manejadorEventos.deleteProduct(4));