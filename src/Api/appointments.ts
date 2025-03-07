import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiClient } from './NetworkClient';

interface AppointmentData {
  doctor_calendar: string;
  patient: number;
  reason_of_appointment: string;
}

interface AppointmentUpdateData {
  id: number;
  calendar: string;
}

interface AppointmentDoctorViewData {
  appointment: number;
  otp?: number;
  suggestions?: string;
  suggested_medicines?: number[];
  suggested_tests?: number[];
}

interface PostAppointmentPatientData {
  appointment_id: number;
  doctor_calendar: string;
}


const appointmentsApi = {
  postAppointment: (data: AppointmentData): Promise<AxiosResponse> => apiClient.post('/appointments/appointment', data),
  patchAppointment: (data: AppointmentUpdateData): Promise<AxiosResponse> => apiClient.patch('/appointments/appointment', data),
  putAppointment: (data: { appointment: number }): Promise<AxiosResponse> => apiClient.put('/appointments/appointment', data),
  postAppointmentDoctorView: (data: AppointmentDoctorViewData): Promise<AxiosResponse> => apiClient.post('/appointments/appointment-doctor-view', data),
  putAppointmentDoctorView: (data: AppointmentDoctorViewData): Promise<AxiosResponse> => apiClient.put('/appointments/appointment-doctor-view', data),
  postAppointmentPatientView: (data: any): Promise<AxiosResponse> => apiClient.post('/appointments/appointment-patient-view', data),
  deleteAppointmentPatientView: (): Promise<AxiosResponse> => apiClient.delete('/appointments/appointment-patient-view'),
  postPostAppointmentPatient: (data: PostAppointmentPatientData): Promise<AxiosResponse> => apiClient.post('/appointments/post-appointment-patient', data),
  deletePostAppointmentPatient: (data: { post_appointment_id: string }): Promise<AxiosResponse> => apiClient.delete('/appointments/post-appointment-patient', { data }),
};

export default appointmentsApi;