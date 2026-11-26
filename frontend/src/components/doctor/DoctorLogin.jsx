import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, Mail, Phone, Lock, User, Award, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DoctorLogin({ isLogoutMode = false }) {
  const { goToStep, setUserRole } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [doctorName, setDoctorName] = useState('Dr. Sunita Rao');
  const [specialty, setSpecialty] = useState('Cardiology');
  const [licenseNo, setLicenseNo] = useState('NPI-88412-IND');
  const [email, setEmail] = useState('dr.sunita@apollohealth.com');
  const [phone, setPhone] = useState('+91 98110 12345');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole('doctor');
    goToStep(13);
  };

  const handleLogoutConfirm = () => {
    setUserRole('guest');
    goToStep(1);
  };

  if (isLogoutMode) {
    return (
      <div className="card" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--accent-doctor-light)', color: 'var(--accent-doctor)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <LogOut size={30} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Provider Sign Out</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Are you sure you want to sign out of the Provider Portal? Active clinical notes are cached.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => goToStep(13)}>
            Return to Dashboard
          </button>
          <button className="btn btn-doctor" style={{ background: 'var(--accent-doctor)' }} onClick={handleLogoutConfirm}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '520px', margin: '2.5rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: 'var(--accent-doctor-light)', color: 'var(--accent-doctor)', borderRadius: '50%', marginBottom: '0.75rem' }}>
          <Stethoscope size={28} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{isRegister ? 'Doctor Sign Up' : 'Doctor Sign In'}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {isRegister ? 'Register your medical license & provider account' : 'Sign in with your Email Address, Mobile Number, and Password'}
        </p>
      </div>

      {/* Sign In / Sign Up Tab Switcher */}
      <div style={{ display: 'flex', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '1.5rem' }}>
        <button
          style={{ flex: 1, padding: '0.6rem', border: 'none', background: !isRegister ? 'white' : 'transparent', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', boxShadow: !isRegister ? 'var(--shadow-sm)' : 'none', color: !isRegister ? 'var(--accent-doctor)' : 'var(--text-muted)' }}
          onClick={() => setIsRegister(false)}
        >
          Sign In
        </button>
        <button
          style={{ flex: 1, padding: '0.6rem', border: 'none', background: isRegister ? 'white' : 'transparent', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', boxShadow: isRegister ? 'var(--shadow-sm)' : 'none', color: isRegister ? 'var(--accent-doctor)' : 'var(--text-muted)' }}
          onClick={() => setIsRegister(true)}
        >
          Sign Up (New Doctor)
        </button>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isRegister && (
          <>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Doctor Name & Title</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Sunita Rao"
                  required
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                />
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Specialty / Dept</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="Cardiology"
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>License / NPI No.</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                    placeholder="NPI-88412-IND"
                    required
                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                  <Award size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dr.sunita@apollohealth.com"
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
              placeholder="+91 98110 12345"
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
              placeholder="Enter your doctor password"
              required
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--accent-doctor-light)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
          <ShieldCheck size={16} color="var(--accent-doctor)" /> Authenticated via hospital SSO & HIPAA security.
        </div>

        <button type="submit" className="btn btn-doctor" style={{ width: '100%', marginTop: '0.5rem' }}>
          {isRegister ? 'Create Doctor Account & Sign In' : 'Sign In to Doctor Dashboard'} <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
