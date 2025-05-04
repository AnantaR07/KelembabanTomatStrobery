import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-500 text-white py-4">
      <div className="container mx-auto text-center px-4">
        {/* Links */}
        <div className="mb-3 flex flex-wrap justify-center">
          <Link
            to="/"
            className="text-white hover:text-gray-200 mx-3 mb-2 md:mb-0"
          >
            BERANDA
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-gray-200 mx-3 mb-2 md:mb-0"
          >
            PROFIL
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 mx-3 mb-2 md:mb-0"
          >
            KONTAK
          </Link>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Pemantauan Tanaman. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
