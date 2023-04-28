import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import classes from './Registration.module.css';
import { registrationRequest } from '../../ApiServises';

function Registration() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = useCallback(
    (event) => {
      setFormData({ ...formData, name: event.target.value });
    },
    [formData]
  );

  const handleEmailChange = useCallback(
    (event) => {
      setFormData({ ...formData, email: event.target.value });
    },
    [formData]
  );

  const handlePasswordChange = useCallback(
    (event) => {
      setFormData({ ...formData, password: event.target.value });
    },
    [formData]
  );

  const registration = async (newCustomer) => {
    // dispatch(registrationRequest(newCustomer));
    const result = await registrationRequest(newCustomer);
    console.log(result);
    const success = result.successful;
    if (!success) {
      alert(result.errors);
    } else {
      navigate('/login', { state: { from: 'registration', email: formData.email, name: formData.name, password: formData.password } });
      setFormData({ name: '', email: '', password: '' });
      alert(result.result);
    }
  };

  const registrationSubmit = useCallback(
    (e) => {
      e.preventDefault();
      registration(formData);
    },
    [formData, registration]
  );

  return (
    <div className={classes.block_Registration}>
      <h1>Registration</h1>
      <form onSubmit={registrationSubmit} className={classes.form}>
        <p>Name</p>
        <Input type='text' name='name' placeholderText='Enter name...' value={formData.name} onChange={handleNameChange} />
        <p>Email</p>
        <Input type='email' name='email' placeholderText='Enter email...' value={formData.email} onChange={handleEmailChange} />
        <p>Password</p>
        <Input type='password' name='password' placeholderText='Enter password...' value={formData.password} onChange={handlePasswordChange} />
        <Button buttonText='Registration' type='submit' />
      </form>
      <div className={classes.link_Login}>
        If you have an account you can
        <Link to='/login'> Login </Link>
      </div>
    </div>
  );
}

export default Registration;
