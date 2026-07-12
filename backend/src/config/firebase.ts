import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../../firebase-service-account.json" with { type:"json"};
import type { ServiceAccount } from "firebase-admin/app";

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export default app;