import { initializeApp, cert } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin/app";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
) as ServiceAccount;

const app = initializeApp({
  credential: cert(serviceAccount),
});

export default app;