import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import classes from './Registration.module.css';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = useCallback(
    (e) => {
      e.preventDefault();
      setName(e.target.value);
    },
    [setName]
  );

  const handleEmailChange = useCallback(
    (e) => {
      e.preventDefault();
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const handlePasswordChange = useCallback(
    (e) => {
      e.preventDefault();
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const registration = async (newCustomer) => {
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      const success = result.successful;
      if (!success) {
        alert(result.errors);
      } else {
        navigate('/login');
        setName('');
        setEmail('');
        setPassword('');
        alert(result.result);
      }
    } catch (e) {
      alert(e);
    }
  };

  const registrationSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const createUser = {
        name,
        email,
        password,
      };
      registration(createUser);
    },
    [name, email, password, registration]
  );

  return (
    <div className={classes.block_Registration}>
      <h1>Registration</h1>
      <form onSubmit={registrationSubmit} className={classes.form}>
        <p>Name</p>
        <Input type='text' placeholderText='Enter name...' value={name} onChange={handleNameChange} />
        <p>Email</p>
        <Input type='email' placeholderText='Enter email...' value={email} onChange={handleEmailChange} />
        <p>Password</p>
        <Input type='password' placeholderText='Enter password...' value={password} onChange={handlePasswordChange} />
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
