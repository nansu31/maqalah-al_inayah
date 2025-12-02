
// Import Firebase modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Config dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCODpgIIIZYUv0DTAPbQfDiP6qsyeoAEWA",
  authDomain: "maqalahal-inayah.firebaseapp.com",
  projectId: "maqalahal-inayah",
  storageBucket: "maqalahal-inayah.appspot.com",
  messagingSenderId: "152582215348",
  appId: "1:152582215348:web:9229de48f94e1b215269e1"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login dengan Google
document.getElementById("loginBtn").addEventListener("click", async () => {
  await signInWithPopup(auth, provider);
  alert("Login berhasil sebagai " + auth.currentUser.email);
});

// Form submit → simpan data
document.getElementById("materiForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  try {
    await addDoc(collection(db, "materi"), { judul, isi });
    alert("Data berhasil disimpan!");
    tampilkanData();
  } catch (error) {
    console.error("Error menyimpan data:", error);
  }
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
