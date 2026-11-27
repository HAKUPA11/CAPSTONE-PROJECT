import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  AlertTriangle,
  Download,
  Edit3,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Share2
} from 'lucide-react';

export default function SummaryAndHistory({ stepMode = 9 }) {
  const { patientData, setPatientData, goToStep } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(patientData.aiSummary);

  const handleSaveSummary = () => {
    setPatientData(prev => ({ ...prev, aiSummary: editedSummary }));
    setIsEditing(false);
  };

  if (stepMode === 10) {
    return (
      <div className="card" style={{ maxWidth: '850px', margin: '1.5rem auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', background: '#dcfce7', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
              Medical History
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>Patient Visit & Consultation Timeline</h2>
          </div>
          <button className="btn btn-secondary" style={{ fontSize: '0.85rem' }} onClick={() => alert('Medical Record PDF exported successfully!')}>
            <Download size={16} /> Export Record PDF
          </button>
        </div>

        <div className="timeline-list">
          <div className="timeline-item">
            <div className="timeline-dot" style={{ background: 'var(--red-flag)' }} />
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.9rem' }}>Today's Outpatient Session</span>
                <span style={{ fontSize: '0.75rem', background: 'var(--red-flag)', color: 'white', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  Priority Care Alert
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>{patientData.symptoms.chiefComplaint}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{patientData.aiSummary}</p>
            </div>
          </div>

          {patientData.history.map((h) => (
            <div key={h.id} className="timeline-item">
              <div className="timeline-dot" />
              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>{h.date}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Physician: {h.doctor}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>{h.diagnosis}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{h.notes}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button className="btn btn-secondary" onClick={() => goToStep(9)}>
            <ChevronLeft size={16} /> Back to Summary
          </button>
          <button className="btn btn-primary" onClick={() => goToStep(11)}>
            Complete Session <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '1.5rem auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', background: '#f3e8ff', color: '#8b5cf6', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
            Intake Review
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>Clinical Intake Summary</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => alert('Summary link copied to clipboard')}>
            <Share2 size={16} /> Share
          </button>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => alert('Downloading Summary PDF...')}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {patientData.hasRedFlags && (
        <div className="red-flag-banner" style={{ marginBottom: '1.5rem' }}>
          <AlertTriangle size={24} className="red-flag-icon" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>Triage Priority Alert</div>
            <div style={{ fontSize: '0.85rem' }}>{patientData.redFlagReason}</div>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={18} /> Intake Synthesis
          </span>
          {!isEditing ? (
            <button
              style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={14} /> Edit Summary
            </button>
          ) : (
            <button className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }} onClick={handleSaveSummary}>
              <CheckCircle size={14} /> Save Changes
            </button>
          )}
        </div>

        {!isEditing ? (
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)', fontWeight: 500 }}>
            {patientData.aiSummary}
          </p>
        ) : (
          <textarea
            rows={4}
            value={editedSummary}
            onChange={(e) => setEditedSummary(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
          />
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'white', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Chief Complaint</div>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>{patientData.symptoms.chiefComplaint}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Duration: {patientData.symptoms.duration}</div>
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Discomfort Rating</div>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginTop: '4px', color: patientData.symptoms.severity >= 8 ? 'var(--red-flag)' : 'var(--primary)' }}>
            {patientData.symptoms.severity} / 10 Pain Scale
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Attached Files: {patientData.documents.length} Document(s)</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => goToStep(8)}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => goToStep(10)}>
            View Medical History
          </button>
          <button className="btn btn-doctor" onClick={() => goToStep(12)}>
            Forward to Provider Portal <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
