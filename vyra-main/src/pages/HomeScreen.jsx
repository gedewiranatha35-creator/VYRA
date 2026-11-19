import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { VyraLogoSvg } from '../components/Sidebar';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function HomeScreen({ lang, onChangeLang, t, onStartSensor, onOpenDashboard }) {
  return (
    <main className="vyra-splash">
      <div className="floating-lang">
        <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} variant="glass" />
      </div>

      <VyraLogoSvg size={136} />
      <h1>VYRA</h1>
      <p>{t('tagline')}</p>

      <div className="vyra-splash-actions">
        <button type="button" className="btn btn-white" onClick={onStartSensor}>
          <Activity size={18} />
          {t('connectSensorBtn')}
        </button>
        <button
          type="button"
          className="btn"
          style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
          onClick={onOpenDashboard}
        >
          {t('openDashboardBtn')}
          <ArrowRight size={17} />
        </button>
      </div>
    </main>
  );
}
