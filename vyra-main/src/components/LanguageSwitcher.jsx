import React from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGES } from '../i18n/translations';

export default function LanguageSwitcher({ lang, onChangeLang, variant = 'light' }) {
  return (
    <label
      className={`lang-switcher ${variant === 'glass' ? 'glass' : ''}`}
      title="Pilih Bahasa / Select Language"
    >
      <Globe size={15} />
      <select
        value={lang}
        onChange={(e) => onChangeLang(e.target.value)}
        aria-label="Language selector"
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
