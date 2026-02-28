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

export default function MotherSignup({ auth, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleSubmit() {
    if (!name || !email || !phone || !pwd) return;
    await auth.signupMother(name, email, phone, pwd);
  }

  return (
    <AuthFormWrapper>
      <BackButton onClick={onBack} />

      <RoleBadge emoji="🤰" label="Mother Portal" />

      <FormTitle
        title="Create your account"
        subtitle="Start your motherhood journey with us."
      />

      <ErrorBox message={auth.error} />

      <div className="form-group">
        <label>Full Name</label>
        <FormInput value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <FormInput value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Password</label>
        <PasswordInput value={pwd} onChange={(e) => setPwd(e.target.value)} />
      </div>

      <SubmitButton
        onClick={handleSubmit}
        loading={auth.loading}
        gradient="linear-gradient(135deg,#E07A94,#9B7ED9)"
        shadow="rgba(224,122,148,0.4)"
      >
        Create Account →
      </SubmitButton>
    </AuthFormWrapper>
  );
}
