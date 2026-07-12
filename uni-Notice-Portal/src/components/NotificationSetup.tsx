import { useEffect } from "react";
import { setupNotifications, listenForMessages } from "../Notifications";

function NotificationSetup() {
  useEffect(() => {
    listenForMessages();
  }, []);

  const handleEnableClick = async () => {
    const registration = await setupNotifications();
    if (registration) {
      // send registration info to your backend / Realtime Database
    }
  };

  return (
    <button onClick={handleEnableClick}>
      Enable Notifications
    </button>
  );
}

export default NotificationSetup;