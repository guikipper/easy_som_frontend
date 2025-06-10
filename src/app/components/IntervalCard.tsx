'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/IntervalCard.module.css';
import { useMyContext } from '../contexts/UseContext';
import Piano from './Piano';
import { useRouter } from 'next/navigation';
import { AiTwotoneSound } from 'react-icons/ai';
import GameInteractionButton from './Buttons/GameInteractionButton';
import RoundsIndicator from './RoundsIndicator';
import { findNoteByIntervalAndStart } from '../utils/findInterval';
import { ajustarOitava, converterNota } from '../utils/noteConversor';
import { removeAccents } from '../utils/removeAccents';
import { FeedbackMessage } from './FeedbackMessage';
import SessionResults from './SessionResults';
import { fileNotes } from '../utils/notes';
import LoadingMessage from './LoadingMessage';

interface RoundResult {
  round: number;
  rightAnswer: boolean;
  actualInterval: string;
  selectedOption: string;
}

interface SessionData {
  date: number;
  timeInSeconds: number;
  timeInMiliseconds: number;
  totalRightAnswers: number;
}

interface SessionResults {
  sessionData: SessionData;
  rounds: Round[];
}

interface Round {
  interval: string;
  isCorrect: boolean;
  userAnswer?: string;
}

interface AudioBuffers {
  [key: string]: AudioBuffer;
}

interface FormData {
  rounds: number;
  referenceNote: string;
  direction: string;
  intervalOptions: {
    [key: string]: boolean;
  };
  compoundIntervals: boolean;
}

interface MessageStyle {
  color: string;
}

const IntervalCard: React.FC = () => {
  const [targetNote, setTargetNote] = useState<string>();
  const [actualInterval, setActualInterval] = useState<string>();
  const [round, setRound] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>();
  const [referenceNote, setReferenceNote] = useState<string>();
  const [selectedIntervals, setSelectedIntervals] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [messageStyle, setMessageStyle] = useState<MessageStyle>({} as MessageStyle);
  const [buttonsToShow, setButtonsToShow] = useState<string[]>([]);
  const [results, setResults] = useState<SessionResults | null>(null);
  const [roundsResults, setRoundsResults] = useState<RoundResult[]>([]);
  const [visibleHelp, setVisibleHelp] = useState<boolean>(false);
  const [showContinueButton, setShowContinueButton] = useState<boolean>(false);
  const [blockedButton, setBlockedButton] = useState<boolean>(true);
  const [resultsRoundsIndicator, setResultRoundsIndicator] = useState<boolean[]>([]);
  const [showCurrentRound, setShowCurrentRound] = useState<boolean>(true);
  const router = useRouter();
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffers, setAudioBuffers] = useState<AudioBuffers>({});
  const [loadingAudioBuffers, setLoadingAudioBuffers] = useState<boolean>(false);

  const [finishedExercises, setFinishedExercises] = useState<boolean>(false);
  const [notaReferenciaNoTeclado, setNotaReferenciaNoTeclado] = useState<string>();
  const [notaAlvoNoTeclado, setNotaAlvoNoTeclado] = useState<string>();
  const [adjustedReferenceNoteWithOctave, setAdjustedReferenceNoteWithOctave] = useState<string>();
  const [adjustedTargetNoteWithOctave, setAdjustedTargetNoteWithOctave] = useState<string>();
  const [showNotesOnPiano, setShowNotesOnPiano] = useState<boolean>(false);
  const [isRandomNote, setIsRandomNote] = useState<boolean>(false);

  const [initialTime, setInitialTime] = useState<number>();
  
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [totalRightAnswers, setTotalRightAnswers] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);

  const { formData } = useMyContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new AudioContext());
    }
  }, []);

  const intervalsPerType: { [key: string]: string[] } = {
    menor: ['Segunda Menor', 'Terça Menor', 'Sexta Menor', 'Sétima Menor', 'Nona Menor', 'Décima Menor', 'Décima Primeira Justa'],
    maior: ['Segunda Maior', 'Terça Maior', 'Sexta Maior', 'Sétima Maior', 'Nona Maior', 'Décima Maior', 'Décima Primeira Aumentada'],
    justo: ['Uníssono', 'Quarta Justa', 'Quinta Justa', 'Oitava Justa'],
    tritono: ['Trítono'],
  };

  const getSelectedIntervals = (): void => {
    if (formData?.intervalOptions) {
      const selectedIntervals = Object.keys(formData.intervalOptions)
        .filter((intervalo) => formData.intervalOptions[intervalo]);
      
      const intervalsToShow: string[] = [];

      selectedIntervals.forEach((intervalo) => {
        if (formData.intervalOptions[intervalo]) {
          intervalsPerType[intervalo].forEach((item) => {
            if (formData.compoundIntervals) {
              intervalsToShow.push(item);
            } else if (!formData.compoundIntervals && (!item.includes('Nona') && !item.includes('Décima'))) {
              intervalsToShow.push(item);
            }
          });
        }
      });

      const order: { [key: string]: number } = {
        'unissono': 1,
        'segunda menor': 2,
        'segunda maior': 3,
        'terca menor': 4,
        'terca maior': 5,
        'quarta justa': 6,
        'tritono': 7,
        'quinta justa': 8,
        'sexta menor': 9,
        'sexta maior': 10,
        'setima menor': 11,
        'setima maior': 12,
        'oitava justa': 13,
        'nona menor': 14,
        'nona maior': 15,
        'decima menor': 16,
        'decima maior': 17,
        'decima primeira justa': 18,
        'decima primeira aumentada': 19,
      };

      intervalsToShow.sort((a, b) => {
        const normalizedA = removeAccents(a.toLowerCase());
        const normalizedB = removeAccents(b.toLowerCase());
        return order[normalizedA] - order[normalizedB];
      });

      setButtonsToShow(intervalsToShow);
      setSelectedIntervals(selectedIntervals);
    }
  };

  const preLoadAudioFiles = async (): Promise<AudioBuffers> => {
    setLoadingAudioBuffers(true);
    const buffers: AudioBuffers = {};
    
    if (!audioContext) return buffers;

    const promises = fileNotes.map(async (noteName) => {
      const filePath = `/audio/Notas/${noteName}.mp3`;
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      buffers[noteName] = audioBuffer;
    });

    await Promise.all(promises);
    setLoadingAudioBuffers(false);
    return buffers;
  };

  useEffect(() => {
    async function loadAudioFiles() {
      const loadedAudioBuffers = await preLoadAudioFiles();
      setAudioBuffers(loadedAudioBuffers);
    }
    if (audioContext) {
      loadAudioFiles();
    }
  }, [audioContext]);

  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
      router.push('../intervals/exercise-config');
      return;
    }
    setTotalRounds(formData.rounds);
    if (formData.referenceNote === 'random') {
      setIsRandomNote(true);
      const randomNote = getRandomNote();
      setReferenceNote(randomNote);
    } else {
      setReferenceNote(formData.referenceNote);
    }
    getSelectedIntervals();
  }, [formData]);

  useEffect(() => {
    if (referenceNote) {
      continueGame(referenceNote);
    }
  }, [selectedIntervals]);

  useEffect(() => {
    if (round === 1) {
      getInitialTime();
    }
    if (round > 1) {
      if (isRandomNote) {
        const randomNote = getRandomNote();
        setReferenceNote(randomNote);
        continueGame(randomNote);
      } else if (referenceNote) {
        continueGame(referenceNote);
      }
    }
  }, [round]);

  const getInitialTime = (): void => {
    setInitialTime(Date.now());
  };

  const continueGame = (currentReferenceNote: string): void => {
    const randomInterval = getRandomInterval();
    
    if (randomInterval) {
      const formatedRandomInterval = removeAccents(randomInterval);
      setActualInterval(formatedRandomInterval);
      const targetNote = findNoteByIntervalAndStart(currentReferenceNote, formatedRandomInterval);
      if (typeof targetNote === 'string') {
        setTargetNote(targetNote);
        const formatedReferenceNote = converterNota(currentReferenceNote);
        const formatedTargetNote = converterNota(targetNote);
        if (formatedReferenceNote && formatedTargetNote) {
          const [adjustedReferenceNote, adjustedTargetNote] = ajustarOitava(formatedReferenceNote, formatedTargetNote, formatedRandomInterval);
          setAdjustedReferenceNoteWithOctave(adjustedReferenceNote);
          setAdjustedTargetNoteWithOctave(adjustedTargetNote);
        }
      }
    }
  };

  const getRandomNote = (): string => {
    const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    const randomIndex = Math.floor(Math.random() * notes.length);
    return notes[randomIndex];
  };

  const getRandomInterval = (): string => {
    const randomIndex = Math.floor(Math.random() * buttonsToShow.length);
    return buttonsToShow[randomIndex];
  };

  const playNote = async (note: string): Promise<void> => {
    try {
      if (!audioContext) return;

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[note];

      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume / 100;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.onended = () => {
        source.disconnect();
      };

      const fadeOutStart = 2;
      const fadeOutDuration = 0.5;

      source.start();

      gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime + fadeOutStart);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + fadeOutStart + fadeOutDuration);
      source.stop(audioContext.currentTime + fadeOutStart + fadeOutDuration);
    } catch (error) {
      console.error('Error with playing audio', error);
    }
  };

  const reproduceActualInterval = async (): Promise<void> => {
    if (!loadingAudioBuffers && formData?.direction === 'ascendente' && adjustedReferenceNoteWithOctave && adjustedTargetNoteWithOctave) {
      playNote(adjustedReferenceNoteWithOctave);
      setTimeout(() => {
        playNote(adjustedTargetNoteWithOctave);
        setTimeout(() => {
          if (!showContinueButton) {
            setBlockedButton(false);
          }
        }, 500);
      }, 1800);
    } else if (!loadingAudioBuffers && formData?.direction === 'descendente' && adjustedReferenceNoteWithOctave && adjustedTargetNoteWithOctave) {
      playNote(adjustedTargetNoteWithOctave);
      setTimeout(() => {
        playNote(adjustedReferenceNoteWithOctave);
        setTimeout(() => {
          if (!showContinueButton) {
            setBlockedButton(false);
          }
        }, 500);
      }, 1800);
    }
  };

  const checkResult = (selectedOption: string): void => {
    if (selectedOption === 'tritono') {
      selectedOption = 'Quinta Diminuta';
    }
    setShowNotesOnPiano(true);
    if (referenceNote) setNotaReferenciaNoTeclado(referenceNote);
    if (targetNote) setNotaAlvoNoTeclado(targetNote);

    const selectedOptionsFormated = removeAccents(selectedOption);
    const actualIntervalFormated = actualInterval ? removeAccents(actualInterval) : '';

    setBlockedButton(true);
    setShowCurrentRound(false);

    if (selectedOptionsFormated === actualIntervalFormated) {
      setTotalRightAnswers((prev) => prev + 1);
      setIsRightAnswer(true);
      optionFeedback('green');
      saveRoundsData(round, true, actualInterval || '', selectedOption);
      setShowContinueButton(true);
      setResultRoundsIndicator((prev) => [...prev, true]);
    } else {
      setIsRightAnswer(false);
      optionFeedback('red');
      setShowContinueButton(true);
      saveRoundsData(round, false, actualInterval || '', selectedOption);
      setResultRoundsIndicator((prev) => [...prev, false]);
    }
  };

  const optionFeedback = (messageColor: string): void => {
    setMessageStyle({
      color: messageColor,
    });
    setShowFeedback(true);
  };

  const saveRoundsData = (round: number, rightAnswer: boolean, actualInterval: string, selectedOption: string): void => {
    const roundResult: RoundResult = {
      round,
      rightAnswer,
      actualInterval,
      selectedOption,
    };
    setRoundsResults((prev) => [...prev, roundResult]);
  };

  const handleHelp = (): void => {
    setVisibleHelp(!visibleHelp);
  };

  const attRound = (): void => {
    if (formData?.rounds !== round) {
      setRound((prev) => prev + 1);
    }
  };

  const continueToNextRound = (): void => {
    setShowFeedback(false);
    setShowNotesOnPiano(false);
    setShowContinueButton(false);
    setShowCurrentRound(true);
    attRound();
    if (formData?.rounds === round) {
      handleFinishSession();
    }
  };

  const handleFinishSession = (): void => {
    const finishTime = Date.now();
    const timeInMiliseconds = initialTime ? finishTime - initialTime : 0;
    const timeInseconds = Math.floor(timeInMiliseconds / 1000);
    
    const rounds: Round[] = roundsResults.map(result => ({
      interval: result.actualInterval,
      isCorrect: result.rightAnswer,
      userAnswer: result.selectedOption
    }));

    const results: SessionResults = {
      sessionData: {
        date: Date.now(),
        timeInSeconds: timeInseconds,
        timeInMiliseconds: timeInMiliseconds,
        totalRightAnswers: totalRightAnswers,
      },
      rounds
    };
    setResults(results);
    setFinishedExercises(true);
  };

  useEffect(() => {
    if (finishedExercises) {
      // handleSaveData()
    }
  }, [finishedExercises]);

  const handleVolumeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        {finishedExercises ? (
          <div>
            {results && <SessionResults results={results} />}
          </div>
        ) : (
          <>
            <div className={styles.roundsIndicatorSizeControl}>
              {formData && (
                <RoundsIndicator
                  rounds={formData.rounds}
                  results={resultsRoundsIndicator}
                  showCurrentRound={showCurrentRound}
                />
              )}
            </div>

            <div className={styles.reproduceIntervalAndContinue}>
              <div className={`${styles.item} ${styles.main_item}`}>
                <p>Reproduzir Intervalo Atual</p>
                <div className={styles.reproduceInterval} onClick={reproduceActualInterval}>
                  <AiTwotoneSound className={styles.reproduceIntervalIcon} />
                </div>
              </div>

              <div className={styles.item} onClick={continueToNextRound}>
                {showContinueButton && <GameInteractionButton>Próximo</GameInteractionButton>}
              </div>

              <div className={`${styles.item} ${styles.feedbackMessageDiv}`}>
                {actualInterval && (
                  <FeedbackMessage
                    isRightAnswer={isRightAnswer}
                    showFeedback={showFeedback}
                    actualInterval={actualInterval}
                  />
                )}
              </div>
            </div>

            <div className={styles.responseButtonsDiv}>
              {buttonsToShow.map((intervalToShow, index) => (
                <button
                  className={`${styles.responseButtons} ${blockedButton ? styles.responseButtonsBlocked : ''}`}
                  key={index}
                  disabled={blockedButton}
                  onClick={() => checkResult(intervalToShow)}
                >
                  {intervalToShow}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.volumeDiv}>
        <label htmlFor="customRange1" className="form-label">
          Ajustar Volume
        </label>
        <input
          type="range"
          className="form-range"
          id="customRange1"
          value={volume}
          onChange={handleVolumeValue}
        />
      </div>

      <div className={styles.pianoDiv}>
        <Piano
          notaReferencia={notaReferenciaNoTeclado || ''}
          notaAlvo={notaAlvoNoTeclado || ''}
          adjustedReferenceNoteWithOctave={adjustedReferenceNoteWithOctave || ''}
          adjustedTargetNoteWithOctave={adjustedTargetNoteWithOctave || ''}
          showNotesOnPiano={showNotesOnPiano}
          volume={volume}
          audioBuffers={audioBuffers}
        />
      </div>

      {loadingAudioBuffers && (
        <div className={styles.loadingImage}>
          <LoadingMessage message="Carregando arquivos de áudio..." />
        </div>
      )}
    </div>
  );
};

export default IntervalCard; 