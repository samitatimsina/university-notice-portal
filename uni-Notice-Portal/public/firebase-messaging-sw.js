importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

firebase.initializeApp({  
  apiKey: "AIzaSyDIrqYAZb7Dy2M7gWYu0DXw_s_OOe9JX5w",
  authDomain: "university-notice-portal.firebaseapp.com",
  projectId: "university-notice-portal",
  storageBucket: "university-notice-portal.firebasestorage.app",
  messagingSenderId: "630638529417",
  appId: "1:630638529417:web:6b82052863839ef041af58",
  measurementId: "G-EKGC8H25Q3"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};

  self.registration.showNotification(title, {
    body,
    icon: "/uni-background.jpg",
    data: {
      url: payload.data.url,
      noticeId: payload.data.noticeId,
    },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data || {};

  let url = "http://localhost:5173/student/home";

  switch (data.type) {
    case "notice":
      url = `http://localhost:5173/student/notices/${data.id}`;
      break;

    case "event":
      url = `http://localhost:5173/student/event/${data.id}`;
      break;

    case "holiday":
      url = `http://localhost:5173/student/holiday/${data.id}`;
      break;
  }

  event.waitUntil(clients.openWindow(url));
});