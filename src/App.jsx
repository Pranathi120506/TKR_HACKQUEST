import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import AuthOverlay from "./components/auth/AuthOverlay.jsx";
import DoctorDashboard from "./components/doctor/DoctorDashboard.jsx";
import MotherDashboard from "./components/mother/MotherDashboard.jsx";
import PartnerDashboard from "./components/partner/PartnerDashboard.jsx";
import Toast from "./components/shared/Toast.jsx";

export default function App() {
  const auth = useAuth();
  const [toast, setToast] = useState(null);

  // ✅ Show welcome toast when user logs in
  useEffect(() => {
    if (auth.currentUser) {
      const { role, name } = auth.currentUser;

      const emoji = role === "doctor" ? "👩‍⚕️" : role === "partner" ? "💚" : "🌸";

      setToast(`${emoji} Welcome, ${name}!`);
      setTimeout(() => setToast(null), 3000);
    }
  }, [auth.currentUser]);

  // 🔥 Decide what to render FIRST

  if (!auth.currentUser) {
    return (
      <>
        <AuthOverlay auth={auth} />
        {toast && <Toast message={toast} />}
      </>
    );
  }

  if (auth.currentUser.role === "doctor") {
    return (
      <>
        <DoctorDashboard user={auth.currentUser} onLogout={auth.logout} />
        {toast && <Toast message={toast} />}
      </>
    );
  }

  if (auth.currentUser.role === "mother") {
    return (
      <>
        <MotherDashboard user={auth.currentUser} onLogout={auth.logout} />
        {toast && <Toast message={toast} />}
      </>
    );
  }

  if (auth.currentUser.role === "partner") {
    return (
      <>
        <PartnerDashboard user={auth.currentUser} onLogout={auth.logout} />
        {toast && <Toast message={toast} />}
      </>
    );
  }

  return null;
}
