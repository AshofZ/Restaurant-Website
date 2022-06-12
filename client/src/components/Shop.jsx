import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import { getProductsByFilter } from '../redux/actions/filterActions';
import Card from './Card';

const Shop = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const { products } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);

    const handleSearch = e => {
        resetState();
        setText(e.target.value);

        dispatch(getProductsByFilter({ type: 'text', query: e.target.value }));
    }

    const handleCategory = e => {
        resetState();

        const currentCategoryChecked = e.target;
        const allCategoriesChecked = [...categoryIds]
        const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

        let updatedCategoryIds;
        if (indexFound === -1) {
            //add
            updatedCategoryIds = [...categoryIds, currentCategoryChecked.value];
            setCategoryIds(updatedCategoryIds)
        } else {
            // remove
            updatedCategoryIds = [...categoryIds]
            updatedCategoryIds.splice(indexFound, 1);
            setCategoryIds(updatedCategoryIds);
        }

        dispatch(getProductsByFilter({ type: 'category', query: updatedCategoryIds }));
    };

    const resetState = () => {
        setText('');
        setCategoryIds([]);
    }

    return (
        <section className="shop-page m-3">
            <div className="jumbotron">
                <h1 className="display-4">Shop</h1>
            </div>
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="text-muted">
                        Filters <span className='fas fa-sliders-h'></span>
                    </div>
                    <nav className="bg-light">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" value={text} onChange={handleSearch} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" disabled>Search</button>
                        </form>
                    </nav>

                    <div className="border-top border-bottom bg-light">
                        {categories && categories.map(c => (
                            <div className="form-check" key={c._id}>
                                <input className="form-check-input" type="checkbox" checked={categoryIds.includes(c._id)} name="category" value={c._id} id="defaultCheck1" onChange={handleCategory} />
                                    <label className="form-check-label">
                                        {c.category}
                                    </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {products.map(p => (
                            <Card key={p._id} product={p} homePage={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Shop