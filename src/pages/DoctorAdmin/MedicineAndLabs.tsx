import React, { useState, useEffect } from "react";
import { Plus, Trash, Loader } from "lucide-react";
import { doctorProfileApi } from "../../Api";

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
    medicine_name: "",
    medicine_usage: "",
    medicine_effects: "",
    medicine_composition: "",
    medicine_company: "",
  });
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  // Add to component state

  const [newTest, setNewTest] = useState<TestDetail>({
    id: 0,
    test_name: "",
    test_detail: [],
    price: 0,
  });
  const [isDeletingTest, setIsDeletingTest] = useState<number[]>([]);
  const [showTestModal, setShowTestModal] = useState(false);

  // Add handler functions
  const handleAddTest = async () => {
    setIsLoading(true);
    try {
      const response = await doctorProfileApi.postDoctorTest(newTest);
      setTests([...tests, newTest]);
      setNewTest({
        id: 0,
        test_name: "",
        test_detail: [],
        price: 0,
      });
    } catch (error) {
      console.error("Error adding test:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTest = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      setIsDeletingTest((prev) => [...prev, id]);
      try {
        await doctorProfileApi.deleteDoctorTest({ test_detail: [id] });
        setTests(tests.filter((test) => test.id !== id));
      } catch (error) {
        console.error("Error deleting test:", error);
      } finally {
        setIsDeletingTest((prev) => prev.filter((testId) => testId !== id));
      }
    }
  };
  const handleDeleteMedicine = async (serialNumber: number) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setDeletingIds((prev) => [...prev, serialNumber]);
      try {
        await doctorProfileApi.deleteDoctorMedicines({
          serial_number_list: [serialNumber],
        });
        setMedicines(
          medicines.filter((med) => med.serial_number !== serialNumber)
        );
      } catch (error) {
        console.error("Error deleting medicine:", error);
      } finally {
        setDeletingIds((prev) => prev.filter((id) => id !== serialNumber));
      }
    }
  };
  useEffect(() => {
    fetchMedicinesAndTests();
  }, []);

  const fetchMedicinesAndTests = async () => {
    setIsLoading(true);
    try {
      // Fetch medicines
      const medicinesResponse = await doctorProfileApi.getDoctorMedicines({
        doctor_profile: "doctor_id",
      });
      setMedicines(medicinesResponse.data);

      // Fetch tests
      const testsResponse = await doctorProfileApi.getDoctorTest();
      setTests(testsResponse.data);
    } catch (error) {
      console.error("Error fetching medicines or tests:", error);
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
        medicine_name: "",
        medicine_usage: "",
        medicine_effects: "",
        medicine_composition: "",
        medicine_company: "",
      });
    } catch (error) {
      console.error("Error adding medicine:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Medicine and Labs</h2>
      </div>
      <div className="p-6"></div>
      <div className="max-w-4xl mx-auto">
        {/* Add Medicine Modal */}
        <button
          onClick={() => setShowMedicineModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Medicine
        </button>
        {showMedicineModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Add New Medicine
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter medicine name"
                    value={newMedicine.medicine_name}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        medicine_name: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        medicine_company: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        medicine_composition: e.target.value,
                      })
                    }
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
                    value={newMedicine.medicine_usage || ""}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        medicine_usage: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Effects/Side Effects
                  </label>
                  <textarea
                    placeholder="Enter effects or side effects"
                    value={newMedicine.medicine_effects || ""}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        medicine_effects: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowMedicineModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMedicine}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader className="animate-spin h-5 w-5 mx-auto" />
                  ) : (
                    "Add Medicine"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Medicines List as Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Medicines List
          </h3>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="animate-spin h-8 w-8 text-blue-600" />
            </div>
          ) : (
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Serial Number
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Company
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Composition
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Usage
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Effects
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.serial_number} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {medicine.serial_number}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {medicine.medicine_name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {medicine.medicine_company}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {medicine.medicine_composition}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {medicine.medicine_usage || "-"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {medicine.medicine_effects || "-"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      <button
                        onClick={() =>
                          handleDeleteMedicine(medicine.serial_number)
                        }
                        disabled={deletingIds.includes(medicine.serial_number)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full disabled:opacity-50"
                      >
                        {deletingIds.includes(medicine.serial_number) ? (
                          <Loader className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && medicines.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No medicines added yet
            </p>
          )}
        </div>

        {/* Add Test Modal */}
        <button
          onClick={() => setShowTestModal(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-4"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Test
        </button>
        {showTestModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Add New Test
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter test name"
                    value={newTest.test_name}
                    onChange={(e) =>
                      setNewTest({ ...newTest, test_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={newTest.price || ""}
                    onChange={(e) =>
                      setNewTest({ ...newTest, price: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTest}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader className="animate-spin h-5 w-5 mx-auto" />
                  ) : (
                    "Add Test"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tests List as Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Tests List
          </h3>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="animate-spin h-8 w-8 text-green-600" />
            </div>
          ) : (
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Test Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Price
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {test.test_name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      ₹{test.price || "-"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && tests.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tests added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineAndLabs;
