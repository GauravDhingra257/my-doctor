import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';


const specialityApi = {
  getSpeciality: (): Promise<AxiosResponse> => apiClient.get('/speciality'),
};

export default specialityApi;