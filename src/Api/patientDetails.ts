import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';


const patientDetailsApi = {
  getPatientDetails: (): Promise<AxiosResponse> => apiClient.get('/patient-detail'),
};

export default patientDetailsApi;