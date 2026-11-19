import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import HomeScreen from './pages/HomeScreen';
import SensorFlow from './pages/SensorFlow';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ReportPage from './pages/ReportPage';
import AboutPage from './pages/AboutPage';
import { INITIAL_TREND, SAVED_DATES } from './data/mockData';
import {
  saveHeartRateMeasurement,
  subscribeHeartRateRecords,
} from './firebase/heartRateService';
import { createTranslator, getLangMeta } from './i18n/translations';

const DEMO_USER_ID = 'demo-user';

function buildLiveInitialTrend() {
  const now = Date.now();
  return INITIAL_TREND.map((item, idx) => {
    const offsetMs = (INITIAL_TREND.length - 1 - idx) * 60 * 1000;
    const t = new Date(now - offsetMs);
    return {
      time: t.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      bpm: item.bpm,
    };
  });
}

function buildInitialDates(locale) {
  const today = new Date();
  const isoId = today.toISOString().slice(0, 10);
  const dayNum = String(today.getDate()).padStart(2, '0');
  const dateLabel = today.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const weekday = today.toLocaleDateString(locale, { weekday: 'long' });
  const month = today.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const timeNow = today.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const todayEntry = {
    id: isoId,
    dayNum,
    dateLabel,
    weekday,
    month,
    tone: 'blue',
    records: [
      {
        id: 'today-init',
        time: timeNow,
        bpm: 78,
        status: 'Normal',
        condition: 'Istirahat',
        notes: 'Detak jantung istirahat stabil dalam rentang dewasa normal',
      },
    ],
  };

  return [todayEntry, ...SAVED_DATES.filter((d) => d.id !== isoId)];
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('vyra_lang') || 'id';
    } catch {
      return 'id';
    }
  });
  const langMeta = useMemo(() => getLangMeta(lang), [lang]);
  const t = useMemo(() => createTranslator(lang), [lang]);

  // Start at Home Screen -> Sensor Detection Flow -> Dashboard
  const [view, setView] = useState('home');
  const [sensorConnected, setSensorConnected] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [trend, setTrend] = useState(buildLiveInitialTrend);
  const [dates, setDates] = useState(() => buildInitialDates('id-ID'));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vyra_lang', lang);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = langMeta.code;
    document.documentElement.dir = langMeta.dir;
  }, [lang, langMeta]);

  // Live clock & date updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeHeartRateRecords(
      DEMO_USER_ID,
      (records) => {
        if (records.length > 0 && records[0].bpm && records[0].timeLabel) {
          const latestSix = records
            .slice(0, 6)
            .reverse()
            .map((r) => ({ time: r.timeLabel, bpm: r.bpm }));
          setTrend(latestSix);
        }
      },
      []
    );
    return unsubscribe;
  }, []);

  async function handleSimulateReading() {
    setSaving(true);
    try {
      const nextBpm = Math.floor(68 + Math.random() * 24);
      const current = new Date();
      const timeLabel = current.toLocaleTimeString(langMeta.locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const dateLabel = current.toLocaleDateString(langMeta.locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      const isoId = current.toISOString().slice(0, 10);

      setTrend((prev) => [...prev.slice(-5), { time: timeLabel, bpm: nextBpm }]);

      const saved = await saveHeartRateMeasurement(DEMO_USER_ID, {
        bpm: nextBpm,
        dateLabel,
        timeLabel,
        condition: t('condLive'),
        notes: t('noteLive'),
      });

      const newRecord = {
        id: saved.id,
        time: timeLabel,
        bpm: nextBpm,
        status: saved.status,
        condition: t('condLive'),
        notes: t('noteLive'),
      };

      setDates((prev) => {
        const existsIdx = prev.findIndex((d) => d.id === isoId);
        if (existsIdx >= 0) {
          return prev.map((d, i) =>
            i === existsIdx ? { ...d, records: [newRecord, ...d.records] } : d
          );
        }
        return [
          {
            id: isoId,
            dayNum: String(current.getDate()).padStart(2, '0'),
            dateLabel,
            weekday: current.toLocaleDateString(langMeta.locale, { weekday: 'long' }),
            month: current.toLocaleDateString(langMeta.locale, {
              month: 'long',
              year: 'numeric',
            }),
            tone: 'blue',
            records: [newRecord],
          },
          ...prev,
        ];
      });
    } finally {
      setSaving(false);
    }
  }

  if (view === 'home') {
    return (
      <HomeScreen
        lang={lang}
        onChangeLang={setLang}
        t={t}
        onStartSensor={() => setView('sensor')}
        onOpenDashboard={() => setView('dashboard')}
      />
    );
  }

  if (view === 'sensor') {
    return (
      <SensorFlow
        lang={lang}
        onChangeLang={setLang}
        t={t}
        onConnected={() => {
          setSensorConnected(true);
          setView('dashboard');
        }}
        onDisconnected={() => setSensorConnected(false)}
        onSkipToDashboard={() => setView('dashboard')}
      />
    );
  }

  const headerMap = {
    dashboard: { title: t('headerDashboardTitle'), subtitle: t('headerDashboardSub') },
    history: { title: t('headerHistoryTitle'), subtitle: t('headerHistorySub') },
    report: { title: t('headerReportTitle'), subtitle: t('headerReportSub') },
    'report-preview': { title: t('headerPreviewTitle'), subtitle: t('headerPreviewSub') },
    about: { title: t('headerAboutTitle'), subtitle: t('headerAboutSub') },
  };
  const header = headerMap[view] || headerMap.dashboard;

  return (
    <div className="vyra-shell">
      <Sidebar
        activePage={view}
        t={t}
        onNavigate={(next) => setView(next)}
        onGoHome={() => setView('home')}
      />

      <main className="vyra-main">
        <TopHeader
          title={header.title}
          subtitle={header.subtitle}
          now={now}
          lang={lang}
          locale={langMeta.locale}
          onChangeLang={setLang}
          t={t}
          sensorConnected={sensorConnected}
          onToggleSensorFlow={() => setView('sensor')}
        />

        {view === 'dashboard' && (
          <DashboardPage
            trend={trend}
            saving={saving}
            t={t}
            onSimulateReading={handleSimulateReading}
            onOpenReport={() => setView('report-preview')}
          />
        )}

        {view === 'history' && (
          <HistoryPage
            dates={dates}
            t={t}
            onOpenPdfPreview={() => setView('report-preview')}
          />
        )}

        {(view === 'report' || view === 'report-preview') && (
          <ReportPage
            now={now}
            sensorConnected={sensorConnected}
            t={t}
            previewMode={view === 'report-preview'}
            onTogglePreview={(open) => setView(open ? 'report-preview' : 'report')}
          />
        )}

        {view === 'about' && (
          <AboutPage t={t} onOpenSensorFlow={() => setView('sensor')} />
        )}
      </main>
    </div>
  );
}
