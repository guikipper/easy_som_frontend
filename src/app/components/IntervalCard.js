'use client'

import styles from "../styles/IntervalCard.module.css";
import { useState, useEffect } from "react";
import { useMyContext } from '../contexts/UseContext'
import Piano from "./Piano";
import RoundsResults from "./RoundsResults"
import { useRouter } from 'next/navigation';
import IntervalsTable from "./IntervalsTable";
import { FaPlay } from 'react-icons/fa';
//<FontAwesomeIcon icon="fa-solid fa-play" />

export default function IntervalCard() {
  const [actualNote, setActualNote] = useState();
  const [actualInterval, setActualInterval] = useState();
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState();
  const [referenceNote, setReferenceNote] = useState();
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});
  const [octave, setOctave] = useState([]);
  const [buttonsToShow, setButtonsToShow] = useState([])
  const [results, setResults] = useState([])
  const [visibleHelp, setVisibleHelp] = useState(false)
  const router = useRouter()

  const audioContext = new AudioContext()

  const firstOctave = [
    "C4",
    "Db4",
    "D4",
    "Eb4",
    "E4",
    "F4",
    "Gb4",
    "G4",
    "Ab4",
    "A4",
    "Bb4",
    "B4"
  ];
  const notes = [
    "C4",
    "Db4",
    "D4",
    "Eb4",
    "E4",
    "F4",
    "Gb4",
    "G4",
    "Ab4",
    "A4",
    "Bb4",
    "B4",
    "C5",
    "Db5",
    "D5",
    "Eb5",
    "E5",
    "F5",
    "Gb5",
    "G5",
    "Ab5",
    "A5",
    "Bb5",
    "B5",
  ];
  const intervals = [
    "1J",
    "2m",
    "2M",
    "3m",
    "3M",
    "4J",
    "4A/5D",
    "5J",
    "6m/5A",
    "6M",
    "7m",
    "7M",
    "8J",
  ];

  const { formData } = useMyContext() //recebo o formData
  
  const isObjectEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };
  if (isObjectEmpty(formData)) { //se o objeto estiver vazio ocorre um redirecionamento
    router.push('../intervals/exercise-config');
  }
  

  useEffect(() => { 
    if (formData.referenceNote || formData.referenceNote === 0) {
      if (formData.referenceNote === 'random') {
        const randomIndex = Math.floor(Math.random() * firstOctave.length);
        generateOctave(randomIndex);
        setTotalRounds(formData.rounds);
        handleReferenceNote(randomIndex);
      } else {
        generateOctave(formData.referenceNote);
        setTotalRounds(formData.rounds);
        handleReferenceNote(formData.referenceNote);  
        }
      }
  }, [formData]);

  const handleIntervalOptions = () => {
    const options = []
    if (formData.intervalOptions.menor == true) {
      options.push(1, 3, 8, 10)
    }
    if (formData.intervalOptions.maior == true) {
      options.push(2, 4, 9, 11)
    }
    if (formData.intervalOptions.justo == true) {
      options.push(0, 5, 7)
    }
    if (formData.intervalOptions.aumentado == true ) {
      options.push(6)
    }
    return options
  }

  const generateOctave = (referenceNoteIndex) => {
    const octave = notes.slice(referenceNoteIndex, referenceNoteIndex + 13);
    setOctave(octave)
  };

  const handleReferenceNote = (item) => {
    switch(item) {
      case 0:
        setReferenceNote('C4')
        break;
      case 1:
        setReferenceNote('Db4')
        break;
      case 2:
        setReferenceNote('D4')
        break;
      case 3:
        setReferenceNote('Eb4')
        break;
      case 4:
        setReferenceNote('E4')
        break;
      case 5:
        setReferenceNote('F4')
        break;
      case 6:
        setReferenceNote('Gb4')
        break;
      case 7:
        setReferenceNote('G4')
        break;
      case 8:
        setReferenceNote('Ab4')
        break;
      case 9:
        setReferenceNote('A4')
        break;
      case 10:
        setReferenceNote('Bb4')
        break;
      case 11:
        setReferenceNote('B4')
        break;
    }
  }

  useEffect(() => {
    if (octave && round > 0 && referenceNote) {
      getRandomNote();
    }
  }, [round, octave]);

  const getRandomNote = () => {
      const intervalsToPlay = handleIntervalOptions()
      setButtonsToShow(intervalsToPlay)
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * octave.length);
      } while (!intervalsToPlay.includes(randomIndex));

      const randomNote = octave[randomIndex];
      getInterval(randomIndex);
      setActualNote(randomNote);
      return randomNote; 
  };

  const getInterval = (noteIndex) => {
    switch (noteIndex) {
      case 0:
        //console.log("Primeira Justa");
        setActualInterval("1J");
        break;
      case 1:
        //console.log("Segunda menor");
        setActualInterval("2m");
        break;
      case 2:
        //console.log("Segunda maior");
        setActualInterval("2M");
        break;
      case 3:
        //console.log("Terça menor");
        setActualInterval("3m");
        break;
      case 4:
        //console.log("Terça maior");
        setActualInterval("3M");
        break;
      case 5:
        //console.log("Quarta Justa");
        setActualInterval("4J");
        break;
      case 6:
        //console.log("Quarta aumentada");
        setActualInterval("4A");
        break;
      case 7:
        //console.log("Quinta Justa");
        setActualInterval("5J");
        break;
      case 8:
        //console.log("Sexta menor");
        setActualInterval("6m");
        break;
      case 9:
        //console.log("Sexta maior");
        setActualInterval("6M");
        break;
      case 10:
        //console.log("Sétima menor");
        setActualInterval("7m");
        break;
      case 11:
        //console.log("Sétima maior");
        setActualInterval("7M");
        break;
      case 12:
        //console.log("Oitava Justa");
        setActualInterval("8J");
        break;
    }
  };

const play = async(audio) => {
  
  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    const response = await fetch(audio)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.destination)
    source.onended = () => {
      source.disconnect(); // Desconectar o source após o término da reprodução
    };
    source.start()
    
  } catch (error) {
    console.error("Error with playing audio", error);
  }
}

const reproduceActualInterval = () => {
  if (formData.direction == 'ascendente') {
    const audioFile = `/audio/electric_piano_1-mp3/${referenceNote}.mp3`;
    play(audioFile)
    const audioFile2 = `/audio/electric_piano_1-mp3/${actualNote}.mp3`;
    setTimeout(()=> {
      play(audioFile2) 
    }, 800)
  } else {
    const audioFile = `/audio/electric_piano_1-mp3/${actualNote}.mp3`;
    play(audioFile)
    const audioFile2 = `/audio/electric_piano_1-mp3/${referenceNote}.mp3`;
    setTimeout(()=> {
      play(audioFile2)  
    }, 800)
  }
  
};
 
  const checkResult = (selectedOption) => {
    if (selectedOption == "4A/5D") {
      selectedOption = "4A"
    }
    if (selectedOption == "6m/5A") {
      selectedOption = "6m"
    }
    if (selectedOption == actualInterval) {
      setMessageStyle({
        color: "rgb(23, 145, 23)",
      });
      setMessage("Certa resposta!");
      const result = { round: round, rightAnswer: true }; 
      setResults(prevArray => [...prevArray, result]);
      attRound();
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setMessageStyle({
        color: "red",
      });
      setMessage("Resposta errada!");
      if (formData.switchValue == false) {
        const result = { round: round, rightAnswer: false }; 
        setResults(prevArray => [...prevArray, result]);
        attRound();
      }
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const attRound = () => {
    setRound((prevRound) => prevRound + 1);
  };

  const handleHelp = () => {
    setVisibleHelp(!visibleHelp)
  }

  return (
  <>
  {formData.rounds + 1 != round ? (
    <div className={styles.main}>
      <div className={styles.card}>

        <div className={styles.help} onClick={handleHelp}>
          <p>?</p>
        </div>

        <div className={styles.roundCount}>
            {round} / {totalRounds}
        </div>
        <div className={styles.superiorCard}>

        <div className={styles.title}>
            <h1>Ouça as duas notas e informe o intervalo.</h1>
          </div>
        </div>
        
        
        <div className={styles.referenceNotes}>
          <p>Reproduzir Intervalo Atual</p>
          <div className={styles.playIconDiv} onClick={reproduceActualInterval} >
            <FaPlay/>
          </div>
           

        </div>
        
        <div className={styles.responseButtonsDiv}>
          {intervals.map((item, index) => (
            buttonsToShow.includes(index) && (
              <button
              className={styles.responseButtons}
              key={index}
              onClick={() => {
                checkResult(item);
              }}
            >
              {item}
            </button>
            )))}
        </div>

        <p className={styles.feedbackText} style={messageStyle}>
          {message}
        </p>

      </div>
      {visibleHelp && (
          <IntervalsTable/>
      )}
      
      <Piano/>
    </div>
  ) : (
    <RoundsResults results={results}/>
  )}
    
  </>
    
  );
}
