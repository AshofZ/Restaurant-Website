import React, { useState } from 'react';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../redux/actions/messagesActions';
import { createCategory } from '../redux/actions/categoryActions';

const AdminCategoryModal = () => {
    const { successMsg, errorMsg } = useSelector(state => state.messages);
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    const [clientSideErrorMsg, setclientSideErrorMsg] = useState('');

    const handleCategoryChange = (evt) => {
        setCategory(evt.target.value);
        dispatch(clearMessages());
        console.log(category);
    };

    const handleMessages = (evt) => {
        dispatch(clearMessages());
    }

    const handleCategorySubmit = (evt) => {
        evt.preventDefault();
        const data = { category }

        if (isEmpty(category)) {
            setclientSideErrorMsg('Category is required');
        } else {
            const data = { category };
            dispatch(createCategory(data));
            setCategory('');
        };
    }

    return (
        <div id="addCategoryModal" className="modal" onClick={handleMessages}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleCategorySubmit}>
                        <div className="modal-header bg-info text-white">
                            <h5>Add Category</h5>
                            <button className="close" data-dismiss="modal">
                                <span>
                                    <i className="fas fa-times"></i>
                                </span>
                            </button>
                        </div>
                        <div className="modal-body my-2">
                            {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}
                            {successMsg && showSuccessMsg(successMsg)}

                            {
                                loading ? (
                                    <div className="text-center">{showLoading()}</div>
                                ) : (
                                    <>
                                        <label className="text-secondary">Category</label>
                                        <input type="text" className="form-control" value={category} onChange={handleCategoryChange} />
                                    </>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
                            <button type='submit' className="btn btn-info text-white">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AdminCategoryModal