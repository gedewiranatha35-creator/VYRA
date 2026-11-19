import React from 'react';
import {
  Activity,
  ArrowDownCircle,
  BarChart3,
  ArrowUpCircle,
  Download,
  HeartPulse,
  Sparkles,
  FileText,
} from 'lucide-react';
import HeartRateChart from '../components/HeartRateChart';
import { classifyHeartRate } from '../firebase/heartRateService';
import { translateStatus } from '../i18n/translations';

export default function DashboardPage({
  trend,
  t,
  onSimulateReading,
  onOpenReport,
  saving,
}) {
  const latest = trend[trend.length - 1]?.bpm ?? 78;
  const bpms = trend.map((item) => item.bpm);
  const minBpm = Math.min(...bpms);
  const maxBpm = Math.max(...bpms);
  const avgBpm = Math.round(bpms.reduce((a, b) => a + b, 0) / bpms.length);
  const status = classifyHeartRate(latest);
  const statusLabel = translateStatus(status, t);

  return (
    <section>
      <div className="dash-top-grid">
        <div className="vyra-card hero-hr-card">
          <div className="hr-icon-box">
            <HeartPulse size={48} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              {t('currentHr')}
            </div>
            <div className="hr-big-num">
              {latest} <span>BPM</span>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className={`badge ${status.toLowerCase()}`}>
                {status === 'Normal' ? t('withinTypical') : `${statusLabel} ${t('readingSuffix')}`}
              </span>
              <button
                type="button"
                className="btn btn-outline"
                style={{ padding: '5px 10px', fontSize: 11.5 }}
                onClick={onSimulateReading}
                disabled={saving}
              >
                <Activity size={14} />
                {saving ? t('saving') : t('simulateBeat')}
              </button>
            </div>
          </div>
        </div>

        <div className="vyra-card kpi-card">
          <div className="kpi-label">
            <ArrowDownCircle size={18} color="#1677ff" /> {t('minimum')}
          </div>
          <div className="kpi-num">
            {minBpm} <span>BPM</span>
          </div>
        </div>

        <div className="vyra-card kpi-card">
          <div className="kpi-label">
            <BarChart3 size={18} color="#1677ff" /> {t('average')}
          </div>
          <div className="kpi-num">
            {avgBpm} <span>BPM</span>
          </div>
        </div>

        <div className="vyra-card kpi-card">
          <div className="kpi-label">
            <ArrowUpCircle size={18} color="#1677ff" /> {t('maximum')}
          </div>
          <div className="kpi-num">
            {maxBpm} <span>BPM</span>
          </div>
        </div>
      </div>

      <div className="vyra-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>{t('hrTrend')}</h2>
            <p style={{ fontSize: 12.5, color: '#64748b' }}>{t('liveHistory')}</p>
          </div>
          <span className="badge normal">{t('liveStream')}</span>
        </div>
        <HeartRateChart data={trend} />
      </div>

      <div className="dash-bottom-grid">
        <div className="vyra-card">
          <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>
            {t('hrParams')}
          </h3>
          <div className="param-row normal">
            <span>60 – 100 BPM</span>
            <span className="badge normal">{t('statusNormal')}</span>
          </div>
          <div className="param-row low">
            <span>&lt; 60 BPM</span>
            <span className="badge low">{t('statusLow')}</span>
          </div>
          <div className="param-row high">
            <span>&gt; 100 BPM</span>
            <span className="badge high">{t('statusHigh')}</span>
          </div>
        </div>

        <div className="vyra-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Sparkles size={18} color="#1677ff" />
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('aiInsights')}</h3>
          </div>
          <span className={`badge ${status.toLowerCase()}`}>{statusLabel}</span>
          <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, marginTop: 10 }}>
            {status === 'Normal'
              ? t('insightNormal')
              : status === 'Low'
              ? t('insightLow')
              : t('insightHigh')}
          </p>
        </div>

        <div className="vyra-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={20} color="#1677ff" />
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{t('measurementReport')}</h3>
            </div>
            <p style={{ fontSize: 12.5, color: '#64748b', marginTop: 4 }}>
              {t('saveResultsSub')}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 16, padding: '13px 18px' }}
            onClick={onOpenReport}
          >
            <Download size={18} />
            {t('downloadPdf')}
          </button>
        </div>
      </div>
    </section>
  );
}
