import React, { useState } from 'react';
import {
  Fingerprint,
  CheckCircle2,
  XCircle,
  RotateCw,
  ArrowRight,
  Check,
  Activity,
} from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function SensorFlow({
  lang,
  onChangeLang,
  t,
  onConnected,
  onDisconnected,
  onSkipToDashboard,
}) {
  // 4 states matching Figma section "DETEKSI SENSOR"
  const [stage, setStage] = useState('waiting'); // waiting | connecting | detected | failed

  function handleStageChange(nextStage) {
    setStage(nextStage);
    if (nextStage === 'failed' || nextStage === 'waiting') {
      onDisconnected?.();
    }
  }

  return (
    <main className="vyra-sensor-screen">
      <div className="floating-lang">
        <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
      </div>

      {stage === 'waiting' && (
        <>
          <div className="sensor-circle blue">
            <Fingerprint size={96} strokeWidth={1.8} />
          </div>
          <h1 className="sensor-title">{t('sensorWaitingTitle')}</h1>
          <p className="sensor-desc">{t('sensorWaitingDesc')}</p>
          <div className="sensor-dots">
            <span className="sensor-dot active" />
            <span className="sensor-dot" />
            <span className="sensor-dot" />
          </div>
          <p style={{ color: '#1677ff', fontWeight: 700, marginBottom: 20 }}>
            {t('sensorWaitingStatus')}
          </p>
          <button type="button" className="btn btn-primary" onClick={() => setStage('connecting')}>
            {t('sensorSimulateFinger')}
          </button>
        </>
      )}

      {stage === 'connecting' && (
        <>
          <div className="sensor-circle blue" style={{ border: '8px solid #dbeafe', borderTopColor: '#1677ff' }}>
            <Activity size={86} strokeWidth={2.2} />
          </div>
          <h1 className="sensor-title">{t('sensorConnectingTitle')}</h1>
          <p className="sensor-desc">{t('sensorConnectingDesc')}</p>
          <div className="sensor-progress-track">
            <div className="sensor-progress-fill" style={{ width: '65%' }} />
          </div>
          <div className="sensor-dots">
            <span className="sensor-dot" />
            <span className="sensor-dot active" />
            <span className="sensor-dot" />
          </div>
          <p style={{ color: '#1677ff', fontWeight: 700, fontSize: 14 }}>
            {t('sensorLoadingStatus')}
          </p>
          <div className="sensor-chips">
            <span className="sensor-chip done">
              <Check size={14} /> {t('chipSensorFound')}
            </span>
            <span className="sensor-chip active">
              <span className="status-dot" /> {t('chipCalibrating')}
            </span>
            <span className="sensor-chip">{t('chipReady')}</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-primary" onClick={() => handleStageChange('detected')}>
              {t('btnCompleteCalib')}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => handleStageChange('failed')}>
              {t('btnSimulateErr')}
            </button>
          </div>
        </>
      )}

      {stage === 'detected' && (
        <>
          <div className="sensor-circle blue">
            <CheckCircle2 size={102} strokeWidth={1.8} />
          </div>
          <h1 className="sensor-title">{t('sensorDetectedTitle')}</h1>
          <p className="sensor-desc">{t('sensorDetectedDesc')}</p>
          <button type="button" className="btn btn-primary" onClick={onConnected}>
            {t('btnContinueDash')}
            <ArrowRight size={17} />
          </button>
        </>
      )}

      {stage === 'failed' && (
        <>
          <div className="sensor-circle red">
            <XCircle size={102} strokeWidth={1.8} />
          </div>
          <h1 className="sensor-title">{t('sensorFailedTitle')}</h1>
          <p className="sensor-desc">{t('sensorFailedDesc')}</p>
          <div className="sensor-chips">
            <span className="sensor-chip">{t('chipTipClean')}</span>
            <span className="sensor-chip">{t('chipTipCover')}</span>
            <span className="sensor-chip">{t('chipTipCheck')}</span>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => setStage('connecting')}>
            <RotateCw size={17} />
            {t('btnTryAgain')}
          </button>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 12 }}>
            {t('sensorTrouble')}
          </p>
        </>
      )}

      {/* Quick Demo Switcher for testing all 4 Figma sensor states */}
      <div className="sensor-demo-bar">
        {[
          ['waiting', t('demoWaiting')],
          ['connecting', t('demoConnecting')],
          ['detected', t('demoDetected')],
          ['failed', t('demoFailed')],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`btn ${stage === key ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '7px 12px', fontSize: 12 }}
            onClick={() => handleStageChange(key)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className="btn btn-soft"
          style={{ padding: '7px 12px', fontSize: 12 }}
          onClick={onSkipToDashboard}
        >
          {t('demoSkip')}
        </button>
      </div>
    </main>
  );
}
