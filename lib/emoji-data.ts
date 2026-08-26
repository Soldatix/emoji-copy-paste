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
  | "flags";

export type EmojiEntry = {
  emoji: string;
  category: CategoryId;
  meaning: Record<Language, string>;
  flagCode?: string;
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
};

export const emojis: EmojiEntry[] = [
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
