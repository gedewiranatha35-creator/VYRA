import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AboutPage({ t, onOpenSensorFlow }) {
  return (
    <section>
      <div className="about-hero">
        <div style={{ maxWidth: 660 }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.18)',
              padding: '4px 12px',
              borderRadius: 99,
              fontSize: 11.5,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            {t('aboutHeroBadge')}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
            {t('aboutHeroTitle')}
          </h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, opacity: 0.92 }}>
            {t('aboutHeroDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 210 }}>
          {[t('feat1'), t('feat2'), t('feat3')].map((feat) => (
            <div
              key={feat}
              style={{
                background: 'rgba(255,255,255,0.16)',
                padding: '8px 14px',
                borderRadius: 10,
                fontSize: 12.5,
                fontWeight: 700,
              }}
            >
              • {feat}
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        <div className="vyra-card">
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>{t('howWorksTitle')}</h3>
          <p style={{ fontSize: 12.5, color: '#64748b', marginBottom: 14 }}>
            {t('howWorksSub')}
          </p>
          {[
            ['1', t('step1Title'), t('step1Desc')],
            ['2', t('step2Title'), t('step2Desc')],
            ['3', t('step3Title'), t('step3Desc')],
          ].map(([num, title, desc]) => (
            <div
              key={num}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '11px 14px',
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#dbeafe',
                  color: '#1677ff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {num}
              </span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{title}</div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.45 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="vyra-card">
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>{t('refSpecsTitle')}</h3>
          <p style={{ fontSize: 12.5, color: '#64748b', marginBottom: 12 }}>
            {t('refSpecsSub')}
          </p>
          <div className="param-row normal">
            <span>60 – 100 BPM</span>
            <span style={{ color: '#166534' }}>{t('zoneNormal')}</span>
          </div>
          <div className="param-row low">
            <span>&lt; 60 BPM</span>
            <span style={{ color: '#92400e' }}>{t('zoneLow')}</span>
          </div>
          <div className="param-row high" style={{ marginBottom: 14 }}>
            <span>&gt; 100 BPM</span>
            <span style={{ color: '#991b1b' }}>{t('zoneHigh')}</span>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
            {[
              [t('specTech'), t('specTechVal')],
              [t('specFormat'), t('specFormatVal')],
              [t('specVer'), t('specVerVal')],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}
              >
                <span style={{ color: '#64748b' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-col" style={{ gridTemplateColumns: '1.7fr 1fr', marginBottom: 0 }}>
        <div className="disclaimer-card">
          <AlertTriangle size={26} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: '#92400e', fontSize: 14.5 }}>{t('disclaimerTitle')}</strong>
            <p style={{ fontSize: 12.5, lineHeight: 1.55, marginTop: 4, color: '#1e293b' }}>
              {t('disclaimerBody')}
            </p>
          </div>
        </div>

        <div className="vyra-card white">
          <strong style={{ fontSize: 15 }}>{t('teamTitle')}</strong>
          <p style={{ fontSize: 12.5, color: '#64748b', margin: '6px 0 12px', lineHeight: 1.5 }}>
            {t('teamDesc')}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-soft"
              style={{ padding: '7px 12px', fontSize: 12 }}
              onClick={onOpenSensorFlow}
            >
              {t('testSensorBtn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
