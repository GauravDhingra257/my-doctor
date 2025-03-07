import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Card,
  Radio,
  RadioGroup,
  Spinner,
  Select,
  SelectItem,
} from "@heroui/react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function notify(message = "Login Success") {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

const OtpModal = ({ visible, onClose }) => {
   const Gender = [
    { key: "Male", label: "Male" },
    { key: "Female", label: "Female" },
    { key: "Other", label: "Other" },
  ];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(Array(4).fill("")); // Array for 4 OTP inputs
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  // Patient form state
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  });

  // Sample patient data - in a real app this would come from an API
  const [patients, setPatients] = useState([
    { id: "1", name: "John Doe", age: 45, gender: "Male" },
    { id: "2", name: "Jane Smith", age: 32, gender: "Female" },
    { id: "3", name: "Robert Johnson", age: 58, gender: "Male" },
  ]);

  const handleSendOtp = () => {
    // Add logic to send OTP to the phone number here
    console.log("Sending OTP to:", phoneNumber);
    setIsOtpSent(true); // Show OTP input after sending
  };

  const handleOtpChange = (index, value) => {
    // Set OTP value for the specific index
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "").slice(0, 1); // Allow only 1 character per input
    setOtp(newOtp);
    // Move to next input automatically
    if (newOtp[index] !== "" && index < otp.length - 1) {
      document?.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous input when backspace is pressed on an empty input
      if (index > 0) {
        document?.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the OTP submission logic here
    console.log("OTP submitted:", otp.join(""));
    notify();
    setIsLoggedIn(true); // Move to patient selection screen
  };

  const handlePatientSelection = () => {
    console.log("Selected patient:", selectedPatient);
    // Here you would proceed to booking appointment with the selected patient
    onClose(); // Close the modal after selection
  };

  const handleAddPatient = () => {
    setShowAddPatientForm(true);
  };

  const handlePatientFormChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setNewPatient((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handlePatientFormSubmit = (e) => {
    e.preventDefault();
    // Add new patient to the list
    const newPatientId = (patients.length + 1).toString();
    const patientToAdd = {
      id: newPatientId,
      ...newPatient,
    };

    setPatients((prev) => [...prev, patientToAdd]);
    setSelectedPatient(newPatientId);
    setShowAddPatientForm(false);
    notify("Patient added successfully");
  };

  const handleCancelAddPatient = () => {
    setShowAddPatientForm(false);
  };

  const renderModalContent = () => {
    if (showAddPatientForm) {
      // Patient Form
      return (
        <>
          <ModalHeader>
            <h3 id="otp-modal-title" className="text-lg font-bold">
              Add New Patient
            </h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handlePatientFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={newPatient.name}
                  onChange={handlePatientFormChange}
                  placeholder="Enter patient name"
                  variant="bordered"
                  fullWidth
                  required
                />

                <Input
                  label="Age"
                  name="age"
                  type="number"
                  value={newPatient.age}
                  onChange={handlePatientFormChange}
                  placeholder="Enter age"
                  variant="bordered"
                  fullWidth
                  required
                />
                <div>
                <Select
                  className="max-w-xs"
                  label="Gender"
                  placeholder="Select Gender"
                  isRequired
                  onChange={(event)=>handleGenderChange(event.target.value)}
                >
                  {Gender.map((gender) => (
                    <SelectItem key={gender.key}>{gender.label}</SelectItem>
                  ))}
                </Select>
                </div>

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={newPatient.phone}
                  onChange={handlePatientFormChange}
                  placeholder="Enter phone number"
                  variant="bordered"
                  fullWidth
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={newPatient.email}
                  onChange={handlePatientFormChange}
                  placeholder="Enter email address"
                  variant="bordered"
                  fullWidth
                />

                <Input
                  label="Address"
                  name="address"
                  value={newPatient.address}
                  onChange={handlePatientFormChange}
                  placeholder="Enter address"
                  variant="bordered"
                  fullWidth
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  color="default"
                  variant="flat"
                  onClick={handleCancelAddPatient}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Add Patient
                </Button>
              </div>
            </form>
          </ModalBody>
        </>
      );
    } else if (!isOtpSent) {
      // Step 1: Phone number input
      return (
        <>
          <ModalHeader>
            <h3 id="otp-modal-title" className="text-lg font-bold">
              Enter Phone Number
            </h3>
          </ModalHeader>
          <ModalBody>
            <div>
              <Input
                variant="bordered"
                placeholder="+91 "
                fullWidth
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <div className="mt-4 flex justify-center">
                <Button color="primary" onClick={handleSendOtp}>
                  Send OTP
                </Button>
              </div>
            </div>
          </ModalBody>
        </>
      );
    } else if (!isLoggedIn) {
      // Step 2: OTP verification
      return (
        <>
          <ModalHeader>
            <h3 id="otp-modal-title" className="text-lg font-bold">
              Enter OTP
            </h3>
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className="w-12 text-center border border-primary font-bold text-lg"
                    required
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <Button type="submit" color="primary">
                  Login
                </Button>
              </div>
            </form>
          </ModalBody>
        </>
      );
    } else {
      // Step 3: Patient selection
      return (
        <>
          <ModalHeader>
            <h3 id="otp-modal-title" className="text-lg font-bold">
              Select Patient
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col space-y-4 w-full">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : patients.length > 0 ? (
                <>
                  <RadioGroup
                    value={selectedPatient}
                    onValueChange={setSelectedPatient}
                    className="w-full max-h-60 overflow-y-auto"
                  >

                    <div className="flex flex-col items-center justify-center space-y-2">
                      {patients.map((patient) => (
                        <Card
                          key={patient.id}
                          className={`p-3 cursor-pointer w-[90%] mx-2 box-border shrink-0 ${
                            selectedPatient === patient.id
                              ? "border-2 border-primary"
                              : ""
                          }`}
                          isPressable
                          onPress={() => setSelectedPatient(patient.id)}
                        >
                          <div className="flex items-center space-x-2 w-full">
                            <Radio
                              value={patient.id}
                              id={`patient-${patient.id}`}
                            />
                            <div className="flex-1">
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-gray-500">
                                {patient.age} years • {patient.gender}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between mt-4 w-full">
                    <Button
                      color="primary"
                      variant="flat"
                      onClick={handleAddPatient}
                    >
                      Add New Patient
                    </Button>
                    <Button
                      color="primary"
                      isDisabled={!selectedPatient}
                      onClick={handlePatientSelection}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 w-full">
                  <div className="text-center">
                    <p className="text-lg font-medium">No patients found</p>
                    <p className="text-sm text-gray-500">
                      Please add a patient to continue
                    </p>
                  </div>
                  <Button color="primary" size="lg" onClick={handleAddPatient}>
                    Add Patient
                  </Button>
                </div>
              )}
            </div>
          </ModalBody>
        </>
      );
    }
  };

  return (
    <Modal
    
      size="md"
      backdrop="blur"
      closeButton
      isOpen={visible}
      onClose={onClose}
      aria-labelledby="otp-modal-title"
    >
      <ModalContent>{renderModalContent()}</ModalContent>
    </Modal>
  );
};

export default OtpModal;
