import React, { useEffect, useState } from "react";
import {
  Camera,
  Check,
  Info,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doctorProfileApi, doctorUserApi } from "../../Api";
import { form } from "@heroui/react";
import MedicineAndLabs from "./MedicineAndLabs";
import docStore from "../../docStore/docStore";

const DoctorSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Navigation tab handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="flex flex-col space-y-1 w-full">
                <button
                  onClick={() => handleTabClick("profile")}
                  className={`text-left px-4 py-2 rounded ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => handleTabClick("medicineAndLabs")}
                  className={`text-left px-4 py-2 rounded ${
                    activeTab === "medicineAndLabs"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Medicine and Labs
                </button>
                <button
                  onClick={() => handleTabClick("subscription")}
                  className={`text-left px-4 py-2 rounded ${
                    activeTab === "subscription"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Subscription
                </button>
                <button
                  onClick={() => handleTabClick("bank")}
                  className={`text-left px-4 py-2 rounded ${
                    activeTab === "bank"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Bank Details
                </button>
                <button
                  onClick={() => handleTabClick("notifications")}
                  className={`text-left px-4 py-2 rounded ${
                    activeTab === "notifications"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => handleTabClick("security")}
                  className={`text-left px-4 py-2 rounded ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Security
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-2">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "medicineAndLabs" && <MedicineAndLabs />}
            {activeTab === "subscription" && <SubscriptionTab />}
            {activeTab === "bank" && <BankDetailsTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "security" && <SecurityTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  const [educationFields, setEducationFields] = useState([]);
  const [experienceFields, setExperienceFields] = useState([]);
  const [awardFields, setAwardFields] = useState([]);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await doctorProfileApi.getDoctorProfile();
        if (response.status === 200) {
          setProfileData(response.data); // Set profile data
          setEducationFields(response.data.education || []); // Set education fields
          setExperienceFields(response.data.experiences || []); // Set experience fields
          setAwardFields(response.data.awards || []); // Set award fields
        } else {
          setProfileData(null); // No profile exists
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfileData(null); // No profile exists
      }
    };

    fetchProfile();
  }, []);
  const handleEditClick = () => {
    setIsEditable(true); // Enable edit mode
  };
  // Handler to add a new field dynamically
  const handleAddField = (setFields, fields) => {
    setFields([...fields, {}]); // Add an empty object to the fields array
  };

  // Handler to update the value of a specific field
  const handleFieldChange = (index, field, value, setFields, fields) => {
    const updatedFields = [...fields]; // Create a copy of the fields array
    updatedFields[index][field] = value; // Update the specific field at the given index
    setFields(updatedFields); // Update the state with the modified fields array
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Append dynamic fields to FormData
    if (educationFields.length > 0) {
      formData.append("education", JSON.stringify(educationFields));
    }

    if (experienceFields.length > 0) {
      formData.append("experiences", JSON.stringify(experienceFields));
    }

    if (awardFields.length > 0) {
      formData.append("awards", JSON.stringify(awardFields));
    }

    try {
      if (profileData) {
        // Update profile using PUT API
        const response = await doctorProfileApi.patchDoctorProfile(formData);
        console.log("Profile updated successfully:", response.data);
        setIsEditable(false); // Disable edit mode
      } else {
        // Create profile using POST API
        const response = await doctorProfileApi.postDoctorProfile(formData);
        console.log("Profile created successfully:", response.data);
        setProfileData(response.data); // Set the newly created profile
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        {/* Profile Photo */}
        <div className="relative">
          {profileData?.profile_image ? (
            <img
              src={profileData?.profile_image}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-2 border-blue-500"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <Camera className="h-8 w-8" />
            </div>
          )}
          {(isEditable || profileData == null) && (
            <label
              htmlFor="profile_image"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
            >
              <Camera className="h-4 w-4" />
              <input
                type="file"
                id="profile_image"
                name="profile_image"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setProfileData({
                        ...profileData,
                        profile_image: reader.result,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          )}
        </div>
        <h2 className="text-lg font-medium text-gray-800">
          Profile Information
        </h2>
      </div>
      <div className="p-6">
        {profileData ? (
          // Render profile fields as non-editable with a pencil icon
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={profileData?.name}
                    readOnly={!isEditable}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {!isEditable && (
                    <Pencil
                      className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                      onClick={handleEditClick}
                    />
                  )}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={profileData?.gender}
                  disabled={!isEditable}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  defaultValue={profileData?.age}
                  readOnly={!isEditable}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label
                  htmlFor="experience_in_years"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience_in_years"
                  name="experience_in_years"
                  defaultValue={profileData?.experience_in_years}
                  readOnly={!isEditable}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Languages */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Languages
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  defaultValue={profileData?.language}
                  readOnly={!isEditable}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  defaultValue={profileData?.designation}
                  readOnly={!isEditable}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
              {/* Dynamic Education Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                {educationFields.length > 0 ? (
                  educationFields.map((field, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={field.degree || ""}
                        readOnly={!isEditable}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "degree",
                            e.target.value,
                            setEducationFields,
                            educationFields
                          )
                        }
                        className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={field.institution || ""}
                        readOnly={!isEditable}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "institution",
                            e.target.value,
                            setEducationFields,
                            educationFields
                          )
                        }
                        className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No education details available.
                  </p>
                )}
                <button
                  type="button"
                  disabled={!isEditable}
                  onClick={() =>
                    handleAddField(setEducationFields, educationFields)
                  }
                  className={`text-blue-500 flex items-center  ${
                    isEditable ? "" : "cursor-not-allowed text-gray-500"
                  }`}
                >
                  <Plus className="mr-1" /> Add Education
                </button>
              </div>

              {/* Dynamic Experiences Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experiences
                </label>
                {experienceFields.length > 0 ? (
                  experienceFields.map((field, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="Hospital"
                        value={field.hospital || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "hospital",
                            e.target.value,
                            setExperienceFields,
                            experienceFields
                          )
                        }
                        className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={field.duration || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "duration",
                            e.target.value,
                            setExperienceFields,
                            experienceFields
                          )
                        }
                        className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No experience details available.
                  </p>
                )}
                <button
                  type="button"
                  disabled={!isEditable}
                  onClick={() =>
                    handleAddField(setExperienceFields, experienceFields)
                  }
                  className={`text-blue-500 flex items-center  ${
                    isEditable ? "" : "cursor-not-allowed text-gray-500"
                  }`}
                >
                  <Plus className="mr-1" /> Add Experience
                </button>
              </div>

              {/* Dynamic Awards Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Awards & Achievements
                </label>
                {awardFields.length > 0 ? (
                  awardFields.map((field, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        placeholder={`Award ${field.key}`}
                        value={field.value || ""}
                        onChange={(e) => {
                          const updatedAwards = [...awardFields];
                          updatedAwards[index].value = e.target.value;
                          setAwardFields(updatedAwards);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No awards or achievements available.
                  </p>
                )}
                <button
                  type="button"
                  disabled={!isEditable}
                  onClick={() => {
                    const newKey = awardFields.length + 1;
                    setAwardFields([
                      ...awardFields,
                      { key: newKey, value: "" },
                    ]);
                  }}
                  className={`text-blue-500 flex items-center  ${
                    isEditable ? "" : "cursor-not-allowed text-gray-500"
                  }`}
                >
                  <Plus className="mr-1" /> Add Award
                </button>
              </div>

              {/* License Number */}
              <div>
                <label
                  htmlFor="license_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  License Number
                </label>
                <input
                  type="text"
                  id="license_number"
                  name="license_number"
                  defaultValue={profileData?.license_number}
                  readOnly={!isEditable}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* License Image */}
              <div>
                <label
                  htmlFor="license_image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  License Image
                </label>
                {isEditable && (
                  <input
                    type="file"
                    id="license_image"
                    name="license_image"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Profile Image */}
              <div>
                <label
                  htmlFor="profile_image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Image
                </label>
                {isEditable && (
                  <input
                    type="file"
                    id="profile_image"
                    name="profile_image"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Save Changes Button */}
            {isEditable && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        ) : (
          // Render form to create a new profile
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="experience_in_years"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience_in_years"
                  name="experience_in_years"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Languages
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Dynamic Education Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              {educationFields.length > 0 ? (
                educationFields.map((field, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={field.degree || ""}
                      readOnly={!isEditable}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "degree",
                          e.target.value,
                          setEducationFields,
                          educationFields
                        )
                      }
                      className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={field.institution || ""}
                      readOnly={!isEditable}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "institution",
                          e.target.value,
                          setEducationFields,
                          educationFields
                        )
                      }
                      className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No education details available.
                </p>
              )}
              <button
                type="button"
                disabled={!isEditable}
                onClick={() =>
                  handleAddField(setEducationFields, educationFields)
                }
                className={`text-blue-500 flex items-center  ${
                  isEditable ? "" : "cursor-not-allowed text-gray-500"
                }`}
              >
                <Plus className="mr-1" /> Add Education
              </button>
            </div>

            {/* Dynamic Experiences Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experiences
              </label>
              {experienceFields.length > 0 ? (
                experienceFields.map((field, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Hospital"
                      value={field.hospital || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "hospital",
                          e.target.value,
                          setExperienceFields,
                          experienceFields
                        )
                      }
                      className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={field.duration || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "duration",
                          e.target.value,
                          setExperienceFields,
                          experienceFields
                        )
                      }
                      className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No experience details available.
                </p>
              )}
              <button
                type="button"
                disabled={!isEditable}
                onClick={() =>
                  handleAddField(setExperienceFields, experienceFields)
                }
                className={`text-blue-500 flex items-center  ${
                  isEditable ? "" : "cursor-not-allowed text-gray-500"
                }`}
              >
                <Plus className="mr-1" /> Add Experience
              </button>
            </div>

            {/* Dynamic Awards Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Awards & Achievements
              </label>
              {awardFields.length > 0 ? (
                awardFields.map((field, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder={`Award ${field.key}`}
                      value={field.value || ""}
                      onChange={(e) => {
                        const updatedAwards = [...awardFields];
                        updatedAwards[index].value = e.target.value;
                        setAwardFields(updatedAwards);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No awards or achievements available.
                </p>
              )}
              <button
                type="button"
                disabled={!isEditable}
                onClick={() => {
                  const newKey = awardFields.length + 1;
                  setAwardFields([...awardFields, { key: newKey, value: "" }]);
                }}
                className={`text-blue-500 flex items-center  ${
                  isEditable ? "" : "cursor-not-allowed text-gray-500"
                }`}
              >
                <Plus className="mr-1" /> Add Award
              </button>
            </div>

            {/* License Number */}
            <div>
              <label
                htmlFor="license_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                License Number
              </label>
              <input
                type="text"
                id="license_number"
                name="license_number"
                defaultValue={profileData?.license_number}
                readOnly={!isEditable}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* License Image */}
            <div>
              <label
                htmlFor="license_image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                License Image
              </label>
              {profileData?.license_image && (
                <img
                  src={profileData?.license_image}
                  alt="License"
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
              )}
              {isEditable && (
                <input
                  type="file"
                  id="license_image"
                  name="license_image"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label
                htmlFor="profile_image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Image
              </label>
              {profileData?.profile_image && (
                <img
                  src={profileData?.profile_image}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
              )}
              {isEditable && (
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const SubscriptionTab = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">
          Current Subscription
        </h2>
      </div>
      <div className="p-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Premium Plan
              </h3>
              <p className="text-gray-600">₹4,999/month, billed annually</p>
              <p className="text-sm text-blue-600 mt-1">
                Renews on March 15, 2025
              </p>
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
          <button
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate("/subscriptions")}
          >
            Change Plan
          </button>
          <button className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

const BankDetailsTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Bank Details</h2>
      </div>
      <div className="p-6">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 mt-0.5 mr-2 text-amber-500" />
            <p className="text-sm text-amber-800">
              Your bank details are used for receiving payments from patients.
              Please ensure all information is accurate.
            </p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="accountName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                defaultValue="Dr. Sarah Johnson"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                defaultValue="XXXX XXXX XXXX 4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                defaultValue="HDFC Bank"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="ifscCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                IFSC Code
              </label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                defaultValue="HDFC0001234"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* only show fields, no use in post and patch */}
            <div>
              <label
                htmlFor="active"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Active
              </label>
              <input
                type="text"
                id="active"
                name="active"
                defaultValue="True"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="verifiedByUser"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Verified
              </label>
              <input
                type="text"
                id="verifiedByUser"
                name="verifiedByUser"
                defaultValue="True"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
  );
};

const NotificationsTab = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  // State for toggle switches
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false,
  });
  // Toggle switch handler
  const handleToggle = (type) => {
    if (type === "2fa") {
      setTwoFactorAuth(!twoFactorAuth);
    } else {
      setNotifications({
        ...notifications,
        [type]: !notifications[type],
      });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">
          Notification Preferences
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive emails about appointment bookings
              </p>
            </div>
            <div
              className="relative inline-flex items-center cursor-pointer"
              onClick={() => handleToggle("email")}
            >
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
              <p className="text-sm text-gray-500">
                Receive SMS alerts for upcoming appointments
              </p>
            </div>
            <div
              className="relative inline-flex items-center cursor-pointer"
              onClick={() => handleToggle("sms")}
            >
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
              <p className="text-sm text-gray-500">
                Receive push notifications on your device
              </p>
            </div>
            <div
              className="relative inline-flex items-center cursor-pointer"
              onClick={() => handleToggle("push")}
            >
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
              <p className="text-sm text-gray-500">
                Receive updates about new features and services
              </p>
            </div>
            <div
              className="relative inline-flex items-center cursor-pointer"
              onClick={() => handleToggle("marketing")}
            >
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
  );
};

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { doctordecodedjwt } = docStore();
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Security Settings</h2>
      </div>
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-md font-medium mb-4">Change Password</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData(e.target as HTMLFormElement);
              const currentPassword = formData.get("currentPassword") as string;
              const newPassword = formData.get("newPassword") as string;
              const confirmPassword = formData.get("confirmPassword") as string;

              if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match.");
                return;
              }

              try {
                const response = await doctorUserApi.patchDoctorLogin({
                  current_password: currentPassword,
                  new_password: newPassword,
                  new_password2: confirmPassword,
                  user_type: doctordecodedjwt.user_type,
                });
                console.log("Password updated successfully:", response.data);
                alert("Password updated successfully.");
                e.target.reset(); // Reset the form after successful submission
              } catch (error) {
                console.error("Error updating password:", error);
                alert("Error updating password. Please try again.");
              }
            }}
          >
            <div className="space-y-4 mb-6">
              <div className="relative">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
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
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
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
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
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
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
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
  );
};
export default DoctorSettings;
