import { useState } from "react";
import {
  AuthFormWrapper,
  BackButton,
  RoleBadge,
  FormTitle,
  ErrorBox,
  FormInput,
  PasswordInput,
  SubmitButton,
} from "./AuthFormParts.jsx";

export default function MotherLogin({ auth, onBack, onSignup }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleSubmit(e) {
    e?.preventDefault?.();

    if (!email || !pwd) return;
    await auth.loginMother(email, pwd);
  }

  return (
    <AuthFormWrapper>
      <BackButton onClick={onBack} />

      <RoleBadge emoji="🤰" label="Mother Portal" />

      <FormTitle title="Welcome back" subtitle="Sign in to your dashboard." />

      <ErrorBox message={auth.error} />

      <div className="form-group">
        <label>Email</label>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <PasswordInput
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
      </div>

      <SubmitButton
        onClick={handleSubmit}
        loading={auth.loading}
        gradient="linear-gradient(135deg,#E07A94,#9B7ED9)"
        shadow="rgba(224,122,148,0.4)"
      >
        Sign In →
      </SubmitButton>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <button
          type="button" // 🔥 VERY IMPORTANT FIX
          onClick={onSignup}
          style={{
            background: "none",
            border: "none",
            color: "#E07A94",
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
