import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { getStroberiHistory } from "./api/firebaseconfig";
import { Line } from "react-chartjs-2";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue } from "firebase/database";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

function App() {
  const [stroberiData, setStroberiData] = useState([]);
  const [isOn, setIsOn] = useState(false);

  const handleToggleSwitch = () => {
    const newStatus = isOn ? "mati" : "hidup";
    setIsOn(!isOn);
    update(ref(database, "/selectedPlant"), { statusNutrisi: newStatus })
      .then(() => console.log(`Status diperbarui: ${newStatus}`))
      .catch((error) => console.error("Gagal memperbarui status:", error));
  };

  useEffect(() => {
    const statusRef = ref(database, "/selectedPlant/statusNutrisi");

    // Dengarkan perubahan statusNutrisi
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const status = snapshot.val();
        setIsOn(status === "hidup"); // Jika "hidup" maka switch ON, jika "mati" maka switch OFF
      }
    });

    return () => unsubscribe(); // Cleanup listener saat komponen unmount
  }, []); // Dependency array tetap kosong agar hanya berjalan sekali saat mount

  useEffect(() => {
    getStroberiHistory((data) => {
      const latestData = data.slice(-6).reverse(); // Ambil 6 data terbaru dan balik urutannya
      setStroberiData(latestData);
    });
  }, []);

  // Format data untuk Chart.js (Stroberi)
  const stroberiChartData = {
    labels: stroberiData.map((item) => item.waktu),
    datasets: [
      {
        label: "Kelembaban Stroberi",
        data: stroberiData.map((item) => item.kelembaban),
        borderColor: "red",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-4">
          Monitoring Tanaman Stroberi
        </h1>

        {/* Container untuk grafik dan tabel */}
        <div className="grid grid-cols-1">
          {/* Grafik Stroberi */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-center">
              Grafik Kelembaban
            </h2>
            <Line data={stroberiChartData} />
          </div>

          {/* Tabel Stroberi */}
          <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Data Kelembaban
            </h2>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                {isOn ? "Pompa Nutrisi Menyala" : "Pompa Nutrisi Mati"}
              </span>
              <div
                className={`w-10 h-5 sm:w-12 sm:h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                  isOn ? "bg-green-500" : "bg-gray-400"
                }`}
                onClick={handleToggleSwitch}
              >
                <div
                  className={`bg-white w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-md transition-all duration-300 ${
                    isOn ? "translate-x-4 sm:translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse shadow-md rounded-lg overflow-hidden bg-white">
                <thead>
                  <tr className="bg-green-600 text-white text-sm md:text-lg">
                    {[
                      "No.",
                      "Tanggal",
                      "Hari",
                      "Waktu",
                      "Kelembaban",
                      "Persentase",
                      "Keterangan",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="p-2 md:p-4 border-b border-gray-300 whitespace-nowrap"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stroberiData.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="text-center text-sm md:text-base transition duration-200 ease-in-out hover:bg-green-100"
                    >
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {index + 1}
                      </td>
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {item.tanggal}
                      </td>
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {item.hari}
                      </td>
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {item.waktu}
                      </td>
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {item.kelembaban}
                      </td>
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {item.persentase}%
                      </td>
                      <td className="border-b border-gray-200 p-2 md:p-4">
                        {item.keterangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
