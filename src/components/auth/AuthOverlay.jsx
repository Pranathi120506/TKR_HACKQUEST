import { useState } from "react";
import RoleSelect from "./RoleSelect.jsx";
import MotherLogin from "./MotherLogin.jsx";
import DoctorLogin from "./DoctorLogin.jsx";
import PartnerLogin from "./PartnerLogin.jsx";
import MotherSignup from "./MotherSignup.jsx";
import DoctorSignup from "./DoctorSignup.jsx";
import PartnerSignup from "./PartnerSignup.jsx";

const BG_ORBS = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        opacity: 0.3,
        width: 600,
        height: 600,
        background: "#F2A7B8",
        top: -200,
        right: -100,
        animation: "float1 8s ease-in-out infinite",
      }}
    />
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        opacity: 0.3,
        width: 400,
        height: 400,
        background: "#C5B4E3",
        bottom: -100,
        left: -100,
        animation: "float2 10s ease-in-out infinite",
      }}
    />
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        opacity: 0.25,
        width: 300,
        height: 300,
        background: "#A8D5B5",
        top: "40%",
        left: "30%",
        animation: "float3 7s ease-in-out infinite",
      }}
    />
  </div>
);

export default function AuthOverlay({ auth }) {
  const [screen, setScreen] = useState("role");
  // 'role' | 'mother' | 'doctor' | 'partner' | 'mother-signup'

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FDF8F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        animation: "fadeIn 0.4s ease",
      }}
    >
      <BG_ORBS />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 960,
          padding: "40px 24px",
        }}
      >
        {screen === "role" && <RoleSelect onSelect={setScreen} />}

        {screen === "mother" && (
          <MotherLogin
            auth={auth}
            onBack={() => {
              auth.clearError();
              setScreen("role");
            }}
            onSignup={() => {
              auth.clearError();
              setScreen("mother-signup");
            }}
          />
        )}

        {screen === "mother-signup" && (
          <MotherSignup
            auth={auth}
            onBack={() => {
              auth.clearError();
              setScreen("mother");
            }}
          />
        )}

        {screen === "doctor" && (
          <DoctorLogin
            auth={auth}
            onBack={() => {
              auth.clearError();
              setScreen("role");
            }}
            onSignup={() => {
              auth.clearError();
              setScreen("doctor-signup");
            }}
          />
        )}

        {screen === "doctor-signup" && (
          <DoctorSignup
            auth={auth}
            onBack={() => {
              auth.clearError();
              setScreen("doctor");
            }}
          />
        )}

        {screen === "partner" && (
          <PartnerLogin
            auth={auth}
            onBack={() => {
              auth.clearError();
              setScreen("role");
            }}
            onSignup={() => {
              auth.clearError();
              setScreen("partner-signup");
            }}
          />
        )}

        {screen === "partner-signup" && (
          <PartnerSignup
            auth={auth}
            onBack={() => {
              auth.clearError();
              setScreen("partner");
            }}
          />
        )}
      </div>
    </div>
  );
}
