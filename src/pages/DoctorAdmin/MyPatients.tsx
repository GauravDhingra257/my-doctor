import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Download, Calendar, User, Filter, Search, Phone } from 'lucide-react';

export default function PatientsTable() {
  const [expandedRows, setExpandedRows] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2025-02-15',
    endDate: '2025-02-22'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalPatients: 0,
    selfBookings: 0,
    adminBookings: 0,
    uniqueDiagnoses: 0
  });

  // Sample data for daily patient visits
  const dailyPatients = [
    {
      date: '2025-02-22',
      totalPatients: 8,
      selfBookings: 5,
      adminBookings: 3,
      patientDetails: [
        { 
          patientId: 'PT-1001',
          patientName: 'Rahul Sharma',
          mobileNumber: '+91-9876543210',
          bookingType: 'Self',
          diagnosis: 'Dental Checkup',
          visitTime: '10:15 AM',
          followupDate: '2025-03-22'
        },
        { 
          patientId: 'PT-1002',
          patientName: 'Priya Patel',
          mobileNumber: '+91-9876543211',
          bookingType: 'Admin',
          diagnosis: 'Root Canal',
          visitTime: '11:30 AM',
          followupDate: '2025-03-01'
        }
        // Add more patient details as needed
      ]
    },
    {
      date: '2025-02-21',
      totalPatients: 6,
      selfBookings: 4,
      adminBookings: 2,
      patientDetails: [
        { 
          patientId: 'PT-1003',
          patientName: 'Amit Kumar',
          mobileNumber: '+91-9876543212',
          bookingType: 'Self',
          diagnosis: 'Teeth Cleaning',
          visitTime: '09:30 AM',
          followupDate: '2025-03-21'
        }
        // Add more patient details as needed
      ]
    }
    // Add more daily records as needed
  ];

  // Toggle expanded state for a date
  const toggleRow = (date) => {
    setExpandedRows(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  // Filter data based on date range and search term
  useEffect(() => {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    let filtered = dailyPatients.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= startDate && dayDate <= endDate;
    });
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.map(day => {
        const filteredPatients = day.patientDetails.filter(pt => 
          pt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          pt.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pt.mobileNumber.includes(searchTerm) ||
          pt.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredPatients.length === 0) return null;
        
        return {
          ...day,
          patientDetails: filteredPatients,
          totalPatients: filteredPatients.length,
          selfBookings: filteredPatients.filter(p => p.bookingType === 'Self').length,
          adminBookings: filteredPatients.filter(p => p.bookingType === 'Admin').length
        };
      }).filter(Boolean);
    }
    
    setFilteredData(filtered);
    
    // Calculate summary statistics
    const stats = {
      totalPatients: 0,
      selfBookings: 0,
      adminBookings: 0,
      uniqueDiagnoses: new Set()
    };
    
    filtered.forEach(day => {
      stats.totalPatients += day.totalPatients;
      stats.selfBookings += day.selfBookings;
      stats.adminBookings += day.adminBookings;
      day.patientDetails.forEach(patient => {
        stats.uniqueDiagnoses.add(patient.diagnosis);
      });
    });
    
    setSummaryStats({
      ...stats,
      uniqueDiagnoses: stats.uniqueDiagnoses.size
    });
    
  }, [dateRange, searchTerm]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Filter Controls */}
      <div className="px-6 py-4 flex flex-wrap justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-3 md:mb-0">Patient Visits</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <input 
                type="date" 
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="flex items-center">
              <input 
                type="date" 
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search patient name, ID, or diagnosis" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64"
            />
          </div>
          
          <button className="px-3 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700 mb-1">Total Patients</p>
          <h3 className="text-2xl font-bold text-blue-900">{summaryStats.totalPatients}</h3>
          <p className="text-xs text-blue-600 mt-1">For selected period</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-700 mb-1">Self Bookings</p>
          <h3 className="text-2xl font-bold text-green-900">{summaryStats.selfBookings}</h3>
          <p className="text-xs text-green-600 mt-1">({summaryStats.totalPatients ? ((summaryStats.selfBookings / summaryStats.totalPatients) * 100).toFixed(1) : 0}%)</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-700 mb-1">Admin Bookings</p>
          <h3 className="text-2xl font-bold text-purple-900">{summaryStats.adminBookings}</h3>
          <p className="text-xs text-purple-600 mt-1">({summaryStats.totalPatients ? ((summaryStats.adminBookings / summaryStats.totalPatients) * 100).toFixed(1) : 0}%)</p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-sm text-amber-700 mb-1">Unique Diagnoses</p>
          <h3 className="text-2xl font-bold text-amber-900">{summaryStats.uniqueDiagnoses}</h3>
          <p className="text-xs text-amber-600 mt-1">Different conditions treated</p>
        </div>
      </div>
      
      {/* Daily Patients Table */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-10 px-4 py-3"></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Visits</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Self/Admin</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((day) => (
                <>
                  <tr key={day.date} className={`hover:bg-gray-50 ${expandedRows[day.date] ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-4">
                      <button 
                        onClick={() => toggleRow(day.date)}
                        className="text-gray-500 hover:text-blue-600 focus:outline-none"
                      >
                        {expandedRows[day.date] ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="font-medium text-gray-900">
                          {new Date(day.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{day.totalPatients} patients</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Self: {day.selfBookings}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          Admin: {day.adminBookings}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Report
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          Print
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expandable Row with Patient Details */}
      {expandedRows[day.date] && (
        <tr>
          <td colSpan="6" className="p-0 border-b border-gray-200">
            <div className="bg-gray-50 px-8 py-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Patient Details for {new Date(day.date).toLocaleDateString()}</h4>
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Time</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow-up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {day.patientDetails.map((patient, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{patient.patientId}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">{patient.patientName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {patient.mobileNumber}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{patient.visitTime}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{patient.diagnosis}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            patient.bookingType === 'Self' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {patient.bookingType}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {new Date(patient.followupDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing {filteredData.length} of {dailyPatients.length} days
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled={dateRange.startDate === dailyPatients[dailyPatients.length-1].date}>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50" disabled={dateRange.endDate === dailyPatients[0].date}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}