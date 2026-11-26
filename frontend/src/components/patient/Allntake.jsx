import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Activity,
  ChevronLeft
} from 'lucide-react';

const COMMON_SYMPTOMS = [
  'Chest Tightness',
  'Shortness of Breath',
  'Severe Headache',
  'High Fever',
  'Dizziness / Fainting',
  'Persistent Cough',
  'Abdominal Discomfort',
  'Joint Pain'
];

export default function AIIntake() {
  const { patientData, updateSymptoms, goToStep, accessibility } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [chiefComplaint, setChiefComplaint] = useState(patientData.symptoms.chiefComplaint || '');
  const [duration, setDuration] = useState(patientData.symptoms.duration || '3 hours');
  const [severity, setSeverity] = useState(patientData.symptoms.severity || 7);
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Chest Tightness', 'Shortness of Breath']);
  const [assistantMessage, setAssistantMessage] = useState('Namaste Rajesh. Please describe what symptoms or discomfort you are experiencing today.');

  const toggleSymptom = (sym) => {
    let updated;
    if (selectedSymptoms.includes(sym)) {
      updated = selectedSymptoms.filter(s => s !== sym);
    } else {
      updated = [...selectedSymptoms, sym];
    }
    setSelectedSymptoms(updated);

    const newComplaint = updated.join(', ');
    setChiefComplaint(newComplaint);
    updateSymptoms({ chiefComplaint: newComplaint, severity });
  };

  const toggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      setAssistantMessage('Listening... Please speak clearly into your microphone.');
      setTimeout(() => {
        setIsRecording(false);
        setAssistantMessage('Recorded: "Chest tightness radiating to left arm for approximately 3 hours."');
        const updatedComplaint = 'Chest tightness radiating to left arm';
        setChiefComplaint(updatedComplaint);
        updateSymptoms({ chiefComplaint: updatedComplaint, severity: 8 });
      }, 3500);
    } else {
      setIsRecording(false);
      setAssistantMessage('Voice recording paused.');
    }
  };

  const handleSeverityChange = (e) => {
    const val = Number(e.target.value);
    setSeverity(val);
    updateSymptoms({ severity: val });
  };

  const isRedFlag = selectedSymptoms.includes('Chest Tightness') || 
                    selectedSymptoms.includes('Shortness of Breath') || 
                    severity >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSymptoms({
      chiefComplaint,
      duration,
      severity
    });
    goToStep(7);
  };

  return (
    <div className="card" style={{ maxWidth: '780px', margin: '1.5rem auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)' }}>
          <Activity size={22} /> Check Your Symptoms
        </div>
        <span style={{ fontSize: '0.8rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
          Patient Check-In
        </span>
      </div>

      {/* Voice Assistant Prompt */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>
            <Activity size={16} /> Voice Assistant
          </div>
          <button
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.75rem' }}
            onClick={() => {
              if ('speechSynthesis' in window && accessibility.audioEnabled) {
                const u = new SpeechSynthesisUtterance(assistantMessage);
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(u);
              }
            }}
          >
            <Volume2 size={14} /> Listen
          </button>
        </div>

        <p style={{ fontSize: '1.05rem', lineHeight: '1.4', fontWeight: 500 }}>
          "{assistantMessage}"
        </p>

        {isRecording && (
          <div className="waveform-container">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className={`btn ${isRecording ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.6rem 1.5rem',
              background: isRecording ? 'var(--red-flag)' : 'white',
              color: isRecording ? 'white' : 'var(--text-main)'
            }}
            onClick={toggleMic}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} color="var(--primary)" />}
            {isRecording ? 'Stop Recording' : 'Voice Input (Tap to Speak)'}
          </button>
        </div>
      </div>

      {/* Red Flag Warning Alert */}
      {isRedFlag && (
        <div className="red-flag-banner">
          <AlertTriangle size={24} className="red-flag-icon" />
          <div>
            <div style={{ fontWeight: 800 }}>Urgent Care Needed</div>
            <div style={{ fontSize: '0.85rem' }}>
              Your symptoms need quick attention. We will alert the doctor immediately.
            </div>
          </div>
        </div>
      )}

      {/* Touch Form Input */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
            Tap Any Symptoms You Have:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {COMMON_SYMPTOMS.map((sym) => {
              const active = selectedSymptoms.includes(sym);
              return (
                <button
                  key={sym}
                  type="button"
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    border: active ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: active ? 'var(--primary-light)' : 'var(--bg-main)',
                    color: active ? 'var(--primary-hover)' : 'var(--text-main)',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onClick={() => toggleSymptom(sym)}
                >
                  {active && <CheckCircle2 size={14} color="var(--primary)" />} {sym}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
            Describe Your Health Problem:
          </label>
          <textarea
            rows={3}
            value={chiefComplaint}
            onChange={(e) => {
              setChiefComplaint(e.target.value);
              updateSymptoms({ chiefComplaint: e.target.value });
            }}
            placeholder="Tell us what problem you are facing..."
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>How Much Pain Do You Feel?</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1rem',
              padding: '0.2rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              color: 'white',
              background: severity >= 8 ? 'var(--red-flag)' : severity >= 5 ? 'var(--amber-warning)' : 'var(--primary)'
            }}>
              {severity} / 10
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={severity}
            onChange={handleSeverityChange}
            style={{ width: '100%', accentColor: severity >= 8 ? 'var(--red-flag)' : 'var(--primary)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe Pain</span>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
            How Long Have You Felt This?
          </label>
          <select
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              updateSymptoms({ duration: e.target.value });
            }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'white' }}
          >
            <option value="Less than 1 hour">Less than 1 hour</option>
            <option value="3 hours">3 hours</option>
            <option value="12 hours">12 hours</option>
            <option value="1-3 days">1 - 3 days</option>
            <option value="More than 1 week">More than 1 week</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button type="button" className="btn btn-secondary" onClick={() => goToStep(5)}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <button type="submit" className="btn btn-primary">
            Save & Upload Reports <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
