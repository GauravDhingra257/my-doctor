import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Clock,
  CalendarCheck,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8  ring-1 ring-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-700">NextHealthCare</h3>
            <p className="text-gray-600">
              Making healthcare accessible and convenient through our online booking platform.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
              <Twitter className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
              <Instagram className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
              <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/find-doctor" className="text-gray-600 hover:text-blue-600">Find a Doctor</a>
              </li>
              <li>
                <a href="/services" className="text-gray-600 hover:text-blue-600">Our Services</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-blue-600">Health Blog</a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Doctors</h4>
            <ul className="space-y-2">
              <li>
                <a href="/doctor/register" className="text-gray-600 hover:text-blue-600">Join as Doctor</a>
              </li>
              <li>
                <a href="/doctor/login" className="text-gray-600 hover:text-blue-600">Doctor Login</a>
              </li>
              <li>
                <a href="/doctor/dashboard" className="text-gray-600 hover:text-blue-600">Doctor Dashboard</a>
              </li>
              <li>
                <a href="/doctor/appointments" className="text-gray-600 hover:text-blue-600">Manage Appointments</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">support@NextHealthCare.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-600">
              © 2025 NextHealthCare. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm text-gray-600 md:justify-end">
              <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
              <a href="/cookies" className="hover:text-blue-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;