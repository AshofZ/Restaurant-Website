const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    fileName: {
        type: 'String',
        require: true
    },
    productName: {
        type: 'String',
        require: true,
        trim: true,
        maxLength: 60
    },
    productDesc: {
        type: 'String',
        require: true,
    },
    productPrice: {
        type: 'Number',
        require: true,
    },
    productCategory: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    productQty: {
        type: Number,
        required: true
    }
}, { timestams: true });

ProductSchema.index({ productName: 'text' })
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;