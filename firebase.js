
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
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("Login berhasil sebagai " + user.email);
  } catch (error) {
    console.error("Error login:", error);
    alert("Login gagal: " + error.message);
  }
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

// Edit data
async function editData(id, judulBaru, isiBaru) {
  const docRef = doc(db, "materi", id);
  await updateDoc(docRef, { judul: judulBaru, isi: isiBaru });
  tampilkanData();
}



// Fungsi baca data
async function tampilkanData() {
  const daftar = document.getElementById("daftarMateri");
  daftar.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "materi"));
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().judul + " - " + doc.data().isi;
    daftar.appendChild(li);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const judulBaru = prompt("Judul baru:", docSnap.data().judul);
      const isiBaru = prompt("Isi baru:", docSnap.data().isi);
      if (judulBaru && isiBaru) {
        editData(docSnap.id, judulBaru, isiBaru);
      }
    };
    li.appendChild(editBtn);
  });
}



// Panggil saat pertama kali load
tampilkanData();
