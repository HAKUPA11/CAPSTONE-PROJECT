import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Volume2, ArrowRight, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'EN', name: 'English', native: 'English', prompt: 'Welcome. Please select your preferred language.' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी', prompt: 'नमस्कार, कृपया अपनी पसंदीदा भाषा चुनें।' },
  { code: 'TA', name: 'Tamil', native: 'தமிழ்', prompt: 'வணக்கம், உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்.' },
  { code: 'MR', name: 'Marathi', native: 'मराठी', prompt: 'नमस्कार, तुमची भाषा निवडा.' },
  { code: 'BN', name: 'Bengali', native: 'বাংলা', prompt: 'নমস্কার, আপনার ভাষা নির্বাচন করুন।' },
  { code: 'TE', name: 'Telugu', native: 'తెలుగు', prompt: 'నమస్కారం, మీ భాషను ఎంచుకోండి.' },
  { code: 'GU', name: 'Gujarati', native: 'ગુજરાતી', prompt: 'નમસ્તે, તમારી ભાષા પસંદ કરો.' },
  { code: 'KN', name: 'Kannada', native: 'கன்னட', prompt: 'ನಮಸ್ಕಾರ, ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.' }
];

export default function LanguageSelect() {
  const { selectedLanguage, setSelectedLanguage, goToStep, accessibility } = useApp();

  const handleSelect = (langName) => {
    setSelectedLanguage(langName);
  };

  const playAudioPreview = (text) => {
    if ('speechSynthesis' in window && accessibility.audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '680px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', marginBottom: '0.75rem' }}>
          <Globe size={28} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Select Preferred Language</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Choose your preferred language for voice prompts and clinical questionnaires.
        </p>
      </div>

      <div className="lang-grid">
        {LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.name;
          return (
            <div
              key={lang.code}
              className={`lang-card ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                handleSelect(lang.name);
                playAudioPreview(lang.prompt);
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 6px', background: isSelected ? 'var(--primary)' : 'var(--bg-main)', color: isSelected ? 'white' : 'var(--text-muted)', borderRadius: '4px' }}>
                  {lang.code}
                </span>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: isSelected ? 'var(--primary)' : 'var(--text-light)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudioPreview(lang.prompt);
                  }}
                  title="Audio sample"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2px' }}>{lang.native}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lang.name}</div>

              {isSelected && (
                <div style={{ marginTop: '0.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                  <Check size={14} /> Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => goToStep(2)}>
          Back
        </button>
        <button className="btn btn-primary" onClick={() => goToStep(4)}>
          Continue to Consent <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
