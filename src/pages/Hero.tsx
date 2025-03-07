// components/Hero.js
import { Button } from "@heroui/react";
import DocterImage from "../assets/doctor.png";
import { useState } from "react";
import OtpModal from "../Components/OtpModal";
import ReviewSections from "../Components/Reviews";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate=useNavigate();
  return (
    <>
      <section className="relative min-h-[92vh] bg-blue-50 flex items-center justify-center">
        <div className="container max-w-6xl mx-auto px-4 mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
          {/* Left Side: Hero Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-blue-900 leading-snug md:text-5xl">
              Find and Book <br /> Your Doctor Online
            </h1>
            <p className="text-lg text-blue-700">
              Get access to top-rated doctors from the comfort of your home.
              Easy appointments, virtual consultations, and reliable care.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button color="primary" size="lg" onClick={() => //
              navigate('/doctors')
              // openModal()
              }>
                Book Appointment
              </Button>
              <Button color="secondary" variant="bordered" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Side: Hero Image */}
          <div className="w-full md:w-1/2">
            <img
              src={DocterImage}
              alt="Doctor illustration"
              className="w-full h-auto"
            />
          </div>
        </div>


      </section>
      <section>
        {" "}
        <ReviewSections />
      </section>
    </>
  );
};

export default Hero;
