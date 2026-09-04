"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clipboard, Copy, Heart, Info, Moon, Search, Sparkles, Sun, Trash2, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { categoryIcons, emojis, type CategoryId, type EmojiEntry, type Language } from "@/lib/emoji-data";
import { trafficSignDataUrl } from "@/lib/traffic-signs";

const languages: Array<{ id: Language; label: string; flag: string }> = [
  { id: "en", label: "English", flag: "🇬🇧" }, { id: "hr", label: "Hrvatski", flag: "🇭🇷" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" }, { id: "it", label: "Italiano", flag: "🇮🇹" },
  { id: "es", label: "Español", flag: "🇪🇸" },
];
const categories: CategoryId[] = ["smileys", "people", "animals", "food", "activities", "travel", "objects", "symbols", "flags", "traffic", "hearts"];\nconst favoritesIcon = "⭐";

const itemKey = (item: EmojiEntry) => item.id || item.emoji;

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
  document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
};

const svgDataUrlToPngBlob = async (source: string): Promise<Blob> => {
  const image = new Image();
  image.src = source;
  await image.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 320; canvas.height = 320;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  context.clearRect(0, 0, 320, 320);
  context.drawImage(image, 0, 0, 320, 320);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("PNG conversion failed")), "image/png"));
};

const resizePngBlob = async (source: Blob, width: number, height: number): Promise<Blob> => {
  const objectUrl = URL.createObjectURL(source);
  try {
    const image = new Image();
    image.src = objectUrl;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable");
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    return await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("PNG resize failed")), "image/png"));
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const ui = {
  en: {
    eyebrow: "Free online app", title: "Emoji Copy & Paste", subtitle: "Find the right emoji, understand its meaning and copy it instantly.",
    search: "Search emojis or meanings…", all: "All",
    categories: { smileys: "Smileys", people: "People", animals: "Animals & nature", food: "Food & drink", activities: "Activities", travel: "Travel & places", objects: "Objects", symbols: "Symbols", flags: "Flags", traffic: "Traffic signs", hearts: "Heart faces" },
    favorites: "Favorites", recent: "Recently used", results: "emojis", noResults: "No emojis found", noResultsHint: "Try another word or choose a different category.",
    copy: "Copy emoji", copied: "copied!", copyImage: "Copy image", imageCopied: "Image copied!", imageCopyFallback: "Image copying is not supported here. Its emoji or text was copied instead.", previousCategories: "Show previous categories", moreCategories: "Show more categories", add: "Add to collection", added: "Added to your collection", collection: "Your emoji collection",
    collectionHint: "Build a combination, then copy it all at once.", copyAll: "Copy all", clear: "Clear", collectionCopied: "Emoji collection copied!",
    info: "Info & Support", theme: "Change theme", favoriteAdded: "Added to favorites", favoriteRemoved: "Removed from favorites",
    emptyFavorites: "Your favorite emojis will appear here.", emptyRecent: "Emojis you copy will appear here.",
    supportTitle: "Support the Project", supportIntro: "The apps and games are free to use, but voluntary donations are welcome.",
    charity: "A part of the received donations will be forwarded to various charitable organizations. The largest part will be donated to institutions caring for children without adequate parental care.",
    donateTo: "You can make donations to:", paypal: "PayPal account", paypalText: "Support the project securely through PayPal.", openPaypal: "Open PayPal",
    stripe: "Card Payment (Stripe)", stripeText: "Donate securely using your credit or debit card.", openStripe: "Open Stripe",
    crypto: "Crypto Wallet", cryptoText: "You can also support the project using cryptocurrency.", addressCopied: "address copied!",
    appearanceNote: "Emoji appearance may vary slightly between devices and apps.",
  },
  hr: {
    eyebrow: "Besplatna online aplikacija", title: "Emoji Copy & Paste", subtitle: "Pronađite pravi emoji, saznajte njegovo značenje i odmah ga kopirajte.",
    search: "Pretražite emojije ili značenja…", all: "Sve",
    categories: { smileys: "Lica i osjećaji", people: "Ljudi", animals: "Životinje i priroda", food: "Hrana i piće", activities: "Aktivnosti", travel: "Putovanja i mjesta", objects: "Predmeti", symbols: "Simboli", flags: "Zastave", traffic: "Prometni znakovi", hearts: "Srca i osjećaji" },
    favorites: "Omiljeni", recent: "Nedavno korišteni", results: "emojija", noResults: "Nema pronađenih emojija", noResultsHint: "Pokušajte drugu riječ ili odaberite drugu kategoriju.",
    copy: "Kopiraj emoji", copied: "kopiran!", copyImage: "Kopiraj sliku", imageCopied: "Slika je kopirana!", imageCopyFallback: "Kopiranje slike ovdje nije podržano. Umjesto nje kopiran je emoji ili tekst.", previousCategories: "Prikaži prethodne kategorije", moreCategories: "Prikaži još kategorija", add: "Dodaj u zbirku", added: "Dodano u vašu zbirku", collection: "Vaša emoji zbirka",
    collectionHint: "Složite kombinaciju, a zatim je kopirajte odjednom.", copyAll: "Kopiraj sve", clear: "Izbriši", collectionCopied: "Emoji zbirka je kopirana!",
    info: "Info i podrška", theme: "Promijeni temu", favoriteAdded: "Dodano u omiljene", favoriteRemoved: "Uklonjeno iz omiljenih",
    emptyFavorites: "Vaši omiljeni emojiji pojavit će se ovdje.", emptyRecent: "Emojiji koje kopirate pojavit će se ovdje.",
    supportTitle: "Podržite projekt", supportIntro: "Aplikacije i igre besplatne su za korištenje, ali dobrovoljne donacije su dobrodošle.",
    charity: "Dio primljenih donacija bit će proslijeđen različitim humanitarnim organizacijama. Najveći dio bit će doniran ustanovama koje skrbe o djeci bez odgovarajuće roditeljske skrbi.",
    donateTo: "Donirati možete putem:", paypal: "PayPal račun", paypalText: "Sigurno podržite projekt putem PayPala.", openPaypal: "Otvori PayPal",
    stripe: "Kartično plaćanje (Stripe)", stripeText: "Donirajte sigurno kreditnom ili debitnom karticom.", openStripe: "Otvori Stripe",
    crypto: "Kripto novčanik", cryptoText: "Projekt možete podržati i kriptovalutama.", addressCopied: "adresa kopirana!",
    appearanceNote: "Izgled emojija može se malo razlikovati između uređaja i aplikacija.",
  },
  de: {
    eyebrow: "Kostenlose Online-App", title: "Emoji Copy & Paste", subtitle: "Finde das passende Emoji, verstehe seine Bedeutung und kopiere es sofort.", search: "Emojis oder Bedeutungen suchen…", all: "Alle",
    categories: { smileys: "Smileys", people: "Menschen", animals: "Tiere & Natur", food: "Essen & Trinken", activities: "Aktivitäten", travel: "Reisen & Orte", objects: "Objekte", symbols: "Symbole", flags: "Flaggen", traffic: "Verkehrszeichen", hearts: "Herzgesichter" },
    favorites: "Favoriten", recent: "Zuletzt verwendet", results: "Emojis", noResults: "Keine Emojis gefunden", noResultsHint: "Versuche ein anderes Wort oder eine andere Kategorie.",
    copy: "Emoji kopieren", copied: "kopiert!", copyImage: "Bild kopieren", imageCopied: "Bild kopiert!", imageCopyFallback: "Das Kopieren von Bildern wird hier nicht unterstützt. Stattdessen wurde das Emoji oder der Text kopiert.", previousCategories: "Vorherige Kategorien anzeigen", moreCategories: "Weitere Kategorien anzeigen", add: "Zur Sammlung hinzufügen", added: "Zur Sammlung hinzugefügt", collection: "Deine Emoji-Sammlung", collectionHint: "Stelle eine Kombination zusammen und kopiere alles auf einmal.", copyAll: "Alle kopieren", clear: "Leeren", collectionCopied: "Emoji-Sammlung kopiert!",
    info: "Info & Support", theme: "Design wechseln", favoriteAdded: "Zu Favoriten hinzugefügt", favoriteRemoved: "Aus Favoriten entfernt", emptyFavorites: "Deine Lieblings-Emojis erscheinen hier.", emptyRecent: "Kopierte Emojis erscheinen hier.",
    supportTitle: "Projekt unterstützen", supportIntro: "Die Apps und Spiele sind kostenlos, freiwillige Spenden sind jedoch willkommen.", charity: "Ein Teil der Spenden wird an verschiedene Hilfsorganisationen weitergeleitet. Der größte Teil geht an Einrichtungen, die Kinder ohne angemessene elterliche Fürsorge betreuen.",
    donateTo: "Spenden sind möglich über:", paypal: "PayPal-Konto", paypalText: "Unterstütze das Projekt sicher über PayPal.", openPaypal: "PayPal öffnen", stripe: "Kartenzahlung (Stripe)", stripeText: "Spende sicher mit Kredit- oder Debitkarte.", openStripe: "Stripe öffnen", crypto: "Krypto-Wallet", cryptoText: "Du kannst das Projekt auch mit Kryptowährungen unterstützen.", addressCopied: "Adresse kopiert!", appearanceNote: "Das Aussehen von Emojis kann je nach Gerät und App leicht variieren.",
  },
  it: {
    eyebrow: "App online gratuita", title: "Emoji Copy & Paste", subtitle: "Trova l'emoji giusta, capiscine il significato e copiala subito.", search: "Cerca emoji o significati…", all: "Tutti",
    categories: { smileys: "Faccine", people: "Persone", animals: "Animali e natura", food: "Cibo e bevande", activities: "Attività", travel: "Viaggi e luoghi", objects: "Oggetti", symbols: "Simboli", flags: "Bandiere", traffic: "Segnali stradali", hearts: "Cuori ed emozioni" },
    favorites: "Preferiti", recent: "Usati di recente", results: "emoji", noResults: "Nessuna emoji trovata", noResultsHint: "Prova un'altra parola o categoria.", copy: "Copia emoji", copied: "copiata!", copyImage: "Copia immagine", imageCopied: "Immagine copiata!", imageCopyFallback: "La copia dell'immagine non è supportata qui. È stato copiato l'emoji o il testo.", previousCategories: "Mostra le categorie precedenti", moreCategories: "Mostra altre categorie", add: "Aggiungi alla raccolta", added: "Aggiunta alla raccolta", collection: "La tua raccolta di emoji", collectionHint: "Crea una combinazione e copiala tutta insieme.", copyAll: "Copia tutto", clear: "Svuota", collectionCopied: "Raccolta copiata!",
    info: "Info e supporto", theme: "Cambia tema", favoriteAdded: "Aggiunta ai preferiti", favoriteRemoved: "Rimossa dai preferiti", emptyFavorites: "Le tue emoji preferite appariranno qui.", emptyRecent: "Le emoji copiate appariranno qui.",
    supportTitle: "Sostieni il progetto", supportIntro: "Le app e i giochi sono gratuiti, ma le donazioni volontarie sono benvenute.", charity: "Una parte delle donazioni ricevute sarà destinata a varie organizzazioni benefiche. La parte maggiore sarà donata a istituti che assistono bambini senza adeguate cure parentali.",
    donateTo: "Puoi donare tramite:", paypal: "Conto PayPal", paypalText: "Sostieni il progetto in modo sicuro con PayPal.", openPaypal: "Apri PayPal", stripe: "Pagamento con carta (Stripe)", stripeText: "Dona in sicurezza con carta di credito o debito.", openStripe: "Apri Stripe", crypto: "Portafoglio crypto", cryptoText: "Puoi sostenere il progetto anche con criptovalute.", addressCopied: "indirizzo copiato!", appearanceNote: "L'aspetto delle emoji può variare leggermente tra dispositivi e app.",
  },
  es: {
    eyebrow: "Aplicación online gratuita", title: "Emoji Copy & Paste", subtitle: "Encuentra el emoji adecuado, comprende su significado y cópialo al instante.", search: "Buscar emojis o significados…", all: "Todos",
    categories: { smileys: "Caritas", people: "Personas", animals: "Animales y naturaleza", food: "Comida y bebida", activities: "Actividades", travel: "Viajes y lugares", objects: "Objetos", symbols: "Símbolos", flags: "Banderas", traffic: "Señales de tráfico", hearts: "Corazones y emociones" },
    favorites: "Favoritos", recent: "Usados recientemente", results: "emojis", noResults: "No se encontraron emojis", noResultsHint: "Prueba otra palabra o categoría.", copy: "Copiar emoji", copied: "¡copiado!", copyImage: "Copiar imagen", imageCopied: "¡Imagen copiada!", imageCopyFallback: "Aquí no se admite copiar imágenes. Se copió su emoji o texto.", previousCategories: "Mostrar categorías anteriores", moreCategories: "Mostrar más categorías", add: "Añadir a la colección", added: "Añadido a la colección", collection: "Tu colección de emojis", collectionHint: "Crea una combinación y cópiala toda de una vez.", copyAll: "Copiar todo", clear: "Borrar", collectionCopied: "¡Colección copiada!",
    info: "Info y soporte", theme: "Cambiar tema", favoriteAdded: "Añadido a favoritos", favoriteRemoved: "Eliminado de favoritos", emptyFavorites: "Tus emojis favoritos aparecerán aquí.", emptyRecent: "Los emojis que copies aparecerán aquí.",
    supportTitle: "Apoya el proyecto", supportIntro: "Las aplicaciones y los juegos son gratuitos, pero las donaciones voluntarias son bienvenidas.", charity: "Una parte de las donaciones se destinará a distintas organizaciones benéficas. La mayor parte será donada a instituciones que cuidan a niños sin una atención parental adecuada.",
    donateTo: "Puedes donar mediante:", paypal: "Cuenta PayPal", paypalText: "Apoya el proyecto de forma segura con PayPal.", openPaypal: "Abrir PayPal", stripe: "Pago con tarjeta (Stripe)", stripeText: "Dona de forma segura con tarjeta de crédito o débito.", openStripe: "Abrir Stripe", crypto: "Billetera cripto", cryptoText: "También puedes apoyar el proyecto con criptomonedas.", addressCopied: "¡dirección copiada!", appearanceNote: "La apariencia de los emojis puede variar ligeramente entre dispositivos y aplicaciones.",
  },
} as const;

const cryptoWallets = [
  ["BTC", "bc1qwlrxrh64peukga0fp59m9yg7gpf0yj8q7fxnsc"], ["ETH", "0xA99A52085c6725854daa46bb302041569c8bA4E3"],
  ["XRP", "rP43SsrkhPkxTsFohMAm32sAQg7vqwmDpr"], ["SOL", "8xkdVTEaDGuWu4aE3HpEx8r9Aux98JZbdsMiDQvJWBWR"],
  ["DOGE", "DGAT32ku8WmFaTDxCgVuRuVpUFmfdmD5Jb"], ["XLM", "GCYH4OD4I2GNRKFFOYROE3N3S2HCT5RXIML3TZV5DP3TLTLXPXQXIJZ3"],
  ["LTC", "LWtaFniqdYpv2xJtqo9WqDwCsQ2cW6PYWi"], ["RVN", "RAtXzKZyB3awfq2u2cK8YppC9kJamU5tPQ"],
] as const;

function loadList(key: string): string[] { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } }

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all" | "favorites" | "recent">("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [collection, setCollection] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [categoryScroll, setCategoryScroll] = useState({ left: false, right: false });
  const categoryStripRef = useRef<HTMLElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const t = ui[language];

  /* Persisted preferences are intentionally hydrated only after the client mounts. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedLanguage = localStorage.getItem("emoji-language") as Language | null;
    if (savedLanguage && languages.some((item) => item.id === savedLanguage)) setLanguage(savedLanguage);
    setFavorites(loadList("emoji-favorites")); setRecent(loadList("emoji-recent")); setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => { if (ready) { localStorage.setItem("emoji-language", language); document.documentElement.lang = language; } }, [language, ready]);
  useEffect(() => {
    const strip = categoryStripRef.current;
    if (!strip) return;
    const updateCategoryScroll = () => {
      const maxScrollLeft = Math.max(0, strip.scrollWidth - strip.clientWidth);
      setCategoryScroll({
        left: strip.scrollLeft > 4,
        right: strip.scrollLeft < maxScrollLeft - 4,
      });
    };
    updateCategoryScroll();
    strip.addEventListener("scroll", updateCategoryScroll, { passive: true });
    const resizeObserver = new ResizeObserver(updateCategoryScroll);
    resizeObserver.observe(strip);
    return () => {
      strip.removeEventListener("scroll", updateCategoryScroll);
      resizeObserver.disconnect();
    };
  }, [language]);

  const visibleEmojis = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language);
    return emojis.filter((item) => {
      const key = itemKey(item);
      const inCategory = activeCategory === "all" || (activeCategory === "favorites" && favorites.includes(key)) || (activeCategory === "recent" && recent.includes(key)) || item.category === activeCategory;
      const inSearch = !normalized || item.emoji.includes(normalized) || item.flagCode?.includes(normalized) || Object.values(item.meaning).some((meaning) => meaning.toLocaleLowerCase(language).includes(normalized));
      return inCategory && inSearch;
    });
  }, [activeCategory, favorites, language, query, recent]);

  const rememberRecent = (key: string) => { const updated = [key, ...recent.filter((item) => item !== key)].slice(0, 18); setRecent(updated); localStorage.setItem("emoji-recent", JSON.stringify(updated)); };
  const copyEmoji = async (item: EmojiEntry) => { await copyText(item.emoji); rememberRecent(itemKey(item)); toast.success(`${item.emoji} ${t.copied}`); };
  const copyImage = async (item: EmojiEntry) => {
    if (!item.flagCode && !item.trafficSignCode && !item.heartFaceCode) return copyEmoji(item);
    const imageUrl = item.trafficSignCode
      ? trafficSignDataUrl(item.trafficSignCode)
      : item.heartFaceCode
        ? `/heart-faces/${item.heartFaceCode}.png`
        : `https://flagcdn.com/w320/${item.flagCode}.png`;
    try {
      let pngBlob: Blob;
      const compactHeartImage = Boolean(item.heartFaceCode && window.matchMedia("(min-width: 768px)").matches);
      const pastedImageWidth = compactHeartImage ? 240 : 320;
      if (item.trafficSignCode) {
        pngBlob = await svgDataUrlToPngBlob(imageUrl);
      } else {
        const response = await fetch(imageUrl, { mode: "cors", cache: "force-cache" });
        if (!response.ok) throw new Error("Image unavailable");
        pngBlob = await response.blob();
        if (compactHeartImage) pngBlob = await resizePngBlob(pngBlob, pastedImageWidth, pastedImageWidth);
      }
      const htmlSource = imageUrl.startsWith("/") ? new URL(imageUrl, window.location.origin).href : imageUrl;
      const html = `<img src="${htmlSource}" alt="${item.meaning[language]}" width="${pastedImageWidth}">`;
      await navigator.clipboard.write([new ClipboardItem({
        "image/png": pngBlob,
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([item.emoji], { type: "text/plain" }),
      })]);
      rememberRecent(itemKey(item));
      toast.success(t.imageCopied);
    } catch {
      await copyText(item.emoji);
      rememberRecent(itemKey(item));
      toast.warning(t.imageCopyFallback);
    }
  };
  const toggleFavorite = (item: EmojiEntry) => { const key = itemKey(item); const exists = favorites.includes(key); const updated = exists ? favorites.filter((favorite) => favorite !== key) : [...favorites, key]; setFavorites(updated); localStorage.setItem("emoji-favorites", JSON.stringify(updated)); toast(exists ? t.favoriteRemoved : t.favoriteAdded); };
  const addToCollection = (emoji: string) => { setCollection((current) => [...current, emoji]); toast(t.added); };
  const copyCollection = async () => { await copyText(collection.join("")); const keys = [...collection].reverse().map((value) => itemKey(emojis.find((item) => item.emoji === value) || { emoji: value } as EmojiEntry)); const updated = [...new Set([keys, recent].flat())].slice(0, 18); setRecent(updated); localStorage.setItem("emoji-recent", JSON.stringify(updated)); toast.success(t.collectionCopied); };

  return (
    <main className="emoji-app">
      <Toaster position="bottom-center" richColors />
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
      <header className="app-header">
        <a className="brand" href="#top" aria-label="Apps and Games — Emoji Copy & Paste"><span className="brand-mark"><Zap size={21} fill="currentColor" /></span><span><strong>Apps</strong><span className="brand-amp"> & </span><strong>Games</strong></span></a>
        <div className="header-actions">
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}><SelectTrigger className="language-select" aria-label="Language"><SelectValue /></SelectTrigger><SelectContent>{languages.map((item) => <SelectItem key={item.id} value={item.id}>{item.flag} {item.label}</SelectItem>)}</SelectContent></Select>
          <Button className="icon-button" variant="outline" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={t.theme} title={t.theme}>{resolvedTheme === "dark" ? <Sun /> : <Moon />}</Button>
          <InfoDialog language={language} />
        </div>
      </header>
      <section className="hero" id="top"><div className="eyebrow"><Sparkles size={15} /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.subtitle}</p></section>
      <section className="workspace" aria-label={t.title}>
        <div className="search-wrap"><Search className="search-icon" aria-hidden="true" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} className="search-input" aria-label={t.search} />{query && <Button className="clear-search" variant="ghost" size="icon" onClick={() => setQuery("")} aria-label={t.clear}><X /></Button>}</div>
        <div className={`category-nav-wrap ${categoryScroll.left ? "can-scroll-left" : ""} ${categoryScroll.right ? "can-scroll-right" : ""}`}>
          {categoryScroll.left && <Button className="category-arrow category-prev" variant="outline" size="icon" aria-label={t.previousCategories} title={t.previousCategories} onClick={() => { const strip = categoryStripRef.current; if (strip) strip.scrollBy({ left: -Math.max(300, strip.clientWidth * 0.72), behavior: "smooth" }); }}><ChevronLeft /></Button>}
          <nav ref={categoryStripRef} className="category-strip" aria-label="Emoji categories">
            <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")} icon="✨" label={t.all} />
            {categories.map((category) => <CategoryButton key={category} active={activeCategory === category} onClick={() => setActiveCategory(category)} icon={categoryIcons[category]} label={t.categories[category]} />)}
            <CategoryButton active={activeCategory === "favorites"} onClick={() => setActiveCategory("favorites")} icon={favoritesIcon} label={t.favorites} />
            <CategoryButton active={activeCategory === "recent"} onClick={() => setActiveCategory("recent")} icon="🕘" label={t.recent} />
          </nav>
          {categoryScroll.right && <Button className="category-arrow category-next" variant="outline" size="icon" aria-label={t.moreCategories} title={t.moreCategories} onClick={() => { const strip = categoryStripRef.current; if (strip) strip.scrollBy({ left: Math.max(300, strip.clientWidth * 0.72), behavior: "smooth" }); }}><ChevronRight /></Button>}
        </div>
        {collection.length > 0 && <div className="collection-panel"><div className="collection-copy"><span className="collection-label">{t.collection}</span><div className="collection-emojis">{collection.join("")}</div><span className="collection-hint">{t.collectionHint}</span></div><div className="collection-actions"><Button onClick={copyCollection}><Clipboard /> {t.copyAll}</Button><Button variant="outline" onClick={() => setCollection([])}><Trash2 /> {t.clear}</Button></div></div>}
        <div className="results-heading"><span><strong>{visibleEmojis.length}</strong> {t.results}</span><span className="device-note">{t.appearanceNote}</span></div>
        {visibleEmojis.length ? <div className="emoji-grid">{visibleEmojis.map((item) => {
          const hasImage = Boolean(item.flagCode || item.trafficSignCode || item.heartFaceCode);
          const imageSource = item.trafficSignCode ? trafficSignDataUrl(item.trafficSignCode) : item.heartFaceCode ? `/heart-faces/${item.heartFaceCode}.png` : item.flagCode ? `https://flagcdn.com/w160/${item.flagCode}.png` : "";
          const favorite = favorites.includes(itemKey(item));
          return <article className={`emoji-card ${item.trafficSignCode ? "traffic-sign-card" : ""} ${item.heartFaceCode ? "heart-face-card" : ""}`} key={`${item.category}-${itemKey(item)}`}>
            <button className="emoji-copy-area" onClick={() => hasImage ? copyImage(item) : copyEmoji(item)} aria-label={`${hasImage ? t.copyImage : t.copy}: ${item.meaning[language]}`}>
              {hasImage ? <span className={`flag-image-wrap ${item.trafficSignCode ? "traffic-sign-image-wrap" : ""} ${item.heartFaceCode ? "heart-face-image-wrap" : ""}`} aria-hidden="true">
                <img className={`flag-image ${item.trafficSignCode ? "traffic-sign-image" : ""} ${item.heartFaceCode ? "heart-face-image" : ""}`} src={imageSource} srcSet={item.flagCode ? `https://flagcdn.com/w320/${item.flagCode}.png 2x` : undefined} alt="" width={160} height={item.trafficSignCode || item.heartFaceCode ? 160 : 107} onLoad={(event) => event.currentTarget.parentElement?.classList.remove("image-error")} onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add("image-error"); }} />
                <span className="flag-emoji-fallback">{item.emoji}</span>
              </span> : <span className="emoji-glyph" aria-hidden="true">{item.emoji}</span>}
              <span className="emoji-meaning">{item.meaning[language]}{item.flagCode && <strong className="flag-code"> · {item.flagCode.toUpperCase()}</strong>}</span>
              <span className="copy-prompt"><Copy size={14} /> {hasImage ? t.copyImage : t.copy}</span>
            </button>
            <div className="card-actions">
              {item.trafficSignCode && <button className="mini-action" onClick={() => copyEmoji(item)} aria-label={t.copy} title={t.copy}><Copy size={15} /></button>}
              <button className={`mini-action ${favorite ? "is-favorite" : ""}`} onClick={() => toggleFavorite(item)} aria-label={t.favorites}><Heart size={17} fill={favorite ? "currentColor" : "none"} /></button>
              <button className="mini-action add-action" onClick={() => addToCollection(item.emoji)} aria-label={t.add}>+</button>
            </div>
          </article>;
        })}</div>
        : <div className="empty-state"><span>{activeCategory === "favorites" ? "🤍" : activeCategory === "recent" ? "🕘" : "🔎"}</span><h2>{activeCategory === "favorites" ? t.emptyFavorites : activeCategory === "recent" ? t.emptyRecent : t.noResults}</h2>{activeCategory !== "favorites" && activeCategory !== "recent" && <p>{t.noResultsHint}</p>}</div>}
      </section>
      <footer><span>⚡ Apps & Games</span><span>Emoji Copy & Paste</span></footer>
    </main>
  );
}

function CategoryButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return <button className={`category-button ${active ? "active" : ""}`} onClick={onClick} aria-pressed={active}><span>{icon}</span>{label}</button>;
}

function InfoDialog({ language }: { language: Language }) {
  const t = ui[language];
  const copyAddress = async (currency: string, address: string) => { await copyText(address); toast.success(`${currency} ${t.addressCopied}`); };
  return <Dialog><DialogTrigger asChild><Button className="info-button" variant="outline"><Info /> <span>{t.info}</span></Button></DialogTrigger><DialogContent className="support-dialog"><DialogHeader className="support-header"><div className="support-kicker"><Info size={16} /> INFO & SUPPORT</div><DialogTitle>{t.supportTitle}</DialogTitle><DialogDescription>{t.supportIntro}</DialogDescription></DialogHeader><div className="support-scroll"><p className="charity-copy">{t.charity}</p><h3>{t.donateTo}</h3><div className="payment-grid"><article className="payment-card paypal-card"><div className="payment-logo">P</div><div><h4>{t.paypal}</h4><p>{t.paypalText}</p></div><a className="payment-link" href="https://www.paypal.com/ncp/payment/RU2CWCNVQ7XD6" target="_blank" rel="noreferrer">{t.openPaypal} ↗</a></article><article className="payment-card stripe-card"><div className="payment-logo">$</div><div><h4>{t.stripe}</h4><p>{t.stripeText}</p></div><a className="payment-link" href="https://buy.stripe.com/7sYeVd7Blfe89cm0k02kw00" target="_blank" rel="noreferrer">{t.openStripe} ↗</a></article></div><div className="crypto-heading"><div className="crypto-icon">₿</div><div><h3>{t.crypto}</h3><p>{t.cryptoText}</p></div></div><div className="wallet-list">{cryptoWallets.map(([currency, address]) => <div className="wallet-row" key={currency}><span className="currency">{currency}</span><code>{address}</code><Button variant="outline" size="sm" onClick={() => copyAddress(currency, address)}><Copy /> Copy</Button></div>)}</div></div></DialogContent></Dialog>;
}
