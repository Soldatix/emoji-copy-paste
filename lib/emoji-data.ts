import { trafficSignEntries, type TrafficSignCode } from "@/lib/traffic-signs";
import { heartFaceEntries, type HeartFaceCode } from "@/lib/heart-faces";

export type Language = "en" | "hr" | "de" | "it" | "es";

export type CategoryId =
  | "smileys"
  | "people"
  | "animals"
  | "food"
  | "activities"
  | "travel"
  | "objects"
  | "symbols"
  | "flags"
  | "traffic"
  | "hearts";

export type EmojiEntry = {
  id?: string;
  emoji: string;
  category: CategoryId;
  meaning: Record<Language, string>;
  flagCode?: string;
  trafficSignCode?: TrafficSignCode;
  heartFaceCode?: HeartFaceCode;
};

const entry = (
  emoji: string,
  category: CategoryId,
  en: string,
  hr: string,
  de: string,
  it: string,
  es: string,
): EmojiEntry => ({ emoji, category, meaning: { en, hr, de, it, es } });

const flagEntry = (
  emoji: string,
  flagCode: string,
  en: string,
  hr: string,
  de: string,
  it: string,
  es: string,
): EmojiEntry => ({ emoji, flagCode, category: "flags", meaning: { en, hr, de, it, es } });

export const categoryIcons: Record<CategoryId, string> = {
  smileys: "😊",
  people: "👋",
  animals: "🐾",
  food: "🍓",
  activities: "⚽",
  travel: "✈️",
  objects: "💡",
  symbols: "💜",
  flags: "🏁",
  traffic: "🚦",
  hearts: "❤️",
};

const baseEmojis: EmojiEntry[] = [
  entry("😀", "smileys", "Grinning face — happiness and friendly joy", "Nasmiješeno lice — sreća i prijateljska radost", "Grinsendes Gesicht — Glück und freundliche Freude", "Viso sorridente — felicità e gioia amichevole", "Cara sonriente — felicidad y alegría amistosa"),
  entry("😃", "smileys", "Big smile — excitement and good mood", "Veliki osmijeh — uzbuđenje i dobro raspoloženje", "Breites Lächeln — Begeisterung und gute Laune", "Grande sorriso — entusiasmo e buon umore", "Gran sonrisa — entusiasmo y buen humor"),
  entry("😄", "smileys", "Smiling eyes — genuine happiness", "Nasmijane oči — iskrena sreća", "Lachende Augen — echtes Glück", "Occhi sorridenti — felicità sincera", "Ojos sonrientes — felicidad sincera"),
  entry("😁", "smileys", "Beaming grin — cheerful pride or delight", "Blistavi osmijeh — veseli ponos ili oduševljenje", "Strahlendes Grinsen — fröhlicher Stolz oder Freude", "Sorriso raggiante — orgoglio allegro o piacere", "Sonrisa radiante — orgullo alegre o placer"),
  entry("😂", "smileys", "Tears of joy — intense laughter", "Suze radosnice — vrlo snažan smijeh", "Freudentränen — heftiges Lachen", "Lacrime di gioia — risata intensa", "Lágrimas de alegría — risa intensa"),
  entry("🤣", "smileys", "Rolling with laughter — extremely funny", "Valjanje od smijeha — izuzetno smiješno", "Vor Lachen rollen — extrem lustig", "Rotolarsi dal ridere — estremamente divertente", "Revolcarse de risa — extremadamente divertido"),
  entry("😊", "smileys", "Warm smile — gratitude and contentment", "Topli osmijeh — zahvalnost i zadovoljstvo", "Warmes Lächeln — Dankbarkeit und Zufriedenheit", "Sorriso caldo — gratitudine e serenità", "Sonrisa cálida — gratitud y satisfacción"),
  entry("🥰", "smileys", "Smiling with hearts — love and affection", "Osmijeh sa srcima — ljubav i naklonost", "Lächeln mit Herzen — Liebe und Zuneigung", "Sorriso con cuori — amore e affetto", "Sonrisa con corazones — amor y cariño"),
  entry("😍", "smileys", "Heart eyes — admiration or being in love", "Oči u obliku srca — divljenje ili zaljubljenost", "Herzaugen — Bewunderung oder Verliebtheit", "Occhi a cuore — ammirazione o innamoramento", "Ojos de corazón — admiración o enamoramiento"),
  entry("😘", "smileys", "Blowing a kiss — affection or thanks", "Šalje poljubac — naklonost ili zahvala", "Kussmund — Zuneigung oder Dank", "Manda un bacio — affetto o ringraziamento", "Lanza un beso — cariño o agradecimiento"),
  entry("😎", "smileys", "Sunglasses — confidence and coolness", "Sunčane naočale — samopouzdanje i cool stav", "Sonnenbrille — Selbstvertrauen und Coolness", "Occhiali da sole — sicurezza e stile", "Gafas de sol — confianza y estilo"),
  entry("🤔", "smileys", "Thinking face — considering or doubting", "Zamišljeno lice — razmišljanje ili sumnja", "Nachdenkliches Gesicht — Überlegen oder Zweifel", "Viso pensieroso — riflessione o dubbio", "Cara pensativa — reflexión o duda"),
  entry("😢", "smileys", "Crying face — sadness or disappointment", "Plačljivo lice — tuga ili razočaranje", "Weinendes Gesicht — Traurigkeit oder Enttäuschung", "Viso che piange — tristezza o delusione", "Cara llorando — tristeza o decepción"),
  entry("😭", "smileys", "Loud crying — overwhelming sadness or emotion", "Glasan plač — velika tuga ili snažne emocije", "Lautes Weinen — überwältigende Traurigkeit oder Emotion", "Pianto forte — tristezza o emozione intensa", "Llanto fuerte — tristeza o emoción intensa"),
  entry("😡", "smileys", "Angry face — anger or frustration", "Ljutito lice — ljutnja ili frustracija", "Wütendes Gesicht — Ärger oder Frust", "Viso arrabbiato — rabbia o frustrazione", "Cara enfadada — ira o frustración"),

  entry("👋", "people", "Waving hand — hello or goodbye", "Ruka koja maše — pozdrav ili rastanak", "Winkende Hand — Hallo oder Auf Wiedersehen", "Mano che saluta — ciao o arrivederci", "Mano saludando — hola o adiós"),
  entry("🤝", "people", "Handshake — agreement, trust or partnership", "Rukovanje — dogovor, povjerenje ili suradnja", "Handschlag — Einigung, Vertrauen oder Partnerschaft", "Stretta di mano — accordo, fiducia o collaborazione", "Apretón de manos — acuerdo, confianza o colaboración"),
  entry("👍", "people", "Thumbs up — approval or agreement", "Palac gore — odobravanje ili slaganje", "Daumen hoch — Zustimmung oder Einverständnis", "Pollice in su — approvazione o accordo", "Pulgar arriba — aprobación o acuerdo"),
  entry("👎", "people", "Thumbs down — disapproval or disagreement", "Palac dolje — neodobravanje ili neslaganje", "Daumen runter — Ablehnung oder Widerspruch", "Pollice in giù — disapprovazione o disaccordo", "Pulgar abajo — desaprobación o desacuerdo"),
  entry("👏", "people", "Clapping hands — applause and appreciation", "Pljesak — pohvala i zahvalnost", "Klatschende Hände — Applaus und Anerkennung", "Mani che applaudono — applauso e apprezzamento", "Manos aplaudiendo — aplauso y reconocimiento"),
  entry("🙌", "people", "Raised hands — celebration or praise", "Podignute ruke — slavlje ili pohvala", "Erhobene Hände — Feier oder Lob", "Mani alzate — festa o lode", "Manos levantadas — celebración o elogio"),
  entry("🙏", "people", "Folded hands — thanks, prayer or request", "Sklopljene ruke — zahvala, molitva ili molba", "Gefaltete Hände — Dank, Gebet oder Bitte", "Mani giunte — grazie, preghiera o richiesta", "Manos juntas — gracias, oración o petición"),
  entry("💪", "people", "Flexed biceps — strength and determination", "Napeti biceps — snaga i odlučnost", "Angespannter Bizeps — Stärke und Entschlossenheit", "Bicipite — forza e determinazione", "Bíceps — fuerza y determinación"),
  entry("🤞", "people", "Crossed fingers — hope and good luck", "Prekriženi prsti — nada i sreća", "Gekreuzte Finger — Hoffnung und Glück", "Dita incrociate — speranza e fortuna", "Dedos cruzados — esperanza y suerte"),
  entry("✌️", "people", "Victory hand — peace or success", "Znak pobjede — mir ili uspjeh", "Siegeszeichen — Frieden oder Erfolg", "Segno di vittoria — pace o successo", "Señal de victoria — paz o éxito"),
  entry("🤷", "people", "Shrug — uncertainty or not knowing", "Slijeganje ramenima — nesigurnost ili neznanje", "Schulterzucken — Unsicherheit oder Nichtwissen", "Alzata di spalle — incertezza o non sapere", "Encogerse de hombros — duda o desconocimiento"),
  entry("🙋", "people", "Raised hand — volunteering or asking", "Podignuta ruka — javljanje ili pitanje", "Erhobene Hand — Meldung oder Frage", "Mano alzata — volontariato o domanda", "Mano levantada — ofrecerse o preguntar"),

  entry("🐶", "animals", "Dog face — loyalty and friendliness", "Lice psa — odanost i prijateljstvo", "Hundegesicht — Treue und Freundlichkeit", "Muso di cane — lealtà e amicizia", "Cara de perro — lealtad y amistad"),
  entry("🐱", "animals", "Cat face — playfulness and independence", "Lice mačke — zaigranost i neovisnost", "Katzengesicht — Verspieltheit und Unabhängigkeit", "Muso di gatto — gioco e indipendenza", "Cara de gato — juego e independencia"),
  entry("🐭", "animals", "Mouse face — small, cute or timid", "Lice miša — malo, slatko ili plaho", "Mäusegesicht — klein, süß oder scheu", "Muso di topo — piccolo, carino o timido", "Cara de ratón — pequeño, lindo o tímido"),
  entry("🐰", "animals", "Rabbit face — cuteness and spring", "Lice zeca — slatkoća i proljeće", "Hasengesicht — Niedlichkeit und Frühling", "Muso di coniglio — dolcezza e primavera", "Cara de conejo — ternura y primavera"),
  entry("🦊", "animals", "Fox — cleverness and curiosity", "Lisica — snalažljivost i znatiželja", "Fuchs — Klugheit und Neugier", "Volpe — astuzia e curiosità", "Zorro — astucia y curiosidad"),
  entry("🐻", "animals", "Bear — strength, warmth or hugs", "Medvjed — snaga, toplina ili zagrljaj", "Bär — Stärke, Wärme oder Umarmung", "Orso — forza, calore o abbracci", "Oso — fuerza, calidez o abrazos"),
  entry("🐼", "animals", "Panda — gentle and adorable", "Panda — nježnost i umiljatost", "Panda — sanft und liebenswert", "Panda — dolce e adorabile", "Panda — gentil y adorable"),
  entry("🦁", "animals", "Lion — courage and leadership", "Lav — hrabrost i vodstvo", "Löwe — Mut und Führung", "Leone — coraggio e leadership", "León — valentía y liderazgo"),
  entry("🐸", "animals", "Frog — nature, change or playfulness", "Žaba — priroda, promjena ili zaigranost", "Frosch — Natur, Wandel oder Verspieltheit", "Rana — natura, cambiamento o gioco", "Rana — naturaleza, cambio o juego"),
  entry("🐵", "animals", "Monkey face — fun and mischief", "Lice majmuna — zabava i nestašluk", "Affengesicht — Spaß und Unfug", "Muso di scimmia — divertimento e monelleria", "Cara de mono — diversión y travesura"),
  entry("🦋", "animals", "Butterfly — transformation and beauty", "Leptir — preobrazba i ljepota", "Schmetterling — Verwandlung und Schönheit", "Farfalla — trasformazione e bellezza", "Mariposa — transformación y belleza"),
  entry("🐝", "animals", "Bee — hard work and community", "Pčela — marljivost i zajedništvo", "Biene — Fleiß und Gemeinschaft", "Ape — lavoro e comunità", "Abeja — trabajo y comunidad"),

  entry("🍎", "food", "Red apple — health and fresh food", "Crvena jabuka — zdravlje i svježa hrana", "Roter Apfel — Gesundheit und frisches Essen", "Mela rossa — salute e cibo fresco", "Manzana roja — salud y comida fresca"),
  entry("🍓", "food", "Strawberry — sweetness and summer", "Jagoda — slatkoća i ljeto", "Erdbeere — Süße und Sommer", "Fragola — dolcezza ed estate", "Fresa — dulzura y verano"),
  entry("🍕", "food", "Pizza — casual meal or celebration", "Pizza — opušten obrok ili slavlje", "Pizza — lockeres Essen oder Feier", "Pizza — pasto informale o festa", "Pizza — comida informal o celebración"),
  entry("🍔", "food", "Burger — fast food or hunger", "Burger — brza hrana ili glad", "Burger — Fast Food oder Hunger", "Hamburger — fast food o fame", "Hamburguesa — comida rápida o hambre"),
  entry("🍟", "food", "French fries — snack or comfort food", "Pomfrit — grickalica ili omiljena hrana", "Pommes — Snack oder Wohlfühlessen", "Patatine fritte — spuntino o comfort food", "Patatas fritas — aperitivo o comida reconfortante"),
  entry("🍰", "food", "Cake — birthday, celebration or treat", "Torta — rođendan, slavlje ili poslastica", "Kuchen — Geburtstag, Feier oder Genuss", "Torta — compleanno, festa o dolce", "Pastel — cumpleaños, celebración o dulce"),
  entry("☕", "food", "Hot drink — coffee break and comfort", "Topli napitak — pauza za kavu i ugoda", "Heißgetränk — Kaffeepause und Gemütlichkeit", "Bevanda calda — pausa caffè e relax", "Bebida caliente — pausa de café y bienestar"),
  entry("🍷", "food", "Wine glass — toast or relaxation", "Čaša vina — zdravica ili opuštanje", "Weinglas — Anstoßen oder Entspannung", "Bicchiere di vino — brindisi o relax", "Copa de vino — brindis o relajación"),
  entry("🍺", "food", "Beer mug — social time or celebration", "Krigla piva — druženje ili slavlje", "Bierkrug — Geselligkeit oder Feier", "Boccale di birra — compagnia o festa", "Jarra de cerveza — reunión o celebración"),
  entry("🥂", "food", "Clinking glasses — congratulations and toast", "Kucanje čašama — čestitka i zdravica", "Anstoßende Gläser — Glückwunsch und Prost", "Calici che brindano — auguri e brindisi", "Copas brindando — felicitación y brindis"),

  entry("⚽", "activities", "Football — sport, match or team spirit", "Nogometna lopta — sport, utakmica ili timski duh", "Fußball — Sport, Spiel oder Teamgeist", "Pallone da calcio — sport, partita o squadra", "Balón de fútbol — deporte, partido o equipo"),
  entry("🏀", "activities", "Basketball — sport and competition", "Košarkaška lopta — sport i natjecanje", "Basketball — Sport und Wettbewerb", "Pallacanestro — sport e competizione", "Baloncesto — deporte y competición"),
  entry("🎮", "activities", "Game controller — video games and fun", "Kontroler za igru — videoigre i zabava", "Controller — Videospiele und Spaß", "Controller — videogiochi e divertimento", "Mando — videojuegos y diversión"),
  entry("🎯", "activities", "Bullseye — accuracy, goal or success", "Pogodak u metu — preciznost, cilj ili uspjeh", "Volltreffer — Genauigkeit, Ziel oder Erfolg", "Centro — precisione, obiettivo o successo", "Diana — precisión, objetivo o éxito"),
  entry("🏆", "activities", "Trophy — victory and achievement", "Pehar — pobjeda i postignuće", "Pokal — Sieg und Leistung", "Trofeo — vittoria e risultato", "Trofeo — victoria y logro"),
  entry("🎵", "activities", "Musical note — music or singing", "Glazbena nota — glazba ili pjevanje", "Musiknote — Musik oder Singen", "Nota musicale — musica o canto", "Nota musical — música o canto"),
  entry("🎬", "activities", "Clapper board — film and video creation", "Filmska klapa — film i izrada videa", "Filmklappe — Film und Videoproduktion", "Ciak — film e creazione video", "Claqueta — cine y creación de vídeo"),
  entry("🎨", "activities", "Artist palette — art and creativity", "Slikarska paleta — umjetnost i kreativnost", "Farbpalette — Kunst und Kreativität", "Tavolozza — arte e creatività", "Paleta — arte y creatividad"),
  entry("📚", "activities", "Books — learning, reading or study", "Knjige — učenje, čitanje ili studij", "Bücher — Lernen, Lesen oder Studium", "Libri — apprendimento, lettura o studio", "Libros — aprendizaje, lectura o estudio"),
  entry("🎁", "activities", "Wrapped gift — present or surprise", "Zamotani dar — poklon ili iznenađenje", "Geschenk — Präsent oder Überraschung", "Regalo — dono o sorpresa", "Regalo — obsequio o sorpresa"),

  entry("🚗", "travel", "Car — driving or road trip", "Automobil — vožnja ili putovanje", "Auto — Fahren oder Roadtrip", "Auto — guida o viaggio", "Coche — conducir o viajar"),
  entry("🚌", "travel", "Bus — public transport or group travel", "Autobus — javni prijevoz ili grupno putovanje", "Bus — öffentlicher Verkehr oder Gruppenreise", "Autobus — trasporto pubblico o viaggio di gruppo", "Autobús — transporte público o viaje en grupo"),
  entry("🚆", "travel", "Train — rail travel or commute", "Vlak — putovanje željeznicom ili posao", "Zug — Bahnreise oder Pendeln", "Treno — viaggio in ferrovia o pendolarismo", "Tren — viaje en ferrocarril o desplazamiento"),
  entry("✈️", "travel", "Airplane — flight, holiday or travel", "Zrakoplov — let, odmor ili putovanje", "Flugzeug — Flug, Urlaub oder Reise", "Aereo — volo, vacanza o viaggio", "Avión — vuelo, vacaciones o viaje"),
  entry("🚀", "travel", "Rocket — launch, speed or big ambition", "Raketa — lansiranje, brzina ili velika ambicija", "Rakete — Start, Tempo oder große Ambition", "Razzo — lancio, velocità o grande ambizione", "Cohete — lanzamiento, velocidad o gran ambición"),
  entry("🏠", "travel", "House — home, comfort or staying in", "Kuća — dom, udobnost ili ostanak kod kuće", "Haus — Zuhause, Komfort oder Daheimbleiben", "Casa — dimora, comfort o restare a casa", "Casa — hogar, comodidad o quedarse en casa"),
  entry("🏖️", "travel", "Beach — holiday, sun and relaxation", "Plaža — odmor, sunce i opuštanje", "Strand — Urlaub, Sonne und Entspannung", "Spiaggia — vacanza, sole e relax", "Playa — vacaciones, sol y relajación"),
  entry("🏔️", "travel", "Mountain — adventure and nature", "Planina — pustolovina i priroda", "Berg — Abenteuer und Natur", "Montagna — avventura e natura", "Montaña — aventura y naturaleza"),
  entry("🌍", "travel", "Globe — world, international or planet", "Globus — svijet, međunarodno ili planet", "Globus — Welt, international oder Planet", "Globo — mondo, internazionale o pianeta", "Globo — mundo, internacional o planeta"),
  entry("📍", "travel", "Location pin — place or meeting point", "Oznaka lokacije — mjesto ili točka susreta", "Ortsmarke — Ort oder Treffpunkt", "Segnaposto — luogo o punto d'incontro", "Marcador — lugar o punto de encuentro"),

  entry("💡", "objects", "Light bulb — idea or inspiration", "Žarulja — ideja ili inspiracija", "Glühbirne — Idee oder Inspiration", "Lampadina — idea o ispirazione", "Bombilla — idea o inspiración"),
  entry("📱", "objects", "Mobile phone — call, message or technology", "Mobitel — poziv, poruka ili tehnologija", "Handy — Anruf, Nachricht oder Technik", "Cellulare — chiamata, messaggio o tecnologia", "Móvil — llamada, mensaje o tecnología"),
  entry("💻", "objects", "Laptop — computer work or online activity", "Laptop — rad na računalu ili online aktivnost", "Laptop — Computerarbeit oder Online-Aktivität", "Portatile — lavoro al computer o attività online", "Portátil — trabajo informático o actividad en línea"),
  entry("⌚", "objects", "Watch — time, schedule or waiting", "Sat — vrijeme, raspored ili čekanje", "Uhr — Zeit, Termin oder Warten", "Orologio — tempo, programma o attesa", "Reloj — tiempo, horario o espera"),
  entry("📷", "objects", "Camera — photo or memory", "Fotoaparat — fotografija ili uspomena", "Kamera — Foto oder Erinnerung", "Fotocamera — foto o ricordo", "Cámara — foto o recuerdo"),
  entry("🔔", "objects", "Bell — alert, reminder or notification", "Zvono — upozorenje, podsjetnik ili obavijest", "Glocke — Alarm, Erinnerung oder Mitteilung", "Campana — avviso, promemoria o notifica", "Campana — alerta, recordatorio o notificación"),
  entry("🔑", "objects", "Key — access, answer or important clue", "Ključ — pristup, odgovor ili važan trag", "Schlüssel — Zugang, Antwort oder wichtiger Hinweis", "Chiave — accesso, risposta o indizio importante", "Llave — acceso, respuesta o pista importante"),
  entry("🛠️", "objects", "Tools — repair, work or building", "Alati — popravak, rad ili izrada", "Werkzeuge — Reparatur, Arbeit oder Bauen", "Attrezzi — riparazione, lavoro o costruzione", "Herramientas — reparación, trabajo o construcción"),
  entry("🧭", "objects", "Compass — direction, travel or guidance", "Kompas — smjer, putovanje ili usmjeravanje", "Kompass — Richtung, Reise oder Orientierung", "Bussola — direzione, viaggio o guida", "Brújula — dirección, viaje u orientación"),
  entry("💰", "objects", "Money bag — finances, wealth or payment", "Vreća novca — financije, bogatstvo ili plaćanje", "Geldsack — Finanzen, Reichtum oder Zahlung", "Sacco di denaro — finanze, ricchezza o pagamento", "Bolsa de dinero — finanzas, riqueza o pago"),

  entry("❤️", "symbols", "Red heart — love and deep affection", "Crveno srce — ljubav i duboka naklonost", "Rotes Herz — Liebe und tiefe Zuneigung", "Cuore rosso — amore e profondo affetto", "Corazón rojo — amor y profundo cariño"),
  entry("🧡", "symbols", "Orange heart — warmth, care and friendship", "Narančasto srce — toplina, briga i prijateljstvo", "Oranges Herz — Wärme, Fürsorge und Freundschaft", "Cuore arancione — calore, cura e amicizia", "Corazón naranja — calidez, cuidado y amistad"),
  entry("💛", "symbols", "Yellow heart — happiness and friendship", "Žuto srce — sreća i prijateljstvo", "Gelbes Herz — Glück und Freundschaft", "Cuore giallo — felicità e amicizia", "Corazón amarillo — felicidad y amistad"),
  entry("💚", "symbols", "Green heart — nature, support or well-being", "Zeleno srce — priroda, podrška ili dobrobit", "Grünes Herz — Natur, Unterstützung oder Wohlbefinden", "Cuore verde — natura, sostegno o benessere", "Corazón verde — naturaleza, apoyo o bienestar"),
  entry("💙", "symbols", "Blue heart — trust, loyalty and calm", "Plavo srce — povjerenje, odanost i mir", "Blaues Herz — Vertrauen, Treue und Ruhe", "Cuore blu — fiducia, lealtà e calma", "Corazón azul — confianza, lealtad y calma"),
  entry("💜", "symbols", "Purple heart — care, admiration or glamour", "Ljubičasto srce — briga, divljenje ili glamur", "Lila Herz — Fürsorge, Bewunderung oder Glamour", "Cuore viola — cura, ammirazione o fascino", "Corazón morado — cariño, admiración o glamour"),
  entry("💔", "symbols", "Broken heart — heartbreak or sadness", "Slomljeno srce — ljubavna bol ili tuga", "Gebrochenes Herz — Liebeskummer oder Traurigkeit", "Cuore spezzato — dolore o tristezza", "Corazón roto — desamor o tristeza"),
  entry("✨", "symbols", "Sparkles — magic, excitement or emphasis", "Iskrice — čarolija, uzbuđenje ili naglasak", "Funkeln — Magie, Begeisterung oder Betonung", "Scintille — magia, entusiasmo o enfasi", "Destellos — magia, entusiasmo o énfasis"),
  entry("🔥", "symbols", "Fire — excellent, popular or intense", "Vatra — izvrsno, popularno ili intenzivno", "Feuer — ausgezeichnet, beliebt oder intensiv", "Fuoco — eccellente, popolare o intenso", "Fuego — excelente, popular o intenso"),
  entry("✅", "symbols", "Check mark — completed, correct or approved", "Kvačica — dovršeno, točno ili odobreno", "Häkchen — erledigt, richtig oder genehmigt", "Segno di spunta — completato, corretto o approvato", "Marca de verificación — completado, correcto o aprobado"),
  entry("❌", "symbols", "Cross mark — wrong, rejected or cancelled", "Križić — pogrešno, odbijeno ili otkazano", "Kreuz — falsch, abgelehnt oder abgesagt", "Croce — sbagliato, rifiutato o annullato", "Cruz — incorrecto, rechazado o cancelado"),
  entry("⚠️", "symbols", "Warning — caution or important notice", "Upozorenje — oprez ili važna obavijest", "Warnung — Vorsicht oder wichtiger Hinweis", "Avviso — cautela o comunicazione importante", "Advertencia — precaución o aviso importante"),

  flagEntry("🇭🇷", "hr", "Flag of Croatia", "Zastava Hrvatske", "Flagge Kroatiens", "Bandiera della Croazia", "Bandera de Croacia"),
  flagEntry("🇨🇭", "ch", "Flag of Switzerland", "Zastava Švicarske", "Flagge der Schweiz", "Bandiera della Svizzera", "Bandera de Suiza"),
  flagEntry("🇬🇧", "gb", "Flag of the United Kingdom", "Zastava Ujedinjenog Kraljevstva", "Flagge des Vereinigten Königreichs", "Bandiera del Regno Unito", "Bandera del Reino Unido"),
  flagEntry("🇩🇪", "de", "Flag of Germany", "Zastava Njemačke", "Flagge Deutschlands", "Bandiera della Germania", "Bandera de Alemania"),
  flagEntry("🇮🇹", "it", "Flag of Italy", "Zastava Italije", "Flagge Italiens", "Bandiera d'Italia", "Bandera de Italia"),
  flagEntry("🇪🇸", "es", "Flag of Spain", "Zastava Španjolske", "Flagge Spaniens", "Bandiera della Spagna", "Bandera de España"),
  flagEntry("🇫🇷", "fr", "Flag of France", "Zastava Francuske", "Flagge Frankreichs", "Bandiera della Francia", "Bandera de Francia"),
  flagEntry("🇺🇸", "us", "Flag of the United States", "Zastava Sjedinjenih Američkih Država", "Flagge der Vereinigten Staaten", "Bandiera degli Stati Uniti", "Bandera de Estados Unidos"),
  flagEntry("🇨🇦", "ca", "Flag of Canada", "Zastava Kanade", "Flagge Kanadas", "Bandiera del Canada", "Bandera de Canadá"),
  flagEntry("🇯🇵", "jp", "Flag of Japan", "Zastava Japana", "Flagge Japans", "Bandiera del Giappone", "Bandera de Japón"),
];

const additionalEmojis: EmojiEntry[] = [
  entry("😅", "smileys", "Grinning with sweat — relief after a tense moment", "Osmijeh sa znojem — olakšanje nakon napetog trenutka", "Lächeln mit Schweiß — Erleichterung nach einem angespannten Moment", "Sorriso con sudore — sollievo dopo un momento teso", "Sonrisa con sudor — alivio tras un momento tenso"),
  entry("😉", "smileys", "Winking face — playful hint or friendly joke", "Namigivanje — zaigrani znak ili prijateljska šala", "Zwinkerndes Gesicht — verspielter Hinweis oder freundlicher Scherz", "Viso che fa l'occhiolino — allusione giocosa o scherzo amichevole", "Cara guiñando — insinuación juguetona o broma amistosa"),
  entry("😇", "smileys", "Smiling with halo — innocence or good intentions", "Osmijeh s aureolom — nevinost ili dobre namjere", "Lächeln mit Heiligenschein — Unschuld oder gute Absichten", "Sorriso con aureola — innocenza o buone intenzioni", "Sonrisa con aureola — inocencia o buenas intenciones"),
  entry("🙂", "smileys", "Slight smile — quiet friendliness or politeness", "Blagi osmijeh — tiha srdačnost ili pristojnost", "Leichtes Lächeln — ruhige Freundlichkeit oder Höflichkeit", "Sorriso lieve — cordialità tranquilla o cortesia", "Sonrisa leve — amabilidad tranquila o cortesía"),
  entry("🙃", "smileys", "Upside-down face — irony, silliness or awkwardness", "Lice naopako — ironija, šašavost ili nelagoda", "Umgedrehtes Gesicht — Ironie, Albernheit oder Verlegenheit", "Viso capovolto — ironia, scherzo o imbarazzo", "Cara al revés — ironía, tontería o incomodidad"),
  entry("😋", "smileys", "Savoring food — delicious taste or appetite", "Uživanje u hrani — ukusan zalogaj ili apetit", "Genießendes Gesicht — leckerer Geschmack oder Appetit", "Viso che assapora — gusto delizioso o appetito", "Cara saboreando — sabor delicioso o apetito"),
  entry("😜", "smileys", "Winking tongue — teasing and playful fun", "Namigivanje s jezikom — zadirkivanje i zaigrana zabava", "Zwinkernde Zunge — Necken und spielerischer Spaß", "Occhiolino con lingua — presa in giro e divertimento", "Guiño con lengua — burla y diversión juguetona"),
  entry("🤪", "smileys", "Zany face — wild, goofy or excited mood", "Šašavo lice — luckasto, otkačeno ili uzbuđeno raspoloženje", "Verrücktes Gesicht — wild, albern oder aufgedreht", "Viso stravagante — umore folle, buffo o eccitato", "Cara alocada — ánimo loco, divertido o emocionado"),
  entry("🧐", "smileys", "Monocle face — close inspection or skepticism", "Lice s monoklom — pažljivo promatranje ili sumnjičavost", "Gesicht mit Monokel — genaue Prüfung oder Skepsis", "Viso con monocolo — esame attento o scetticismo", "Cara con monóculo — inspección atenta o escepticismo"),
  entry("🤓", "smileys", "Nerd face — enthusiasm for knowledge or technology", "Štrebersko lice — oduševljenje znanjem ili tehnologijom", "Nerd-Gesicht — Begeisterung für Wissen oder Technik", "Viso da nerd — entusiasmo per conoscenza o tecnologia", "Cara de nerd — entusiasmo por el conocimiento o la tecnología"),
  entry("🤩", "smileys", "Star-struck — amazement and great excitement", "Oči poput zvijezda — oduševljenje i veliko uzbuđenje", "Sternenaugen — Staunen und große Begeisterung", "Occhi a stella — meraviglia e grande entusiasmo", "Ojos de estrella — asombro y gran entusiasmo"),
  entry("🥳", "smileys", "Party face — celebration, birthday or good news", "Lice za zabavu — slavlje, rođendan ili dobra vijest", "Partygesicht — Feier, Geburtstag oder gute Nachricht", "Viso in festa — celebrazione, compleanno o buona notizia", "Cara de fiesta — celebración, cumpleaños o buena noticia"),
  entry("😏", "smileys", "Smirking face — confidence, teasing or secret knowledge", "Samouvjereni smiješak — zadirkivanje ili skriveno znanje", "Süffisantes Lächeln — Selbstvertrauen, Necken oder geheimes Wissen", "Sorrisetto — sicurezza, provocazione o complicità", "Sonrisa ladeada — confianza, provocación o complicidad"),
  entry("😒", "smileys", "Unamused face — annoyance or lack of enthusiasm", "Nezadovoljno lice — nerviranje ili manjak oduševljenja", "Unzufriedenes Gesicht — Ärger oder fehlende Begeisterung", "Viso seccato — fastidio o scarso entusiasmo", "Cara de disgusto — molestia o falta de entusiasmo"),
  entry("🙄", "smileys", "Rolling eyes — disbelief, boredom or irritation", "Kolutanje očima — nevjerica, dosada ili iritacija", "Verdrehte Augen — Unglaube, Langeweile oder Gereiztheit", "Occhi al cielo — incredulità, noia o irritazione", "Ojos en blanco — incredulidad, aburrimiento o irritación"),
  entry("😬", "smileys", "Grimacing face — awkwardness, tension or embarrassment", "Lice u grču — nelagoda, napetost ili sram", "Grimasse — Unbehagen, Anspannung oder Verlegenheit", "Smorfia — disagio, tensione o imbarazzo", "Mueca — incomodidad, tensión o vergüenza"),
  entry("🤫", "smileys", "Shushing face — silence or keeping a secret", "Lice koje utišava — tišina ili čuvanje tajne", "Ermahnendes Gesicht — Ruhe oder ein Geheimnis bewahren", "Viso che chiede silenzio — silenzio o segreto", "Cara pidiendo silencio — silencio o guardar un secreto"),
  entry("🤭", "smileys", "Hand over mouth — surprise, giggle or embarrassment", "Ruka preko usta — iznenađenje, smijeh ili sram", "Hand vor dem Mund — Überraschung, Kichern oder Verlegenheit", "Mano sulla bocca — sorpresa, risatina o imbarazzo", "Mano sobre la boca — sorpresa, risa o vergüenza"),
  entry("🤗", "smileys", "Hugging face — comfort, support or affection", "Lice koje grli — utjeha, podrška ili naklonost", "Umarmendes Gesicht — Trost, Unterstützung oder Zuneigung", "Viso che abbraccia — conforto, sostegno o affetto", "Cara abrazando — consuelo, apoyo o cariño"),
  entry("😴", "smileys", "Sleeping face — tiredness, sleep or boredom", "Uspavano lice — umor, spavanje ili dosada", "Schlafendes Gesicht — Müdigkeit, Schlaf oder Langeweile", "Viso addormentato — stanchezza, sonno o noia", "Cara dormida — cansancio, sueño o aburrimiento"),

  entry("👌", "people", "OK hand — approval or everything is fine", "Znak OK — odobravanje ili sve je u redu", "OK-Hand — Zustimmung oder alles ist in Ordnung", "Segno OK — approvazione o tutto bene", "Gesto de OK — aprobación o todo está bien"),
  entry("🤌", "people", "Pinched fingers — emphasis, question or Italian gesture", "Spojeni prsti — naglašavanje, pitanje ili talijanska gesta", "Zusammengeführte Finger — Betonung, Frage oder italienische Geste", "Dita unite — enfasi, domanda o gesto italiano", "Dedos unidos — énfasis, pregunta o gesto italiano"),
  entry("🤙", "people", "Call-me hand — phone call or relaxed greeting", "Nazovi me — telefonski poziv ili opušteni pozdrav", "Ruf-mich-an-Hand — Telefonanruf oder lockerer Gruß", "Gesto chiamami — telefonata o saluto informale", "Gesto de llámame — llamada o saludo informal"),
  entry("👊", "people", "Fist bump — solidarity, greeting or encouragement", "Dodir šakama — zajedništvo, pozdrav ili ohrabrenje", "Faustgruß — Zusammenhalt, Gruß oder Ermutigung", "Pugno — solidarietà, saluto o incoraggiamento", "Choque de puños — solidaridad, saludo o ánimo"),
  entry("✊", "people", "Raised fist — strength, resistance or solidarity", "Podignuta šaka — snaga, otpor ili solidarnost", "Erhobene Faust — Stärke, Widerstand oder Solidarität", "Pugno alzato — forza, resistenza o solidarietà", "Puño levantado — fuerza, resistencia o solidaridad"),
  entry("🤛", "people", "Left-facing fist — fist bump from the left", "Šaka ulijevo — pozdrav šakom s lijeve strane", "Faust nach links — Faustgruß von links", "Pugno verso sinistra — saluto con il pugno da sinistra", "Puño hacia la izquierda — choque de puños desde la izquierda"),
  entry("🤜", "people", "Right-facing fist — fist bump from the right", "Šaka udesno — pozdrav šakom s desne strane", "Faust nach rechts — Faustgruß von rechts", "Pugno verso destra — saluto con il pugno da destra", "Puño hacia la derecha — choque de puños desde la derecha"),
  entry("🖐️", "people", "Hand with fingers spread — stop, five or greeting", "Raširena ruka — stani, broj pet ili pozdrav", "Gespreizte Hand — Stopp, fünf oder Gruß", "Mano aperta — stop, cinque o saluto", "Mano abierta — parar, cinco o saludo"),
  entry("✋", "people", "Raised hand — stop, attention or high five", "Podignuti dlan — stani, pozornost ili daj pet", "Erhobene Hand — Stopp, Aufmerksamkeit oder High Five", "Mano alzata — stop, attenzione o batti cinque", "Mano levantada — parar, atención o chocar los cinco"),
  entry("🫶", "people", "Heart hands — love, gratitude and support", "Ruke u obliku srca — ljubav, zahvalnost i podrška", "Herzhände — Liebe, Dankbarkeit und Unterstützung", "Mani a cuore — amore, gratitudine e sostegno", "Manos en corazón — amor, gratitud y apoyo"),
  entry("👐", "people", "Open hands — openness, welcome or hug", "Otvorene ruke — otvorenost, dobrodošlica ili zagrljaj", "Offene Hände — Offenheit, Willkommen oder Umarmung", "Mani aperte — apertura, benvenuto o abbraccio", "Manos abiertas — apertura, bienvenida o abrazo"),
  entry("🤲", "people", "Palms up — offering, receiving or prayer", "Dlanovi prema gore — nuđenje, primanje ili molitva", "Handflächen nach oben — Geben, Empfangen oder Gebet", "Palmi in alto — offrire, ricevere o pregare", "Palmas hacia arriba — ofrecer, recibir u orar"),
  entry("✍️", "people", "Writing hand — writing, signing or taking notes", "Ruka koja piše — pisanje, potpisivanje ili bilješke", "Schreibende Hand — Schreiben, Unterschreiben oder Notizen", "Mano che scrive — scrittura, firma o appunti", "Mano escribiendo — escribir, firmar o tomar notas"),
  entry("👀", "people", "Eyes — looking, attention or curiosity", "Oči — gledanje, pozornost ili znatiželja", "Augen — Schauen, Aufmerksamkeit oder Neugier", "Occhi — guardare, attenzione o curiosità", "Ojos — mirar, atención o curiosidad"),
  entry("🧠", "people", "Brain — thinking, intelligence or memory", "Mozak — razmišljanje, inteligencija ili pamćenje", "Gehirn — Denken, Intelligenz oder Erinnerung", "Cervello — pensiero, intelligenza o memoria", "Cerebro — pensamiento, inteligencia o memoria"),

  entry("🐨", "animals", "Koala — calm, sleepiness or Australia", "Koala — mirnoća, pospanost ili Australija", "Koala — Ruhe, Müdigkeit oder Australien", "Koala — calma, sonno o Australia", "Koala — calma, sueño o Australia"),
  entry("🐯", "animals", "Tiger face — courage, energy and power", "Lice tigra — hrabrost, energija i snaga", "Tigergesicht — Mut, Energie und Kraft", "Muso di tigre — coraggio, energia e forza", "Cara de tigre — valentía, energía y fuerza"),
  entry("🐮", "animals", "Cow face — farming, gentleness or countryside", "Lice krave — farma, blagost ili selo", "Kuhgesicht — Landwirtschaft, Sanftmut oder Landleben", "Muso di mucca — fattoria, dolcezza o campagna", "Cara de vaca — granja, dulzura o campo"),
  entry("🐷", "animals", "Pig face — cuteness, farm or playful greed", "Lice svinje — slatkoća, farma ili šaljiva pohlepa", "Schweinegesicht — Niedlichkeit, Bauernhof oder spielerische Gier", "Muso di maiale — simpatia, fattoria o golosità", "Cara de cerdo — ternura, granja o gula juguetona"),
  entry("🐔", "animals", "Chicken — farm life, morning or caution", "Kokoš — život na farmi, jutro ili oprez", "Huhn — Landleben, Morgen oder Vorsicht", "Gallina — vita in fattoria, mattina o prudenza", "Gallina — vida de granja, mañana o cautela"),
  entry("🐧", "animals", "Penguin — cold weather, loyalty or cuteness", "Pingvin — hladnoća, odanost ili slatkoća", "Pinguin — Kälte, Treue oder Niedlichkeit", "Pinguino — freddo, fedeltà o simpatia", "Pingüino — frío, lealtad o ternura"),
  entry("🦄", "animals", "Unicorn — fantasy, uniqueness and magic", "Jednorog — mašta, jedinstvenost i čarolija", "Einhorn — Fantasie, Einzigartigkeit und Magie", "Unicorno — fantasia, unicità e magia", "Unicornio — fantasía, singularidad y magia"),
  entry("🐢", "animals", "Turtle — patience, slowness and long life", "Kornjača — strpljenje, sporost i dug život", "Schildkröte — Geduld, Langsamkeit und langes Leben", "Tartaruga — pazienza, lentezza e longevità", "Tortuga — paciencia, lentitud y larga vida"),
  entry("🐙", "animals", "Octopus — ocean, intelligence or many tasks", "Hobotnica — ocean, inteligencija ili mnogo zadataka", "Oktopus — Meer, Intelligenz oder viele Aufgaben", "Polpo — oceano, intelligenza o molte attività", "Pulpo — océano, inteligencia o muchas tareas"),
  entry("🦉", "animals", "Owl — wisdom, night and careful observation", "Sova — mudrost, noć i pažljivo promatranje", "Eule — Weisheit, Nacht und genaue Beobachtung", "Gufo — saggezza, notte e osservazione", "Búho — sabiduría, noche y observación"),

  entry("🍌", "food", "Banana — fruit, energy or quick snack", "Banana — voće, energija ili brzi zalogaj", "Banane — Obst, Energie oder schneller Snack", "Banana — frutta, energia o spuntino veloce", "Plátano — fruta, energía o tentempié rápido"),
  entry("🍉", "food", "Watermelon — summer, refreshment and picnic", "Lubenica — ljeto, osvježenje i piknik", "Wassermelone — Sommer, Erfrischung und Picknick", "Anguria — estate, freschezza e picnic", "Sandía — verano, frescura y picnic"),
  entry("🍇", "food", "Grapes — fruit, harvest or wine", "Grožđe — voće, berba ili vino", "Trauben — Obst, Ernte oder Wein", "Uva — frutta, vendemmia o vino", "Uvas — fruta, cosecha o vino"),
  entry("🍒", "food", "Cherries — sweetness, summer and a perfect pair", "Trešnje — slatkoća, ljeto i savršen par", "Kirschen — Süße, Sommer und ein perfektes Paar", "Ciliegie — dolcezza, estate e coppia perfetta", "Cerezas — dulzura, verano y pareja perfecta"),
  entry("🥑", "food", "Avocado — healthy food and modern cuisine", "Avokado — zdrava hrana i moderna kuhinja", "Avocado — gesundes Essen und moderne Küche", "Avocado — cibo sano e cucina moderna", "Aguacate — comida sana y cocina moderna"),
  entry("🥐", "food", "Croissant — breakfast, bakery or France", "Kroasan — doručak, pekarnica ili Francuska", "Croissant — Frühstück, Bäckerei oder Frankreich", "Cornetto — colazione, forno o Francia", "Cruasán — desayuno, panadería o Francia"),
  entry("🌮", "food", "Taco — Mexican food, meal or party", "Taco — meksička hrana, obrok ili zabava", "Taco — mexikanisches Essen, Mahlzeit oder Party", "Taco — cucina messicana, pasto o festa", "Taco — comida mexicana, comida o fiesta"),
  entry("🍣", "food", "Sushi — Japanese cuisine and fresh seafood", "Sushi — japanska kuhinja i svježi morski plodovi", "Sushi — japanische Küche und frische Meeresfrüchte", "Sushi — cucina giapponese e pesce fresco", "Sushi — cocina japonesa y pescado fresco"),
  entry("🍦", "food", "Soft ice cream — dessert, summer and enjoyment", "Sladoled — desert, ljeto i uživanje", "Softeis — Dessert, Sommer und Genuss", "Gelato — dolce, estate e piacere", "Helado — postre, verano y disfrute"),
  entry("🥤", "food", "Drink cup — refreshment, takeaway or cinema", "Čaša s napitkom — osvježenje, za van ili kino", "Getränkebecher — Erfrischung, zum Mitnehmen oder Kino", "Bicchiere con cannuccia — bibita, asporto o cinema", "Vaso con pajita — bebida, para llevar o cine"),

  entry("🏈", "activities", "American football — sport, team and competition", "Američki nogomet — sport, tim i natjecanje", "American Football — Sport, Team und Wettbewerb", "Football americano — sport, squadra e competizione", "Fútbol americano — deporte, equipo y competición"),
  entry("🎾", "activities", "Tennis — racket sport, match or exercise", "Tenis — sport s reketom, meč ili vježbanje", "Tennis — Schlägersport, Match oder Training", "Tennis — sport con racchetta, partita o esercizio", "Tenis — deporte de raqueta, partido o ejercicio"),
  entry("🏐", "activities", "Volleyball — team sport, beach or match", "Odbojka — timski sport, plaža ili utakmica", "Volleyball — Teamsport, Strand oder Spiel", "Pallavolo — sport di squadra, spiaggia o partita", "Voleibol — deporte de equipo, playa o partido"),
  entry("🏓", "activities", "Table tennis — quick game and friendly competition", "Stolni tenis — brza igra i prijateljsko natjecanje", "Tischtennis — schnelles Spiel und freundlicher Wettkampf", "Ping pong — gioco veloce e sfida amichevole", "Tenis de mesa — juego rápido y competición amistosa"),
  entry("🥊", "activities", "Boxing glove — boxing, training or fighting spirit", "Boksačka rukavica — boks, trening ili borbeni duh", "Boxhandschuh — Boxen, Training oder Kampfgeist", "Guantone da boxe — pugilato, allenamento o grinta", "Guante de boxeo — boxeo, entrenamiento o espíritu de lucha"),
  entry("🎸", "activities", "Guitar — music, concert or playing an instrument", "Gitara — glazba, koncert ili sviranje", "Gitarre — Musik, Konzert oder Instrument spielen", "Chitarra — musica, concerto o suonare", "Guitarra — música, concierto o tocar"),
  entry("🎤", "activities", "Microphone — singing, speech or performance", "Mikrofon — pjevanje, govor ili nastup", "Mikrofon — Singen, Rede oder Auftritt", "Microfono — canto, discorso o esibizione", "Micrófono — canto, discurso o actuación"),
  entry("🎧", "activities", "Headphones — music, audio or focused listening", "Slušalice — glazba, zvuk ili usredotočeno slušanje", "Kopfhörer — Musik, Audio oder konzentriertes Hören", "Cuffie — musica, audio o ascolto concentrato", "Auriculares — música, audio o escucha concentrada"),
  entry("🧩", "activities", "Puzzle piece — problem solving, games or connection", "Dio slagalice — rješavanje problema, igra ili povezivanje", "Puzzleteil — Problemlösung, Spiel oder Verbindung", "Tessera di puzzle — soluzione, gioco o connessione", "Pieza de puzle — resolver problemas, juego o conexión"),
  entry("🎲", "activities", "Game die — board games, chance or luck", "Kockica za igru — društvene igre, slučajnost ili sreća", "Spielwürfel — Brettspiele, Zufall oder Glück", "Dado — giochi da tavolo, caso o fortuna", "Dado — juegos de mesa, azar o suerte"),

  entry("🚲", "travel", "Bicycle — cycling, exercise or green transport", "Bicikl — vožnja, vježbanje ili ekološki prijevoz", "Fahrrad — Radfahren, Bewegung oder umweltfreundlicher Verkehr", "Bicicletta — pedalare, esercizio o trasporto ecologico", "Bicicleta — ciclismo, ejercicio o transporte ecológico"),
  entry("🏍️", "travel", "Motorcycle — riding, speed or road adventure", "Motocikl — vožnja, brzina ili cestovna pustolovina", "Motorrad — Fahren, Tempo oder Straßenabenteuer", "Moto — guida, velocità o avventura su strada", "Motocicleta — conducción, velocidad o aventura"),
  entry("🚕", "travel", "Taxi — city ride or hired transport", "Taksi — gradska vožnja ili prijevoz uz plaćanje", "Taxi — Stadtfahrt oder bezahlter Transport", "Taxi — corsa in città o trasporto a pagamento", "Taxi — viaje urbano o transporte de pago"),
  entry("🚓", "travel", "Police car — police, emergency or patrol", "Policijski automobil — policija, hitnost ili patrola", "Polizeiauto — Polizei, Notfall oder Streife", "Auto della polizia — polizia, emergenza o pattuglia", "Coche de policía — policía, emergencia o patrulla"),
  entry("🚑", "travel", "Ambulance — medical emergency and urgent help", "Vozilo hitne pomoći — medicinska hitnost i brza pomoć", "Krankenwagen — medizinischer Notfall und schnelle Hilfe", "Ambulanza — emergenza medica e aiuto urgente", "Ambulancia — emergencia médica y ayuda urgente"),
  entry("🚁", "travel", "Helicopter — flight, rescue or aerial travel", "Helikopter — let, spašavanje ili putovanje zrakom", "Hubschrauber — Flug, Rettung oder Luftreise", "Elicottero — volo, soccorso o viaggio aereo", "Helicóptero — vuelo, rescate o viaje aéreo"),
  entry("⛵", "travel", "Sailboat — sailing, sea and peaceful travel", "Jedrilica — jedrenje, more i mirno putovanje", "Segelboot — Segeln, Meer und ruhiges Reisen", "Barca a vela — vela, mare e viaggio tranquillo", "Velero — navegación, mar y viaje tranquilo"),
  entry("🏰", "travel", "Castle — history, fairy tales or sightseeing", "Dvorac — povijest, bajke ili razgledavanje", "Schloss — Geschichte, Märchen oder Besichtigung", "Castello — storia, fiabe o visita turistica", "Castillo — historia, cuentos o turismo"),
  entry("🗼", "travel", "Tokyo Tower — Japan, city landmark or travel", "Tokijski toranj — Japan, gradska znamenitost ili putovanje", "Tokyo Tower — Japan, Wahrzeichen oder Reise", "Torre di Tokyo — Giappone, monumento o viaggio", "Torre de Tokio — Japón, monumento o viaje"),
  entry("🌋", "travel", "Volcano — nature, eruption or intense energy", "Vulkan — priroda, erupcija ili snažna energija", "Vulkan — Natur, Ausbruch oder starke Energie", "Vulcano — natura, eruzione o energia intensa", "Volcán — naturaleza, erupción o energía intensa"),

  entry("🖥️", "objects", "Desktop computer — office work, gaming or technology", "Stolno računalo — uredski rad, igranje ili tehnologija", "Desktop-Computer — Büroarbeit, Gaming oder Technik", "Computer fisso — lavoro, giochi o tecnologia", "Ordenador de sobremesa — trabajo, juegos o tecnología"),
  entry("⌨️", "objects", "Keyboard — typing, computer work or coding", "Tipkovnica — tipkanje, rad na računalu ili programiranje", "Tastatur — Tippen, Computerarbeit oder Programmieren", "Tastiera — scrittura, lavoro al computer o programmazione", "Teclado — escribir, trabajar o programar"),
  entry("🖨️", "objects", "Printer — printing documents or office work", "Pisač — ispis dokumenata ili uredski rad", "Drucker — Dokumente drucken oder Büroarbeit", "Stampante — stampa di documenti o lavoro d'ufficio", "Impresora — imprimir documentos o trabajo de oficina"),
  entry("🎥", "objects", "Movie camera — filming, video or cinema", "Filmska kamera — snimanje, video ili kino", "Filmkamera — Filmen, Video oder Kino", "Cinepresa — riprese, video o cinema", "Cámara de cine — grabación, vídeo o cine"),
  entry("📺", "objects", "Television — shows, news or entertainment", "Televizor — emisije, vijesti ili zabava", "Fernseher — Sendungen, Nachrichten oder Unterhaltung", "Televisore — programmi, notizie o intrattenimento", "Televisión — programas, noticias o entretenimiento"),
  entry("📞", "objects", "Telephone receiver — calling or contacting someone", "Telefonska slušalica — poziv ili kontaktiranje nekoga", "Telefonhörer — Anruf oder Kontaktaufnahme", "Cornetta telefonica — chiamata o contatto", "Auricular de teléfono — llamada o contacto"),
  entry("🔦", "objects", "Flashlight — light, searching or emergency", "Baterijska svjetiljka — svjetlo, traženje ili hitna situacija", "Taschenlampe — Licht, Suche oder Notfall", "Torcia — luce, ricerca o emergenza", "Linterna — luz, búsqueda o emergencia"),
  entry("🧰", "objects", "Toolbox — repair, maintenance or practical work", "Kutija s alatom — popravak, održavanje ili praktičan rad", "Werkzeugkasten — Reparatur, Wartung oder praktische Arbeit", "Cassetta degli attrezzi — riparazione, manutenzione o lavoro", "Caja de herramientas — reparación, mantenimiento o trabajo"),
  entry("🎒", "objects", "Backpack — school, hiking or travel", "Ruksak — škola, planinarenje ili putovanje", "Rucksack — Schule, Wandern oder Reise", "Zaino — scuola, escursione o viaggio", "Mochila — escuela, senderismo o viaje"),
  entry("👑", "objects", "Crown — royalty, winner or excellence", "Kruna — kraljevski status, pobjednik ili izvrsnost", "Krone — Königswürde, Sieger oder Spitzenleistung", "Corona — regalità, vincitore o eccellenza", "Corona — realeza, ganador o excelencia"),

  entry("⭐", "symbols", "Star — favorite, quality or achievement", "Zvijezda — omiljeno, kvaliteta ili postignuće", "Stern — Favorit, Qualität oder Leistung", "Stella — preferito, qualità o risultato", "Estrella — favorito, calidad o logro"),
  entry("🌟", "symbols", "Glowing star — something special or outstanding", "Sjajna zvijezda — nešto posebno ili izvanredno", "Leuchtender Stern — etwas Besonderes oder Hervorragendes", "Stella luminosa — qualcosa di speciale o eccezionale", "Estrella brillante — algo especial o sobresaliente"),
  entry("💯", "symbols", "Hundred points — perfect score or full agreement", "Sto bodova — savršen rezultat ili potpuno slaganje", "Hundert Punkte — perfektes Ergebnis oder volle Zustimmung", "Cento punti — risultato perfetto o pieno accordo", "Cien puntos — resultado perfecto o total acuerdo"),
  entry("🎉", "symbols", "Party popper — celebration and congratulations", "Konfeti — slavlje i čestitke", "Partyknaller — Feier und Glückwunsch", "Coriandoli — festa e congratulazioni", "Confeti — celebración y felicitaciones"),
  entry("💥", "symbols", "Collision — impact, explosion or dramatic moment", "Sudar — udar, eksplozija ili dramatičan trenutak", "Zusammenstoß — Aufprall, Explosion oder dramatischer Moment", "Collisione — impatto, esplosione o momento drammatico", "Colisión — impacto, explosión o momento dramático"),
  entry("💫", "symbols", "Dizzy star — dizziness, wonder or sparkling motion", "Zvjezdice oko glave — vrtoglavica, čuđenje ili blještav pokret", "Taumelnder Stern — Schwindel, Staunen oder funkelnde Bewegung", "Stella rotante — vertigine, stupore o movimento brillante", "Estrella mareada — mareo, asombro o movimiento brillante"),
  entry("☮️", "symbols", "Peace symbol — peace, harmony and nonviolence", "Simbol mira — mir, sklad i nenasilje", "Friedenssymbol — Frieden, Harmonie und Gewaltlosigkeit", "Simbolo della pace — pace, armonia e nonviolenza", "Símbolo de la paz — paz, armonía y no violencia"),
  entry("♻️", "symbols", "Recycling symbol — reuse and environmental care", "Simbol recikliranja — ponovna uporaba i briga za okoliš", "Recyclingsymbol — Wiederverwendung und Umweltschutz", "Simbolo del riciclo — riuso e cura dell'ambiente", "Símbolo de reciclaje — reutilización y cuidado ambiental"),
  entry("❓", "symbols", "Question mark — question, doubt or missing information", "Upitnik — pitanje, sumnja ili nedostatak informacije", "Fragezeichen — Frage, Zweifel oder fehlende Information", "Punto interrogativo — domanda, dubbio o informazione mancante", "Signo de interrogación — pregunta, duda o información faltante"),
  entry("❗", "symbols", "Exclamation mark — importance, surprise or urgency", "Uskličnik — važnost, iznenađenje ili hitnost", "Ausrufezeichen — Wichtigkeit, Überraschung oder Dringlichkeit", "Punto esclamativo — importanza, sorpresa o urgenza", "Signo de exclamación — importancia, sorpresa o urgencia"),

  flagEntry("🇦🇹", "at", "Flag of Austria", "Zastava Austrije", "Flagge Österreichs", "Bandiera dell'Austria", "Bandera de Austria"),
  flagEntry("🇸🇮", "si", "Flag of Slovenia", "Zastava Slovenije", "Flagge Sloweniens", "Bandiera della Slovenia", "Bandera de Eslovenia"),
  flagEntry("🇧🇦", "ba", "Flag of Bosnia and Herzegovina", "Zastava Bosne i Hercegovine", "Flagge von Bosnien und Herzegowina", "Bandiera della Bosnia ed Erzegovina", "Bandera de Bosnia y Herzegovina"),
  flagEntry("🇷🇸", "rs", "Flag of Serbia", "Zastava Srbije", "Flagge Serbiens", "Bandiera della Serbia", "Bandera de Serbia"),
  flagEntry("🇵🇹", "pt", "Flag of Portugal", "Zastava Portugala", "Flagge Portugals", "Bandiera del Portogallo", "Bandera de Portugal"),
];

const categoryOrder: CategoryId[] = [
  "smileys",
  "people",
  "animals",
  "food",
  "activities",
  "travel",
  "objects",
  "symbols",
  "flags",
  "traffic",
  "hearts",
];

export const emojis: EmojiEntry[] = [...baseEmojis, ...additionalEmojis, ...trafficSignEntries, ...heartFaceEntries].sort(
  (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
);
