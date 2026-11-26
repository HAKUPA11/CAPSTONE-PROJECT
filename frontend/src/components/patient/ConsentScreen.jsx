import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckSquare, Square, ArrowRight, Lock } from 'lucide-react';

export default function ConsentScreen() {
  const { goToStep, patientData, setPatientData } = useApp();
  const [consent, setConsent] = useState(patientData.consent || {
    dataUsage: true,
    aiProcessing: true,
    researchOptIn: false,
  });

  const toggleConsent = (key) => {
    setConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAgree = () => {
    setPatientData(prev => ({ ...prev, consent }));
    goToStep(5);
  };

  return (
    <div className="card" style={{ maxWidth: '640px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: '#dcfce7', color: '#15803d', borderRadius: '50%', marginBottom: '0.75rem' }}>
          <ShieldCheck size={28} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Patient Data & Privacy Consent</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Please review and accept our clinical privacy policy before proceeding.
        </p>
      </div>

      <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--primary)' }}>
          <Lock size={16} /> Data Privacy Summary
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.4' }}>
          Your clinical health records and voice responses are encrypted and accessible strictly by your attending medical team. Your information is protected under Ayushman Bharat Digital Mission (ABDM), DISHA, and international HIPAA compliance regulations.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div
          style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: consent.dataUsage ? 'var(--primary-light)' : 'white' }}
          onClick={() => toggleConsent('dataUsage')}
        >
          {consent.dataUsage ? <CheckSquare size={20} color="var(--primary)" /> : <Square size={20} color="var(--text-muted)" />}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Clinical Record Processing Consent (Required)</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Authorize attending physicians and clinical staff to access your intake details.
            </div>
          </div>
        </div>

        <div
          style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: consent.aiProcessing ? 'var(--primary-light)' : 'white' }}
          onClick={() => toggleConsent('aiProcessing')}
        >
          {consent.aiProcessing ? <CheckSquare size={20} color="var(--primary)" /> : <Square size={20} color="var(--text-muted)" />}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Automated Symptom & Document Parsing (Required)</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Enable natural voice transcription and automated lab document parsing.
            </div>
          </div>
        </div>

        <div
          style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: consent.researchOptIn ? 'var(--primary-light)' : 'white' }}
          onClick={() => toggleConsent('researchOptIn')}
        >
          {consent.researchOptIn ? <CheckSquare size={20} color="var(--primary)" /> : <Square size={20} color="var(--text-muted)" />}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>De-Identified Quality Analytics (Optional)</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Allow anonymized data to improve outpatient clinical workflow models.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => goToStep(3)}>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={!consent.dataUsage || !consent.aiProcessing}
          onClick={handleAgree}
          style={{ opacity: (!consent.dataUsage || !consent.aiProcessing) ? 0.6 : 1 }}
        >
          Accept & Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
