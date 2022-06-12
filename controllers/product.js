const Product = require('../models/Product');
const fs = require('fs');

exports.create = async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('req.user:', req.user);

    // res.json({
    //     message: 'Inside product controller',
    // });

    const { filename } = req.file;
    const { productName, productDesc, productPrice, productCategory, productQty } = req.body;

    try{
        let product = new Product();
        product.fileName = filename;
        product.productName = productName;
        product.productDesc = productDesc;
        product.productPrice = productPrice;
        product.productCategory = productCategory;
        product.productQty = productQty;

        await product.save();

        res.json({
            successMessage: `${productName} was created`,
            product,
            
        })
    } catch (err) {
        console.log(err, 'productController.create error');
        res.status(500).json({
            errorMessage: 'Please try again'
        });
    }
};

exports.readAll = async (req, res) => {
    try{
        const products = await Product.find({}).populate('productCategory', 'category name _id');

        res.json({products});
    } catch (err) {
        console.log(err, 'productController.create error');
        res.statu(500).json({
            errorMessage: 'Please try again'
        });
    }
};

exports.readByCount = async (req, res) => {
    try{
        const products = await Product.find({}).populate('productCategory', 'category name _id').limit(6);

        res.json({products});
    } catch (err) {
        console.log(err, 'productController.create error');
        res.statu(500).json({
            errorMessage: 'Please try again'
        });
    }
};

exports.delete = async (req, res) => {
    try{
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        fs.unlink(`uploads/${deletedProduct.fileName}`, err => {
            if(err) throw err;
            console.log('Image successfully deleted from filesystem: ', deletedProduct.fileName);
        });

        res.json(deletedProduct);
    } catch (err) {
        console.log(err, 'productController.delete error');
        res.status(500).json({
            errorMessage: 'Please try again'
        });
    }
};

exports.read = async (req, res) => {
    try{
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        console.log('Controller ProductID: ', productId);
        res.json(product);
    } catch (err) {
        console.log(err, 'productController.create error');
        res.status(500).json({
            errorMessage: 'Please try again'
        });
    }
};

exports.update = async (req, res) => {
    const productId = req.params.productId;

    if(req.file !== undefined) {
        req.body.fileName = req.file.filename;
    }

    const oldProduct = await Product.findById(productId, req.body);

    if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
        fs.unlink(`uploads/${oldProduct.fileName}`, err => {
            if (err) throw err;
            console.log('Image successfully deleted from the filesystem');
        });
    }


    res.json({
        successMessage: 'Product updated successfully',
    })

};