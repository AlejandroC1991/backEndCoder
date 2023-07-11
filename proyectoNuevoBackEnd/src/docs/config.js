import swaggerJSDoc from 'swagger-jsdoc';
import __mainDirname from '../../utils/index.js';

const swaggerOptiones = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de mi ecommerce',
            description: 'API pensada para realizar una compra de un producto en un ecommerce'
        }
    },
    apis: [`${__mainDirname}/src/docs/**/*.yaml`]
}

export const spects = swaggerJSDoc(swaggerOptiones)