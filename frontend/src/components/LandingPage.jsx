import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Stethoscope,
  User,
  Mic,
  FileText,
  AlertTriangle,
  Globe,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const { goToStep } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
        <div>
          <div className="hero-tag">
            <HeartPulse size={16} /> Clinical History & Patient Portal
          </div>
          <h1 className="hero-title">
            Easy Patient Check-In & <span className="gradient-text">Doctor Health Portal</span>
          </h1>
          <p className="hero-desc">
            MediKiosk makes hospital check-ins simple for everyone. Patients can easily share symptoms using voice or touch, upload test reports, and connect quickly with doctors.
          </p>
          <div className="cta-group" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => goToStep(2)}>
              <User size={18} /> Patient Self-Intake <ArrowRight size={16} />
            </button>
            <button className="btn btn-doctor" onClick={() => goToStep(12)}>
              <Stethoscope size={18} /> Provider Portal Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Feature Capabilities */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Key Hospital Features</h2>
          <p style={{ color: 'var(--text-muted)' }}>Designed to make healthcare fast, friendly, and simple for everyone.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Mic size={24} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Voice & Touch Input</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Patients can speak or tap to share their health problems easily.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Urgent Priority Alerts</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Alerts doctors immediately if a patient needs urgent medical care.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: '#e0e7ff', color: '#4338ca' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Smart Report Reader</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Reads uploaded lab reports and doctor prescriptions automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: '#fce7f3', color: '#be185d' }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Multi-Language Support</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Talk and read in Hindi, Tamil, English, and more Indian languages.
            </p>
          </div>
        </div>
      </section>

      {/* Portal Entry Pathways */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ borderTop: '4px solid var(--accent-patient)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <User size={22} color="var(--accent-patient)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>For Patients</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Complete your clinical registration, describe symptoms, upload past lab reports, and view visit summaries.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', background: 'var(--accent-patient)' }} onClick={() => goToStep(2)}>
            Start Patient Registration
          </button>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--accent-doctor)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Stethoscope size={22} color="var(--accent-doctor)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>For Healthcare Providers</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Access attending doctor dashboard, patient triage dashboard, patient medical timelines, and write prescriptions.
          </p>
          <button className="btn btn-doctor" style={{ width: '100%' }} onClick={() => goToStep(12)}>
            Access Provider Portal
          </button>
        </div>
      </section>
    </div>
  );
}
