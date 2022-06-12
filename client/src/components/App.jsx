import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import UserDashboard from './UserDashboard';
import Shop from './Shop';
import Shipping from './Shipping';
import Cart from './Cart';
import Product from './Product';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import NotFound from './NotFound';
// redux
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/restaurant" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          {/* <Route exact path="/admin/dashboard" element={<UserRoute element={<UserDashboard />} />} />
      <Route exact path="/admin/dashboard" element={<AdminRoute exact path="/admin/dashboard" element={<AdminDashboard />} />} /> */}
          <Route exact path='/user/dashboard' element={<UserDashboard />} />
          <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
          <Route exact path='/admin/edit/product/:productId' element={<AdminEditProduct />} />
          {/* <Route exact path='/user/dashboard' element={<AdminRoute />}>
        <Routes>
          <Route exact path='/user/dashboard' element={<AdminDashboard />} />
        </Routes>
      </Route>
      <Route exact path='/admin/dashboard' element={<AdminRoute />}>
        <Routes>
          <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
      </Route> */}
          <Route element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
