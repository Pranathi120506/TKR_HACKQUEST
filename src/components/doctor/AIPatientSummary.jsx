import { useState } from 'react';

export default function AIPatientSummary({ patient }) {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);

    function generateSummary() {
        setLoading(true);

        // Simulated LLM API Call
        setTimeout(() => {
            let insight = '';

            if (patient.risk === 'High') {
                insight = `CRITICAL ALERT: ${patient.name} is ${patient.weeks} weeks pregnant with a High Risk profile. BP is currently ${patient.bp}, which is concerning. The recent notes indicate: "${patient.notes}". 
        
Recommended Actions:
1. Immediate follow-up required.
2. Consider prescribing stronger antihypertensives if BP remains above 140/90.
3. Schedule for closer monitoring (twice weekly).`;
            } else if (patient.risk === 'Medium') {
                insight = `WATCH NOTIFICATION: ${patient.name} (${patient.weeks} weeks) is at Medium Risk. Current BP is ${patient.bp}. Note: ${patient.notes}.
        
Recommended Actions:
1. Monitor at next scheduled appointment (${patient.nextAppt}).
2. Ensure nutritional adjustments are being followed.
3. Order routine lab panels if not completed recently.`;
            } else {
                insight = `STABLE: ${patient.name} is progressing normally at ${patient.weeks} weeks. BP is ${patient.bp} and weight is ${patient.weight}. Note: ${patient.notes}. 
        
Recommended Actions:
1. Proceed with standard antenatal care plan.
2. Next routine checkup: ${patient.nextAppt}.`;
            }

            setSummary(insight);
            setLoading(false);
        }, 1500); // Fake delay for realism
    }

    return (
        <div style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 16,
            background: 'linear-gradient(to right, rgba(155,126,217,0.1), rgba(58,155,213,0.1))',
            border: '1px solid rgba(155,126,217,0.3)',
            position: 'relative',
            overflow: 'hidden'
        }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: summary ? 16 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>✨</span>
                    <span style={{ fontWeight: 600, color: '#9B7ED9', letterSpacing: '0.05em' }}>AI CLINICAL INSIGHT</span>
                </div>

                {!summary && !loading && (
                    <button
                        onClick={generateSummary}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 20,
                            border: 'none',
                            background: '#9B7ED9',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            boxShadow: '0 4px 12px rgba(155,126,217,0.4)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Generate Summary
                    </button>
                )}
            </div>

            {loading && (
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="spinner" style={{
                        width: 16, height: 16, border: '2px solid rgba(155,126,217,0.5)', borderTopColor: '#9B7ED9', borderRadius: '50%', animation: 'spin 1s linear infinite'
                    }} />
                    Analyzing patient records...
                </div>
            )}

            {summary && (
                <div style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    {summary}
                </div>
            )}

            <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
        </div>
    );
}
