import React, { useState } from 'react';
import { Camera, Check, Info, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for toggle switches
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Navigation tab handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Toggle switch handler
  const handleToggle = (type) => {
    if (type === '2fa') {
      setTwoFactorAuth(!twoFactorAuth);
    } else {
      setNotifications({
        ...notifications,
        [type]: !notifications[type]
      });
    }
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Doctor Settings</h1>
          <p className="text-gray-600">Manage your profile, subscription, and payment information</p>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation using normal components */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="flex flex-col space-y-1 w-full">
                <button 
                  onClick={() => handleTabClick('profile')}
                  className={`text-left px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  Profile Information
                </button>
                <button 
                  onClick={() => handleTabClick('subscription')}
                  className={`text-left px-4 py-2 rounded ${activeTab === 'subscription' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  Subscription
                </button>
                <button 
                  onClick={() => handleTabClick('bank')}
                  className={`text-left px-4 py-2 rounded ${activeTab === 'bank' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  Bank Details
                </button>
                <button 
                  onClick={() => handleTabClick('notifications')}
                  className={`text-left px-4 py-2 rounded ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  Notifications
                </button>
                <button 
                  onClick={() => handleTabClick('security')}
                  className={`text-left px-4 py-2 rounded ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  Security
                </button>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Profile Information</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                        <img src="/api/placeholder/96/96" alt="Doctor Profile" className="w-full h-full object-cover" />
                      </div>
                      <button 
                        className="absolute bottom-0 right-0 rounded-full p-1 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Camera size={20} />
                      </button>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-medium">Dr. Sarah Johnson</h3>
                      <p className="text-gray-600">Cardiologist</p>
                    </div>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text"
                          id="firstName" 
                          name="firstName" 
                          defaultValue="Sarah" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text"
                          id="lastName" 
                          name="lastName" 
                          defaultValue="Johnson" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          defaultValue="dr.sarah@example.com" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          defaultValue="+91 98765 43210" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <select
                          id="specialization" 
                          name="specialization" 
                          defaultValue="Cardiologist"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Cardiologist</option>
                          <option>Dermatologist</option>
                          <option>Neurologist</option>
                          <option>Pediatrician</option>
                          <option>Orthopedic</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                        <input 
                          type="number" 
                          id="experience" 
                          name="experience" 
                          defaultValue="12" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                      <textarea 
                        id="bio" 
                        name="bio" 
                        rows="4" 
                        defaultValue="Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and heart failure management."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Current Subscription</h2>
                </div>
                <div className="p-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">Premium Plan</h3>
                        <p className="text-gray-600">₹4,999/month, billed annually</p>
                        <p className="text-sm text-blue-600 mt-1">Renews on March 15, 2025</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-lg mb-6">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Plan Features</h3>
                    </div>
                    <ul className="p-4 space-y-2">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Unlimited patient appointments</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Advanced analytics and reports</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Electronic prescription system</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>24/7 priority support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => navigate('/subscriptions')}>
                      Change Plan
                    </button>
                    <button className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details Tab */}
            {activeTab === 'bank' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Bank Details</h2>
                </div>
                <div className="p-6">
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 mt-0.5 mr-2 text-amber-500" />
                      <p className="text-sm text-amber-800">
                        Your bank details are used for receiving payments from patients. Please ensure all information is accurate.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                        <input 
                          type="text"
                          id="accountName" 
                          name="accountName" 
                          defaultValue="Dr. Sarah Johnson" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input 
                          type="text"
                          id="accountNumber" 
                          name="accountNumber" 
                          defaultValue="XXXX XXXX XXXX 4567" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input 
                          type="text"
                          id="bankName" 
                          name="bankName" 
                          defaultValue="HDFC Bank" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                        <input 
                          type="text"
                          id="ifscCode" 
                          name="ifscCode" 
                          defaultValue="HDFC0001234" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                        <input 
                          type="text"
                          id="branch" 
                          name="branch" 
                          defaultValue="Andheri East, Mumbai" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                        <select
                          id="accountType" 
                          name="accountType" 
                          defaultValue="Savings"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Savings</option>
                          <option>Current</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                      <input 
                        type="text"
                        id="panNumber" 
                        name="panNumber" 
                        defaultValue="ABCDE1234F" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Notification Preferences</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive emails about appointment bookings</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleToggle('email')}>
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.email}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive SMS alerts for upcoming appointments</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleToggle('sms')}>
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.sms}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleToggle('push')}>
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.push}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Updates</h3>
                        <p className="text-sm text-gray-500">Receive updates about new features and services</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleToggle('marketing')}>
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.marketing}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Security Settings</h2>
                </div>
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-md font-medium mb-4">Change Password</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-4 mb-6">
                        <div className="relative">
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              id="currentPassword" 
                              name="currentPassword" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <button 
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <div className="relative">
                            <input 
                              type={showNewPassword ? "text" : "password"} 
                              id="newPassword" 
                              name="newPassword" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <button 
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <div className="relative">
                            <input 
                              type={showConfirmPassword ? "text" : "password"} 
                              id="confirmPassword" 
                              name="confirmPassword" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <button 
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;