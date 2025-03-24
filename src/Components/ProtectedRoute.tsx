import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import docStore from '../docStore/docStore';

interface JwtPayload {
  user_type: number;
  exp: number;
}

export const isDoctorHelper = ():any => {
  // if(isDoctor) return true;
  const token = localStorage.getItem('accessToken');
  if (!token) return [false,null];

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    if (decoded.exp < currentTime) {
      console.error('Token has expired');
      localStorage.removeItem('accessToken');
      return [false,decoded];
    }
    return [decoded.user_type === 2,decoded];
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('accessToken');
    return [false,null]
  }
};
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProtectedRouteV2: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isDoctor,setIsDoctor,setDoctorDecodedJwt } = docStore();
  let isDoctorFlag, decoded
  useEffect(() => {
    console.log('ProtectedRoutev2');
    [isDoctorFlag, decoded] = isDoctorHelper();
    if (isDoctorFlag) {
    setIsDoctor(true);
    setDoctorDecodedJwt(decoded);
    }
  },[]);
  if (isDoctor) {
    return  <Navigate to="/dashboard" />;;
  }

  return <>{children}</>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isDoctor,setIsDoctor ,setDoctorDecodedJwt} = docStore();
  let isDoctorFlag, decoded
  useEffect(() => {
    console.log('ProtectedRoute');
    [isDoctorFlag, decoded] = isDoctorHelper();
    if(isDoctorFlag){
    setIsDoctor(true);
    setDoctorDecodedJwt(decoded);
    }
  },[]);
  if (isDoctor) {
    return <>{children}</>;
  }

  return <Navigate to="/signin" />;
};

export default ProtectedRoute;