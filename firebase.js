
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCODpgIIIZYUv0DTAPbQfDiP6qsyeoAEWA",
    authDomain: "maqalahal-inayah.firebaseapp.com",
    projectId: "maqalahal-inayah",
    storageBucket: "maqalahal-inayah.firebasestorage.app",
    messagingSenderId: "152582215348",
    appId: "1:152582215348:web:9229de48f94e1b215269e1",
    measurementId: "G-Y3F3QFNQDQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const analytics = getAnalytics(app);

  // Form submit → simpan data
document.getElementById("materiForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  await addDoc(collection(db, "materi"), { judul, isi });
  alert("Data berhasil disimpan!");
  tampilkanData();
});

// Fungsi baca data
async function tampilkanData() {
  const daftar = document.getElementById("daftarMateri");
  daftar.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "materi"));
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().judul + " - " + doc.data().isi;
    daftar.appendChild(li);
  });
}

// Panggil saat pertama kali load
tampilkanData();

  