import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react';
import { Mail, Lock, User, Phone, MapPin, Stethoscope, Award, Clock } from 'lucide-react';
import  doctorUserApi  from '../Api/doctorUser';
import docStore from '../docStore/docStore';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  mobile_number: number;
  password: string;
  user_type: number;
  doctor_subtype?: number;
}
export const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    mobile_number: 8448558616,
    password: 'King@123',
    user_type: 2,
  });
  const {isDoctor,setIsDoctor} = docStore();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await doctorUserApi.postDoctorLogin(formData);
      localStorage.setItem('accessToken', data.access);
      await setIsDoctor(true);
      console.log('Logged in successfully',isDoctor);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Welcome back, Doctor</h2>
          <p className="text-gray-500">Sign in to manage your appointments</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="mobile_number">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="mobile_number"
                name="mobile_number"
                type="tel"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="8448558616"
                value={formData.mobile_number}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="rounded text-blue-600" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};


export const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupData>({
    mobile_number: 0,
    password: '',
    user_type: 2,
    doctor_subtype: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name === 'mobile_number' || name === 'user_type' || name === 'password') {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  };

  const handleSubmit = async () => {
    try {
      const {data} = await doctorUserApi.postDoctorSignup(formData);
      console.log('Your Otp:', data.message);
      doctorUserApi.putDoctorSignup({ mobile_number: formData.mobile_number, otp_entered: data.message, user_type: 2 });
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Doctor Registration</h2>
          <p className="text-gray-500">Join our medical platform</p>
          <div className="flex justify-center space-x-4 mt-4">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="full_name"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Dr. John Doe"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="doctor@example.com"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="mobile_number"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 000-0000"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization</label>
                  <div className="relative">
                    <Stethoscope className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="doctor_subtype"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                    >
                      <option value="">Select Specialization</option>
                      <option value="1">Cardiology</option>
                      <option value="2">Dermatology</option>
                      <option value="3">Pediatrics</option>
                      <option value="4">Neurology</option>
                      <option value="5">Orthopedics</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Years of Experience</label>
                  <div className="relative">
                    <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="experience"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="10"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Medical License Number</label>
                  <div className="relative">
                    <Award className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="license_number"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="License number"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Clinic/Hospital Address</label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Clinic address"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Consultation Fees</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      name="consultation_fees"
                      className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="100"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Start Time</label>
                      <input
                        type="time"
                        name="start_time"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">End Time</label>
                      <input
                        type="time"
                        name="end_time"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brief Bio</label>
                  <textarea
                    name="bio"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Tell us about your medical experience and expertise..."
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
                onClick={handleSubmit}
              >
                Complete Registration
              </button>
            )}
          </div>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const AuthPages = () => {
  return (
    <>
      <SignIn />
      <SignUp />
    </>
  );
};

export default AuthPages;