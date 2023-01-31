// class ProductManager{
//     #precioBaseGanancia = 0.15;
    
//     constructor() {

//       this.products =[];
//     }

//     getProductById = (id) => {
//         let itemId  = this.products.find(item => item.id ===id);
//         if (itemId) {

//             return itemId;
//         } else {
//             console.log('Not Found');
//         }
        
//     }

//     getProducts = () => {
//         return this.products ;
//     }

//     addProduct = (title, description, price, thumbnail, code, stock) => {
//         const products = {
//             title,
//             description,
//             price : price + price*this.#precioBaseGanancia,
//             thumbnail,
//             code,
//             stock,
//             participantes : []
//         }

//         if (this.products.length === 0) {
//             products.id = 1;
//         } else{
//             products.id = this.products[this.products.length - 1].id + 1;
            
//         }
//         this.products.push(products);
//     }

//     agregarUsuario = (idEvento, idUsuario) => {
//         const eventoIndex = this.products.findIndex(e=>e.id === idEvento);

//         if (eventoIndex === -1) {
//             console.log('evento no encontrado');
//             return;
//         }
        
//         const usuarioRegistrado = this.products[eventoIndex].participantes.includes(idUsuario);

//         if (usuarioRegistrado) {
//         console.log('el usuario ya esta registrado');
//         return;
//     }
//     this.products[eventoIndex].participantes.push(idUsuario);
//     }
// }

// const manejadorEventos = new ProductManager();
// manejadorEventos.addProduct('Evento 1', 'Argentina', 200.50);
// manejadorEventos.addProduct('Evento 2', 'Chile', 50.50);
// manejadorEventos.agregarUsuario(1, 2);
// console.log(manejadorEventos.getProducts());
// manejadorEventos.getProductById(1);
// console.log(manejadorEventos.getProductById(3));
