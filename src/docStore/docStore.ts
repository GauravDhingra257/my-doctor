import { create } from 'zustand';
interface docState {
  isLoggedIn: boolean;
  isPatient: boolean;
  isDoctor: boolean;
  doctordecodedjwt:any;
  setDoctorDecodedJwt: (s:any) => void;
  setIsLoggedIn: (s:boolean) => void;
  setIsPatient: (s:boolean) => void;
  setIsDoctor: (s:boolean) => void;
  }
const docStore = create<docState>((set) => ({
  isLoggedIn: false,
  isPatient: false,
  isDoctor: false,
  doctordecodedjwt:{},
  setDoctorDecodedJwt: (s:any) => set((state: any) => ({ doctordecodedjwt: s})),
  setIsLoggedIn: (s:boolean) => set((state: any) => ({ isLoggedIn: s})),
  setIsPatient: (s:boolean) => set((state: any) => ({ isPatient: s })),
  setIsDoctor: (s:boolean) => set((state: any) => ({ isDoctor: s })),
}));

export default docStore;
