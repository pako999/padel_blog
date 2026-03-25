'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const LANG_LABELS: Record<string, string> = {
  en: '🇬🇧 English',
  de: '🇩🇪 Deutsch',
  sv: '🇸🇪 Svenska',
  nl: '🇳🇱 Nederlands',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
  pl: '🇵🇱 Polski',
  no: '🇳🇴 Norsk',
  sl: '🇸🇮 Slovenščina',
  hr: '🇭🇷 Hrvatski',
};

interface Props {
  currentLang: string;
  /**
   * URL template — use `[lang]` as the placeholder.
   * e.g. "/[lang]", "/[lang]/blog", "/[lang]/clubs/nac-nueva-alcantara"
   */
  urlTemplate: string;
}

export default function LangSwitcher({ currentLang, urlTemplate }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const label = LANG_LABELS[currentLang] ?? currentLang.toUpperCase();
  const flag = label.split(' ')[0];

  function href(lang: string) {
    return urlTemplate.replace('[lang]', lang);
  }

  return (
    <div ref={ref} className={`lang-switcher${open ? ' open' : ''}`}>
      <button
        className="lang-switcher-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="lang-switcher-icon">{flag}</span>
        <span>{currentLang.toUpperCase()}</span>
        <span className="lang-switcher-arrow">▼</span>
      </button>

      <div className="lang-dropdown" role="menu">
        {Object.entries(LANG_LABELS).map(([lang, fullLabel]) => (
          <Link
            key={lang}
            href={href(lang)}
            className={`lang-dropdown-item${lang === currentLang ? ' active' : ''}`}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {fullLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}
