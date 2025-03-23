import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';

// interface DoctorProfileData {
//   name: string;
//   gender: string;
//   age: number;
//   experience_in_years: number;
//   language: string;
//   designation: number;
//   education: string;
//   experiences: string;
//   awards_and_achievements: string;
//   license_image?: File;
//   profile_image?: File;
//   license_number: string;
// }

interface SubscriptionData {
  subscription_id: string;
}

interface SpecialityData {
  specialities: number[];
}

interface TestDetailData {
  test_detail: number[];
}

interface MedicineData {
  medicine_name: string;
  medicine_composition: string;
  medicine_company: string;
}

interface BankDetailsData {
  amount: number;
}


const doctorProfileApi = {
  postDoctorProfile: (data: FormData): Promise<AxiosResponse> => apiClient.post('/doctor/doctor-profile', data,{headers: {
    'Content-Type': 'multipart/form-data', // Ensure the correct Content-Type
  }}),
  patchDoctorProfile: (data: FormData): Promise<AxiosResponse> => apiClient.patch('/doctor/doctor-profile', data,{headers: {
    'Content-Type': 'multipart/form-data', // Ensure the correct Content-Type
  }}),
  getDoctorProfile: (): Promise<AxiosResponse> => apiClient.get('/doctor/doctor-profile'),
  postDoctorSubscription: (data: any): Promise<AxiosResponse> => apiClient.post('/doctor/doctor-subscription', data),
  putDoctorSubscription: (data: SubscriptionData): Promise<AxiosResponse> => apiClient.put('/doctor/doctor-subscription', data),
  patchDoctorSubscription: (data: SubscriptionData): Promise<AxiosResponse> => apiClient.patch('/doctor/doctor-subscription', data),
  postDoctorSpeciality: (data: SpecialityData): Promise<AxiosResponse> => apiClient.post('/doctor/doctor-speciality', data),
  deleteDoctorSpeciality: (data: SpecialityData): Promise<AxiosResponse> => apiClient.delete('/doctor/doctor-speciality', { data }),
  postDoctorTest: (data: any): Promise<AxiosResponse> => apiClient.post('/doctor/doctor-test', data),
  deleteDoctorTest: (data: TestDetailData): Promise<AxiosResponse> => apiClient.delete('/doctor/doctor-test', { data }),
  postDoctorMedicines: (data: MedicineData): Promise<AxiosResponse> => apiClient.post('/doctor/doctor-medicines', data),
  patchDoctorMedicines: (data: any): Promise<AxiosResponse> => apiClient.patch('/doctor/doctor-medicines', data),
  getDoctorMedicines: (params: { doctor_profile: string }): Promise<AxiosResponse> => apiClient.get('/doctor/doctor-medicines', { params }),
  deleteDoctorMedicines: (data: { serial_number_list: number[] }): Promise<AxiosResponse> => apiClient.delete('/doctor/doctor-medicines', { data }),
  putDoctorMedicines: (data: any): Promise<AxiosResponse> => apiClient.put('/doctor/doctor-medicines', data),
  postDoctorBankDetails: (data: any): Promise<AxiosResponse> => apiClient.post('/doctor/bank-details', data),
  putDoctorBankDetails: (data: BankDetailsData): Promise<AxiosResponse> => apiClient.put('/doctor/bank-details', data),
  patchDoctorBankDetails: (data: any): Promise<AxiosResponse> => apiClient.patch('/doctor/bank-details', data),
  deleteDoctorBankDetails: (data: { otp: string }): Promise<AxiosResponse> => apiClient.delete('/doctor/bank-details', { data }),
  postDoctorClinic: (data: any): Promise<AxiosResponse> => apiClient.post('/doctor/doctor-clinic', data),
};

export default doctorProfileApi;