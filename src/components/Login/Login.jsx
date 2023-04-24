import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import classes from './Login.module.css';
import { loginRequest } from '../../ApiServises';
import { userLogin } from '../../store/user/actionCreators';

function Login() {
  const location = useLocation();
  const { from, email: emailDefault = '', name, password: passwordDefault = '' } = location.state || {};
  const [formData, setFormData] = useState({ email: emailDefault, password: passwordDefault });
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  }, [navigate]);

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

  const enterence = useCallback(
    async (user) => {
      const response = await loginRequest(user);
      console.log(response);
      const success = response.successful;
      if (!success) {
        alert('Email or password are wrong, OR you are new User, please link to Registration');
      } else {
        navigate('/courses');
        dispatch(userLogin(response.user));
        setFormData({ email: '', password: '' });
        const tokenUser = response.result;
        localStorage.setItem('token', tokenUser);
        localStorage.setItem('name', response.user.name);
        localStorage.setItem('isAuth', true);
        setToken(tokenUser);
        window.location.reload();
      }
    },
    [navigate, setFormData, dispatch, setToken]
  );

  const createLogin = (e) => {
    e.preventDefault();
    console.log('createLogin');
    console.log(formData);
    enterence(formData);
  };

  return (
    <div className={classes.block_Login}>
      <h1>Login</h1>
      <form onSubmit={createLogin}>
        <p>Email</p>
        <Input type='email' email='email' placeholderText='Enter email...' value={formData.email} onChange={handleEmailChange} />
        <p>Password</p>
        <Input type='password' password='password' placeholderText='Enter password...' value={formData.password} onChange={handlePasswordChange} />
        <Button buttonText='Login' type='submit' />
        <div className={classes.link_Registration}>
          If you have an account you can
          <Link to='/registration'> Registration </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

// function Login({ setLoginUser }) {
//   const location = useLocation();
//   const { from, email: emailDefault = '', name, password: passwordDefault = '' } = location.state || {};
//   const [formData, setFormData] = useState({ email: emailDefault, password: passwordDefault });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       setLoginUser({ isAuth: true });
//       navigate('/courses');
//     } else {
//       navigate('/login');
//     }
//   }, [setLoginUser, navigate]);

//   const handleEmailChange = useCallback(
//     (event) => {
//       setFormData({ ...formData, email: event.target.value });
//     },
//     [formData]
//   );

//   const handlePasswordChange = useCallback(
//     (event) => {
//       setFormData({ ...formData, password: event.target.value });
//     },
//     [formData]
//   );

//   const enterence = async (user) => {
//     const result = await loginRequest(user);
//     const success = result.successful;
//     if (!success) {
//       alert('Email or password are wrong, OR you are new User, please link to Registration');
//     } else {
//       navigate('/courses');
//       setLoginUser({ isAuth: true, name: result.user.name, email: result.user.email, token: result.result });
//       setFormData({ email: '', password: '' });
//       localStorage.setItem('token', result.result);
//       localStorage.setItem('name', result.user.name);
//       localStorage.setItem('isAuth', true);
//     }
//   };

//   const createLogin = useCallback(
//     (e) => {
//       e.preventDefault();
//       enterence(formData);
//     },
//     [enterence]
//   );

//   return (
//     <div className={classes.block_Login}>
//       <h1>Login</h1>
//       <form onSubmit={createLogin}>
//         <p>Email</p>
//         <Input type='email' placeholderText='Enter email...' value={formData.email} onChange={handleEmailChange} />
//         <p>Password</p>
//         <Input type='password' placeholderText='Enter password...' value={formData.password} onChange={handlePasswordChange} />
//         <Button buttonText='Login' type='submit' />
//         <div className={classes.link_Registration}>
//           If you have an account you can
//           <Link to='/registration'> Registration </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
