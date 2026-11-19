import React from 'react';

export default function HeartRateChart({ data, height = 185 }) {
  const width = 920;
  const padL = 44;
  const padR = 24;
  const padT = 18;
  const padB = 34;
  const minVal = 40;
  const maxVal = 120;

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const points = data.map((d, i) => {
    const x = padL + (data.length > 1 ? (i / (data.length - 1)) * plotW : plotW / 2);
    const clamped = Math.max(minVal, Math.min(maxVal, d.bpm));
    const y = padT + ((maxVal - clamped) / (maxVal - minVal)) * plotH;
    return { ...d, x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(padT + plotH).toFixed(
          1
        )} L ${points[0].x.toFixed(1)} ${(padT + plotH).toFixed(1)} Z`
      : '';

  const yTicks = [120, 100, 80, 60, 40];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Heart Rate Trend Chart"
    >
      <defs>
        <linearGradient id="vyraAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1677ff" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#1677ff" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {yTicks.map((tick) => {
        const y = padT + ((maxVal - tick) / (maxVal - minVal)) * plotH;
        return (
          <g key={tick}>
            <line
              x1={padL}
              y1={y}
              x2={width - padR}
              y2={y}
              stroke="#dbeafe"
              strokeWidth="1"
            />
            <text x={padL - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748b">
              {tick}
            </text>
          </g>
        );
      })}

      {areaPath && <path d={areaPath} fill="url(#vyraAreaGrad)" />}
      {linePath && (
        <path
          d={linePath}
          fill="none"
          stroke="#1677ff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {points.map((p, idx) => (
        <g key={`${p.time}-${idx}`}>
          <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="#1677ff" strokeWidth="2.8" />
          <text x={p.x} y={height - 10} textAnchor="middle" fontSize="11" fill="#64748b">
            {p.time}
          </text>
        </g>
      ))}
    </svg>
  );
}
