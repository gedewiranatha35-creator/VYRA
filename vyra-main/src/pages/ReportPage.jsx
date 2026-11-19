import React, { useMemo, useState } from 'react';
import { ArrowLeft, Printer, Download, Check } from 'lucide-react';

function buildIndonesianPdfRows(referenceDate) {
  const base = referenceDate || new Date();
  const templates = [
    {
      daysAgo: 0,
      time: '10:25',
      hr: '78 BPM',
      range: '72 – 84 BPM',
      condition: 'Istirahat',
      statusKey: 'normal',
      statusLabel: 'Normal',
      notes: 'Detak jantung istirahat stabil dalam rentang dewasa normal',
    },
    {
      daysAgo: 1,
      time: '08:15',
      hr: '74 BPM',
      range: '68 – 80 BPM',
      condition: 'Cek Pagi',
      statusKey: 'normal',
      statusLabel: 'Normal',
      notes: 'Denyut dasar pagi konsisten dengan ritme nadi teratur',
    },
    {
      daysAgo: 2,
      time: '17:40',
      hr: '104 BPM',
      range: '88 – 104 BPM',
      condition: 'Pasca Olahraga',
      statusKey: 'high',
      statusLabel: 'Tinggi',
      notes: 'Detak meningkat setelah jogging ringan; pulih dalam 10 menit',
    },
    {
      daysAgo: 3,
      time: '06:30',
      hr: '58 BPM',
      range: '58 – 64 BPM',
      condition: 'Istirahat Dalam',
      statusKey: 'low',
      statusLabel: 'Rendah',
      notes: 'Sedikit di bawah 60 BPM saat bangun tidur; pantau bila ada gejala',
    },
    {
      daysAgo: 4,
      time: '13:10',
      hr: '82 BPM',
      range: '76 – 86 BPM',
      condition: 'Kerja Meja',
      statusKey: 'normal',
      statusLabel: 'Normal',
      notes: 'Pembacaan siang hari normal dengan variabilitas rendah',
    },
    {
      daysAgo: 5,
      time: '09:05',
      hr: '76 BPM',
      range: '70 – 81 BPM',
      condition: 'Istirahat',
      statusKey: 'normal',
      statusLabel: 'Normal',
      notes: 'Denyut istirahat optimal dengan hidrasi tubuh yang baik',
    },
    {
      daysAgo: 6,
      time: '19:50',
      hr: '80 BPM',
      range: '74 – 85 BPM',
      condition: 'Istirahat Malam',
      statusKey: 'normal',
      statusLabel: 'Normal',
      notes: 'Detak jantung malam stabil menjelang waktu tidur',
    },
  ];

  return templates.map((item) => {
    const d = new Date(base);
    d.setDate(base.getDate() - item.daysAgo);
    return {
      ...item,
      date: d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      shortDate: d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
      }),
    };
  });
}

export default function ReportPage({
  now,
  sensorConnected = true,
  t,
  previewMode,
  onTogglePreview,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sections, setSections] = useState({
    overview: true,
    analysis: true,
    recommendations: true,
    records: true,
  });

  const current = now || new Date();
  const dayKey = current.toISOString().slice(0, 10);

  // Seluruh dokumen PDF selalu menggunakan Bahasa Indonesia & periode 7 hari terakhir
  const { pdfRows, periodText, lowestDateLabel, highestDateLabel } = useMemo(() => {
    const end = new Date(current);
    const start = new Date(current);
    start.setDate(end.getDate() - 6);
    const rows = buildIndonesianPdfRows(end);

    const startFmt = start.toLocaleDateString('id-ID', { day: '2-digit', month: 'long' });
    const endFmt = end.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return {
      pdfRows: rows,
      periodText: `${startFmt} – ${endFmt}`,
      lowestDateLabel: rows[3].shortDate,
      highestDateLabel: rows[2].shortDate,
    };
  }, [dayKey]);

  const generatedLabelId = `${current.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}, ${current.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })} WIB`;

  if (previewMode) {
    return (
      <section>
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-soft"
              onClick={() => onTogglePreview(false)}
            >
              <ArrowLeft size={16} /> {t('backToReport')}
            </button>
            <span className="sensor-chip" style={{ margin: 0 }}>
              A4 Potret • {periodText} • Halaman 1 dari 1 (Bahasa Indonesia)
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-outline" onClick={() => window.print()}>
              <Printer size={16} /> {t('printBtn')}
            </button>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              <Download size={16} /> {t('downloadPdf')}
            </button>
          </div>
        </div>

        <div className="vyra-card pdf-preview-wrapper" style={{ padding: 20 }}>
          <div className="pdf-sheet" lang="id" dir="ltr">
            <div className="pdf-header-row">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="pdf-brand-badge">VYRA</span>
                  <strong className="pdf-main-title">Laporan Pemantauan Kesehatan</strong>
                </div>
                <div className="pdf-sub-title">
                  Sistem Pemantauan Detak Jantung PPG Cerdas • Ringkasan &amp; Catatan Mingguan
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="pdf-period-tag">PERIODE LAPORAN: {periodText.toUpperCase()}</div>
                <div className="pdf-meta-line">
                  Dibuat: {generatedLabelId} • Sensor:{' '}
                  {sensorConnected ? 'PPG Terhubung' : 'PPG Tidak Terhubung'}
                </div>
              </div>
            </div>

            {sections.overview && (
              <div className="pdf-summary-grid">
                <div className="pdf-kpi-box">
                  <div className="pdf-kpi-title">RATA-RATA DETAK</div>
                  <div className="pdf-kpi-val" style={{ color: '#1677ff' }}>
                    78 BPM
                  </div>
                  <div className="pdf-kpi-sub">Dalam rentang normal</div>
                </div>
                <div className="pdf-kpi-box">
                  <div className="pdf-kpi-title">TERENDAH TERCATAT</div>
                  <div className="pdf-kpi-val" style={{ color: '#92400e' }}>
                    58 BPM
                  </div>
                  <div className="pdf-kpi-sub">{lowestDateLabel} • Istirahat</div>
                </div>
                <div className="pdf-kpi-box">
                  <div className="pdf-kpi-title">TERTINGGI TERCATAT</div>
                  <div className="pdf-kpi-val" style={{ color: '#991b1b' }}>
                    104 BPM
                  </div>
                  <div className="pdf-kpi-sub">{highestDateLabel} • Pasca Aktivitas</div>
                </div>
                <div className="pdf-kpi-box">
                  <div className="pdf-kpi-title">TOTAL PENGUKURAN</div>
                  <div className="pdf-kpi-val" style={{ color: '#00357b' }}>
                    42 Catatan
                  </div>
                  <div className="pdf-kpi-sub">38 Normal • 2 Rendah • 2 Tinggi</div>
                </div>
              </div>
            )}

            {sections.records && (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}
                >
                  <strong style={{ fontSize: 13.5, color: '#0f172a' }}>
                    Tabel Rincian Catatan Pengukuran
                  </strong>
                  <span style={{ fontSize: 11, color: '#64748b' }}>
                    Menampilkan {pdfRows.length} catatan harian representatif
                  </span>
                </div>

                <div className="pdf-table-wrap">
                  <table className="pdf-table">
                    <thead>
                      <tr>
                        <th>TANGGAL</th>
                        <th>WAKTU</th>
                        <th>DETAK JANTUNG</th>
                        <th>MIN / MAKS</th>
                        <th>KONDISI</th>
                        <th>STATUS</th>
                        <th>CATATAN VYRA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pdfRows.map((row) => (
                        <tr key={`${row.date}-${row.time}`}>
                          <td style={{ fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>
                            {row.date}
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>{row.time}</td>
                          <td style={{ fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>
                            {row.hr}
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>{row.range}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>{row.condition}</td>
                          <td>
                            <span className={`badge ${row.statusKey}`}>{row.statusLabel}</span>
                          </td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {sections.recommendations && (
              <div className="pdf-ai-box">
                <span className="pdf-ai-tag">VYRA AI</span>
                <p>
                  Rata-rata detak jantung mingguan 78 BPM (90% berada dalam rentang normal 60–100
                  BPM). Tercatat satu lonjakan singkat pasca-olahraga (104 BPM) dan satu nilai
                  rendah saat istirahat dalam (58 BPM). Pertahankan pemeriksaan pagi secara rutin
                  untuk memantau kestabilan denyut harian.
                </p>
              </div>
            )}

            <div className="pdf-footer-row">
              <span>
                Sistem Pemantauan Detak Jantung Cerdas VYRA • Hanya untuk kesadaran kesehatan
                pribadi, bukan diagnosis klinis.
              </span>
              <strong>Halaman 1 dari 1</strong>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div
        className="vyra-card"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}
      >
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b' }}>
            {t('reportPeriodLabel')}
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>{periodText}</div>
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1677ff' }}>
          {t('weeklyReportChange')}
        </span>
      </div>

      <div className="tabs-bar">
        {[
          ['overview', t('tabOverview')],
          ['analysis', t('tabAnalysis')],
          ['recommendations', t('tabRecommendations')],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="two-col" style={{ gridTemplateColumns: '1.75fr 1fr' }}>
        <div className="vyra-card white">
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>
            {activeTab === 'overview'
              ? t('weeklyOverview')
              : activeTab === 'analysis'
              ? t('hrAnalysis')
              : t('vyraRecommendations')}
          </h3>
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 12.5, color: '#64748b' }}>{t('avgHeartRate')}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#1677ff' }}>78 BPM</div>
              </div>
              <div>
                <div style={{ fontSize: 12.5, color: '#64748b' }}>{t('totalMeasurements')}</div>
                <div style={{ fontSize: 30, fontWeight: 800 }}>42 {t('recordsUnit')}</div>
              </div>
            </div>
          )}
          {activeTab === 'analysis' && (
            <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}>
              {t('analysisBody')}
            </p>
          )}
          {activeTab === 'recommendations' && (
            <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}>
              {t('recommendationsBody')}
            </p>
          )}
        </div>

        <div className="vyra-card white">
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
            {t('reportHighlights')}
          </h3>
          <ul style={{ paddingLeft: 18, fontSize: 13, color: '#64748b', lineHeight: 1.8 }}>
            <li>{t('hl1')}</li>
            <li>{t('hl2')}</li>
            <li>{t('hl3')}</li>
          </ul>
        </div>
      </div>

      <div className="vyra-card white">
        <h3 style={{ fontSize: 18, fontWeight: 700 }}>{t('exportPdfTitle')}</h3>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
          {t('exportPdfSub')}
        </p>

        <div className="two-col" style={{ gridTemplateColumns: '1.9fr 1fr', marginBottom: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['overview', t('secOverview'), t('secOverviewDesc')],
              ['analysis', t('secAnalysis'), t('secAnalysisDesc')],
              ['recommendations', t('secRec'), t('secRecDesc')],
              ['records', t('secRecords'), t('secRecordsDesc')],
            ].map(([key, title, desc]) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid #e2e8f0',
                  background: '#f8fbff',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                <input
                  type="checkbox"
                  checked={sections[key]}
                  onChange={() => setSections((s) => ({ ...s, [key]: !s[key] }))}
                  style={{ accentColor: '#1677ff', width: 16, height: 16 }}
                />
                <strong style={{ minWidth: 190 }}>{title}</strong>
                <span style={{ color: '#64748b' }}>{desc}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="vyra-card" style={{ flex: 1, boxShadow: 'none' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1677ff' }}>
                {t('pdfDocTag')}
              </div>
              <div style={{ fontSize: 19, fontWeight: 800, margin: '8px 0' }}>
                {t('pdfDocTitle')}
              </div>
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                {t('pdfDocSub')} • Bahasa Indonesia
                <br />
                {t('pdfDocGen')}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => onTogglePreview(true)}
            >
              <Check size={16} /> {t('previewPdfBtn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
