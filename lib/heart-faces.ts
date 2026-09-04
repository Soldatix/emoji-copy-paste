import type { EmojiEntry } from "@/lib/emoji-data";

export type HeartFaceCode =
  | "happy"
  | "big-smile"
  | "laughing"
  | "in-love"
  | "kiss"
  | "grateful"
  | "excited"
  | "calm"
  | "shy"
  | "thoughtful"
  | "surprised"
  | "confused"
  | "worried"
  | "sad"
  | "crying"
  | "inconsolable"
  | "disappointed"
  | "angry"
  | "tired"
  | "broken-heart";

const heartFace = (
  code: HeartFaceCode,
  emoji: string,
  en: string,
  hr: string,
  de: string,
  it: string,
  es: string,
): EmojiEntry => ({
  id: `heart-${code}`,
  emoji,
  heartFaceCode: code,
  category: "hearts",
  meaning: { en, hr, de, it, es },
});

export const heartFaceEntries: EmojiEntry[] = [
  heartFace("happy", "❤️😊", "Happy heart — warmth, kindness and joy", "Sretno srce — toplina, dobrota i radost", "Glückliches Herz — Wärme, Freundlichkeit und Freude", "Cuore felice — calore, gentilezza e gioia", "Corazón feliz — calidez, amabilidad y alegría"),
  heartFace("big-smile", "❤️😁", "Big-smile heart — cheerful excitement", "Srce s velikim osmijehom — veselo uzbuđenje", "Herz mit breitem Lächeln — fröhliche Begeisterung", "Cuore con grande sorriso — entusiasmo allegro", "Corazón con gran sonrisa — entusiasmo alegre"),
  heartFace("laughing", "❤️😂", "Laughing heart — carefree fun and laughter", "Nasmijano srce — bezbrižna zabava i smijeh", "Lachendes Herz — unbeschwerter Spaß und Lachen", "Cuore che ride — divertimento e risate", "Corazón que ríe — diversión y risas"),
  heartFace("in-love", "❤️😍", "Heart in love — admiration and deep affection", "Zaljubljeno srce — divljenje i snažna naklonost", "Verliebtes Herz — Bewunderung und tiefe Zuneigung", "Cuore innamorato — ammirazione e profondo affetto", "Corazón enamorado — admiración y profundo cariño"),
  heartFace("kiss", "❤️😘", "Kissing heart — affection, tenderness or thanks", "Srce koje šalje poljubac — naklonost, nježnost ili zahvala", "Küssendes Herz — Zuneigung, Zärtlichkeit oder Dank", "Cuore che manda un bacio — affetto, tenerezza o grazie", "Corazón que manda un beso — cariño, ternura o agradecimiento"),
  heartFace("grateful", "❤️🙏", "Grateful heart — sincere thanks and appreciation", "Zahvalno srce — iskrena zahvala i poštovanje", "Dankbares Herz — aufrichtiger Dank und Wertschätzung", "Cuore grato — sincera gratitudine e apprezzamento", "Corazón agradecido — gratitud y aprecio sinceros"),
  heartFace("excited", "❤️🤩", "Excited heart — amazement and great enthusiasm", "Oduševljeno srce — čuđenje i veliko uzbuđenje", "Begeistertes Herz — Staunen und große Freude", "Cuore entusiasta — stupore e grande entusiasmo", "Corazón entusiasmado — asombro y gran emoción"),
  heartFace("calm", "❤️😌", "Calm heart — peace, comfort and contentment", "Mirno srce — spokoj, ugoda i zadovoljstvo", "Ruhiges Herz — Frieden, Geborgenheit und Zufriedenheit", "Cuore sereno — pace, conforto e soddisfazione", "Corazón tranquilo — paz, consuelo y satisfacción"),
  heartFace("shy", "❤️☺️", "Shy heart — bashfulness and gentle affection", "Sramežljivo srce — stidljivost i nježna naklonost", "Schüchternes Herz — Verlegenheit und sanfte Zuneigung", "Cuore timido — timidezza e dolce affetto", "Corazón tímido — timidez y cariño suave"),
  heartFace("thoughtful", "❤️🤔", "Thoughtful heart — reflection and careful consideration", "Zamišljeno srce — razmišljanje i pažljivo promišljanje", "Nachdenkliches Herz — Überlegung und Besonnenheit", "Cuore pensieroso — riflessione e considerazione", "Corazón pensativo — reflexión y consideración"),
  heartFace("surprised", "❤️😮", "Surprised heart — sudden wonder or unexpected news", "Iznenađeno srce — naglo čuđenje ili neočekivana vijest", "Überraschtes Herz — plötzliches Staunen oder unerwartete Nachricht", "Cuore sorpreso — stupore improvviso o notizia inattesa", "Corazón sorprendido — asombro repentino o noticia inesperada"),
  heartFace("confused", "❤️😕", "Confused heart — uncertainty or mixed feelings", "Zbunjeno srce — nesigurnost ili pomiješani osjećaji", "Verwirrtes Herz — Unsicherheit oder gemischte Gefühle", "Cuore confuso — incertezza o sentimenti contrastanti", "Corazón confundido — incertidumbre o sentimientos encontrados"),
  heartFace("worried", "❤️😟", "Worried heart — concern, anxiety or unease", "Zabrinuto srce — briga, tjeskoba ili nelagoda", "Besorgtes Herz — Sorge, Angst oder Unruhe", "Cuore preoccupato — apprensione, ansia o disagio", "Corazón preocupado — inquietud, ansiedad o malestar"),
  heartFace("inconsolable", "❤️😢", "Crying heart — sadness and emotional pain", "Plačljivo srce — tuga i emocionalna bol", "Weinendes Herz — Traurigkeit und emotionaler Schmerz", "Cuore che piange — tristezza e dolore emotivo", "Corazón llorando — tristeza y dolor emocional"),
  heartFace("crying", "❤️😭", "Inconsolable heart — overwhelming sorrow and sobbing", "Neutješno srce — snažna tuga i jecanje", "Untröstliches Herz — überwältigende Trauer und Schluchzen", "Cuore inconsolabile — grande tristezza e singhiozzi", "Corazón inconsolable — tristeza intensa y sollozos"),
  heartFace("sad", "❤️☹️", "Sad heart — sorrow, loneliness or hurt feelings", "Tužno srce — žalost, usamljenost ili povrijeđeni osjećaji", "Trauriges Herz — Kummer, Einsamkeit oder verletzte Gefühle", "Cuore triste — dolore, solitudine o sentimenti feriti", "Corazón triste — pena, soledad o sentimientos heridos"),
  heartFace("disappointed", "❤️😞", "Disappointed heart — letdown and quiet hurt", "Razočarano srce — razočaranje i tiha povrijeđenost", "Enttäuschtes Herz — Ernüchterung und stiller Schmerz", "Cuore deluso — delusione e dolore silenzioso", "Corazón decepcionado — desilusión y dolor callado"),
  heartFace("angry", "❤️😠", "Angry heart — frustration, anger or strong disagreement", "Ljutito srce — frustracija, ljutnja ili snažno neslaganje", "Wütendes Herz — Frust, Ärger oder starker Widerspruch", "Cuore arrabbiato — frustrazione, rabbia o forte disaccordo", "Corazón enfadado — frustración, ira o fuerte desacuerdo"),
  heartFace("tired", "❤️😴", "Tired heart — exhaustion, sleepiness or emotional fatigue", "Umorno srce — iscrpljenost, pospanost ili emocionalni umor", "Müdes Herz — Erschöpfung, Schläfrigkeit oder emotionale Müdigkeit", "Cuore stanco — esaurimento, sonno o stanchezza emotiva", "Corazón cansado — agotamiento, sueño o cansancio emocional"),
  heartFace("broken-heart", "💔😢", "Broken heart — heartbreak, loss or deep sadness", "Slomljeno srce — ljubavna bol, gubitak ili duboka tuga", "Gebrochenes Herz — Liebeskummer, Verlust oder tiefe Traurigkeit", "Cuore spezzato — dolore amoroso, perdita o profonda tristezza", "Corazón roto — desamor, pérdida o tristeza profunda"),
];
