import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqj79vSPWm0_F6DpPhVbZvdhAUNd7Pn2E",
  authDomain: "eduon-02.firebaseapp.com",
  projectId: "eduon-02",
  storageBucket: "eduon-02.appspot.com",
  messagingSenderId: "430831653596",
  appId: "1:430831653596:web:a8a3961534b4b494949a19",
  measurementId: "G-FDC12S0S01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app