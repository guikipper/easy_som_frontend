"use client";

import styles from "../styles/IntervalCard.module.css";
import { useState, useEffect, useContext } from "react";
import { useMyContext } from "../contexts/UseContext";
import Piano from "./Piano";
import { useRouter } from "next/navigation";
import { AiTwotoneSound } from "react-icons/ai";
import GameInteractionButton from "./Buttons/GameInteractionButton";
import RoundsIndicator from "./RoundsIndicator";
import { findNoteByIntervalAndStart } from "../utils/findInterval";
import { ajustarOitava, converterNota } from "../utils/noteConversor";
import { removeAccents } from "../utils/removeAccents";
import { FeedbackMessage } from "./FeedbackMessage";
import SessionResults from "./SessionResults";
import { fileNotes } from "../utils/notes";
import LoadingMessage from "./LoadingMessage";

export default function IntervalCard() {
  const [targetNote, setTargetNote] = useState();
  const [actualInterval, setActualInterval] = useState();
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState();
  const [referenceNote, setReferenceNote] = useState();
  const [selectedIntervals, setSelectedIntervals] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [messageStyle, setMessageStyle] = useState({});
  const [buttonsToShow, setButtonsToShow] = useState([]);
  const [results, setResults] = useState([]);
  const [roundsResults, setRoundsResults] = useState([]);
  const [visibleHelp, setVisibleHelp] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [blockedButton, setBlockedButton] = useState(true);
  const [resultsRoundsIndicator, setResultRoundsIndicator] = useState([])
  const [showCurrentRound, setShowCurrentRound] = useState(true)
  const router = useRouter();
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffers, setAudioBuffers] = useState({})
  const [loadingAudioBuffers, setLoadingAudioBuffers] = useState(false)

  const [finishedExercises, setFinishedExercises] = useState(false)
  const [notaReferenciaNoTeclado, setNotaReferenciaNoTeclado] = useState()
  const [notaAlvoNoTeclado, setNotaAlvoNoTeclado] = useState()
  const [adjustedReferenceNoteWithOctave, setAdjustedReferenceNoteWithOctave] = useState();
  const [adjustedTargetNoteWithOctave, setAdjustedTargetNoteWithOctave] = useState();
  const [showNotesOnPiano, setShowNotesOnPiano] = useState(false)
  const [isRandomNote, setIsRandomNote] = useState()

  const [initialTime, setInitialTime] = useState()
  
  const [isRightAnswer, setIsRightAnswer] = useState()
  const [totalRightAnswers, setTotalRightAnswers] = useState(0)
  const [volume, setVolume] = useState(50)

  const { formData } = useMyContext()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(new AudioContext());
    }
  }, []);

  const intervalsPerType = {
    menor: ["Segunda Menor", "Terça Menor", "Sexta Menor", "Sétima Menor"],
    maior: ["Segunda Maior", "Terça Maior", "Sexta Maior", "Sétima Maior"],
    justo: ["Uníssono", "Quarta Justa", "Quinta Justa", "Oitava Justa"],
    tritono: ["Trítono"],
  };

  const getSelectedIntervals = () => {
    if (formData.intervalOptions) {
      const selectedIntervals = Object.keys(formData.intervalOptions).
        filter((intervalo) => formData.intervalOptions[intervalo]) //Por exemplo: [maior, menor, justo, trítono] 
       
      const intervalsToShow = []

      selectedIntervals.filter((intervalo) => {
        if (formData.intervalOptions[intervalo]) {
          intervalsPerType[intervalo].filter((item) => {
            intervalsToShow.push(item)
          })
      }})
      const order = {
        "unissono": 1, 
        "segunda menor": 2, 
        "segunda maior": 3, 
        "terca menor": 4, 
        "terca maior": 5,
        "quarta justa": 6, 
        "tritono": 7, 
        "quinta justa": 8, 
        "sexta menor": 9, 
        "sexta maior": 10,
        "setima menor": 11, 
        "setima maior": 12, 
        "oitava justa": 13
    };
  
      intervalsToShow.sort((a, b) => {
        const normalizedA = removeAccents(a);
        const normalizedB = removeAccents(b);
        return order[normalizedA] - order[normalizedB];
    });

      setButtonsToShow(intervalsToShow) 
      setSelectedIntervals(selectedIntervals)
    }
  }
  
  const preLoadAudioFiles = async () => {
    setLoadingAudioBuffers(true)
    let audioBuffers = {};
    
    let promises = fileNotes.map( async (noteName) => {
      
      let filePath = `/audio/Notas/${noteName}.wav`
      const response = await fetch(filePath)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      audioBuffers[noteName] = audioBuffer
    })

    await Promise.all(promises); // Espera todas as promessas serem resolvidas
    setLoadingAudioBuffers(false)
    return audioBuffers;
  }

  useEffect(() => {
    async function loadAudioFiles() {
      const loadedAudioBuffers = await preLoadAudioFiles();
      setAudioBuffers(loadedAudioBuffers);
    }
    if(audioContext != null) {
      loadAudioFiles()
    }
  }, [audioContext])
    
  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      router.push('../intervals/exercise-config');
    }
    setTotalRounds(formData.rounds)
    if(formData.referenceNote === "random") {
      setIsRandomNote(true)
      const randomNote = getRandomNote()
      setReferenceNote(randomNote)
    } else {
      setReferenceNote(formData.referenceNote)
    }
    getSelectedIntervals()
  }, [formData]);

  useEffect(() => {
    continueGame(referenceNote)
  }, [selectedIntervals])

  useEffect(() => {
    if (round == 1) {
      getInitialTime()
    }
    if(round > 1) {
      if (isRandomNote) {
        const randomNote = getRandomNote()
        setReferenceNote(randomNote)
        continueGame(randomNote)
      } else {
        continueGame(referenceNote)
      }
    }
  }, [round])

  const getInitialTime = () => {
    setInitialTime(Date.now())
  }  

  const continueGame = (currentReferenceNote) => {
    const randomInterval = getRandomInterval()
    
    if (randomInterval) {
      const formatedRandomInterval = removeAccents(randomInterval)
      
      setActualInterval(formatedRandomInterval)
      const targetNote = findNoteByIntervalAndStart(currentReferenceNote, formatedRandomInterval)
      setTargetNote(targetNote)
      const formatedReferenceNote = converterNota(currentReferenceNote)
      const formatedTargetNote = converterNota(targetNote)
      const [adjustedReferenceNote, adjustedTargetNote] = ajustarOitava(formatedReferenceNote, formatedTargetNote, formatedRandomInterval)
      setAdjustedReferenceNoteWithOctave(adjustedReferenceNote)
      setAdjustedTargetNoteWithOctave(adjustedTargetNote)
    } 
  }

  const getRandomNote = () => {
    const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
    const randomIndex = Math.floor(Math.random() * notes.length)
    return notes[randomIndex]
  }

  const getRandomInterval = () => {
    const randomIndex = Math.floor(Math.random() * buttonsToShow.length)
    return buttonsToShow[randomIndex]
  }

  const playNote = async (note) => {
    try {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[note]

      const gainNode = audioContext.createGain()
        gainNode.gain.value = (volume/100)
        source.connect(gainNode)
        gainNode.connect(audioContext.destination);
        
        source.onended = () => {
          source.disconnect();
        };
        const fadeOutStart = 2; // Tempo para iniciar o fade out após o início da reprodução
        const fadeOutDuration = 0.5; // Duração do fade out em segundos

        source.start();

        gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime + fadeOutStart); //define o volume atual e quando começar
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + fadeOutStart + fadeOutDuration); //primeiro parâmetro representa o volume final do fadeOut
                                                                                                            //o segundo representa quando se quer q o valor final tenha sido atingido
        source.stop(audioContext.currentTime + fadeOutStart + fadeOutDuration);
    } catch (error) {
      console.error("Error with playing audio", error);
    }
  }
  
    const reproduceActualInterval = async () => {
      if (!loadingAudioBuffers && formData.direction == "ascendente") {
        playNote(adjustedReferenceNoteWithOctave)
        setTimeout(() => {
          playNote(adjustedTargetNoteWithOctave);
          setTimeout(() => {
            if (!showContinueButton) {
              setBlockedButton(false);
            }
          }, 500)
        }, 1800);

      } else if (!loadingAudioBuffers && formData.direction == "descendente") {
        playNote(adjustedTargetNoteWithOctave)
        setTimeout(() => {
          playNote(adjustedReferenceNoteWithOctave);
          setTimeout(() => {
            if (!showContinueButton) {
              setBlockedButton(false);
            }
          }, 500)
        }, 1800);
      }
    };
  
  const checkResult = (selectedOption) => {
    if (selectedOption === 'tritono') {
      selectedOption = 'Quinta Diminuta'
    }
    setShowNotesOnPiano(true)
    setNotaReferenciaNoTeclado(referenceNote)
    setNotaAlvoNoTeclado(targetNote)

    const selectedOptionsFormated = removeAccents(selectedOption)
    const actualIntervalFormated = removeAccents(actualInterval)

    setBlockedButton(true);
    setShowCurrentRound(false); //revisar

   if (selectedOptionsFormated == actualIntervalFormated) {
    setTotalRightAnswers(prevTotalRightAnswers => prevTotalRightAnswers + 1);
      setIsRightAnswer(true) 
      optionFeedback("green");
      saveRoundsData(round, true, actualInterval, selectedOption);
      setShowContinueButton(true);
      setResultRoundsIndicator((prevArray) => [...prevArray, true])
    } else {
      setIsRightAnswer(false)
      optionFeedback("red");
      setShowContinueButton(true);
      saveRoundsData(round, false, actualInterval, selectedOption);
      setResultRoundsIndicator((prevArray) => [...prevArray, false])
    }
  };

  const optionFeedback = (messageColor) => {
    setMessageStyle({
      color: messageColor,
    });
    setShowFeedback(true);
  };

  const saveRoundsData = (round, rightAnswer, actualInterval, selectedOption) => {
    const roundResult = {
      round: round,
      rightAnswer: rightAnswer,
      actualInterval: actualInterval,
      selectedOption: selectedOption,
    };
    setRoundsResults((prevArray) => [...prevArray, roundResult]);
  };

  const handleHelp = () => {
    setVisibleHelp(!visibleHelp);
  };

  const attRound = () => {
    if (formData.round != round) {
      setRound((prevRound) => prevRound + 1);
    }
  };

  const continueToNextRound = () => {
    setShowFeedback(false)
    setShowNotesOnPiano(false)
    setShowContinueButton(false)
    setShowCurrentRound(true);
    attRound();
    if (formData.rounds === round) {
      handleFinishSession()
    }
  };

  const handleFinishSession = () => {
    const finishTime = Date.now()
    const timeInMiliseconds = finishTime - initialTime
    const timeInseconds = Math.floor(timeInMiliseconds / 1000)
    const results = {
      sessionData: {
      date: Date.now(),
      timeInSeconds: timeInseconds,
      timeInMiliseconds: timeInMiliseconds,
      totalRightAnswers: totalRightAnswers
      },
      rounds: roundsResults
    }
    setResults(results);
    setFinishedExercises(true)
  }

  useEffect(() => {
    if (finishedExercises) {
      //handleSaveData()
    }
  }, [finishedExercises])

  const handleVolumeValue = (e) => {
    setVolume(e.target.value)
  }

  return (
      <div className={styles.main}>
        <div className={styles.card}>
          {formData.rounds + 1 === round ? (
            <div>
              <SessionResults
              results={results}
              />
            </div>
          ) : (
            <>
              {/* <div className={styles.help} onClick={handleHelp}>
                <p>?</p>
              </div> */}

              <div className={styles.roundsIndicatorSizeControl}>
                <RoundsIndicator rounds={formData.rounds} results={resultsRoundsIndicator} showCurrentRound={showCurrentRound}></RoundsIndicator>
              </div>
              

              <div className={styles.reproduceIntervalAndContinue}>

                  <div className={`${styles.item} ${styles.main_item}`}>
                    <p>Reproduzir Intervalo Atual</p>
                    <div
                      className={styles.reproduceInterval}
                      onClick={reproduceActualInterval}
                    >
                      <AiTwotoneSound className={styles.reproduceIntervalIcon}/>
                    </div>
                  </div>
                  
                  <div className={styles.item}
                    onClick={() => {
                      continueToNextRound();
                    }}>
                      {showContinueButton && (
                        <GameInteractionButton>
                          Próximo
                        </GameInteractionButton>
                      )}
                  </div>
                  
                  
                  <div className={`${styles.item} ${styles.feedbackMessageDiv}`}>
                    <FeedbackMessage isRightAnswer={isRightAnswer} showFeedback={showFeedback} actualInterval={actualInterval}></FeedbackMessage>
                  </div>
                

              </div>
                
               
              {/* Menu */}

              <div className={styles.responseButtonsDiv}>
                { buttonsToShow.map((intervalToShow, index) => (
                        <button
                        className={`${styles.responseButtons} ${blockedButton ? styles.responseButtonsBlocked : ''}`}
                        key={index}
                        disabled={blockedButton}
                        onClick={() => {
                          checkResult(intervalToShow);
                        }}
                      >
                        {intervalToShow}
                      </button>
                  ))
                }
              </div>
            </>
          )}
        </div>

       {/*  {visibleHelp && <IntervalsTable />} */}
        
       <div className={styles.volumeDiv}>
            <label for="customRange1" className="form-label">Ajustar Volume</label>
            <input type="range" className="form-range" id="customRange1" value={volume} onChange={handleVolumeValue}></input>
        </div>
        
        <div className={styles.pianoDiv}>
          
          <Piano 
          notaReferencia={notaReferenciaNoTeclado} 
          notaAlvo={notaAlvoNoTeclado} 
          adjustedReferenceNoteWithOctave={adjustedReferenceNoteWithOctave} 
          adjustedTargetNoteWithOctave={adjustedTargetNoteWithOctave}
          showNotesOnPiano={showNotesOnPiano}
          volume={volume}
          audioBuffers={audioBuffers}
          />
        </div> 
        
        {loadingAudioBuffers && (
            
            <div className={styles.loadingImage}>
               <LoadingMessage message={"Carregando arquivos de áudio..."}>

               </LoadingMessage>
            </div>
          
        )}
      </div>
  );
}
