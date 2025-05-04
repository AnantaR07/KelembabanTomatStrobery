import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk mengambil data tomat dari Firebase
export const getTomatHistory = (callback) => {
  const historyRef = ref(database, "selectedPlant/tomat/sensorData"); // Path untuk data tomat

  onValue(
    historyRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          kelembaban: data[key].kelembaban,
          keterangan: data[key].keterangan,
          persentase: data[key].persentase,
          tanaman: "Tomat",
          waktu: data[key].waktu,
          tanggal: data[key].tanggal,
          hari: data[key].hari,
        }));
        callback(formattedData);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.log("Error fetching tomat data: ", error);
      callback([]);
    }
  );
};

// Fungsi untuk mengambil data stroberi dari Firebase
export const getStroberiHistory = (callback) => {
  const historyRef = ref(database, "selectedPlant/stroberi/sensorData"); // Path untuk data stroberi

  onValue(
    historyRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          kelembaban: data[key].kelembaban,
          keterangan: data[key].keterangan,
          persentase: data[key].persentase,
          tanaman: "Stroberi",
          waktu: data[key].waktu,
          tanggal: data[key].tanggal,
          hari: data[key].hari,
        }));
        callback(formattedData);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.log("Error fetching stroberi data: ", error);
      callback([]);
    }
  );
};
