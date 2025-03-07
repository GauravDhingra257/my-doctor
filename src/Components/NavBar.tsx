import React, { useState } from 'react';
import docStore from '../docStore/docStore';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ClipboardList, 
  CreditCard,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const {isDoctor, setIsDoctor} = docStore();
  const [isOpen, setIsOpen] = useState(false);
  // const [isDoctor, setIsDoctor] = useState(isDoctor); // Will be set based on JWT
  const [user, setUser] = useState(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsDoctor(false);
    setUser(null);
    navigate('/');
  };
  const NavLink = ({ href, children, className = "" }) => (
    <Link
      to={href}
      className={`flex items-center py-2 px-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ${className}`}
    >
      {children}
    </Link>
  );

  const DoctorNavLinks = () => (
    <>
      <NavLink href="/dashboard" >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </NavLink>
      <NavLink href="/mypatients">
        <Users className="w-4 h-4 mr-2" />
        Patients
      </NavLink>
      <NavLink href="/queue">
        <ClipboardList className="w-4 h-4 mr-2" />
        Patient Queue
      </NavLink>
      <NavLink href="/payments">
        <CreditCard className="w-4 h-4 mr-2" />
        Payments
      </NavLink>
      <NavLink href="/settings">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </NavLink>
    </>
  );

  const PublicNavLinks = () => (
    <>
      <NavLink href="/">
        Home
      </NavLink>
      <NavLink href="/services">
        Services
      </NavLink>
      <NavLink href="/doctors">
        Doctors
      </NavLink>
      <NavLink href="/contact">
        Contact
      </NavLink>
    </>
  );

  return (
    <header className="bg-white shadow-lg sticky top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          NextHealthCare
        </Link>

        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        <nav 
          className={`
            absolute md:relative top-full left-0 w-full md:w-auto 
            md:flex md:items-center md:space-x-4 bg-white md:bg-transparent 
            shadow-lg md:shadow-none transition-all duration-300 ease-in-out
            ${isOpen ? "block" : "hidden"} md:block
          `}
        >
          <div className="flex flex-col md:flex-row md:items-center text-xs md:space-x-2 lg:text-base">
            {isDoctor ? <DoctorNavLinks /> : <PublicNavLinks />}
          </div>

          <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 md:ml-4 p-4 md:p-0">
            {isDoctor ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user?.name}</span>
                <Button 
                  variant="ghost"
                  className="text-red-600 hover:text-red-800 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/signup') }
                >
                  Register as Doctor
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;