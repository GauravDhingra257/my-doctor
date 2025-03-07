import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';

interface LabData {
  lab_name: string;
  lab_license: string;
  lab_image?: File;
  lab_license_image?: File;
  lab_contact_details: string;
  building_number: string;
  address_line: string;
  city: string;
  district: string;
  state: string;
  pin_code: string;
  location: string;
}

interface LabTestPricingData {
  lab_id: number;
  test_ids: number[];
  test_prices: number[];
}


const labApi = {
  postLabExternal: (data: LabData): Promise<AxiosResponse> => apiClient.post('/lab-external', data),
  patchLabExternal: (data: any): Promise<AxiosResponse> => apiClient.patch('/labs/lab', data),
  putLabExternal: (data: any): Promise<AxiosResponse> => apiClient.put('/labs/lab', data),
  deleteLabExternal: (data: { lab_id: number; address_id: string }): Promise<AxiosResponse> => apiClient.delete('/labs/lab', { data }),
  getLabExternal: (): Promise<AxiosResponse> => apiClient.get('/labs/lab'),
  postLabTestPricing: (data: LabTestPricingData): Promise<AxiosResponse> => apiClient.post('/lab-test-pricing', data),
  getLabTestPricing: (params: { type: string }): Promise<AxiosResponse> => apiClient.get('/labs/lab-pricing', { params }),
  deleteLabTestPricing: (data: LabTestPricingData): Promise<AxiosResponse> => apiClient.delete('/labs/lab-pricing', { data }),
};

export default labApi;