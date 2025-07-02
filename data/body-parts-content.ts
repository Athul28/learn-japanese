// Body parts vocabulary data
export interface BodyPart {
  japanese: string;
  romaji: string;
  english: string;
  position: string;
  image?: string;
  memoryTip?: string;
}

export const bodyPartsVocabulary: BodyPart[] = [
  {
    japanese: "あたま",
    romaji: "atama",
    english: "head",
    position: "top-4 left-1/2 transform -translate-x-1/2",
    memoryTip: "Your head is at the top!",
  },
  {
    japanese: "かお",
    romaji: "kao",
    english: "face",
    position: "top-16 left-1/2 transform -translate-x-1/2",
    memoryTip: "Your face shows who you are",
  },
  {
    japanese: "め",
    romaji: "me",
    english: "eye",
    position: "top-20 left-8",
    memoryTip: "Your eyes help you see me",
  },
  {
    japanese: "みみ",
    romaji: "mimi",
    english: "ear",
    position: "top-20 right-8",
    memoryTip: "Mimi sounds like me-me, what ears hear",
  },
  {
    japanese: "くち",
    romaji: "kuchi",
    english: "mouth",
    position: "top-28 left-1/2 transform -translate-x-1/2",
    memoryTip: "Your mouth goes 'coochi-coo'",
  },
  {
    japanese: "くび",
    romaji: "kubi",
    english: "neck",
    position: "top-36 left-1/2 transform -translate-x-1/2",
    memoryTip: "Your neck is a cube-like shape",
  },
  {
    japanese: "かた",
    romaji: "kata",
    english: "shoulder",
    position: "top-44 left-4",
    memoryTip: "Kata sounds like karate - shoulders used in martial arts",
  },
  {
    japanese: "て",
    romaji: "te",
    english: "hand",
    position: "top-52 left-0",
    memoryTip: "Te sounds like 'tea' - hands hold tea cups",
  },
  {
    japanese: "ゆび",
    romaji: "yubi",
    english: "finger",
    position: "top-56 left-2",
    memoryTip: "You be using your fingers!",
  },
  {
    japanese: "おなか",
    romaji: "onaka",
    english: "stomach",
    position: "top-48 left-1/2 transform -translate-x-1/2",
    memoryTip: "Oh naka! My stomach!",
  },
  {
    japanese: "あし",
    romaji: "ashi",
    english: "leg",
    position: "bottom-8 left-1/3",
    memoryTip: "Ashy legs need lotion",
  },
];
