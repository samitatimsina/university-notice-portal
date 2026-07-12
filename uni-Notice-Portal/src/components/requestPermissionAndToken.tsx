import { getToken, onMessage } from "firebase/messaging";
import {messaging} from "../firebase/firebase";

async function requestPermissionAndToken() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Permission denied");
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    console.log("Service Worker:", registration);

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log("FCM Token:", token);
  } catch (error) {
    console.error("FCM Error:", error);
  }
}

// Foreground messages (app tab is open and focused)
onMessage(messaging, (payload) => {
  console.log("Foreground message:", payload);
});

export { requestPermissionAndToken };