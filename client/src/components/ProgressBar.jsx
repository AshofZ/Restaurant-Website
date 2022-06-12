import React from 'react'
import { Link } from 'react-router-dom'

const ProgressBar = ({step1, step2, step3}) => {
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {step1 ? (
                        <li class="breadcrumb-item active" aria-current="page">
                            <Link to="/shipping">Shipping</Link>
                        </li>
                    ) : (
                        <li class="breadcrumb-item" aria-current="page">
                            <Link to="/#" className="text-muted" onClick={evt => evt.preventDefault()} style={{ textDecoration: "none", cursor: "not-allowed" }}>Shipping</Link>
                        </li>
                    )}
                    {step2 ? (
                        <li class="breadcrumb-item active" aria-current="page">
                            <Link to="/payment">Payment</Link>
                        </li>
                    ) : (
                        <li class="breadcrumb-item" aria-current="page">
                            <Link to="/#" className="text-muted" onClick={evt => evt.preventDefault()} style={{ textDecoration: "none", cursor: "not-allowed" }}>Payment</Link>
                        </li>
                    )}
                    {step3 ? (
                        <li class="breadcrumb-item active" aria-current="page">
                            <Link to="/placeorder">Place Order</Link>
                        </li>
                    ) : (
                        <li class="breadcrumb-item" aria-current="page">
                            <Link to="/#" className="text-muted" onClick={evt => evt.preventDefault()} style={{ textDecoration: "none", cursor: "not-allowed" }}>Place Order</Link>
                        </li>
                    )}
                </ol>
            </nav>
        </>
    )
}

export default ProgressBar