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

export default function PartnerSignup({ auth, onBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    async function handleSubmit() {
        if (!name || !email || !pwd) return;
        await auth.signupPartner(name, email, pwd);
    }

    return (
        <AuthFormWrapper>
            <BackButton onClick={onBack} />

            <RoleBadge emoji="💚" label="Partner Portal" />

            <FormTitle
                title="Create your account"
                subtitle="Support your partner's journey with us."
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
                <label>Password</label>
                <PasswordInput value={pwd} onChange={(e) => setPwd(e.target.value)} />
            </div>

            <SubmitButton
                onClick={handleSubmit}
                loading={auth.loading}
                gradient="linear-gradient(135deg,#5DAE7A,#F7C59F)"
                shadow="rgba(93,174,122,0.4)"
            >
                Create Account →
            </SubmitButton>
        </AuthFormWrapper>
    );
}
