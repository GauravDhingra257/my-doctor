import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import docStore from '../docStore/docStore';

interface JwtPayload {
  user_type: number;
  exp: number;
}

export const isDoctor = (): boolean => {
  // const { isDoctor } = docStore();
  // if(isDoctor) return true;
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    if (decoded.exp < currentTime) {
      console.error('Token has expired');
      localStorage.removeItem('accessToken');
      return false;
    }
    return decoded.user_type === 2;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('accessToken');
    return false;
  }
};
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProtectedRouteV2: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { setIsDoctor } = docStore();
  useEffect(() => {
    console.log('ProtectedRoutev2');
    if(isDoctor()){
    setIsDoctor(true);
    }
  },[]);
  if (isDoctor()) {
    return  <Navigate to="/dashboard" />;;
  }

  return <>{children}</>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { setIsDoctor } = docStore();
  useEffect(() => {
    console.log('ProtectedRoute');
    if(isDoctor()){
    setIsDoctor(true);
    }
  },[]);
  if (isDoctor()) {
    
    return <>{children}</>;
  }

  return <Navigate to="/signin" />;
};

export default ProtectedRoute;