import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
          {/* Foto Profil */}
          <img
            src="/logo.jpeg"
            alt="Foto Diri"
            className="w-32 h-32 rounded-full mx-auto border-4 border-green-400"
          />

          {/* Biodata */}
          <h2 className="text-xl font-bold text-gray-800 mt-4">
            NAMA: Muhamad Sudianto{" "}
          </h2>
          <p className="text-gray-600 text-sm mt-2">Umur: 23 Tahun </p>
          <p className="text-gray-600 text-sm">Alamat: Malang, Jawa Timur </p>
          <p className="text-gray-600 text-sm">Profesi: Web Developer</p>
          <p className="text-gray-600 text-sm mt-2">
            "Bersemangat tentang teknologi dan inovasi."
          </p>

          {/* Kontak & Media Sosial */}
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700 text-lg">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600 text-lg">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700 text-lg">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
