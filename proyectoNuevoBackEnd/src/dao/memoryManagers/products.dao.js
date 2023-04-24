export default class ProductsDao {
    constructor() {
        this.data = [];
    }

    
    getAll = async () => {
        return this.data;
    }

    save = async (product) => {
        this.data.push(product);
        return product;
    }

    getProductByCode = async (codigoPasado) => {
        return this.data(codigoPasado);

    }

    deleteProduct = async (codeABorrar) => {
        return this.data(codeABorrar);
    }

    updateByCode = async (codigoPasado, product) => {
        return this.data(codigoPasado,product);
    }

}
