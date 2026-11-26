import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Stethoscope,
  Clock,
  Search,
  Filter,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function DoctorDashboard() {
  const { doctorQueue, goToStep } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueue = doctorQueue.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'urgent') return patient.urgency === 'high';
    if (filter === 'review') return patient.urgency === 'medium';
    if (filter === 'stable') return patient.urgency === 'low';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #6d28d9, #4c1d95)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Stethoscope size={16} /> Doctor Portal & Patient List
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
              Doctor Care Dashboard
            </h1>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
              Dr. Sunita Rao (Senior Cardiologist • Apollo Health City)
            </p>
          </div>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={() => goToStep(19)}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--red-flag)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>URGENT CARE NEEDED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--red-flag)', margin: '4px 0' }}>1 Patient</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Needs Immediate ECG Check</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--amber-warning)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>READY FOR DOCTOR REVIEW</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--amber-warning)', margin: '4px 0' }}>1 Patient</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Check-In Completed</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--accent-patient)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>STABLE / REGULAR PATIENTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-patient)', margin: '4px 0' }}>1 Patient</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Routine Checkup</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={20} color="var(--accent-doctor)" /> Patient Care List ({filteredQueue.length})
          </h3>

          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.2rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {['all', 'urgent', 'review', 'stable'].map((f) => (
            <button
              key={f}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: filter === f ? '1.5px solid var(--accent-doctor)' : '1px solid var(--border-color)',
                background: filter === f ? 'var(--accent-doctor-light)' : 'var(--bg-main)',
                color: filter === f ? 'var(--accent-doctor)' : 'var(--text-muted)',
                fontWeight: filter === f ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
              onClick={() => setFilter(f)}
            >
              {f === 'urgent' ? '🔴 High Priority' : f === 'review' ? '🟡 Intake Ready' : f === 'stable' ? '🟢 Stable' : 'All Patients'}
            </button>
          ))}
        </div>

        {/* Priority Patient List */}
        <div>
          {filteredQueue.map((patient) => {
            const isUrgent = patient.urgency === 'high';
            const isReview = patient.urgency === 'medium';
            return (
              <div
                key={patient.id}
                className={`queue-card ${isUrgent ? 'urgent' : isReview ? 'review' : 'stable'}`}
                onClick={() => goToStep(14)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: isUrgent ? '#fef2f2' : isReview ? '#fffbeb' : '#dcfce7', color: isUrgent ? 'var(--red-flag)' : isReview ? 'var(--amber-warning)' : 'var(--accent-patient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{patient.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({patient.gender}, {patient.age}y)</span>
                      <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-main)', fontWeight: 600 }}>{patient.id}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {patient.symptomSummary}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {patient.redFlags.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {patient.redFlags.map(rf => (
                        <span key={rf} style={{ fontSize: '0.7rem', background: 'var(--red-flag)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          {rf}
                        </span>
                      ))}
                    </div>
                  )}

                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {patient.arrivalTime}
                  </span>

                  <button className="btn btn-doctor" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                    Open Record <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
