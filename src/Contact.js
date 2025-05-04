import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📞 Hubungi Kami
          </h2>

          {/* Alamat */}
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="text-green-500 text-xl mr-2" />
            <p>Jl. Contoh No. 123, Jakarta</p>
          </div>

          {/* Telepon */}
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <FaPhone className="text-green-500 text-xl mr-2" />
            <p>+62 812-3456-7890</p>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <FaEnvelope className="text-green-500 text-xl mr-2" />
            <p>info@website.com</p>
          </div>

          {/* Media Sosial */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactInfo;
