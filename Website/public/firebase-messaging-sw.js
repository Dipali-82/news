importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyA3i-rL7GUVsuAiYxSzw1kR2vp10YaMw9U",
    authDomain: "alikidi.firebaseapp.com",
    projectId: "alikidi",
    storageBucket: "alikidi.appspot.com",
    messagingSenderId: "398584144414",
    appId: "1:398584144414:web:470168efed6fbc7f04440f",
    measurementId: "G-Y8PGD1L2KD",
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});