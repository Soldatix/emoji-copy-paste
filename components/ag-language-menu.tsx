"use client";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import type { Language } from "@/lib/emoji-data";

const languages: Array<{ id: Language; code: string; label: string }> = [
  { id: "en", code: "EN", label: "English" },
  { id: "hr", code: "HR", label: "Hrvatski" },
  { id: "de", code: "DE", label: "Deutsch" },
  { id: "it", code: "IT", label: "Italiano" },
  { id: "es", code: "ES", label: "Español" },
];

function LanguageFlag({ language }: { language: Language }) {
  const common = { viewBox: "0 0 30 20", "aria-hidden": true, focusable: false } as const;

  if (language === "en") {
    return <svg {...common}><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" strokeWidth="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="3.4"/></svg>;
  }
  if (language === "hr") {
    return <svg {...common}><rect width="30" height="6.667" fill="#ff0000"/><rect y="6.667" width="30" height="6.666" fill="#fff"/><rect y="13.333" width="30" height="6.667" fill="#171796"/><path d="M12 5.4h6v6.4c0 2.25-1.25 3.65-3 4.45-1.75-.8-3-2.2-3-4.45z" fill="#fff" stroke="#d1182b" strokeWidth=".55"/><path d="M12.35 6h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm2.2 0h.9v1.1h-.9zm-3.3 1.1h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm-3.3 2.2h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm2.2 0h.9v1.1h-.9zm-3.3 1.1h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1z" fill="#d1182b"/></svg>;
  }
  if (language === "de") {
    return <svg {...common}><rect width="30" height="6.667" fill="#000"/><rect y="6.667" width="30" height="6.666" fill="#dd0000"/><rect y="13.333" width="30" height="6.667" fill="#ffce00"/></svg>;
  }
  if (language === "it") {
    return <svg {...common}><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/></svg>;
  }
  return <svg {...common}><rect width="30" height="5" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/><rect y="15" width="30" height="5" fill="#aa151b"/><rect x="8" y="7" width="2.1" height="4.5" rx=".25" fill="#aa151b"/><circle cx="9.05" cy="6.7" r="1" fill="#aa151b"/></svg>;
}

function LanguageRow({ language, code, label }: { language: Language; code: string; label: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="inline-flex h-4 w-6 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,.16)]">
        <LanguageFlag language={language} />
      </span>
      <span className="w-7 shrink-0 text-[11px] font-extrabold tracking-wide opacity-80">{code}</span>
      <span className="truncate">{label}</span>
    </span>
  );
}

export function AgLanguageMenu({
  value,
  onValueChange,
  ariaLabel = "Language",
}: {
  value: Language;
  onValueChange: (value: Language) => void;
  ariaLabel?: string;
}) {
  const current = languages.find((item) => item.id === value) || languages[0];

  return (
    <Select value={value} onValueChange={(next) => onValueChange(next as Language)}>
      <SelectTrigger className="language-select min-w-[178px]" aria-label={ariaLabel}>
        <LanguageRow language={current.id} code={current.code} label={current.label} />
      </SelectTrigger>
      <SelectContent align="end">
        {languages.map((item) => (
          <SelectItem key={item.id} value={item.id} textValue={item.code + " " + item.label}>
            <LanguageRow language={item.id} code={item.code} label={item.label} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
