import * as productsService from '../services/products.services.js';


const getAll = async (req, res) => {
    try {

        const products = await productsService.getAll();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

const save = async (req, res) => {
    try {
        const product = req.body;
        await productsService.save(product);
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProductByCode = async (req, res) => {
    try {
        const code = Number(req.params.code);
        const productsByCode = await productsService.getProductByCode(code);
        if (!productsByCode) return res.send({
            message: "NO EXISTE ESE PRODUCTO"
        });
        res.json({
            status: 'success',
            payload: productsByCode
        });
    } catch (error) {
        res.status(500).send({
            message: ("hay un error")
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productCode = Number(req.params.code);
        const productoBorrado = await productsService.deleteProduct(productCode);
        res.json({
            status: 'success',
            payload: productoBorrado
        });
    } catch (error) {
        res.status(404).send({
            status: 'error',
            message: 'Producto no encontrado'
        });
    }


}


const updateByCode = async (req, res) => {

    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
    });

    try {
        const result = await productsService.updateByCode(req.params.code, {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,

        });

        res.send({
            result: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            error
        });
    }
}

export {
    save,
    getAll,
    getProductByCode,
    deleteProduct,
    updateByCode
}