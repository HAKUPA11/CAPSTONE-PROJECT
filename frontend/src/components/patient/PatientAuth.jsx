import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, Lock, ArrowRight, LogOut, ShieldCheck } from 'lucide-react';

export default function PatientAuth({ isLogoutMode = false }) {
  const { goToStep, patientData, setPatientData, setUserRole } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState(patientData.name || 'Rajesh Sharma');
  const [email, setEmail] = useState('rajesh.sharma@gmail.com');
  const [phone, setPhone] = useState(patientData.phone || '+91 98765 43210');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole('patient');
    setPatientData(prev => ({ ...prev, name: name || 'Rajesh Sharma', phone, email }));
    goToStep(3);
  };

  const handleLogoutConfirm = () => {
    setUserRole('guest');
    goToStep(1);
  };

  if (isLogoutMode) {
    return (
      <div className="card" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: '#fef2f2', color: 'var(--red-flag)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <LogOut size={30} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Session Sign Out</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Are you sure you want to end your current intake session? Your records are securely saved in the clinic system.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => goToStep(5)}>
            Return to Dashboard
          </button>
          <button className="btn btn-primary" style={{ background: 'var(--red-flag)' }} onClick={handleLogoutConfirm}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '520px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', marginBottom: '0.75rem' }}>
          <User size={28} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Patient Sign In</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {isRegister ? 'Register for your clinical consultation' : 'Sign in with your Email, Mobile number, and Password'}
        </p>
      </div>

      <div style={{ display: 'flex', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '1.5rem' }}>
        <button
          style={{ flex: 1, padding: '0.6rem', border: 'none', background: !isRegister ? 'white' : 'transparent', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', boxShadow: !isRegister ? 'var(--shadow-sm)' : 'none', color: !isRegister ? 'var(--primary)' : 'var(--text-muted)' }}
          onClick={() => setIsRegister(false)}
        >
          Sign In
        </button>
        <button
          style={{ flex: 1, padding: '0.6rem', border: 'none', background: isRegister ? 'white' : 'transparent', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', boxShadow: isRegister ? 'var(--shadow-sm)' : 'none', color: isRegister ? 'var(--primary)' : 'var(--text-muted)' }}
          onClick={() => setIsRegister(true)}
        >
          Sign Up (New Patient)
        </button>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isRegister && (
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                required
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
              />
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
        )}

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rajesh.sharma@gmail.com"
              required
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Mobile Number</label>
          <div style={{ position: 'relative' }}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
            <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-main)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
          <ShieldCheck size={16} color="var(--primary)" /> Encrypted and protected by clinic privacy protocols.
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
          Continue to Language Selection <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
