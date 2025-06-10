import { intervalMap } from "./intervalsMap";

type IntervalToDefault = {
  [key: string]: string;
};

type IntervalMap = {
  [key: string]: {
    [key: string]: string;
  };
};

const intervalToDefault: IntervalToDefault = {
  'unissono': 'unissono',
  'primeira justa': 'uníssono',
  'tritono': 'quinta diminuta'
};

export function findIntervalByNotes(note1: string, note2: string): string | undefined {
  const map = intervalMap as IntervalMap;
  for (let interval in map[note1]) {
    if (map[note1][interval] === note2) {
      return interval;
    }
  }
  return undefined;
}

export function findNoteByIntervalAndStart(note: string, intervalName: string): string {
  console.log("A nota e o intervalo que entraram na consulta: ", note, intervalName);
  const convertedInterval = convertInterval(intervalName);
  console.log("O intervalo convertido: ", convertedInterval);
  
  const map = intervalMap as IntervalMap;
  if (map[note] && map[note][convertedInterval]) {
    return map[note][convertedInterval];
  }
  return 'Nota desconhecida';
}

const convertInterval = (intervalName: string): string => { 
  if (intervalToDefault.hasOwnProperty(intervalName)) {
    return intervalToDefault[intervalName];
  } else {
    return intervalName;
  }
}; 