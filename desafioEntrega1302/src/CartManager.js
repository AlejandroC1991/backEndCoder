import e from "express";
import fs from "fs";

export default class CartManager {
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
                return 'ID NO ENCONTRADO';
            }

        } catch (error) {
            console.log(error);
            console.log('error en la ruta');
        }

    }

    getProducts = async () => {
        try {
            let traerProducto = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(traerProducto);

        } catch (error) {
            console.log(error);
            console.log('error en la ruta');
        }

    }

    // addCart = async (producto) => {
    //     try {
    //         let agregarCarrito = await fs.promises.readFile(this.path, "utf-8");

    //         agregarCarrito = JSON.parse(agregarCarrito);
    //         if (agregarCarrito.length === 0){
    //             producto.id = 1;
    //         }else {
    //         producto.id = agregarCarrito[agregarCarrito.length - 1].id + 1;
    //        }

    //         agregarCarrito.push(producto);
    //         let archivoModJSON = JSON.stringify(agregarCarrito, null, "\t");
    //         await fs.promises.writeFile(this.path, archivoModJSON);
    //         return agregarCarrito;

    //     } catch (error) {
    //         console.log(error);
    //         console.log('error en la ruta');
    //     }

    // }

    addProductToCart = async (idProduct, idCart) => {

        //Existe el carrito?
        try {
            let fileCarts = await fs.promises.readFile(this.path, "utf-8");
            var listCarts = JSON.parse(fileCarts);

            var cartIndex = listCarts.findIndex(cart => cart.idCarrito == idCart);

            if (cartIndex == -1){
                //no eixste el carrito
                console.log('error : Cart not exist');
                return null;
            }else {
                //existe el carrito

                //existe el producto?
                var indexProduct = listCarts[cartIndex].products.findIndex(product => product.idProduct == idProduct);

                //no existe el producto
                if( indexProduct === -1){
                    var product = {
                        "idProduct": idProduct,
                        "quantity": 1
                    };
                    listCarts[cartIndex].products.push(product);
                }else{
                    listCarts[cartIndex].products[indexProduct].quantity++;
                }

                let newFileCarts = JSON.stringify(listCarts, null, "\t");
                await fs.promises.writeFile(this.path, newFileCarts);
                return newFileCarts;

            }
        } catch (error) {
            console.log(error);
            console.log('error en la ruta');
        }

    }

    addCartAlt = async (idCart) => {

        var jsonObjectCart = {
            "idCarrito": 1,
            "products":[]
        };
        console.log(jsonObjectCart);

        try {
            let fileCarts = await fs.promises.readFile(this.path, "utf-8");

            var jsonCarts = JSON.parse(fileCarts);

            if (jsonCarts.length > 0){
                jsonObjectCart.idCarrito = jsonCarts[jsonCarts.length - 1].idCarrito + 1;
            }

           jsonCarts.push(jsonObjectCart);
            let archivoModJSON = JSON.stringify(jsonCarts, null, "\t");
            await fs.promises.writeFile(this.path, archivoModJSON);
            return archivoModJSON;
        } catch (error) {
            console.log(error);
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
            console.log(error);
            console.log('error en la ruta');
        }

    }

    updateProduct = async (objetoProducto) => {
        try {
            const arrayDeProductos = await this.getProducts()
            const indice = arrayDeProductos.findIndex(elemento => elemento.id == objetoProducto.id)
            if (indice == -1 ) {
                return 'ID INCORRECTO';
            }
           
            arrayDeProductos[indice] = objetoProducto;


            let archivoModJSON = JSON.stringify(arrayDeProductos, null, "\t");
            await fs.promises.writeFile(this.path, archivoModJSON);
            return arrayDeProductos;

        } catch (error) {
            console.log(error);
            console.log('error en la ruta');
        }

    addProductToCart = async (producto) => {
        try {
            let agregarCarrito = await fs.promises.readFile(this.path, "utf-8");

            agregarCarrito = JSON.parse(agregarCarrito);
            if (agregarCarrito.length === 0){
                producto.id = 1;
            }else {
            producto.id = agregarCarrito[agregarCarrito.length - 1].id + 1;
        }

            agregarCarrito.push(producto);
            let archivoModJSON = JSON.stringify(agregarCarrito, null, "\t");
            await fs.promises.writeFile(this.path, archivoModJSON);
            return agregarCarrito;

        } catch (error) {
            console.log(error);
            console.log('error en la ruta');
        }

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

const manejadorEventos = new CartManager('../files/carritos.json');
// console.log(await manejadorEventos.addProduct(producto));
// console.log(await manejadorEventos.getProducts());
// console.log(await manejadorEventos.updateProduct(2, "descripcion", "fruta color rojo"));
// console.log(await manejadorEventos.getProductById());
// console.log(await manejadorEventos.deleteProduct(4));