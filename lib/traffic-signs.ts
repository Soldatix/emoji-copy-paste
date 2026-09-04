import type { EmojiEntry } from "@/lib/emoji-data";

export type TrafficSignCode =
  | "stop" | "give-way" | "no-entry" | "no-vehicles" | "no-cars" | "no-motorcycles"
  | "no-bicycles" | "no-pedestrians" | "no-overtaking" | "end-no-overtaking"
  | "speed-30" | "speed-50" | "speed-80" | "end-speed-limit" | "no-parking"
  | "no-stopping" | "no-left-turn" | "no-right-turn" | "no-u-turn" | "weight-limit"
  | "roundabout" | "straight-ahead" | "turn-right" | "turn-left" | "straight-or-right"
  | "bicycle-path" | "pedestrian-path" | "shared-path" | "pass-right" | "snow-chains"
  | "general-danger" | "roadworks" | "traffic-lights" | "pedestrian-crossing" | "children"
  | "slippery-road" | "wild-animals" | "two-way-traffic" | "uneven-road" | "falling-rocks";

type SignKind = "stop" | "yield" | "no-entry" | "prohibition" | "end" | "no-parking" | "no-stopping" | "mandatory" | "warning" | "crossing";

type SignDefinition = {
  kind: SignKind;
  symbol?: string;
  size?: number;
  slash?: boolean;
};

const signs: Record<TrafficSignCode, SignDefinition> = {
  stop: { kind: "stop" },
  "give-way": { kind: "yield" },
  "no-entry": { kind: "no-entry" },
  "no-vehicles": { kind: "prohibition" },
  "no-cars": { kind: "prohibition", symbol: "🚗", size: 42 },
  "no-motorcycles": { kind: "prohibition", symbol: "🏍", size: 43 },
  "no-bicycles": { kind: "prohibition", symbol: "🚲", size: 44 },
  "no-pedestrians": { kind: "prohibition", symbol: "🚶", size: 44 },
  "no-overtaking": { kind: "prohibition", symbol: "● ●", size: 34 },
  "end-no-overtaking": { kind: "end", symbol: "● ●", size: 31 },
  "speed-30": { kind: "prohibition", symbol: "30", size: 51 },
  "speed-50": { kind: "prohibition", symbol: "50", size: 51 },
  "speed-80": { kind: "prohibition", symbol: "80", size: 51 },
  "end-speed-limit": { kind: "end", symbol: "50", size: 48 },
  "no-parking": { kind: "no-parking" },
  "no-stopping": { kind: "no-stopping" },
  "no-left-turn": { kind: "prohibition", symbol: "↰", size: 59, slash: true },
  "no-right-turn": { kind: "prohibition", symbol: "↱", size: 59, slash: true },
  "no-u-turn": { kind: "prohibition", symbol: "↶", size: 60, slash: true },
  "weight-limit": { kind: "prohibition", symbol: "3,5 t", size: 35 },
  roundabout: { kind: "mandatory", symbol: "↻", size: 66 },
  "straight-ahead": { kind: "mandatory", symbol: "↑", size: 72 },
  "turn-right": { kind: "mandatory", symbol: "→", size: 70 },
  "turn-left": { kind: "mandatory", symbol: "←", size: 70 },
  "straight-or-right": { kind: "mandatory", symbol: "↗", size: 68 },
  "bicycle-path": { kind: "mandatory", symbol: "🚲", size: 47 },
  "pedestrian-path": { kind: "mandatory", symbol: "🚶", size: 48 },
  "shared-path": { kind: "mandatory", symbol: "🚶│🚲", size: 27 },
  "pass-right": { kind: "mandatory", symbol: "↘", size: 68 },
  "snow-chains": { kind: "mandatory", symbol: "⛓", size: 47 },
  "general-danger": { kind: "warning", symbol: "!", size: 58 },
  roadworks: { kind: "warning", symbol: "🚧", size: 42 },
  "traffic-lights": { kind: "warning", symbol: "🚦", size: 44 },
  "pedestrian-crossing": { kind: "crossing", symbol: "🚶", size: 43 },
  children: { kind: "warning", symbol: "🧒", size: 43 },
  "slippery-road": { kind: "warning", symbol: "〰", size: 57 },
  "wild-animals": { kind: "warning", symbol: "🦌", size: 43 },
  "two-way-traffic": { kind: "warning", symbol: "↕", size: 57 },
  "uneven-road": { kind: "warning", symbol: "⌁", size: 63 },
  "falling-rocks": { kind: "warning", symbol: "◆", size: 47 },
};

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
})[character] || character);

const text = (symbol: string, size = 48, color = "#111827", y = 101) =>
  `<text x="80" y="${y}" text-anchor="middle" font-family="Arial, 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif" font-size="${size}" font-weight="800" fill="${color}">${escapeXml(symbol)}</text>`;

function signSvg(definition: SignDefinition): string {
  const { kind, symbol = "", size = 48 } = definition;
  let content = "";

  if (kind === "stop") {
    content = `<polygon points="47,8 113,8 152,47 152,113 113,152 47,152 8,113 8,47" fill="#d91f2a" stroke="#ffffff" stroke-width="7"/><polygon points="45,2 115,2 158,45 158,115 115,158 45,158 2,115 2,45" fill="none" stroke="#d91f2a" stroke-width="5"/>${text("STOP", 34, "#ffffff", 92)}`;
  } else if (kind === "yield") {
    content = `<polygon points="80,148 9,24 151,24" fill="#ffffff" stroke="#d91f2a" stroke-width="14" stroke-linejoin="round"/>`;
  } else if (kind === "no-entry") {
    content = `<circle cx="80" cy="80" r="68" fill="#d91f2a"/><rect x="31" y="68" width="98" height="24" rx="5" fill="#ffffff"/>`;
  } else if (kind === "mandatory") {
    content = `<circle cx="80" cy="80" r="69" fill="#1474d4" stroke="#ffffff" stroke-width="4"/>${text(symbol, size, "#ffffff")}`;
  } else if (kind === "warning") {
    content = `<polygon points="80,10 151,140 9,140" fill="#ffffff" stroke="#d91f2a" stroke-width="12" stroke-linejoin="round"/>${text(symbol, size, "#111827", 115)}`;
  } else if (kind === "crossing") {
    content = `<rect x="8" y="8" width="144" height="144" rx="8" fill="#1474d4"/><polygon points="80,24 139,131 21,131" fill="#ffffff"/>${text(symbol, size, "#111827", 112)}`;
  } else if (kind === "no-parking" || kind === "no-stopping") {
    content = `<circle cx="80" cy="80" r="68" fill="#1769aa" stroke="#d91f2a" stroke-width="12"/><path d="M32 128 L128 32" stroke="#d91f2a" stroke-width="13" stroke-linecap="round"/>${kind === "no-stopping" ? '<path d="M32 32 L128 128" stroke="#d91f2a" stroke-width="13" stroke-linecap="round"/>' : ""}`;
  } else {
    const endLines = kind === "end" ? `<g stroke="#374151" stroke-width="7">${[-25, -3, 19, 41].map((offset) => `<line x1="${26 + offset}" y1="130" x2="${100 + offset}" y2="30"/>`).join("")}</g>` : "";
    content = `<circle cx="80" cy="80" r="68" fill="#ffffff" stroke="${kind === "end" ? "#374151" : "#d91f2a"}" stroke-width="${kind === "end" ? 5 : 12}"/>${text(symbol, size)}${endLines}${definition.slash ? '<path d="M31 129 L129 31" stroke="#d91f2a" stroke-width="12" stroke-linecap="round"/>' : ""}`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="320" height="320"><rect width="160" height="160" fill="transparent"/>${content}</svg>`;
}

const dataUrlCache = new Map<TrafficSignCode, string>();

export function trafficSignDataUrl(code: TrafficSignCode): string {
  if (code === "no-overtaking") return "/traffic-signs/no-overtaking.svg";
  const cached = dataUrlCache.get(code);
  if (cached) return cached;
  const value = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(signSvg(signs[code]))}`;
  dataUrlCache.set(code, value);
  return value;
}

const signEntry = (
  id: TrafficSignCode,
  emoji: string,
  en: string,
  hr: string,
  de: string,
  it: string,
  es: string,
): EmojiEntry => ({ id: `traffic-${id}`, emoji, trafficSignCode: id, category: "traffic", meaning: { en, hr, de, it, es } });

export const trafficSignEntries: EmojiEntry[] = [
  signEntry("stop", "🛑", "Stop — come to a complete stop", "Stop — obavezno potpuno zaustavljanje", "Stop — vollständig anhalten", "Stop — arresto completo obbligatorio", "Stop — detención completa obligatoria"),
  signEntry("give-way", "🔻", "Give way — yield to traffic with priority", "Raskrižje s cestom s prednošću prolaska — propustite vozila", "Vorfahrt gewähren — Fahrzeugen mit Vortritt Vorrang lassen", "Dare precedenza — cedere il passo ai veicoli prioritari", "Ceda el paso — dar prioridad al tráfico preferente"),
  signEntry("no-entry", "⛔", "No entry — entry is prohibited", "Zabranjen promet u jednom smjeru — ulaz nije dopušten", "Einfahrt verboten — nicht einfahren", "Senso vietato — accesso non consentito", "Entrada prohibida — no se permite entrar"),
  signEntry("no-vehicles", "🚫", "No vehicles — traffic prohibited in both directions", "Zabrana prometa za sva vozila u oba smjera", "Allgemeines Fahrverbot in beiden Richtungen", "Transito vietato a tutti i veicoli in entrambe le direzioni", "Circulación prohibida a todos los vehículos en ambos sentidos"),
  signEntry("no-cars", "🚫🚗", "No motor vehicles — cars and similar vehicles prohibited", "Zabrana prometa za motorna vozila", "Verbot für Motorwagen", "Divieto di transito ai veicoli a motore", "Prohibido el paso a vehículos de motor"),
  signEntry("no-motorcycles", "🚫🏍️", "No motorcycles", "Zabrana prometa za motocikle", "Verbot für Motorräder", "Divieto di transito ai motocicli", "Prohibido el paso a motocicletas"),
  signEntry("no-bicycles", "🚫🚲", "No bicycles", "Zabrana prometa za bicikle", "Verbot für Fahrräder", "Divieto di transito alle biciclette", "Prohibido el paso a bicicletas"),
  signEntry("no-pedestrians", "🚫🚶", "No pedestrians", "Zabrana prometa za pješake", "Verbot für Fußgänger", "Divieto di transito ai pedoni", "Prohibido el paso a peatones"),
  signEntry("no-overtaking", "🚫🏎️", "No overtaking", "Zabrana pretjecanja", "Überholen verboten", "Divieto di sorpasso", "Prohibido adelantar"),
  signEntry("end-no-overtaking", "🏁🏎️", "End of no-overtaking restriction", "Prestanak zabrane pretjecanja", "Ende des Überholverbots", "Fine del divieto di sorpasso", "Fin de la prohibición de adelantar"),
  signEntry("speed-30", "🚗30", "Maximum speed 30 km/h", "Ograničenje brzine na 30 km/h", "Höchstgeschwindigkeit 30 km/h", "Velocità massima 30 km/h", "Velocidad máxima 30 km/h"),
  signEntry("speed-50", "🚗50", "Maximum speed 50 km/h", "Ograničenje brzine na 50 km/h", "Höchstgeschwindigkeit 50 km/h", "Velocità massima 50 km/h", "Velocidad máxima 50 km/h"),
  signEntry("speed-80", "🚗80", "Maximum speed 80 km/h", "Ograničenje brzine na 80 km/h", "Höchstgeschwindigkeit 80 km/h", "Velocità massima 80 km/h", "Velocidad máxima 80 km/h"),
  signEntry("end-speed-limit", "🏁50", "End of the displayed speed restriction", "Prestanak prikazanog ograničenja brzine", "Ende der angezeigten Höchstgeschwindigkeit", "Fine del limite di velocità indicato", "Fin del límite de velocidad indicado"),
  signEntry("no-parking", "🚫🅿️", "No parking", "Zabranjeno parkiranje", "Parkieren verboten", "Divieto di sosta", "Prohibido estacionar"),
  signEntry("no-stopping", "🚫✋", "No stopping or parking", "Zabranjeno zaustavljanje i parkiranje", "Halten und Parkieren verboten", "Divieto di fermata e sosta", "Prohibido parar y estacionar"),
  signEntry("no-left-turn", "🚫↰", "No left turn", "Zabranjeno skretanje ulijevo", "Linksabbiegen verboten", "Divieto di svolta a sinistra", "Prohibido girar a la izquierda"),
  signEntry("no-right-turn", "🚫↱", "No right turn", "Zabranjeno skretanje udesno", "Rechtsabbiegen verboten", "Divieto di svolta a destra", "Prohibido girar a la derecha"),
  signEntry("no-u-turn", "🚫↶", "No U-turn", "Zabranjeno polukružno okretanje", "Wenden verboten", "Divieto di inversione", "Prohibido cambiar de sentido"),
  signEntry("weight-limit", "⚖️3,5t", "Maximum permitted weight 3.5 tonnes", "Najveća dopuštena masa 3,5 tona", "Höchstgewicht 3,5 Tonnen", "Massa massima consentita 3,5 tonnellate", "Peso máximo permitido 3,5 toneladas"),
  signEntry("roundabout", "🔄", "Roundabout — follow the indicated direction", "Kružni tok prometa — slijedite označeni smjer", "Kreisverkehr — vorgeschriebener Fahrtrichtung folgen", "Rotatoria — seguire il senso indicato", "Glorieta — seguir el sentido indicado"),
  signEntry("straight-ahead", "⬆️", "Straight ahead only", "Obvezan smjer ravno", "Vorgeschriebene Fahrtrichtung geradeaus", "Direzione obbligatoria diritto", "Dirección obligatoria de frente"),
  signEntry("turn-right", "➡️", "Turn right only", "Obvezan smjer udesno", "Vorgeschriebene Fahrtrichtung rechts", "Direzione obbligatoria a destra", "Dirección obligatoria a la derecha"),
  signEntry("turn-left", "⬅️", "Turn left only", "Obvezan smjer ulijevo", "Vorgeschriebene Fahrtrichtung links", "Direzione obbligatoria a sinistra", "Dirección obligatoria a la izquierda"),
  signEntry("straight-or-right", "↗️", "Straight ahead or right only", "Dopušteni smjerovi ravno ili desno", "Vorgeschriebene Fahrtrichtung geradeaus oder rechts", "Direzioni consentite diritto o a destra", "Direcciones permitidas de frente o a la derecha"),
  signEntry("bicycle-path", "🚲", "Mandatory bicycle path", "Obvezna biciklistička staza", "Radweg — Benutzung vorgeschrieben", "Pista ciclabile obbligatoria", "Vía obligatoria para bicicletas"),
  signEntry("pedestrian-path", "🚶", "Mandatory pedestrian path", "Obvezna pješačka staza", "Fußweg — Benutzung vorgeschrieben", "Percorso pedonale obbligatorio", "Vía obligatoria para peatones"),
  signEntry("shared-path", "🚶🚲", "Shared pedestrian and bicycle path", "Zajednička pješačka i biciklistička staza", "Gemeinsamer Fuß- und Radweg", "Percorso pedonale e ciclabile condiviso", "Vía compartida para peatones y bicicletas"),
  signEntry("pass-right", "↘️", "Pass on the right", "Obvezno obilaženje s desne strane", "Rechts vorbeifahren", "Passaggio obbligatorio a destra", "Paso obligatorio por la derecha"),
  signEntry("snow-chains", "⛓️", "Snow chains required", "Obvezni lanci za snijeg", "Schneeketten vorgeschrieben", "Catene da neve obbligatorie", "Cadenas para nieve obligatorias"),
  signEntry("general-danger", "⚠️", "General danger — proceed with extra caution", "Opasnost na cesti — vozite s posebnim oprezom", "Andere Gefahren — besonders vorsichtig fahren", "Pericolo generico — procedere con particolare prudenza", "Peligro general — circular con especial precaución"),
  signEntry("roadworks", "🚧", "Roadworks ahead", "Radovi na cesti", "Baustelle", "Lavori in corso", "Obras en la vía"),
  signEntry("traffic-lights", "🚦", "Traffic lights ahead", "Približavanje prometnim svjetlima", "Lichtsignale voraus", "Semaforo in avvicinamento", "Semáforos más adelante"),
  signEntry("pedestrian-crossing", "🚸", "Pedestrian crossing", "Obilježeni pješački prijelaz", "Fußgängerstreifen", "Attraversamento pedonale", "Paso de peatones"),
  signEntry("children", "🧒", "Children — school or playground nearby", "Djeca na cesti — blizina škole ili igrališta", "Kinder — Schule oder Spielplatz in der Nähe", "Bambini — scuola o area giochi nelle vicinanze", "Niños — escuela o zona de juegos cercana"),
  signEntry("slippery-road", "🌧️🚗", "Slippery road", "Sklizak kolnik", "Schleudergefahr", "Strada sdrucciolevole", "Pavimento deslizante"),
  signEntry("wild-animals", "🦌", "Wild animals may cross the road", "Divljač na cesti", "Wildwechsel", "Attraversamento di animali selvatici", "Paso de animales salvajes"),
  signEntry("two-way-traffic", "↕️", "Two-way traffic ahead", "Promet u oba smjera", "Gegenverkehr", "Doppio senso di circolazione", "Circulación en ambos sentidos"),
  signEntry("uneven-road", "〰️", "Uneven road", "Neravan kolnik", "Unebene Fahrbahn", "Strada deformata", "Pavimento irregular"),
  signEntry("falling-rocks", "🪨", "Falling rocks — rockfall hazard", "Kamenje pada — opasnost od odrona", "Steinschlag", "Caduta massi", "Desprendimiento de rocas"),
];
