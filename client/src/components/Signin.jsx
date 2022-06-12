import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from '../api/auth';

const Signin = ({ location }) => {
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
    email: '',
    password: '',
    password2: '',
    errorMsg: false,
    loading: false,
  });

  const {
    email,
    password,
    errorMsg,
    loading,
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
    if ( isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData, errorMsg: 'All field are required'
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData, errorMsg: 'Invalid email'
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)
        .then(response => {
          setAuthentication(response.data.token, response.data.user);
          // const redirect = location.search.split('=')[1];

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log('Redirecting to admin dashboard');
            navigate('/admin/dashboard');
          } else if (isAuthenticated() && isAuthenticated().role === 0) {
            console.log("Redirecting to user dashboard");
            navigate('/user/dashboard');
          }
        })
        .catch(err => {
          console.log('signin api function error: ', err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage
          })
        })
    }
  };

  const showSigninform = () => (
    <form className='signin-form' onSubmit={handleSubmit}>
      {% csrf_token %}
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
      <div className="form-group"><button type="submit" className="btn btn-primary btn-block">Login</button></div>
      <p className="text-center">Dont Have an Account <Link to="/signup">Register</Link> </p>
    </form>
  );

  return (
    <div className="signin-container">
      <div className="row vh-100 px-3">
        <div className="col-md-6 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && (
            <div className='text-center pb-4'>{showLoading()}</div>
          )}
          {showSigninform()}
        </div>
      </div>
    </div>
  )
}

export default Signin