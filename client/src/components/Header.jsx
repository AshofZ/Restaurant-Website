import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import { withRouter } from '../helpers/withRouter';
import { useSelector } from "react-redux";

const Header = ({ history }) => {
    const { cart } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const handleLogout = evt => {
        logout(() => {
            navigate('/signin');
        });
    }

    // views
    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Logo</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"><i className="fa-solid fa-house"></i> Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop"><i className="fa-solid fa-shopping-bag"></i> Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={{ position: 'relative' }} to="/cart"><i className="fa-solid fa-shopping-bag"></i> Cart <span className="badge badge-danger" style={{ position: 'absolute', top: '0px' }}>{cart.length}</span></Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().role === 1 && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/dashboard"><i className="fa-solid fa-house-user"></i> Dashboard</Link>
                        </li>
                    )}
                    {isAuthenticated() && isAuthenticated().role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/dashboard"><i className="fa-solid fa-house-user"></i> Dashboard</Link>
                        </li>
                    )}
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup"><i className="fa-solid fa-pen-to-square"></i> Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin"><i className="fa-solid fa-right-to-bracket"></i> Signin</Link>
                            </li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <button className="btn btn-link text-secondary text-decoration-none pl-0" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );

    // render
    return (
        <header id="header">
            {showNavigation()}
        </header>
    );
};

export default withRouter(Header);