import { api } from "../../api/axios";
import { auth } from "../../firebase/firebase";

      
 export const deleteUser = async (firebaseUid: string) => {
  try {
    const idToken = await auth.currentUser?.getIdToken();

    await api.delete("/admin/users", {
      data: {
        firebase_uid: firebaseUid,
      },
      headers: {
        Authorization: `Bearer, ${idToken}`,
      },
    });

    console.log("User deleted successfully");
  } catch (error) {
    console.error("Delete failed:", error);
  }
};