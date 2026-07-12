import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebase";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export async function setupNotifications() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return null;
    }
    if (!messaging) {
  console.log("Messaging is not supported.");
  return;
}

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error("Error setting up notifications:", error);
    return null;
  }
}

export function listenForMessages() {
  if (!messaging) {
  console.log("Messaging is not supported.");
  return;
}
  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);

    if (Notification.permission === "granted") {
      new Notification(
        payload.notification?.title ?? "New Notice",
        {
          body: payload.notification?.body ?? "",
        }
      );
    }
  });
}