import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/actions/cartActions';
import { getProduct2 } from '../redux/actions/productActions';

const Product = ({ match, history }) => {
    const { productId } = useParams();
    console.log(productId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct2(productId));
    }, [dispatch, productId]);

    const { product } = useSelector(state => state.products);

    const handleGoBackBtn = () => {
        history.goBack();
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="product-page m-4">
            <button className="btn btn-light text-primary mb-4" onClick={handleGoBackBtn}>Go Back</button>
            {product && (
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid w-100 mb-4" src={`/uploads/${product.fileName}`} alt='product' />
                    </div>
                    <div className="col-md-5">
                        <h3 className="mb-4">{product.productName}</h3>
                        <p className="text-muted border-top py-2">Price: {product.productPrice.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}</p>
                        <p className="text-muted border-top py-2">Status: {' '} {product.productQty <= 0 ? 'Out of Stock' : 'In Stock'}</p>
                        <p className="text-muted border-top py-2">Description: {product.productDesc}</p>
                        <button className="btn btn-dark btn-large btn-block mb-5 py-2" disabled={product.productQty <= 0 ? 'true' : 'false'} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product