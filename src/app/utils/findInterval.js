import { intervalMap } from "./intervalsMap";

const intervalToDefault = {
    'unissono': 'unissono',
    'primeira justa': 'uníssono',
    'tritono': 'quinta diminuta'
  };

export function findIntervalByNotes(note1, note2) {
    for (let interval in intervalMap[note1]) {
        if (intervalMap[note1][interval] === note2) {
          return interval;
        }
      }
}

export function findNoteByIntervalAndStart(note, intervalName) {
    console.log("A nota e o intervalo que entraram na consulta: ", note, intervalName)
    const convertedInterval = convertInterval(intervalName)
    console.log("O intervalo convertido: ", convertedInterval)
    if (intervalMap[note] && intervalMap[note][convertedInterval]) {
        return intervalMap[note][convertedInterval];
    }
    return 'Nota desconhecida';
}

const convertInterval = (intervalName) => { 
   if (intervalToDefault.hasOwnProperty(intervalName)) {
        return intervalToDefault[intervalName];
    } else{
        return intervalName
    }
}