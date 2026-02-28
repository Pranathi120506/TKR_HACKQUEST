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
} from "./AuthFormParts.jsx";

export default function PartnerLogin({ auth, onBack, onSignup }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleSubmit(e) {
    e?.preventDefault?.();
    if (!email || !pwd) return;
    await auth.loginPartner(email, pwd);
  }

  return (
    <AuthFormWrapper>
      <BackButton onClick={onBack} />

      <RoleBadge emoji="💚" label="Partner Portal" />

      <FormTitle
        title="Partner Login"
        subtitle="Stay connected with your partner's care journey."
      />

      <ErrorBox message={auth.error} />

      <div className="form-group">
        <label className="form-label">Email</label>
        <FormInput
          type="email"
          placeholder="partner@email.com"
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
        gradient="linear-gradient(135deg,#5DAE7A,#3A9BD5)"
        shadow="rgba(93,174,122,0.4)"
      >
        Enter Partner View →
      </SubmitButton>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <button
          type="button"
          onClick={onSignup}
          style={{
            background: "none",
            border: "none",
            color: "#5DAE7A",
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
