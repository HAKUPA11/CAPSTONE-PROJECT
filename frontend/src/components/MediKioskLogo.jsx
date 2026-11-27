import React from 'react';

export default function MediKioskLogo({ size = 42, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', userSelect: 'none' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 3px 10px rgba(0, 82, 204, 0.22))' }}
      >
        <defs>
          <linearGradient id="crossGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#004ac8" />
            <stop offset="45%" stopColor="#0077e6" />
            <stop offset="100%" stopColor="#00c9a7" />
          </linearGradient>

          <linearGradient id="swooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066d6" />
            <stop offset="100%" stopColor="#00dfb6" />
          </linearGradient>

          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0faf8" />
          </linearGradient>
        </defs>

        {/* Rounded Medical Cross shape */}
        <g id="cross-shape">
          {/* Vertical Bar */}
          <rect x="68" y="20" width="64" height="160" rx="26" fill="url(#crossGrad)" />
          {/* Horizontal Bar */}
          <rect x="20" y="68" width="160" height="64" rx="26" fill="url(#crossGrad)" />
        </g>

        {/* Kiosk Device in Center */}
        <g id="kiosk-device">
          <rect x="74" y="50" width="52" height="86" rx="14" fill="url(#screenGrad)" stroke="#0066d6" strokeWidth="4.5" />
          {/* Medical Plus on Screen */}
          <rect x="94" y="68" width="12" height="28" rx="3.5" fill="#0066d6" />
          <rect x="86" y="76" width="28" height="12" rx="3.5" fill="#0066d6" />
          {/* Speaker / Home Line */}
          <rect x="92" y="112" width="16" height="4" rx="2" fill="#0066d6" opacity="0.6" />
        </g>

        {/* Swooping Leaf / Curve on Right Side */}
        <path
          d="M 88 178 C 98 126 144 98 178 68 C 160 114 146 152 88 178 Z"
          fill="url(#swooshGrad)"
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#0052cc' }}>Medi</span>
            <span style={{ color: '#00bfa5' }}>kiosk</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginTop: '3px', letterSpacing: '0.2px' }}>
            Easy Patient Health Portal
          </div>
        </div>
      )}
    </div>
  );
}
