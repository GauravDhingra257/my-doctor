import { Card, CardBody, CardFooter, Button, Chip, Avatar } from "@heroui/react";
import { Star, Calendar, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import OtpModal from "./OtpModal";
import { useState } from "react";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);

  const goToDetail = (doctor) => {
    navigate(`/doctors/${doctor.id}`, { state: { doctor } });
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300 group-hover:duration-200"></div>
      <Card 
        className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md transition-all duration-300 ease-in-out group-hover:shadow-xl bg-white"
      >
        <div className="absolute top-0 right-0 m-2">
          <Chip 
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium border-none"
            size="sm"
          >
            {doctor.experience} yrs exp
          </Chip>
        </div>
        
        <CardBody className="pt-6 px-4">
          <div className="flex items-center">
            <Avatar
              src={doctor.imageUrl}
              className="w-20 h-20 rounded-full border-2 border-blue-200"
              alt={doctor.name}
            />
            <div className="ml-4">
              <h3 className="font-bold text-xl text-gray-800">{doctor.name}</h3>
              <p className="text-sm text-gray-600 font-medium">{doctor.specialty}</p>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{doctor.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center p-2 rounded-lg bg-gray-50">
              <Calendar className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-xs text-gray-600">Next Available Today</span>
            </div>
            <div className="flex items-center p-2 rounded-lg bg-gray-50">
              <User className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-xs text-gray-600">500+ Patients</span>
            </div>
          </div>
        </CardBody>
        
        <CardFooter className="bg-gray-50 border-t border-gray-100 py-3 px-4">
          <div className="w-full flex justify-between gap-2">
            <Button 
              color="primary" 
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-blue-600 border-none text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
              onClick={openModal}
              fullWidth
            >
              Book Now
            </Button>
            <Button 
              color="secondary" 
              variant="bordered" 
              size="sm"
              onClick={() => goToDetail(doctor)}
              className="border border-blue-300 text-blue-700 font-medium hover:bg-blue-50 transition-all duration-300"
              fullWidth
            >
              View Profile
            </Button>
          </div>
        </CardFooter>
      </Card>
      <OtpModal visible={isModalVisible} onClose={closeModal} />
    </div>
  );
};

export default DoctorCard;