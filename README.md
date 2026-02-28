# 🌸 1000-Day Maternal Care Suite — React

A role-based maternal healthcare application built with React + Vite.

## 📁 Project Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root component — auth routing
├── styles/
│   └── global.css              # CSS variables, shared styles, animations
├── data/
│   └── mockData.js             # Users, patients, vitals, appointments
├── hooks/
│   └── useAuth.js              # Auth state management hook
└── components/
    ├── shared/
    │   └── Toast.jsx           # Welcome notification
    ├── auth/
    │   ├── AuthOverlay.jsx     # Full-screen auth container
    │   ├── RoleSelect.jsx      # Role picker (Mother / Doctor / Partner)
    │   ├── AuthFormParts.jsx   # Reusable form components
    │   ├── MotherLogin.jsx     # Mother login form
    │   ├── DoctorLogin.jsx     # Doctor login form
    │   ├── PartnerLogin.jsx    # Partner login form
    │   └── MotherSignup.jsx    # New mother registration
    ├── doctor/
    │   ├── DoctorDashboard.jsx # Doctor main layout
    │   ├── DoctorSidebar.jsx   # Left sidebar with nav
    │   ├── PatientList.jsx     # Patient table with filters
    │   ├── PatientModal.jsx    # Patient detail modal
    │   ├── TodayAppointments.jsx
    │   └── RiskAlerts.jsx
    ├── mother/
    │   └── MotherDashboard.jsx # Mother health dashboard
    └── partner/
        └── PartnerDashboard.jsx # Partner support dashboard
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🔑 Demo Credentials

| Role    | ID / Email         | Password     |
|---------|--------------------|--------------|
| Mother  | mother@demo.in     | care1000     |
| Doctor  | DR-2024-001        | medic1000    |
| Partner | partner@demo.in    | partner123   |

## 🎨 Design Tokens (CSS Variables)

| Variable          | Value     | Usage           |
|-------------------|-----------|-----------------|
| `--rose-deep`     | #E07A94   | Mother theme    |
| `--sky-deep`      | #3A9BD5   | Doctor theme    |
| `--sage-deep`     | #5DAE7A   | Partner theme   |
| `--lavender-deep` | #9B7ED9   | AI / Voice      |
| `--cream`         | #FDF8F2   | Background      |
| `--ink`           | #2D2320   | Primary text    |

## 📦 Dependencies

- React 18
- Vite 5
- No UI libraries — all styling done with inline styles + minimal CSS classes
