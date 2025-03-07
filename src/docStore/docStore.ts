import { create } from 'zustand';
interface docState {
  isLoggedIn: boolean;
  isPatient: boolean;
  isDoctor: boolean;
  setIsLoggedIn: (s:boolean) => void;
  setIsPatient: (s:boolean) => void;
  setIsDoctor: (s:boolean) => void;
  }
const docStore = create<docState>((set) => ({
  isLoggedIn: false,
  isPatient: false,
  isDoctor: false,
  setIsLoggedIn: (s:boolean) => set((state: any) => ({ isLoggedIn: s})),
  setIsPatient: (s:boolean) => set((state: any) => ({ isPatient: s })),
  setIsDoctor: (s:boolean) => set((state: any) => ({ isDoctor: s })),
}));

export default docStore;
