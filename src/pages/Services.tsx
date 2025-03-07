import React, { useState } from 'react';

const ServicePage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const doctorServices = [
    {
      title: "Patient Management System",
      description: "Streamline patient records, appointments, and medical histories with our comprehensive management system.",
      icon: "📊"
    },
    {
      title: "Telemedicine Integration",
      description: "Connect with patients remotely through secure video consultations and follow-ups.",
      icon: "📱"
    },
    {
      title: "Prescription Management",
      description: "Digitally prescribe medications with automatic checks for drug interactions and allergies.",
      icon: "💊"
    },
    {
      title: "Analytics Dashboard",
      description: "Track practice performance, patient satisfaction, and revenue streams with intuitive visualizations.",
      icon: "📈"
    }
  ];

  const patientServices = [
    {
      title: "Online Appointment Booking",
      description: "Schedule appointments with your doctor at your convenience through our user-friendly portal.",
      icon: "🗓️"
    },
    {
      title: "Medical Records Access",
      description: "View your medical history, test results, and treatment plans securely from any device.",
      icon: "📋"
    },
    {
      title: "Medication Reminders",
      description: "Receive timely notifications for medication schedules and prescription refills.",
      icon: "⏰"
    },
    {
      title: "Secure Messaging",
      description: "Communicate directly with your healthcare provider for non-urgent queries and updates.",
      icon: "✉️"
    }
  ];

  const faqs = [
    {
      question: "How secure is my patient data in the system?",
      answer: "Our platform employs industry-leading encryption standards and is fully HIPAA-compliant. All data is encrypted both in transit and at rest, ensuring maximum security for sensitive medical information."
    },
    {
      question: "Can I integrate this system with existing hospital software?",
      answer: "Yes, our system offers robust API integration capabilities that allow seamless connection with most major hospital management systems, laboratory information systems, and electronic health record platforms."
    },
    {
      question: "What training is provided for doctors and staff?",
      answer: "We provide comprehensive onboarding including live training sessions, on-demand video tutorials, and detailed documentation. Our support team is also available for personalized assistance during implementation."
    },
    {
      question: "How do patients access their portal?",
      answer: "Patients receive a secure invitation link via email or SMS. They can then create their account with strong authentication measures, including two-factor authentication for enhanced security."
    },
    {
      question: "Is the platform accessible on mobile devices?",
      answer: "Yes, our platform is fully responsive and optimized for all devices. We also offer dedicated mobile apps for both iOS and Android with all the core functionality of the web version."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-6 py-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">NextHealthCare</h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">Empowering doctors and patients with innovative digital health technology</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Request Demo
            </button>
            <button className="bg-transparent hover:bg-blue-400 text-white border border-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Services for Doctors Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Services for Doctors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Enhance your practice with our suite of tools designed specifically for healthcare providers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Services for Patients Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Services for Patients</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Improving your healthcare experience with convenient and accessible digital tools</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {patientServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our Platform?</h2>
            <ul className="space-y-4">
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">HIPAA Compliant Security</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">Intuitive User Experience</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">Seamless Integration Capabilities</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">24/7 Technical Support</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">Regular Feature Updates</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 bg-blue-50 rounded-xl p-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Dr. Smith Dashboard</h3>
                  <p className="text-sm text-gray-500">Today's Overview</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Live Demo</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Appointments</p>
                  <p className="text-2xl font-bold text-gray-800">8</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">New Patients</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Pending Reports</p>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Messages</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded transition duration-300">
                Explore Full Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Trusted by healthcare professionals across the country</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">JS</span>
                </div>
                <div>
                  <h3 className="font-semibold">Dr. James Smith</h3>
                  <p className="text-gray-400 text-sm">Cardiologist</p>
                </div>
              </div>
              <p className="text-gray-300">"This platform has revolutionized my practice. The patient management system is intuitive and the analytics help me make data-driven decisions for my practice."</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">AP</span>
                </div>
                <div>
                  <h3 className="font-semibold">Dr. Amelia Parker</h3>
                  <p className="text-gray-400 text-sm">Pediatrician</p>
                </div>
              </div>
              <p className="text-gray-300">"My patients love the online booking system and medication reminders. It's made healthcare more accessible for busy parents and improved medication adherence."</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">RJ</span>
                </div>
                <div>
                  <h3 className="font-semibold">Robert Johnson</h3>
                  <p className="text-gray-400 text-sm">Patient</p>
                </div>
              </div>
              <p className="text-gray-300">"Being able to access my medical records and communicate with my doctor through the secure messaging system has made managing my chronic condition so much easier."</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Accordion Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find answers to common questions about our platform</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 focus:outline-none bg-white hover:bg-gray-50 flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${activeAccordion === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeAccordion === index ? 'max-h-96 p-4 bg-gray-50' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of healthcare providers who have enhanced their practice and patient experience with our platform.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Schedule a Demo
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-white border border-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;