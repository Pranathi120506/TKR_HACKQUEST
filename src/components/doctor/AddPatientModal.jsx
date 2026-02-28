import { useState } from 'react';
import { insertPatient } from '../../services/patientService';

export default function AddPatientModal({ onClose, onSucceed }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weeks: '',
        risk: 'Low',
        bp: '',
        weight: '',
        nextAppt: '',
        notes: 'Initial intake completed. No major issues reported.',
    });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const newPatient = {
            ...formData,
            age: parseInt(formData.age),
            weeks: parseInt(formData.weeks),
            status: formData.risk === 'High' ? 'Critical' : formData.risk === 'Medium' ? 'Watch' : 'Stable'
        };

        await insertPatient(newPatient);
        onSucceed(); // Refresh the list
    }

    return (
        <div
            onClick={e => e.target === e.currentTarget && onClose()}
            style={{
                position: 'fixed', inset: 0, zIndex: 500,
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
                animation: 'fadeIn 0.2s ease',
            }}
        >
            <div style={{
                background: '#161D2E', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24, padding: 36, maxWidth: 500, width: '100%',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative',
                fontFamily: 'DM Sans, sans-serif'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: 20, right: 20,
                        background: 'rgba(255,255,255,0.08)', border: 'none',
                        width: 32, height: 32, borderRadius: '50%', color: 'white',
                        cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >✕</button>

                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'white', marginBottom: 24, marginTop: 0 }}>
                    Add New <em style={{ color: '#3A9BD5', fontStyle: 'italic' }}>Patient</em>
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    <div>
                        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Full Name</label>
                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} placeholder="e.g. Maya Sharma" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Age</label>
                            <input required type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} style={inputStyle} placeholder="26" />
                        </div>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Weeks Gestation</label>
                            <input required type="number" value={formData.weeks} onChange={e => setFormData({ ...formData, weeks: e.target.value })} style={inputStyle} placeholder="24" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Blood Pressure</label>
                            <input required value={formData.bp} onChange={e => setFormData({ ...formData, bp: e.target.value })} style={inputStyle} placeholder="120/80" />
                        </div>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Weight</label>
                            <input required value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} style={inputStyle} placeholder="60kg" />
                        </div>
                    </div>

                    <div>
                        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Next Appointment</label>
                        <input required value={formData.nextAppt} onChange={e => setFormData({ ...formData, nextAppt: e.target.value })} style={inputStyle} placeholder="Next Tuesday 10:00 AM" />
                    </div>

                    <div>
                        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Risk Level</label>
                        <select value={formData.risk} onChange={e => setFormData({ ...formData, risk: e.target.value })} style={inputStyle}>
                            <option value="Low">Low Risk</option>
                            <option value="Medium">Medium Risk</option>
                            <option value="High">High Risk</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: 16, padding: '12px', borderRadius: 12, border: 'none',
                            background: 'linear-gradient(135deg, #3A9BD5, #9B7ED9)', color: 'white',
                            fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Adding...' : 'Add Patient to Dashboard'}
                    </button>

                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.2)',
    color: 'white',
    outline: 'none',
    fontSize: '0.9rem',
    boxSizing: 'border-box'
};
