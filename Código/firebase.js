import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsxDI5UiXNhz7htzZ9dyF_2KjgYmqRN00",
  authDomain: "meu-portifolio-ae6db.firebaseapp.com",
  projectId: "meu-portifolio-ae6db",
  storageBucket: "meu-portifolio-ae6db.firebasestorage.app",
  messagingSenderId: "349365043990",
  appId: "1:349365043990:web:1e4c7b76cb76586e998637"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
