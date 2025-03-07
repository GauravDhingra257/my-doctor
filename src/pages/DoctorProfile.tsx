import React from 'react'
import { Avatar, Button, Card, CardBody, CardHeader, Chip, Divider, Progress, Tabs, Tab } from "@heroui/react"
import { Calendar, Clock, MapPin, Phone, Mail, Star, ThumbsUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
}

interface TimeSlot {
  id: number
  day: string
  slots: string[]
}

interface Doctor {
  id: number
  name: string
  specialty: string
  experience: number
  rating: number
  imageUrl: string
  bio: string
  education: string[]
  location: string
  phone: string
  email: string
  reviews: Review[]
  timeSlots: TimeSlot[]
}

// const doctor: Doctor = {
//   id: 1,
//   name: "Dr. Emily Johnson",
//   specialty: "Cardiologist",
//   experience: 15,
//   rating: 4.8,
//   imageUrl: "/placeholder.svg?height=256&width=256",
//   bio: "Dr. Emily Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.",
//   education: [
//     "MD from Johns Hopkins University School of Medicine",
//     "Residency in Internal Medicine at Mayo Clinic",
//     "Fellowship in Cardiovascular Disease at Cleveland Clinic"
//   ],
//   location: "123 Medical Center Dr, Anytown, USA",
//   phone: "+1 (555) 123-4567",
//   email: "dr.emily.johnson@example.com",
//   reviews: [
//     { id: 1, name: "John D.", rating: 5, comment: "Dr. Johnson is incredibly knowledgeable and caring. She took the time to explain everything in detail.", date: "2023-05-15" },
//     { id: 2, name: "Sarah M.", rating: 4, comment: "Very professional and thorough. The wait time was a bit long, but the care was excellent.", date: "2023-06-02" },
//     { id: 3, name: "Robert L.", rating: 5, comment: "Dr. Johnson literally saved my life. Her quick diagnosis and treatment plan were spot on.", date: "2023-06-20" }
//   ],
//   timeSlots: [
//     { id: 1, day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
//     { id: 2, day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] },
//     { id: 3, day: "Friday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] }
//   ]
// }

const DoctorProfile= () => {
  const location = useLocation();
  const doctor = location.state?.doctor; // Access the JSON data

  if (!doctor) {
    return <p>No doctor data available.</p>;
  }
  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="flex flex-col sm:flex-row gap-4">
            <Avatar src={doctor.imageUrl} className="w-32 h-32 text-large" alt={doctor.name} />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">{doctor.name}</h1>
              <p className="text-default-500">{doctor.specialty}</p>
              <div className="flex items-center mt-2">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-default-700">{doctor.rating} ({doctor.reviews.length} reviews)</span>
              </div>
              <Chip className="mt-2 w-fit" color="primary" size="sm">
                {doctor.experience} years experience
              </Chip>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-default-700 mb-4">{doctor.bio}</p>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <ul className="list-disc list-inside mb-4">
              {doctor.education.map((edu, index) => (
                <li key={index} className="text-default-700">{edu}</li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-default-400" />
                <span className="text-default-700">{doctor.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-default-400" />
                <span className="text-default-700">{doctor.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-default-400" />
                <span className="text-default-700">{doctor.email}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Tabs aria-label="Doctor profile tabs">
          <Tab key="appointments" title="Book Appointment">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
                {doctor.timeSlots.map((daySlot) => (
                  <div key={daySlot.id} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{daySlot.day}</h3>
                    <div className="flex flex-wrap gap-2">
                      {daySlot.slots.map((slot, index) => (
                        <Button key={index} size="sm" variant="bordered">
                          <Clock className="w-4 h-4 mr-2" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="reviews" title="Reviews">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Patient Reviews</h2>
                {doctor.reviews.map((review) => (
                  <div key={review.id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{review.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-default-700 mb-1">{review.comment}</p>
                    <span className="text-small text-default-400">{review.date}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
    </div>
  )
}

export default DoctorProfile