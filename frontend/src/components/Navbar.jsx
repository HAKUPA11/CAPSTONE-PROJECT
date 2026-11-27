import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MediKioskLogo from './MediKioskLogo';
import {
  Activity,
  Globe,
  Volume2,
  VolumeX,
  Bell,
  User,
  Stethoscope,
  ChevronDown,
  Sun,
  Moon,
  Type,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const {
    currentStep,
    userRole,
    setUserRole,
    selectedLanguage,
    setSelectedLanguage,
    accessibility,
    toggleHighContrast,
    toggleFontSize,
    toggleAudio,
    notifications,
    setNotifications,
    goToStep
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavSelect = (e) => {
    goToStep(Number(e.target.value));
  };

  const handleRoleToggle = (role) => {
    setUserRole(role);
    if (role === 'patient') {
      goToStep(5);
    } else if (role === 'doctor') {
      goToStep(13);
    } else {
      goToStep(1);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className={`navbar ${userRole === 'patient' ? 'patient-mode' : userRole === 'doctor' ? 'doctor-mode' : ''}`}>
      {/* Brand Logo */}
      <div className="nav-brand" onClick={() => goToStep(1)}>
        <MediKioskLogo size={44} showText={true} />
      </div>

      {/* Quick Dashboard Action Tabs */}
      {userRole === 'patient' && (
        <div className="nav-quick-tabs">
          <button
            className={`nav-tab-btn ${currentStep === 5 ? 'active-tab-patient' : ''}`}
            onClick={() => goToStep(5)}
          >
            <User size={14} /> Patient Dashboard
          </button>
          <button
            className={`nav-tab-btn ${currentStep === 6 ? 'active-tab-patient' : ''}`}
            onClick={() => goToStep(6)}
          >
            <Activity size={14} /> Check Symptoms
          </button>
          <button
            className={`nav-tab-btn ${currentStep === 7 ? 'active-tab-patient' : ''}`}
            onClick={() => goToStep(7)}
          >
            <LayoutDashboard size={14} /> Upload Reports
          </button>
          <button
            className={`nav-tab-btn ${currentStep === 9 || currentStep === 10 ? 'active-tab-patient' : ''}`}
            onClick={() => goToStep(9)}
          >
            <Bell size={14} /> Health Summary
          </button>
        </div>
      )}

      {userRole === 'doctor' && (
        <div className="nav-quick-tabs">
          <button
            className={`nav-tab-btn ${currentStep === 13 ? 'active-tab-doctor' : ''}`}
            onClick={() => goToStep(13)}
          >
            <Stethoscope size={14} /> Doctor Dashboard
          </button>
          <button
            className={`nav-tab-btn ${currentStep === 14 ? 'active-tab-doctor' : ''}`}
            onClick={() => goToStep(14)}
          >
            <User size={14} /> Patient Details
          </button>
          <button
            className={`nav-tab-btn ${currentStep === 15 || currentStep === 16 ? 'active-tab-doctor' : ''}`}
            onClick={() => goToStep(15)}
          >
            <Activity size={14} /> Doctor Notes
          </button>
          <button
            className={`nav-tab-btn ${currentStep === 18 ? 'active-tab-doctor' : ''}`}
            onClick={() => goToStep(18)}
          >
            <LayoutDashboard size={14} /> Medicines & Advice
          </button>
        </div>
      )}

      {/* Main Navigation & Role Controls */}
      <div className="nav-controls">
        {/* Language Selector */}
        <div className="step-jumper" style={{ padding: '0.35rem 0.64rem' }}>
          <Globe size={15} color="var(--primary)" />
          <select
            className="step-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Gujarati">ગુજરાતી (Gujarati)</option>
            <option value="Kannada">கன்னட (Kannada)</option>
          </select>
        </div>

        {/* Dark & Light Mode Toggle */}
        <button
          className="nav-icon-btn theme-toggle-btn"
          title={accessibility.highContrast ? "Switch to Light Mode" : "Switch to Dark Mode"}
          onClick={toggleHighContrast}
          style={{
            color: accessibility.highContrast ? '#f59e0b' : 'var(--primary)',
            background: accessibility.highContrast ? 'rgba(245, 158, 11, 0.15)' : 'var(--primary-light)'
          }}
        >
          {accessibility.highContrast ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Text to Speech Toggle */}
        <button
          className="nav-icon-btn"
          title={accessibility.audioEnabled ? "Voice Assistance On" : "Voice Assistance Off"}
          onClick={toggleAudio}
          style={{ color: accessibility.audioEnabled ? 'var(--primary)' : 'var(--text-light)' }}
        >
          {accessibility.audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Notifications Drawer */}
        <button
          className="nav-icon-btn"
          title="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={18} />
          {unreadCount > 0 && <span className="badge-dot" />}
        </button>
      </div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div
          style={{
            position: 'absolute',
            top: '65px',
            right: '20px',
            zIndex: 1500,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            boxShadow: 'var(--shadow-lg)',
            width: '320px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Clinical Alerts</span>
            <button
              style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
              onClick={markAllNotificationsRead}
            >
              Mark all read
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: n.read ? 'var(--bg-main)' : 'var(--primary-light)',
                  borderLeft: n.read ? 'none' : '3px solid var(--primary)',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ color: 'var(--text-main)', fontWeight: n.read ? 400 : 600 }}>{n.text}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
