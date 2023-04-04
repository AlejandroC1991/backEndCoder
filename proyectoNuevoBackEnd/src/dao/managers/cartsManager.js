import { cartModel } from '../models/carts.js';

export default class Carts {
    constructor() {
        console.log('Carts con DB en Mongo');
    }

    
    getAll = async () => {
        const carts = await cartModel.find();
        console.log(carts);
        return carts.map(cart => cart.toObject());
    }

    save = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartModel.updateOne({_id: id}, cart);
        return result;
    }

    getCartByID = async (IDPasado) => {
        const cartByID = await cartModel.findOne({idCarrito:IDPasado });

        return cartByID;

    }


    deleteProduct = async (IDABorrar) => {
        try {
            const traerCarrito = await cartModel.deleteOne({idCarrito:IDABorrar });
            return traerCarrito;
        
        } catch (error) {
            console.log(error);
            console.log('error en la ruta');
        }

    }




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
    }
}