export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }


    save = async (product) => {
        const products = await this.dao.save(product);
        return products;
    }

    getAll = async () => {
        const products = await this.dao.getAll();
        return products;
    }


    getProductByCode = async (codigoPasado) => {
        const productByCode = await this.dao.getProductByCode({
            code: codigoPasado
        });
        return productByCode;

    }

    deleteProduct = async (codeABorrar) => {
        try {
            const traerProducto = await this.dao.deleteProduct({
                code: codeABorrar
            });
            return traerProducto;

        } catch (error) {
            console.log(error + 'error en la ruta');
        }

    }

    updateByCode = async (codigoPasado, product) => {
        try {

            const result = await this.dao.updateByCode(codigoPasado, product);
            console.log(codigoPasado)
            return result;

        } catch (error) {
            console.log(error + 'ERROR : NO SE ACTUALIZO EL PRODUCTO ');
        }
    }
}