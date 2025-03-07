// src/pages/Doctors.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger} from "@heroui/react";
import DoctorCard from '../Components/DoctorCard';
import { ChevronDown, Search } from 'lucide-react';
import { getLocation } from '../Utils/utilities';

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Cardiologist",
    experience: 15,
    rating: 4.8,
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Dr. Emily Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.",
    education: [
      "MD from Johns Hopkins University School of Medicine",
      "Residency in Internal Medicine at Mayo Clinic",
      "Fellowship in Cardiovascular Disease at Cleveland Clinic"
    ],
    location: "123 Medical Center Dr, Anytown, USA",
    phone: "+1 (555) 123-4567",
    email: "dr.emily.johnson@example.com",
    reviews: [
      { id: 1, name: "John D.", rating: 5, comment: "Dr. Johnson is incredibly knowledgeable and caring. She took the time to explain everything in detail.", date: "2023-05-15" },
      { id: 2, name: "Sarah M.", rating: 4, comment: "Very professional and thorough. The wait time was a bit long, but the care was excellent.", date: "2023-06-02" },
      { id: 3, name: "Robert L.", rating: 5, comment: "Dr. Johnson literally saved my life. Her quick diagnosis and treatment plan were spot on.", date: "2023-06-20" }
    ],
    timeSlots: [
      { id: 1, day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
      { id: 2, day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] },
      { id: 3, day: "Friday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] }
    ]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    experience: 10,
    rating: 4.6,
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "Dr. Michael Chen is a skilled pediatrician with a decade of experience in child healthcare. He has a special interest in childhood immunizations and developmental disorders.",
    education: [
      "MD from Stanford University School of Medicine",
      "Residency in Pediatrics at Boston Children's Hospital"
    ],
    location: "456 Health Ave, New City, USA",
    phone: "+1 (555) 234-5678",
    email: "dr.michael.chen@example.com",
    reviews: [
      { id: 1, name: "Lisa W.", rating: 5, comment: "Dr. Chen is amazing with kids and puts parents at ease.", date: "2023-04-12" },
      { id: 2, name: "Tom R.", rating: 4, comment: "Knowledgeable and kind, but the office is quite busy.", date: "2023-05-07" }
    ],
    timeSlots: [
      { id: 1, day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
      { id: 2, day: "Thursday", slots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] }
    ]
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialty: "Dermatologist",
    experience: 12,
    rating: 4.9,
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    bio: "Dr. Sarah Patel specializes in skincare and treatment of dermatological conditions. She has a passion for helping patients achieve healthy, radiant skin.",
    education: [
      "MD from University of California, San Francisco",
      "Residency in Dermatology at NYU Medical Center"
    ],
    location: "789 SkinCare Blvd, Cosmopolitan City, USA",
    phone: "+1 (555) 345-6789",
    email: "dr.sarah.patel@example.com",
    reviews: [
      { id: 1, name: "Alice P.", rating: 5, comment: "Dr. Patel helped me clear up my skin issues completely.", date: "2023-07-14" },
      { id: 2, name: "Ben T.", rating: 5, comment: "Excellent dermatologist. Very attentive and helpful.", date: "2023-07-20" }
    ],
    timeSlots: [
      { id: 1, day: "Monday", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] },
      { id: 2, day: "Thursday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] }
    ]
  },
  {
    id: 4,
    name: "Dr. David Smith",
    specialty: "Orthopedic Surgeon",
    experience: 20,
    rating: 4.7,
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    bio: "Dr. David Smith has extensive experience in orthopedic surgery, specializing in knee and hip replacements. He’s known for his meticulous surgical skills.",
    education: [
      "MD from University of Michigan Medical School",
      "Residency in Orthopedic Surgery at University of Chicago"
    ],
    location: "101 Joint Clinic, Metro City, USA",
    phone: "+1 (555) 456-7890",
    email: "dr.david.smith@example.com",
    reviews: [
      { id: 1, name: "Karen L.", rating: 4, comment: "Surgery was a success! Dr. Smith is highly skilled.", date: "2023-03-05" }
    ],
    timeSlots: [
      { id: 1, day: "Tuesday", slots: ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"] },
      { id: 2, day: "Thursday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] }
    ]
  },
  {
    id: 5,
    name: "Dr. Anna Gomez",
    specialty: "Neurologist",
    experience: 8,
    rating: 4.5,
    imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    bio: "Dr. Anna Gomez is a neurologist with expertise in neurological disorders such as epilepsy and multiple sclerosis. She provides compassionate care to her patients.",
    education: [
      "MD from Harvard Medical School",
      "Residency in Neurology at Columbia University Medical Center"
    ],
    location: "202 Brain Health St, Uptown, USA",
    phone: "+1 (555) 567-8901",
    email: "dr.anna.gomez@example.com",
    reviews: [
      { id: 1, name: "Nancy O.", rating: 4, comment: "Dr. Gomez is thorough and patient-focused.", date: "2023-08-01" }
    ],
    timeSlots: [
      { id: 1, day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
      { id: 2, day: "Friday", slots: ["10:00 AM", "12:00 PM", "2:00 PM"] }
    ]
  },
  {
    id: 6,
    name: "Dr. Laura Martinez",
    specialty: "Psychiatrist",
    experience: 14,
    rating: 4.9,
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
    bio: "Dr. Laura Martinez specializes in mental health, with a focus on anxiety and mood disorders. She takes a holistic approach to mental well-being.",
    education: [
      "MD from Yale School of Medicine",
      "Residency in Psychiatry at Massachusetts General Hospital"
    ],
    location: "303 Wellness Rd, Tranquil Town, USA",
    phone: "+1 (555) 678-9012",
    email: "dr.laura.martinez@example.com",
    reviews: [
      { id: 1, name: "Tom S.", rating: 5, comment: "Dr. Martinez helped me immensely with my anxiety issues.", date: "2023-05-10" }
    ],
    timeSlots: [
      { id: 1, day: "Monday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
      { id: 2, day: "Thursday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] }
    ]
  }
]


const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call getLocation on component mount
    const fetchLocation = async () => {
      try {
        const result = await getLocation();
        if (result.city) {
          setLocation(result);  // Set location if found
        } else {
          setError(result.message);  // Handle case when location is already fetched or error occurs
        }
      } catch (err) {
        setError(err);  // Handle error
      }
    };

    fetchLocation();  // Fetch location
  }, []); // Empty dependency array ensures this only runs once on component mount  // Empty dependency array to run only once on mount
  const specialties = useMemo(() => {
    const allSpecialties = doctors.map(doctor => doctor.specialty)
    return ["All Specialties", ...new Set(allSpecialties)]
  }, [])

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty)
    )
  }, [searchTerm, selectedSpecialty])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Find Your Doctor</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            isClearable
            className="w-full sm:w-2/3"
            placeholder="Search by doctor name"
            startContent={<Search className="text-default-300" />}
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                className="w-full sm:w-1/3"
                endContent={<ChevronDown className="text-small" />}
              >
                {selectedSpecialty}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Specialty selection"
              selectionMode="single"
              selectedKeys={[selectedSpecialty]}
              onSelectionChange={(keys) => setSelectedSpecialty(Array.from(keys)[0] as string)}
            >
              {specialties.map((specialty) => (
                <DropdownItem key={specialty}>{specialty}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-center">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
      {filteredDoctors.length === 0 && (
        <p className="text-center text-xl mt-8">No doctors found matching your criteria.</p>
      )}
    </div>
  )
};

export default Doctors;
