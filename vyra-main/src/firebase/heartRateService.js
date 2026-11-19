import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

/**
 * Klasifikasi status detak jantung sesuai parameter VYRA.
 */
export function classifyHeartRate(bpm) {
  if (bpm < 60) return 'Low';
  if (bpm > 100) return 'High';
  return 'Normal';
}

/**
 * Berlangganan data pengukuran detak jantung secara real-time dari Firestore.
 * Jika Firebase belum dikonfigurasi di .env, otomatis menggunakan data demo lokal.
 */
export function subscribeHeartRateRecords(userId, onData, fallbackData = []) {
  if (!isFirebaseConfigured || !db) {
    onData(fallbackData);
    return () => {};
  }

  const colRef = collection(db, 'users', userId, 'measurements');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(50));

  return onSnapshot(
    q,
    (snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onData(records.length > 0 ? records : fallbackData);
    },
    (err) => {
      console.warn('Firestore listener error, falling back to demo data:', err);
      onData(fallbackData);
    }
  );
}

/**
 * Menyimpan hasil pengukuran sensor PPG baru ke Firestore.
 */
export async function saveHeartRateMeasurement(userId, reading) {
  const payload = {
    bpm: reading.bpm,
    minBpm: reading.minBpm ?? reading.bpm - 5,
    maxBpm: reading.maxBpm ?? reading.bpm + 5,
    status: classifyHeartRate(reading.bpm),
    condition: reading.condition ?? 'Resting',
    notes: reading.notes ?? 'Measured via VYRA Optical PPG Sensor',
    dateLabel: reading.dateLabel,
    timeLabel: reading.timeLabel,
    createdAt: serverTimestamp(),
  };

  if (!isFirebaseConfigured || !db) {
    return { id: `local-${Date.now()}`, ...payload, localOnly: true };
  }

  const colRef = collection(db, 'users', userId, 'measurements');
  const docRef = await addDoc(colRef, payload);
  return { id: docRef.id, ...payload };
}
