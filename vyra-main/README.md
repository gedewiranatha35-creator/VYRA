# VYRA Web — Smart Heart Rate Monitoring System

Kerangka aplikasi web **React + Vite + Firebase** yang dibangun dari desain Figma **VYRA**.

## Layar & Fitur yang Tersedia
- **Home Screen** — Splash screen VYRA (*"Every Beat Tells a Story"*).
- **Sensor Detection Flow (4 State)** — *Waiting*, *Connecting (Loading 65%)*, *Sensor Detected!*, dan *Sensor Not Detected (Try Again)*.
- **Dashboard** — Current Heart Rate, Min/Avg/Max KPI, Live Heart Rate Trend Chart, Heart Rate Parameters, VYRA AI Insights, dan tombol simulasi PPG.
- **History & Daily Detail** — Pencarian & pengurutan tanggal, detail harian, grafik sepanjang hari, distribusi status proporsional, dan daftar catatan.
- **Report & Preview PDF** — Tab *Overview / Analysis / Recommendations*, konfigurasi ekspor PDF, dan pratinjau dokumen **A4 Portrait** dengan tabel 7 kolom siap cetak (`window.print()`).
- **About VYRA** — Panduan sensor PPG, rentang referensi detak jantung, *Medical Disclaimer*, dan info tim.

## Menjalankan Secara Lokal
```bash
npm install
npm run dev
```

## Menghubungkan ke Firebase
1. Salin `.env.example` menjadi `.env`.
2. Isi variabel `VITE_FIREBASE_*` dengan kredensial Web App dari Firebase Console.
3. Tanpa `.env`, aplikasi tetap berjalan normal dalam **Demo Mode** menggunakan data lokal.
