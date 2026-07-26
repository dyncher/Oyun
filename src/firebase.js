import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';

const firebaseConfig = {
  // Mevcut chook-temiz Firebase proje bilgileri (sadece RTDB kullanılmış)
  databaseURL: "https://chook-temiz-web-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

// Helper functions that we can reuse across our SPA
export { ref, onValue, push, set };
