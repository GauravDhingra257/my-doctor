import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';

interface UserData {
  mobile_number: number;
  user_type: number;
}

interface OtpData {
  mobile_number: number;
  otp_entered: string;
}

interface EmailData {
  email: string;
  user_type: number;
}

interface EmailOtpData {
  email: string;
  email_otp: string;
  user_type: number;
}


const authenticationApi = {
  postUser: (data: UserData): Promise<AxiosResponse> => apiClient.post('/auth/user/', data),
  putUser: (data: OtpData): Promise<AxiosResponse> => apiClient.put('/auth/user/', data),
  patchSendOtp: (data: any): Promise<AxiosResponse> => apiClient.patch('/send-otp/', data),
  postEmailOtpGet: (data: EmailData): Promise<AxiosResponse> => apiClient.post('/email-otp-get/', data),
  putEmailOtpVerify: (data: EmailOtpData): Promise<AxiosResponse> => apiClient.put('/email-otp-verify/', data),
};

export default authenticationApi;