import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const productCollections = 'products';

export const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    code: {
        type: Number,
        require: true,
        unique: true,
    },
    price: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    id: {
        type: Number,
        require: true,
    },
    carts: {
        type: [{
            cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts",
            }
        }],
        default: [],
    },
});


productsSchema.plugin(mongoosePaginate);
productsSchema.pre('find', function () {
    this.populate('carts.cart');
});

export const productModel = mongoose.model(productCollections, productsSchema);