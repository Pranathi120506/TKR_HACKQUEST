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

export default function DoctorSignup({ auth, onBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    async function handleSubmit() {
        if (!name || !email || !pwd) return;
        await auth.signupDoctor(name, email, pwd);
    }

    return (
        <AuthFormWrapper>
            <BackButton onClick={onBack} />

            <RoleBadge emoji="👩‍⚕️" label="Doctor Portal" />

            <FormTitle
                title="Register as a Doctor"
                subtitle="Join our network of maternal care specialists."
            />

            <ErrorBox message={auth.error} />

            <div className="form-group">
                <label>Full Name (e.g. Dr. Smith)</label>
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
                gradient="linear-gradient(135deg,#3A9BD5,#5DAE7A)"
                shadow="rgba(58,155,213,0.4)"
            >
                Create Account →
            </SubmitButton>
        </AuthFormWrapper>
    );
}
