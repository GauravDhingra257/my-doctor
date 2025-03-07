import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';


interface SignupData {
  mobile_number: number;
  password: string;
  user_type: number;
  doctor_subtype?: number;
}

interface OtpData {
  mobile_number: number;
  otp_entered: string;
  user_type: number;
}

interface LoginData {
  mobile_number: number;
  password: string;
  user_type: number;
}

interface StaffUserData {
  mobile_number: number;
  name: string;
  gender: string;
  doctor_subtype: number;
}

interface EmailData {
  email: string;
}

const doctorUserApi = {
  postDoctorSignup: (data: SignupData): Promise<AxiosResponse> => apiClient.post('/auth/doctor/signup', data),
  putDoctorSignup: (data: OtpData): Promise<AxiosResponse> => apiClient.put('/auth/doctor/signup', data),
  patchDoctorSignup: (data: any): Promise<AxiosResponse> => apiClient.patch('/auth/doctor/signup', data),
  postDoctorLogin: (data: LoginData): Promise<AxiosResponse> => apiClient.post('/auth/doctor/login/', data),
  patchDoctorLogin: (data: any): Promise<AxiosResponse> => apiClient.patch('/auth/doctor/login/', data),
  postDoctorEmail: (data: EmailData): Promise<AxiosResponse> => apiClient.post('/auth/user/email/', data),
  putDoctorEmail: (data: EmailData): Promise<AxiosResponse> => apiClient.put('/auth/user/email/', data),
  postForgotPassword: (data: EmailData): Promise<AxiosResponse> => apiClient.post('/auth/doctor/forgot-password/', data),
  putForgotPassword: (data: OtpData): Promise<AxiosResponse> => apiClient.put('/auth/doctor/forgot-password/', data),
  postStaffUser: (data: StaffUserData): Promise<AxiosResponse> => apiClient.post('/auth/doctor/staff-user/', data),
  putStaffUser: (data: OtpData): Promise<AxiosResponse> => apiClient.put('/auth/doctor/staff-user/', data),
  deleteStaffUser: (data: { mobile_number: number }): Promise<AxiosResponse> => apiClient.delete('/auth/doctor/staff-user/', { data }),
};

export default doctorUserApi;