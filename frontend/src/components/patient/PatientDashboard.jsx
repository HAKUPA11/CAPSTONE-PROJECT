import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Mic,
  UploadCloud,
  FileText,
  Clock,
  LogOut,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Activity,
  HeartPulse
} from 'lucide-react';

export default function PatientDashboard() {
  const { patientData, goToStep } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0d9488, #0284c7)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HeartPulse size={16} /> Patient Clinical Portal • Apollo Health City (New Delhi)
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
              Namaste, {patientData.name}
            </h1>
            <p style={{ opacity: '0.9', fontSize: '0.9rem', marginTop: '2px' }}>
              Record ID: {patientData.id} • ABHA Health ID Active • Preferred Language: {patientData.language}
            </p>
          </div>
          <button
            className="btn"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }}
            onClick={() => goToStep(6)}
          >
            <Activity size={18} /> Begin Symptom Assessment
          </button>
        </div>
      </div>

      {/* Live Vitals Metrics Grid */}
      {patientData.vitals && (
        <div className="card">
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>
              <Activity size={16} /> Live Patient Vitals Summary
            </span>
            <span className="india-badge">
              <span className="pulse-dot"></span> Recorded at Triage Desk
            </span>
          </div>

          <div className="vitals-grid">
            <div className="vital-card">
              <span className="vital-label">Blood Pressure</span>
              <span className="vital-value">{patientData.vitals.bp}</span>
              <span className="vital-status warning">⚠️ Pre-Hypertensive</span>
            </div>
            <div className="vital-card">
              <span className="vital-label">Heart Rate</span>
              <span className="vital-value">{patientData.vitals.pulse}</span>
              <span className="vital-status normal">✓ Normal Rhythm</span>
            </div>
            <div className="vital-card">
              <span className="vital-label">Blood Oxygen (SpO2)</span>
              <span className="vital-value">{patientData.vitals.spo2}</span>
              <span className="vital-status normal">✓ Normal SpO2</span>
            </div>
            <div className="vital-card">
              <span className="vital-label">Temperature</span>
              <span className="vital-value">{patientData.vitals.temp}</span>
              <span className="vital-status normal">✓ Afebrile</span>
            </div>
            <div className="vital-card">
              <span className="vital-label">Weight</span>
              <span className="vital-value">{patientData.vitals.weight}</span>
              <span className="vital-status normal">✓ BMI 24.2</span>
            </div>
          </div>
        </div>
      )}

      {/* Triage Alert Banner if active */}
      {patientData.hasRedFlags && (
        <div className="red-flag-banner">
          <AlertTriangle size={24} className="red-flag-icon" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>Urgent Care Alert</div>
            <div style={{ fontSize: '0.85rem' }}>{patientData.redFlagReason}</div>
          </div>
          <button className="btn btn-primary" style={{ background: 'var(--red-flag)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => goToStep(6)}>
            Review Symptoms
          </button>
        </div>
      )}

      {/* Primary Action Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {/* Card 1: Symptom Assessment */}
        <div className="card" style={{ cursor: 'pointer', borderLeft: '4px solid var(--primary)' }} onClick={() => goToStep(6)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.6rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
              <Mic size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
              Intake
            </span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Symptom Assessment</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Describe your current discomfort using voice or touch controls.
          </p>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Start Assessment <ChevronRight size={16} />
          </div>
        </div>

        {/* Card 2: Document Upload */}
        <div className="card" style={{ cursor: 'pointer', borderLeft: '4px solid #0284c7' }} onClick={() => goToStep(7)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.6rem', background: '#e0f2fe', color: '#0284c7', borderRadius: 'var(--radius-md)' }}>
              <UploadCloud size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
              Records
            </span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Upload Lab Reports</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Attach blood tests, prescriptions, or imaging reports.
          </p>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Upload Reports <ChevronRight size={16} />
          </div>
        </div>

        {/* Card 3: Generated Summary */}
        <div className="card" style={{ cursor: 'pointer', borderLeft: '4px solid #8b5cf6' }} onClick={() => goToStep(9)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.6rem', background: '#f3e8ff', color: '#8b5cf6', borderRadius: 'var(--radius-md)' }}>
              <FileText size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', background: '#f3e8ff', color: '#8b5cf6', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
              Summary
            </span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Intake Summary</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Review structured clinical summary before your doctor consultation.
          </p>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View Summary <ChevronRight size={16} />
          </div>
        </div>

        {/* Card 4: Medical History */}
        <div className="card" style={{ cursor: 'pointer', borderLeft: '4px solid #10b981' }} onClick={() => goToStep(10)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.6rem', background: '#dcfce7', color: '#10b981', borderRadius: 'var(--radius-md)' }}>
              <Clock size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#10b981', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
              History
            </span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Medical History</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Browse past hospital visits, diagnoses, and lab results.
          </p>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View Timeline <ChevronRight size={16} />
          </div>
        </div>
      </div>

      {/* Session Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="var(--primary)" /> Encrypted Health Record • HIPAA Compliant
        </div>
        <button className="btn btn-secondary" style={{ color: 'var(--red-flag)', borderColor: 'var(--red-flag-border)' }} onClick={() => goToStep(11)}>
          <LogOut size={16} /> Sign Out Session
        </button>
      </div>
    </div>
  );
}
