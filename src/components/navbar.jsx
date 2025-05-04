import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL:
    "https://monitoringtanaman-76dab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// **Komponen Dropdown Pilih Tanaman**
const DropdownPilihTanaman = ({ onSelectPlant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const plants = [
    { name: "Tanaman Tomat", value: "tomat", path: "/" },
    { name: "Tanaman Stroberi", value: "stroberi", path: "/stroberry" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-green-500 px-4 py-2 rounded-lg shadow flex items-center space-x-2 hover:bg-gray-100 transition"
      >
        <span>Pilih Tanaman</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          {plants.map((plant) => (
            <Link
              key={plant.value}
              to={plant.path}
              onClick={() => {
                setIsOpen(false);
                onSelectPlant(plant.value);
              }}
              className="block px-4 py-2 text-green-500 hover:bg-gray-100 transition"
            >
              {plant.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// **Komponen Navbar**
const Navbar = () => {
  const [isOn, setIsOn] = useState(false);
  const [sensorData, setSensorData] = useState(null);

  // **Pantau perubahan status di Firebase**
  useEffect(() => {
    const statusRef = ref(database, "/selectedPlant/status");

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      setIsOn(status === "hidup");
    });

    return () => unsubscribe(); // Bersihkan listener saat unmount
  }, []);

  // **Handle Toggle Switch**
  const handleToggleSwitch = () => {
    const newStatus = isOn ? "mati" : "hidup";
    setIsOn(!isOn);

    update(ref(database, "/selectedPlant"), { status: newStatus })
      .then(() => console.log(`Status diperbarui: ${newStatus}`))
      .catch((error) => console.error("Gagal memperbarui status:", error));
  };

  // **Handle Pemilihan Tanaman**
  const handlePlantSelection = (plant) => {
    update(ref(database, "/selectedPlant"), { nama: plant })
      .then(() => console.log(`Tanaman ${plant} disimpan ke Firebase`))
      .catch((error) => console.error("Gagal menyimpan ke Firebase:", error));
  };

  return (
    <nav className="bg-green-500 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo & Nama Brand (Kiri) */}
        <div className="flex items-center space-x-3 text-white font-bold flex-grow">
          <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-lg sm:text-xl">PENYIRAM TANAMAN OTOMATIS</span>
        </div>

        {/* Elemen di Pojok Kanan */}
        <div className="flex items-center space-x-4 px-2 py-2 flex-wrap sm:justify-end justify-center text-center">
          {/* Dropdown Pilih Tanaman */}
          <DropdownPilihTanaman onSelectPlant={handlePlantSelection} />

          {/* Switch ON/OFF */}
          <div
            className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition ${
              isOn ? "bg-green-400" : "bg-gray-400"
            }`}
            onClick={handleToggleSwitch}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                isOn ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-white font-semibold">
            {isOn ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      {/* Data Sensor */}
      {sensorData && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-gray-800 mx-auto w-2/3">
          <h3 className="text-green-600 font-bold">Data Sensor:</h3>
          <pre className="overflow-auto text-sm">
            {JSON.stringify(sensorData, null, 2)}
          </pre>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
