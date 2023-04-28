import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserRole } from '../../store/selectors';

function PrivateRouter({ children }) {
  const userRole = useSelector(getUserRole);
  return userRole === 'admin' ? <Outlet /> || children : <Navigate to='/courses' />;
}

export default PrivateRouter;
