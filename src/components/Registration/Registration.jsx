import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

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
    <div>
      <div>
        <h1>Registration</h1>
        <form onSubmit={registrationSubmit}>
          <p>Name</p>
          <Input type='text' placeholder='Enter name...' value={name} onChange={handleNameChange} />
          <p>Email</p>
          <Input type='email' placeholder='Enter email...' value={email} onChange={handleEmailChange} />
          <p>Password</p>
          <Input type='password' placeholder='Enter password...' value={password} onChange={handlePasswordChange} />
          <Button buttonText='Registration' type='submit' />
        </form>
        <div>
          If you have an account you can
          <Link to='/login'> Login </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
