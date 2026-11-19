import React from 'react';
import { Clock, User } from 'lucide-react';
import { isFirebaseConfigured } from '../firebase/config';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopHeader({
  title,
  subtitle,
  now,
  lang,
  locale = 'id-ID',
  onChangeLang,
  t,
  sensorConnected,
  onToggleSensorFlow,
}) {
  const current = now || new Date();
  const formattedDate = current.toLocaleDateString(locale, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = current.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <header className="vyra-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-right">
        <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />

        <div className="live-clock-pill" title="Waktu & tanggal real-time">
          <Clock size={15} />
          <span>{formattedDate}</span>
          <strong className="live-clock-time">{formattedTime}</strong>
        </div>

        <button
          type="button"
          className={`sensor-pill ${sensorConnected ? 'connected' : 'disconnected'}`}
          onClick={onToggleSensorFlow}
          title={t('navSensor')}
        >
          <span className="status-dot" />
          {sensorConnected ? t('sensorConnected') : t('sensorDisconnected')}
        </button>

        <button
          type="button"
          className="avatar-btn"
          title={
            isFirebaseConfigured
              ? 'Firebase Connected'
              : 'Demo Mode — isi .env untuk menghubungkan Firebase'
          }
        >
          <User size={21} />
        </button>
      </div>
    </header>
  );
}
