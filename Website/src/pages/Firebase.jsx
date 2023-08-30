import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA3i-rL7GUVsuAiYxSzw1kR2vp10YaMw9U",
  authDomain: "alikidi.firebaseapp.com",
  projectId: "alikidi",
  storageBucket: "alikidi.appspot.com",
  messagingSenderId: "398584144414",
  appId: "1:398584144414:web:470168efed6fbc7f04440f",
  measurementId: "G-Y8PGD1L2KD",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
