import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Download, Calendar, CreditCard, Filter, Search } from 'lucide-react';

export default function PaymentsTable() {
  // State to track which dates are expanded
  const [expandedRows, setExpandedRows] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '2025-02-15',
    endDate: '2025-02-22'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalAmount: 0,
    completedTransactions: 0,
    completedAmount: 0,
    pendingTransactions: 0,
    pendingAmount: 0
  });

  // Sample data for daily aggregated payments
  const dailyPayments = [
    {
      date: '2025-02-22',
      totalAmount: 28500,
      transactionCount: 7,
      pendingAmount: 0,
      patientTransactions: [
        { patientId: 'P-1001', patientName: 'Rahul Sharma', amount: 3500, paymentMethod: 'Credit Card', time: '10:15 AM', status: 'Completed' },
        { patientId: 'P-1002', patientName: 'Priya Patel', amount: 4800, paymentMethod: 'UPI', time: '11:30 AM', status: 'Completed' },
        { patientId: 'P-1004', patientName: 'Neha Gupta', amount: 6500, paymentMethod: 'Cash', time: '2:45 PM', status: 'Completed' },
        { patientId: 'P-1007', patientName: 'Mohammed Khan', amount: 5200, paymentMethod: 'Debit Card', time: '3:20 PM', status: 'Completed' },
        { patientId: 'P-1005', patientName: 'Arjun Mehta', amount: 2500, paymentMethod: 'UPI', time: '4:10 PM', status: 'Completed' },
        { patientId: 'P-1003', patientName: 'Vikram Singh', amount: 3500, paymentMethod: 'Credit Card', time: '5:30 PM', status: 'Completed' },
        { patientId: 'P-1006', patientName: 'Deepa Iyer', amount: 2500, paymentMethod: 'Cash', time: '6:15 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-21',
      totalAmount: 32000,
      transactionCount: 8,
      pendingAmount: 3500,
      patientTransactions: [
        { patientId: 'P-1008', patientName: 'Sanjay Verma', amount: 4500, paymentMethod: 'Credit Card', time: '9:30 AM', status: 'Completed' },
        { patientId: 'P-1001', patientName: 'Rahul Sharma', amount: 3500, paymentMethod: 'UPI', time: '10:45 AM', status: 'Pending' },
        { patientId: 'P-1009', patientName: 'Anita Desai', amount: 6000, paymentMethod: 'Cash', time: '11:15 AM', status: 'Completed' },
        { patientId: 'P-1002', patientName: 'Priya Patel', amount: 3200, paymentMethod: 'Credit Card', time: '1:20 PM', status: 'Completed' },
        { patientId: 'P-1010', patientName: 'Rajesh Kumar', amount: 4800, paymentMethod: 'Debit Card', time: '2:30 PM', status: 'Completed' },
        { patientId: 'P-1003', patientName: 'Vikram Singh', amount: 3500, paymentMethod: 'UPI', time: '3:45 PM', status: 'Completed' },
        { patientId: 'P-1011', patientName: 'Meena Kapoor', amount: 3000, paymentMethod: 'Cash', time: '5:10 PM', status: 'Completed' },
        { patientId: 'P-1006', patientName: 'Deepa Iyer', amount: 3500, paymentMethod: 'Credit Card', time: '6:30 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-20',
      totalAmount: 18400,
      transactionCount: 5,
      pendingAmount: 0,
      patientTransactions: [
        { patientId: 'P-1012', patientName: 'Vivek Malhotra', amount: 4200, paymentMethod: 'Credit Card', time: '10:20 AM', status: 'Completed' },
        { patientId: 'P-1007', patientName: 'Mohammed Khan', amount: 3600, paymentMethod: 'UPI', time: '11:45 AM', status: 'Completed' },
        { patientId: 'P-1005', patientName: 'Arjun Mehta', amount: 3800, paymentMethod: 'Cash', time: '1:30 PM', status: 'Completed' },
        { patientId: 'P-1004', patientName: 'Neha Gupta', amount: 2800, paymentMethod: 'Debit Card', time: '3:15 PM', status: 'Completed' },
        { patientId: 'P-1013', patientName: 'Kavita Sharma', amount: 4000, paymentMethod: 'Credit Card', time: '5:40 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-19',
      totalAmount: 22500,
      transactionCount: 6,
      pendingAmount: 2000,
      patientTransactions: [
        { patientId: 'P-1014', patientName: 'Rahul Joshi', amount: 3500, paymentMethod: 'Credit Card', time: '9:15 AM', status: 'Completed' },
        { patientId: 'P-1003', patientName: 'Vikram Singh', amount: 4500, paymentMethod: 'Cash', time: '10:30 AM', status: 'Completed' },
        { patientId: 'P-1015', patientName: 'Sunita Patel', amount: 2000, paymentMethod: 'UPI', time: '11:45 AM', status: 'Pending' },
        { patientId: 'P-1001', patientName: 'Rahul Sharma', amount: 4200, paymentMethod: 'Debit Card', time: '1:20 PM', status: 'Completed' },
        { patientId: 'P-1016', patientName: 'Amit Verma', amount: 5300, paymentMethod: 'Credit Card', time: '3:10 PM', status: 'Completed' },
        { patientId: 'P-1004', patientName: 'Neha Gupta', amount: 3000, paymentMethod: 'UPI', time: '4:35 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-18',
      totalAmount: 19800,
      transactionCount: 5,
      pendingAmount: 0,
      patientTransactions: [
        { patientId: 'P-1017', patientName: 'Ravi Kumar', amount: 3800, paymentMethod: 'Credit Card', time: '9:45 AM', status: 'Completed' },
        { patientId: 'P-1002', patientName: 'Priya Patel', amount: 4200, paymentMethod: 'Cash', time: '11:20 AM', status: 'Completed' },
        { patientId: 'P-1018', patientName: 'Smita Shah', amount: 3500, paymentMethod: 'UPI', time: '2:15 PM', status: 'Completed' },
        { patientId: 'P-1006', patientName: 'Deepa Iyer', amount: 4800, paymentMethod: 'Debit Card', time: '4:30 PM', status: 'Completed' },
        { patientId: 'P-1019', patientName: 'Karan Mehra', amount: 3500, paymentMethod: 'Credit Card', time: '5:50 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-17',
      totalAmount: 15600,
      transactionCount: 4,
      pendingAmount: 0,
      patientTransactions: [
        { patientId: 'P-1020', patientName: 'Nisha Reddy', amount: 4200, paymentMethod: 'Credit Card', time: '10:15 AM', status: 'Completed' },
        { patientId: 'P-1005', patientName: 'Arjun Mehta', amount: 3800, paymentMethod: 'UPI', time: '12:30 PM', status: 'Completed' },
        { patientId: 'P-1021', patientName: 'Vivek Sharma', amount: 4100, paymentMethod: 'Cash', time: '2:45 PM', status: 'Completed' },
        { patientId: 'P-1004', patientName: 'Neha Gupta', amount: 3500, paymentMethod: 'Debit Card', time: '4:20 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-16',
      totalAmount: 24500,
      transactionCount: 6,
      pendingAmount: 0,
      patientTransactions: [
        { patientId: 'P-1022', patientName: 'Anand Patel', amount: 4500, paymentMethod: 'Credit Card', time: '9:30 AM', status: 'Completed' },
        { patientId: 'P-1001', patientName: 'Rahul Sharma', amount: 3800, paymentMethod: 'UPI', time: '11:15 AM', status: 'Completed' },
        { patientId: 'P-1023', patientName: 'Preeti Singhania', amount: 4200, paymentMethod: 'Cash', time: '1:40 PM', status: 'Completed' },
        { patientId: 'P-1003', patientName: 'Vikram Singh', amount: 3500, paymentMethod: 'Debit Card', time: '3:10 PM', status: 'Completed' },
        { patientId: 'P-1024', patientName: 'Mohan Das', amount: 4800, paymentMethod: 'Credit Card', time: '4:45 PM', status: 'Completed' },
        { patientId: 'P-1007', patientName: 'Mohammed Khan', amount: 3700, paymentMethod: 'UPI', time: '6:20 PM', status: 'Completed' }
      ]
    },
    {
      date: '2025-02-15',
      totalAmount: 20800,
      transactionCount: 5,
      pendingAmount: 0,
      patientTransactions: [
        { patientId: 'P-1025', patientName: 'Shalini Gupta', amount: 4200, paymentMethod: 'Credit Card', time: '10:10 AM', status: 'Completed' },
        { patientId: 'P-1002', patientName: 'Priya Patel', amount: 3800, paymentMethod: 'Cash', time: '11:45 AM', status: 'Completed' },
        { patientId: 'P-1026', patientName: 'Rajiv Malhotra', amount: 4500, paymentMethod: 'UPI', time: '1:30 PM', status: 'Completed' },
        { patientId: 'P-1006', patientName: 'Deepa Iyer', amount: 3800, paymentMethod: 'Debit Card', time: '3:15 PM', status: 'Completed' },
        { patientId: 'P-1027', patientName: 'Anjali Sharma', amount: 4500, paymentMethod: 'Credit Card', time: '5:40 PM', status: 'Completed' }
      ]
    }
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
    // Parse dates for comparison
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999); // Include the end date fully
    
    let filtered = dailyPayments.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= startDate && dayDate <= endDate;
    });
    
    // Apply search filter if exists
    if (searchTerm.trim() !== '') {
      filtered = filtered.map(day => {
        // Filter patient transactions based on search term
        const filteredTransactions = day.patientTransactions.filter(pt => 
          pt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          pt.patientId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // If no transactions match, exclude this day
        if (filteredTransactions.length === 0) {
          return null;
        }
        
        // Calculate new totals based on filtered transactions
        const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
        const pendingAmount = filteredTransactions
          .filter(t => t.status === 'Pending')
          .reduce((sum, t) => sum + t.amount, 0);
          
        return {
          ...day,
          patientTransactions: filteredTransactions,
          transactionCount: filteredTransactions.length,
          totalAmount,
          pendingAmount
        };
      }).filter(Boolean); // Remove null entries
    }
    
    setFilteredData(filtered);
    
    // Calculate summary statistics
    let totalAmount = 0;
    let completedTransactions = 0;
    let completedAmount = 0;
    let pendingTransactions = 0;
    let pendingAmount = 0;
    
    filtered.forEach(day => {
      totalAmount += day.totalAmount;
      
      day.patientTransactions.forEach(transaction => {
        if (transaction.status === 'Completed') {
          completedTransactions++;
          completedAmount += transaction.amount;
        } else {
          pendingTransactions++;
          pendingAmount += transaction.amount;
        }
      });
    });
    
    setSummaryStats({
      totalAmount,
      completedTransactions,
      completedAmount,
      pendingTransactions,
      pendingAmount
    });
    
  }, [dateRange, searchTerm]);

  // Apply filters
  const applyFilters = () => {
    // Filters are automatically applied via useEffect
    console.log("Filters applied");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Filter Controls */}
      <div className="px-6 py-4 flex flex-wrap justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-3 md:mb-0">Payment Transactions</h2>
        
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
              placeholder="Search patient name or ID" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64"
            />
          </div>
          
          <button 
            onClick={applyFilters}
            className="px-3 py-2 flex items-center gap-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Apply Filters</span>
          </button>
          
          <button className="px-3 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700 mb-1">Total Collection</p>
          <h3 className="text-2xl font-bold text-blue-900">₹{summaryStats.totalAmount.toLocaleString()}</h3>
          <p className="text-xs text-blue-600 mt-1">For selected period</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-700 mb-1">Completed Payments</p>
          <h3 className="text-2xl font-bold text-green-900">{summaryStats.completedTransactions} transactions</h3>
          <p className="text-xs text-green-600 mt-1">₹{summaryStats.completedAmount.toLocaleString()} ({summaryStats.totalAmount ? ((summaryStats.completedAmount / summaryStats.totalAmount) * 100).toFixed(1) : 0}%)</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-sm text-amber-700 mb-1">Pending Payments</p>
          <h3 className="text-2xl font-bold text-amber-900">{summaryStats.pendingTransactions} transactions</h3>
          <p className="text-xs text-amber-600 mt-1">₹{summaryStats.pendingAmount.toLocaleString()} ({summaryStats.totalAmount ? ((summaryStats.pendingAmount / summaryStats.totalAmount) * 100).toFixed(1) : 0}%)</p>
        </div>
      </div>
      
      {/* Daily Payment Table */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-10 px-4 py-3"></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                      <div className="text-gray-900">{day.transactionCount} payments</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="text-gray-900 font-medium">₹{day.totalAmount.toLocaleString()}</div>
                      {day.pendingAmount > 0 && (
                        <div className="text-xs text-amber-600">₹{day.pendingAmount.toLocaleString()} pending</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {day.pendingAmount === 0 ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          All Completed
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                          Partially Pending
                        </span>
                      )}
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
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Patient Transactions for {new Date(day.date).toLocaleDateString()}</h4>
                          <div className="overflow-x-auto rounded-md border border-gray-200">
                            <table className="min-w-full bg-white">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {day.patientTransactions.map((transaction, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{transaction.patientId}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.patientName}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{transaction.time}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <div className="flex items-center text-sm text-gray-600">
                                        <CreditCard className="h-4 w-4 mr-1.5 text-gray-400" />
                                        {transaction.paymentMethod}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">₹{transaction.amount.toLocaleString()}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                      {transaction.status === 'Completed' ? (
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                          Completed
                                        </span>
                                      ) : (
                                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                                          Pending
                                        </span>
                                      )}
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
            <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing {filteredData.length} of {dailyPayments.length} days
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled={dateRange.startDate === dailyPayments[dailyPayments.length-1].date}>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50" disabled={dateRange.endDate === dailyPayments[0].date}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}