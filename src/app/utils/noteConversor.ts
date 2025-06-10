type NoteMap = {
  [key: string]: string;
};

type IntervalSemitones = {
  [key: string]: number;
};

const notaParaFormatoPadrao: NoteMap = {
  'C': 'C', 'C#': 'Db', 'Db': 'Db', 
  'D': 'D', 'D#': 'Eb', 'Eb': 'Eb',
  'E': 'E', 'F': 'F', 'F#': 'Gb', 'Gb': 'Gb',
  'G': 'G', 'G#': 'Ab', 'Ab': 'Ab',
  'A': 'A', 'A#': 'Bb', 'Bb': 'Bb',
  'B': 'B', 'Ebb': 'D', 'Abb': 'G', 'Bbb': 'A',
  'F##': 'G', 'C##': 'D', 'Cb': 'B', 'Fb': 'E', 'B#': 'C', 'E#': 'F'
};

const intervalosSemitons: IntervalSemitones = {
  "unissono": 0,
  "segunda menor": 1,
  "segunda maior": 2,
  "terca menor": 3,
  "terca maior": 4,
  "quarta justa": 5,
  "quarta aumentada": 6,
  "quinta diminuta": 6,
  "quinta justa": 7,
  "sexta menor": 8,
  "sexta maior": 9,
  "setima menor": 10,
  "setima maior": 11,
  "oitava justa": 12,
  "nona menor": 13,
  "nona maior": 14,
  "decima menor": 15,
  "decima maior": 16, 
  "decima primeira justa": 17,
  "decima primeira aumentada": 18
};

export function converterNota(nota: string): string | null {
  if (notaParaFormatoPadrao.hasOwnProperty(nota)) {
    console.log("Chega a entrar aqui? ", nota);
    return notaParaFormatoPadrao[nota];
  } else {
    console.error("Nota não reconhecida:", nota);
    return null;
  }
}

const notes: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const oitavasDisponiveis: number[] = [3, 4, 5, 6];

export function ajustarOitava(nota1: string, nota2: string, interval: string): [string, string] {
  let oitavaReferencia = getRandomOctave();
  let oitavaAlvo = oitavaReferencia;

  const posicaoNota1 = notes.indexOf(nota1);
  const posicaoNota2 = notes.indexOf(nota2);

  if (interval === "unissono") {
    const nota1ComOitava = nota1 + oitavaReferencia;
    const nota2ComOitava = nota2 + oitavaReferencia;
    return [nota1ComOitava, nota2ComOitava];
  }   

  if (oitavaReferencia === 6) {
    const cabe = 12 - (posicaoNota1 + intervalosSemitons[interval]);
    if (cabe <= 0) {
      oitavaAlvo -= 1;
      oitavaReferencia -= 1;
    }
  }

  if (posicaoNota2 <= posicaoNota1) {
    oitavaAlvo += 1;
  }

  let nota1ComOitava = nota1 + oitavaReferencia;
  let nota2ComOitava = nota2 + oitavaAlvo;

  if (interval.includes("nona") || interval.includes("decima")) {
    if (oitavaReferencia === 6) {
      oitavaReferencia--;
      oitavaAlvo--;
      if (interval.includes("decima")) {
        oitavaReferencia--;
        oitavaAlvo--;
      }
    }
    nota1ComOitava = nota1 + oitavaReferencia;
    nota2ComOitava = nota2 + (oitavaAlvo + 1);
  }

  return [nota1ComOitava, nota2ComOitava];
}

function getRandomOctave(): number {
  const randomIndex = Math.floor(Math.random() * oitavasDisponiveis.length);
  return oitavasDisponiveis[randomIndex];
} 