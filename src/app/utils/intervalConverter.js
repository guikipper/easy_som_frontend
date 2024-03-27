const formatedIntervals = {
    "oitava diminuta": "Oitava Diminuta",
    "oitava justa": "Oitava Justa",
    "primeira aumentada": "Primeira Aumentada",
    "primeira duplamente aumentada": "Primeira Duplamente Aumentada",
    "quarta aumentada": "Quarta Aumentada",
    "quarta diminuta": "Quarta Diminuta",
    "quarta duplamente aumentada": "Quarta Duplamente Aumentada",
    "quarta duplamente diminuta": "Quarta Duplamente Diminuta",
    "quarta justa": "Quarta Justa",
    "quinta aumentada": "Quinta Aumentada",
    "quinta diminuta": "Quinta Diminuta",
    "quinta duplamente aumentada": "Quinta Duplamente Aumentada",
    "quinta duplamente diminuta": "Quinta Duplamente Diminuta",
    "quinta justa": "Quinta Justa",
    "segunda aumentada": "Segunda Aumentada",
    "segunda diminuta": "Segunda Diminuta",
    "segunda duplamente aumentada": "Segunda Duplamente Aumentada",
    "segunda maior": "Segunda Maior",
    "segunda menor": "Segunda Menor",
    "segunda menor diminuta": "Segunda Menor Diminuta",
    "setima aumentada": "Sétima Aumentada",
    "setima diminuta": "Sétima Diminuta",
    "setima maior": "Sétima Maior",
    "setima menor": "Sétima Menor",
    "sexta aumentada": "Sexta Aumentada",
    "sexta diminuta": "Sexta Diminuta",
    "sexta maior": "Sexta Maior",
    "sexta menor": "Sexta Menor",
    "terca aumentada": "Terça Aumentada",
    "terca diminuta": "Terça Diminuta",
    "terca maior": "Terça Maior",
    "terca menor": "Terça Menor",
    "unissono": "Uníssono"
  };
  
export function intervalConverter(interval) {
    if(formatedIntervals[interval]){
        return [formatedIntervals[interval]]
    } else {
        return interval
    }
}