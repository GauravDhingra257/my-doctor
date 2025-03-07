import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';

interface PatientData {
  name: string;
  gender: string;
  birth_year: number;
  birth_month: number;
  blood_group: string;
}


const patientApi = {
  postAddPatient: (data: PatientData): Promise<AxiosResponse> => apiClient.post('/patients/add-patient', data),
  getAddPatient: (params: { user_id: string }): Promise<AxiosResponse> => apiClient.get('/patients/add-patient', { params }),
};

export default patientApi;