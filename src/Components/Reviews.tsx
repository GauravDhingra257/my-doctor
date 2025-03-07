import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review, isDoctor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`transition-all duration-300 transform ${isHovered ? 'shadow-lg -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex items-center gap-4 p-4">
        <img
          src={review.avatar}
          className="rounded-full w-10 h-10"
        />
        <div>
          <h3 className="font-semibold">{review.name}</h3>
          {isDoctor ? (
            <p className="text-sm text-blue-600">{review.specialty}</p>
          ) : (
            <div className="flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 text-yellow-400 fill-yellow-400" 
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <p className="text-gray-600">{review.comment}</p>
        <p className="text-sm text-gray-400 mt-4">{review.date}</p>
      </CardBody>
    </Card>
  );
};

const ReviewSections = () => {
  const patientReviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing experience! Dr. Smith took the time to thoroughly explain my condition and treatment options. The booking process was seamless.",
      date: "Feb 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Very professional service. The app made it incredibly easy to find the right specialist and schedule an appointment.",
      date: "Feb 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment: "Great platform for managing healthcare appointments. The reminder system is particularly helpful.",
      date: "Jan 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    }
  ];

  const doctorReviews = [
    {
      name: "Dr. Jessica Martinez",
      specialty: "Cardiologist",
      comment: "This platform has streamlined my practice significantly. Patient scheduling and management have never been easier.",
      date: "Feb 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Dr. Robert Wilson",
      specialty: "Pediatrician",
      comment: "The integrated scheduling system has reduced no-shows by 50%. My patients love the convenience.",
      date: "Feb 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Dr. Laura Thompson",
      specialty: "Dermatologist",
      comment: "Excellent platform that helps me focus more on patient care rather than administrative tasks.",
      date: "Jan 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-12">
      {/* Patient Reviews Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patientReviews.map((review, index) => (
            <ReviewCard 
              key={index} 
              review={review} 
              isDoctor={false}
            />
          ))}
        </div>
      </section>

      {/* Doctor Reviews Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8">Healthcare Professionals Trust Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctorReviews.map((review, index) => (
            <ReviewCard 
              key={index} 
              review={review} 
              isDoctor={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewSections;