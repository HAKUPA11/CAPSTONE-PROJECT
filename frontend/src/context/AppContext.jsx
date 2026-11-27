import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const FLOW_STEPS = [
  { id: 1, title: 'Welcome Overview', flow: 'common' },
  { id: 2, title: 'Patient Sign In', flow: 'patient' },
  { id: 3, title: 'Language Preferences', flow: 'patient' },
  { id: 4, title: 'Privacy Consent', flow: 'patient' },
  { id: 5, title: 'Patient Dashboard', flow: 'patient' },
  { id: 6, title: 'Symptom Assessment', flow: 'patient' },
  { id: 7, title: 'Upload Records', flow: 'patient' },
  { id: 8, title: 'Report Processing', flow: 'patient' },
  { id: 9, title: 'Intake Summary', flow: 'patient' },
  { id: 10, title: 'Medical History', flow: 'patient' },
  { id: 11, title: 'Session Ended', flow: 'patient' },
  { id: 12, title: 'Provider Sign In', flow: 'doctor' },
  { id: 13, title: 'Triage Dashboard', flow: 'doctor' },
  { id: 14, title: 'Patient Profile', flow: 'doctor' },
  { id: 15, title: 'Clinical Review', flow: 'doctor' },
  { id: 16, title: 'Medical Timeline', flow: 'doctor' },
  { id: 17, title: 'Lab Records & Reports', flow: 'doctor' },
  { id: 18, title: 'Consultation & Rx', flow: 'doctor' },
  { id: 19, title: 'Provider Sign Out', flow: 'doctor' },
];

export const AppProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userRole, setUserRole] = useState('guest'); // 'guest' | 'patient' | 'doctor'
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [accessibility, setAccessibility] = useState({
    fontSize: 'normal',
    highContrast: false,
    audioEnabled: true,
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your clinical intake session is ready', time: 'Just now', read: false },
    { id: 2, text: 'High priority triage alert sent to attending care team', time: '2m ago', read: false }
  ]);

  const [patientData, setPatientData] = useState({
    id: 'IND-P-10492',
    name: 'Rajesh Sharma',
    age: 42,
    gender: 'Male',
    phone: '+91 98765 43210',
    city: 'New Delhi',
    language: 'English',
    vitals: {
      bp: '135/88 mmHg',
      pulse: '88 bpm',
      spo2: '97%',
      temp: '98.6 °F',
      weight: '74 kg'
    },
    consent: { dataUsage: true, aiProcessing: true, researchOptIn: true },
    symptoms: {
      chiefComplaint: 'Chest tightness and mild shortness of breath',
      duration: '3 hours',
      severity: 7,
      painType: 'Dull pressure',
      additionalNotes: 'Radiates slightly to left shoulder when taking deep breath.'
    },
    hasRedFlags: true,
    redFlagReason: 'High Triage Priority: Acute chest discomfort requiring immediate ECG evaluation',
    documents: [
      {
        id: 1,
        name: 'Apollo_Blood_Report_Aug2026.pdf',
        date: '2026-08-14',
        type: 'Lab Report',
        parsedData: 'HbA1c: 6.8% (Elevated), Fasting Glucose: 135 mg/dL, Total Cholesterol: 215 mg/dL',
        ocrConfidence: '98%'
      },
      {
        id: 2,
        name: 'Fortis_ECG_Baseline_2025.jpg',
        date: '2025-11-02',
        type: 'Diagnostic Scan',
        parsedData: 'Normal sinus rhythm, Rate: 72 bpm, ST segment normal',
        ocrConfidence: '95%'
      }
    ],
    aiSummary: '42-year-old male presenting with acute chest tightness (Severity 7/10) lasting 3 hours with radiation to left shoulder. Prior HbA1c elevated (6.8%). Cardiorespiratory alert triggered. Immediate physician review and ECG recommended.',
    history: [
      { id: 101, date: '2026-05-12', diagnosis: 'Mild Essential Hypertension', doctor: 'Dr. Sunita Rao', notes: 'Prescribed Amlodipine 5mg. Advised reduced sodium diet and routine cardio exercise.' },
      { id: 102, date: '2025-11-02', diagnosis: 'Annual Health Checkup & ECG', doctor: 'Dr. Vikramaditya Reddy', notes: 'Normal clinical findings overall. Borderline dyslipidemia noted.' }
    ]
  });

  const [doctorQueue, setDoctorQueue] = useState([
    {
      id: 'IND-P-10492',
      name: 'Rajesh Sharma',
      age: 42,
      gender: 'Male',
      urgency: 'high',
      symptomSummary: 'Chest tightness (3h), radiation to left shoulder',
      arrivalTime: '10 mins ago',
      status: 'Awaiting Physician Triage',
      redFlags: ['Chest Tightness', 'Shortness of Breath'],
      city: 'New Delhi'
    },
    {
      id: 'IND-P-10488',
      name: 'Priya Sundaram',
      age: 35,
      gender: 'Female',
      urgency: 'medium',
      symptomSummary: 'Persistent fever (38.5°C) & dry cough for 4 days',
      arrivalTime: '25 mins ago',
      status: 'Intake Completed',
      redFlags: ['High Fever'],
      city: 'Chennai'
    },
    {
      id: 'IND-P-10485',
      name: 'Amitabh Sen',
      age: 54,
      gender: 'Male',
      urgency: 'low',
      symptomSummary: 'Routine follow-up for Type-2 Diabetes medication refill',
      arrivalTime: '40 mins ago',
      status: 'Stable Dashboard',
      redFlags: [],
      city: 'Kolkata'
    },
    {
      id: 'IND-P-10480',
      name: 'Ananya Deshmukh',
      age: 29,
      gender: 'Female',
      urgency: 'medium',
      symptomSummary: 'Severe unilateral headache & photophobia for 12 hours',
      arrivalTime: '55 mins ago',
      status: 'Awaiting Review',
      redFlags: ['Severe Headache'],
      city: 'Mumbai'
    }
  ]);

  const [doctorNotes, setDoctorNotes] = useState({
    diagnosis: 'Acute Chest Discomfort - Urgent Triage ECG & Troponin Test Ordered',
    prescription: 'Aspirin 325mg stat, Sublingual Nitroglycerin PRN, Clopidogrel 75mg',
    followUp: 'Admit to cardiac observation unit for 6-hour Cardiac Troponin monitoring',
    status: 'Completed'
  });

  const goToStep = (stepNumber) => {
    const target = FLOW_STEPS.find(s => s.id === stepNumber);
    if (!target) return;
    setCurrentStep(stepNumber);
    if (target.flow === 'patient' && userRole !== 'patient') setUserRole('patient');
    if (target.flow === 'doctor' && userRole !== 'doctor') setUserRole('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStep < 19) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const toggleHighContrast = () => {
    setAccessibility(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleFontSize = () => {
    setAccessibility(prev => ({ ...prev, fontSize: prev.fontSize === 'normal' ? 'large' : 'normal' }));
  };

  const toggleAudio = () => {
    setAccessibility(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }));
  };

  const addDocument = (newDoc) => {
    setPatientData(prev => ({
      ...prev,
      documents: [newDoc, ...prev.documents]
    }));
    setNotifications(prev => [
      { id: Date.now(), text: `Document parsed successfully: ${newDoc.name}`, time: 'Just now', read: false },
      ...prev
    ]);
  };

  const updateSymptoms = (newSymptoms) => {
    const isRedFlag = newSymptoms.chiefComplaint?.toLowerCase().includes('chest') || 
                      newSymptoms.chiefComplaint?.toLowerCase().includes('breath') ||
                      newSymptoms.severity >= 8;

    setPatientData(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, ...newSymptoms },
      hasRedFlags: isRedFlag,
      redFlagReason: isRedFlag ? 'Urgent Triage Alert: Acute Cardiorespiratory Symptom' : null
    }));
  };

  return (
    <AppContext.Provider value={{
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
      patientData,
      setPatientData,
      updateSymptoms,
      addDocument,
      doctorQueue,
      setDoctorQueue,
      doctorNotes,
      setDoctorNotes,
      goToStep,
      nextStep,
      prevStep,
    }}>
      <div className={`${accessibility.highContrast ? 'high-contrast' : ''} ${accessibility.fontSize === 'large' ? 'large-font' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
