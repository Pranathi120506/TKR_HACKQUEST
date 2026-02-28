import { useState } from "react";
import {
  AuthFormWrapper,
  BackButton,
  RoleBadge,
  FormTitle,
  DemoHint,
  ErrorBox,
  FormInput,
  PasswordInput,
  SubmitButton,
  Divider,
} from "./AuthFormParts.jsx";

export default function DoctorLogin({ auth, onBack, onSignup }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleSubmit(e) {
    e?.preventDefault?.();
    if (!email || !pwd) return;
    await auth.loginDoctor(email, pwd);
  }

  return (
    <AuthFormWrapper>
      <BackButton onClick={onBack} />

      <RoleBadge emoji="👩‍⚕️" label="Doctor Portal" />

      <FormTitle
        title="Doctor Login"
        subtitle="Access your patient dashboard."
      />

      <ErrorBox message={auth.error} />

      <div className="form-group">
        <label className="form-label">Email</label>
        <FormInput
          placeholder="doctor@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <PasswordInput
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
      </div>

      <SubmitButton
        onClick={handleSubmit}
        loading={auth.loading}
        gradient="linear-gradient(135deg,#3A9BD5,#5DAE7A)"
        shadow="rgba(58,155,213,0.4)"
      >
        Access Portal →
      </SubmitButton>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <button
          type="button"
          onClick={onSignup}
          style={{
            background: "none",
            border: "none",
            color: "#3A9BD5",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Create account →
        </button>
      </p>
    </AuthFormWrapper>
  );
}
