import React, { useState, useEffect } from 'react';
import { Plus, Trash, Loader } from 'lucide-react';
import { doctorProfileApi } from '../../Api';

interface Medicine {
  serial_number: number;
  medicine_name: string;
  medicine_usage: string | null;
  medicine_effects: string | null;
  medicine_composition: string;
  medicine_company: string;
}
// Add interface
interface TestDetail {
    id: number;
    test_name: string;
    test_detail?: string[];
    price?: number;
  }
  


const MedicineAndLabs = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Medicine>({
    serial_number: 0,
    medicine_name: '',
    medicine_usage: '',
    medicine_effects: '',
    medicine_composition: '',
    medicine_company: ''
  });
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  // Add to component state

  const [newTest, setNewTest] = useState<TestDetail>({
    id: 0,
    test_name: '',
    test_detail: [],
    price: 0
  });
  const [isDeletingTest, setIsDeletingTest] = useState<number[]>([]);
  
  // Add handler functions
  const handleAddTest = async () => {
    setIsLoading(true);
    try {
      const response = await doctorProfileApi.postDoctorTest(newTest);
      setTests([...tests, newTest]);
      setNewTest({
        id: 0,
        test_name: '',
        test_detail: [],
        price: 0
      });
    } catch (error) {
      console.error('Error adding test:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteTest = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setIsDeletingTest(prev => [...prev, id]);
      try {
        await doctorProfileApi.deleteDoctorTest({ id });
        setTests(tests.filter(test => test.id !== id));
      } catch (error) {
        console.error('Error deleting test:', error);
      } finally {
        setIsDeletingTest(prev => prev.filter(testId => testId !== id));
      }
    }
  };
  const handleDeleteMedicine = async (serialNumber: number) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setDeletingIds(prev => [...prev, serialNumber]);
      try {
        await doctorProfileApi.deleteDoctorMedicines({ 
          serial_number_list: [serialNumber] 
        });
        setMedicines(medicines.filter(med => med.serial_number !== serialNumber));
      } catch (error) {
        console.error('Error deleting medicine:', error);
      } finally {
        setDeletingIds(prev => prev.filter(id => id !== serialNumber));
      }
    }
  };
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setIsLoading(true);
    try {
      const response = await doctorProfileApi.getDoctorMedicines({ doctor_profile: 'doctor_id' });
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMedicine = async () => {
    setIsLoading(true);
    try {
      const response = await doctorProfileApi.postDoctorMedicines(newMedicine);
      await fetchMedicines();
      setNewMedicine({
        serial_number: 0,
        medicine_name: '',
        medicine_usage: '',
        medicine_effects: '',
        medicine_composition: '',
        medicine_company: ''
      });
    } catch (error) {
      console.error('Error adding medicine:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Medicine Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Add New Medicine</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name*
            </label>
            <input
              type="text"
              placeholder="Enter medicine name"
              value={newMedicine.medicine_name}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicine_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company*
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              value={newMedicine.medicine_company}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicine_company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Composition*
            </label>
            <input
              type="text"
              placeholder="Enter composition"
              value={newMedicine.medicine_composition}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicine_composition: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usage
            </label>
            <input
              type="text"
              placeholder="Enter usage details"
              value={newMedicine.medicine_usage || ''}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicine_usage: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effects/Side Effects
            </label>
            <textarea
              placeholder="Enter effects or side effects"
              value={newMedicine.medicine_effects || ''}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicine_effects: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
        </div>
        <button
          onClick={handleAddMedicine}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : 'Add Medicine'}
        </button>
      </div>

      {/* Medicines List */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Medicines List</h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-4">
            {medicines.map((medicine) => (
              <div
                key={medicine.serial_number}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Medicine Name: </span>
                      <span className="text-gray-900">{medicine.medicine_name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Company: </span>
                      <span className="text-gray-900">{medicine.medicine_company}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Composition: </span>
                      <span className="text-gray-900">{medicine.medicine_composition}</span>
                    </div>
                    {medicine.medicine_usage && (
                      <div>
                        <span className="font-medium text-gray-700">Usage: </span>
                        <span className="text-gray-900">{medicine.medicine_usage}</span>
                      </div>
                    )}
                    {medicine.medicine_effects && (
                      <div>
                        <span className="font-medium text-gray-700">Effects: </span>
                        <span className="text-gray-900">{medicine.medicine_effects}</span>
                      </div>
                    )}
                  </div>
                  <button
  onClick={() => handleDeleteMedicine(medicine.serial_number)}
  disabled={deletingIds.includes(medicine.serial_number)}
  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full disabled:opacity-50"
>
  {deletingIds.includes(medicine.serial_number) ? (
    <Loader className="h-5 w-5 animate-spin" />
  ) : (
    <Trash className="h-5 w-5" />
  )}
</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && medicines.length === 0 && (
          <p className="text-center text-gray-500 py-8">No medicines added yet</p>
        )}
      </div>

      {/* Lab Tests Section */}
    <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Add New Lab Test</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Name*
          </label>
          <input
            type="text"
            placeholder="Enter test name"
            value={newTest.test_name}
            onChange={(e) => setNewTest({ ...newTest, test_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter price"
            value={newTest.price || ''}
            onChange={(e) => setNewTest({ ...newTest, price: Number(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            test_detail
          </label>
          <textarea
            placeholder="Enter test test_detail"
            value={newTest.test_detail || ''}
            onChange={(e) => setNewTest({ ...newTest, test_detail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
      </div>
      <button
        onClick={handleAddTest}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : 'Add Test'}
      </button>
    </div>

    {/* Tests List */}
    <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Lab Tests List</h3>
      <div className="grid gap-4">
        {tests.map((test) => (
          <div
            key={test.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Test Name: </span>
                  <span className="text-gray-900">{test.test_name}</span>
                </div>
                {test.price && (
                  <div>
                    <span className="font-medium text-gray-700">Price: </span>
                    <span className="text-gray-900">₹{test.price}</span>
                  </div>
                )}
                {test.test_detail && (
                  <div>
                    <span className="font-medium text-gray-700">test_detail: </span>
                    <span className="text-gray-900">{test.test_detail}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDeleteTest(test.id)}
                disabled={isDeletingTest.includes(test.id)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full disabled:opacity-50"
              >
                {isDeletingTest.includes(test.id) ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      {!isLoading && tests.length === 0 && (
        <p className="text-center text-gray-500 py-8">No tests added yet</p>
      )}
    </div>
    </div>
  );
};

export default MedicineAndLabs;