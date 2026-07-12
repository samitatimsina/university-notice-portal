import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import { useAuthStore } from "./store/authStore";

const { setUser, setLoading } =
  useAuthStore.getState();

onAuthStateChanged(auth, (user) => {
  setUser(user);

  setLoading(false);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
