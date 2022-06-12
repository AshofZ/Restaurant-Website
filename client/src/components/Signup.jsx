import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
import { showLoading } from '../helpers/loading';
import { createHashHistory } from 'history';
import { signup } from '../api/auth';
import Axios from 'axios';


const Signup = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      console.log('Redirecting to admin dashboard');
      navigate('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      console.log("Redirecting to user dashboard");
      navigate('/user/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading
  } = formData;

  const handleChange = (evt) => {
    // console.log(evt);
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      [evt.target.email]: evt.target.value,
      [evt.target.password1]: evt.target.value,
      [evt.target.password2]: evt.target.value,
      successMsg: '',
      errorMsg: ''
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
      setFormData({
        ...formData, errorMsg: 'All field are required'
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData, errorMsg: 'Invalid email'
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData, errorMsg: 'Passwords do not match'
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });

      signup(data)
        .then((response) => {
          console.log('Axios signup success: ', response);
          setFormData({
            username: '',
            email: '',
            password: '',
            password2: '',
            loading: false,
            successMsg: response.data.successMessage
          });
        })
        .catch((err) => {
          console.log('Axios signup error: ', err);
          setFormData({ ...formData, loading: false, errorMsg: err.response.data.errorMessage });
        });
    }
  };

  const showSignupform = () => (
    <form className='signup-form' onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input type="text" className="form-control" placeholder="Username" name='username' value={username} onChange={handleChange} />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input type="email" className="form-control" placeholder="Email Address" name='email' value={email} onChange={handleChange} />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input type="password" className="form-control" placeholder="Password" name='password' value={password} onChange={handleChange} />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input type="password" className="form-control" placeholder="Confirmation Password" name='password2' value={password2} onChange={handleChange} />
      </div>
      <div className="form-group"><button type="submit" className="btn btn-primary btn-block">Create Account</button></div>
      <p className="text-center">Have an account? <Link to="/signin">Log In</Link> </p>
    </form>
  );

  return (
    <div className="signup-container">
      <div className="row vh-100 px-3">
        <div className="col-md-6 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          {loading && (
            <div className='text-center pb-4'>{showLoading()}</div>
          )}
          {showSignupform()}
        </div>
      </div>
    </div>
  )
}

export default Signup