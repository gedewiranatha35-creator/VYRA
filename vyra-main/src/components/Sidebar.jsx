import React from 'react';
import { Activity, LayoutGrid, Clock, FileText, Info } from 'lucide-react';

export function VyraLogoSvg({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 52C32 52 12 40 12 24.5C12 17.5 17.5 13 23.5 13C27.5 13 30.5 15.2 32 18C33.5 15.2 36.5 13 40.5 13C46.5 13 52 17.5 52 24.5C52 40 32 52 32 52Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 32H22L26.5 21L32 42L37.5 26L41 32H54"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Sidebar({ activePage, t, onNavigate, onGoHome }) {
  const navItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutGrid },
    { id: 'sensor', label: t('navSensor'), icon: Activity },
    { id: 'history', label: t('navHistory'), icon: Clock },
    { id: 'report', label: t('navReport'), icon: FileText },
    { id: 'about', label: t('navAbout'), icon: Info },
  ];

  return (
    <aside className="vyra-sidebar">
      <div className="sidebar-brand" onClick={onGoHome} role="button" tabIndex={0}>
        <VyraLogoSvg size={46} />
        <div className="sidebar-brand-text">
          <h2>VYRA</h2>
          <span>{t('appSubtitle')}</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive =
            activePage === id ||
            (id === 'history' && activePage === 'history-detail') ||
            (id === 'report' && activePage === 'report-preview');
          return (
            <button
              key={id}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={22} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <svg className="sidebar-waves" viewBox="0 0 280 140" fill="none" aria-hidden="true">
        <path
          d="M0 40C65 10 130 95 205 68C245 54 265 40 280 34V140H0V40Z"
          fill="rgba(255,255,255,0.09)"
        />
        <path
          d="M0 84C70 55 155 125 280 78V140H0V84Z"
          fill="rgba(255,255,255,0.12)"
        />
      </svg>
    </aside>
  );
}
