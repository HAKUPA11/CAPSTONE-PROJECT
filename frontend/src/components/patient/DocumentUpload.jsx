import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Layers,
  ChevronLeft
} from 'lucide-react';

export default function DocumentUpload() {
  const { patientData, addDocument, goToStep } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSimulateUpload = (fileName, docType, parsedSample) => {
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          addDocument({
            id: Date.now(),
            name: fileName,
            date: new Date().toISOString().split('T')[0],
            type: docType,
            parsedData: parsedSample,
            ocrConfidence: '97%'
          });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '1.5rem auto' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={28} color="var(--primary)" />
            Upload Your Health Reports & Papers
          </h2>
          <span style={{ fontSize: '0.8rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
            PDF / JPG / PNG Supported
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Upload your blood tests, doctor prescriptions, or scan reports. We will automatically read them for you.
        </p>
      </div>

      {/* Progress Animation */}
      {isUploading && (
        <div className="card ocr-scanner" style={{ background: '#f0fdf4', border: '1px solid #86efac', textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <RefreshCw size={24} style={{ animation: 'spin 1.5s linear infinite' }} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Scanning & Parsing Medical Report...</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem' }}>
            Extracting lab values and medical terminology ({uploadProgress}%)
          </p>
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>
      )}

      {/* Dropzone */}
      {!isUploading && (
        <div className="card">
          <div className="dropzone"
            onClick={() => handleSimulateUpload('Max_Cardiology_Rx.pdf', 'Prescription', 'Aspirin 75mg QD, Metoprolol 25mg BID, Sorbitrate 5mg PRN')}
          >
            <UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Click or Drag & Drop Medical Documents</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Upload Indian hospital lab reports, blood panels, or prescriptions for instant OCR extractions
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              ⚡ Sample Indian Diagnostic Reports:
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem' }}
                onClick={() => handleSimulateUpload('Thyrocare_Lipid_Panel_Sep2026.pdf', 'Lab Report', 'Total Cholesterol: 235 mg/dL (High), LDL: 155 mg/dL, HDL: 42 mg/dL, Triglycerides: 190 mg/dL')}
              >
                + Attach Thyrocare Lipid Profile
              </button>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem' }}
                onClick={() => handleSimulateUpload('Apollo_Chest_XRay_Report.png', 'Imaging', 'Lungs clear, Cardiothoracic ratio normal, No active infiltrates')}
              >
                + Attach Apollo Chest X-Ray Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Extracted Docs List */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="var(--primary)" /> Attached Documents ({patientData.documents.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {patientData.documents.map((doc) => (
            <div
              key={doc.id}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                  <FileText size={18} color="var(--primary)" />
                  {doc.name}
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '4px' }}>
                    {doc.type}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <CheckCircle size={14} /> Data Extracted ({doc.ocrConfidence || '98%'})
                </span>
              </div>

              <div style={{ background: 'var(--bg-main)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-main)', borderLeft: '3px solid var(--primary)' }}>
                <strong>Parsed Data:</strong> {doc.parsedData}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button className="btn btn-secondary" onClick={() => goToStep(6)}>
          <ChevronLeft size={16} /> Back to Symptoms
        </button>
        <button className="btn btn-primary" onClick={() => goToStep(9)}>
          View Intake Summary <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
