import React, { useMemo, useState } from 'react';
import { ChevronRight, ArrowLeft, Download } from 'lucide-react';
import HeartRateChart from '../components/HeartRateChart';
import { translateStatus } from '../i18n/translations';

export default function HistoryPage({ dates, t, onOpenPdfPreview }) {
  const [search, setSearch] = useState('');
  const [monthFilter, setMonthFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const months = useMemo(
    () => Array.from(new Set(dates.map((d) => d.month))),
    [dates]
  );

  const filteredDates = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = dates.filter(
      (d) =>
        (monthFilter === 'All' || d.month === monthFilter) &&
        (d.dateLabel.toLowerCase().includes(q) || d.weekday.toLowerCase().includes(q))
    );
    return sortOrder === 'newest' ? list : [...list].reverse();
  }, [dates, monthFilter, search, sortOrder]);

  if (selectedDate) {
    const recs = selectedDate.records;
    const visibleRecs =
      statusFilter === 'All'
        ? recs
        : recs.filter((r) => r.status === statusFilter);
    const bpms = recs.map((r) => r.bpm);
    const avg = Math.round(bpms.reduce((a, b) => a + b, 0) / bpms.length);
    const min = Math.min(...bpms);
    const max = Math.max(...bpms);

    const normalCount = recs.filter((r) => r.status === 'Normal').length;
    const lowCount = recs.filter((r) => r.status === 'Low').length;
    const highCount = recs.filter((r) => r.status === 'High').length;
    const pct = (n) => Math.round((n / recs.length) * 100);

    const dayChart = [...recs]
      .reverse()
      .map((r) => ({ time: r.time.replace(' AM', '').replace(' PM', ''), bpm: r.bpm }));

    return (
      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => {
              setSelectedDate(null);
              setStatusFilter('All');
            }}
          >
            <ArrowLeft size={16} /> {t('allDates')}
          </button>

          <div style={{ display: 'flex', gap: 10 }}>
            <select
              className="vyra-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">{t('allStatus')}</option>
              <option value="Normal">{t('typicalRange')}</option>
              <option value="Low">{t('statusLow')}</option>
              <option value="High">{t('statusHigh')}</option>
            </select>
            <button type="button" className="btn btn-primary" onClick={onOpenPdfPreview}>
              <Download size={16} /> {t('exportPdf')}
            </button>
          </div>
        </div>

        <div className="summary-4-grid">
          <div className="vyra-card">
            <div style={{ fontSize: 12, color: '#64748b' }}>{t('totalMeasurements')}</div>
            <div className="kpi-num" style={{ fontSize: 28 }}>
              {recs.length} <span>{t('recordsUnit')}</span>
            </div>
          </div>
          <div className="vyra-card">
            <div style={{ fontSize: 12, color: '#64748b' }}>{t('avgHeartRate')}</div>
            <div className="kpi-num" style={{ fontSize: 28 }}>
              {avg} <span>BPM</span>
            </div>
          </div>
          <div className="vyra-card">
            <div style={{ fontSize: 12, color: '#64748b' }}>{t('lowestHr')}</div>
            <div className="kpi-num" style={{ fontSize: 28 }}>
              {min} <span>BPM</span>
            </div>
          </div>
          <div className="vyra-card">
            <div style={{ fontSize: 12, color: '#64748b' }}>{t('highestHr')}</div>
            <div className="kpi-num" style={{ fontSize: 28 }}>
              {max} <span>BPM</span>
            </div>
          </div>
        </div>

        <div className="detail-mid-grid">
          <div className="vyra-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{t('hrThroughoutDay')}</h3>
                <p style={{ fontSize: 12, color: '#64748b' }}>
                  {t('recordedOn')} {selectedDate.weekday}, {selectedDate.dateLabel}
                </p>
              </div>
              <span className="badge normal">{t('stableTrend')}</span>
            </div>
            <HeartRateChart data={dayChart} height={160} />
          </div>

          <div className="vyra-card">
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>{t('dailyDistribution')}</h3>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 14 }}>
              {t('basedOn')} {recs.length} {t('measurementsWord')}
            </p>
            <div
              style={{
                display: 'flex',
                height: 14,
                borderRadius: 99,
                overflow: 'hidden',
                background: '#e2e8f0',
                marginBottom: 16,
              }}
            >
              {normalCount > 0 && (
                <div style={{ width: `${pct(normalCount)}%`, background: '#2ea861' }} />
              )}
              {lowCount > 0 && (
                <div style={{ width: `${pct(lowCount)}%`, background: '#f5ad1f' }} />
              )}
              {highCount > 0 && (
                <div style={{ width: `${pct(highCount)}%`, background: '#e54040' }} />
              )}
            </div>
            {[
              [t('typicalRange'), normalCount, '#2ea861'],
              [t('statusLow'), lowCount, '#f5ad1f'],
              [t('statusHigh'), highCount, '#e54040'],
            ].map(([label, count, color]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  marginBottom: 8,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: color }} />
                  {label}
                </span>
                <strong>
                  {count} ({pct(count)}%)
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="vyra-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            {t('measurementsOn')} {selectedDate.dateLabel}
          </h3>
          <div className="date-list">
            {visibleRecs.map((rec) => (
              <div
                key={rec.id}
                className="date-row"
                style={{ cursor: 'default' }}
              >
                <div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{rec.time} • {rec.condition}</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {rec.bpm} <span style={{ fontSize: 12, color: '#64748b' }}>BPM</span>
                  </div>
                </div>
                <span className={`badge ${rec.status.toLowerCase()}`}>
                  {translateStatus(rec.status, t)}
                </span>
                <span style={{ fontSize: 12.5, color: '#64748b', maxWidth: 340 }}>
                  {rec.notes}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="filter-row">
        <input
          type="search"
          className="vyra-input"
          placeholder={t('searchByDate')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="vyra-select"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        >
          <option value="All">{t('allMonths')}</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          className="vyra-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">{t('newestFirst')}</option>
          <option value="oldest">{t('oldestFirst')}</option>
        </select>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 10 }}>
        {t('savedDates')}
      </div>

      <div className="date-list">
        {filteredDates.map((d) => (
          <button
            key={d.id}
            type="button"
            className="date-row"
            onClick={() => setSelectedDate(d)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
              <span className="day-badge">{d.dayNum}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>{d.dateLabel}</div>
                <div style={{ fontSize: 12.5, color: '#64748b' }}>{d.weekday}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge normal" style={{ background: '#e8f2ff', color: '#1345a6' }}>
                {d.records.length} {t('recordsCaps')}
              </span>
              <ChevronRight size={18} color="#1677ff" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
