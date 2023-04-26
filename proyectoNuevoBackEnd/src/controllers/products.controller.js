import {
    save as saveProductService,
    getAll as getAllProductService,
    getProductByCode as getProductByCodeProductService,
    deleteProduct as deleteProductProductService,
    updateByCode as updateByCodeProductService,
} from '../services/products.services.js'

const getAll = async (req, res) => {
    try {
        const products = await getAllProductService();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

const save = async (req, res) => {
    try {
        const product = req.body;
        await saveProductService(product);
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProductByCode = async (req, res) => {
    try {
        const code = Number(req.params.code);
        
        const productsByCode = await getProductByCodeProductService(code);
        console.log(productsByCode)
        if (!productsByCode) return res.send({
            message: "NO EXISTE ESE PRODUCTO"
        });
console.log("asdasdasdasdasdasd")
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


        const productoBorrado = await deleteProductProductService(productCode);


        res.send({
            status: 'success',
            message: 'Producto eliminado correctamente',
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
        const result = await updateByCodeProductService({
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