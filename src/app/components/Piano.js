'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/Piano.module.css';

export default function Piano({notaReferencia, notaAlvo, adjustedReferenceNoteWithOctave, adjustedTargetNoteWithOctave, showNotesOnPiano, volume, audioBuffers}) {

  const [audioContext, setAudioContext] = useState(null);
  const [currentGainNode, setCurrentGainNode] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new AudioContext());
    }
  }, []);

  let lastNotePlayed = null;
  let lastAudioSource = null;


  useEffect(() => {
    if (currentGainNode) {
        currentGainNode.gain.value = volume / 100;
    }
}, [volume, currentGainNode]);

  const playAudio = async (note) => {
    try {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[note];

      const gainNode = audioContext.createGain()
      gainNode.gain.value = (volume/100)
      
      source.connect(gainNode)
      gainNode.connect(audioContext.destination);
      setCurrentGainNode(gainNode);
      source.onended = () => {
        source.disconnect();
      };
      const fadeOutStart = 1.7; 
      const fadeOutDuration = 0.4; 

      source.start();

      gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime + fadeOutStart); //define o volume atual e quando começar
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + fadeOutStart + fadeOutDuration); //primeiro parâmetro representa o volume final do fadeOut
                                                                                                          //o segundo representa quando se quer q o valor final tenha sido atingido
      source.stop(audioContext.currentTime + fadeOutStart + fadeOutDuration);

    } catch (error) {
      console.error("Error with playing audio", error);
    }
  };

  const handleButtonClick = (event) => {
    const note = event.target.id;
    playAudio(note);
  };

  const notesOctaveThree = [
    'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3'
  ]
  const notesOctaveFour = [
    'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'
  ]
  const notesOctaveFive = [
    'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5'
  ]
  const notesOctaveSix = [
    'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6'
  ]

  return (
    <div className={styles.piano}>
        <div className={styles.octaves}>
        
            <div className={`${styles.octave3} ${styles.octave}`}>
              {notesOctaveThree.map((note) => (
                <div
                  key={note}
                  id={note}
                  className={`${note.includes('b') ? styles.black : styles.white} ${styles.key} ${styles[note]}`}
                  onClick={handleButtonClick} >
                  { note === adjustedReferenceNoteWithOctave && showNotesOnPiano && (
                    <div className={styles.feeedbackNote}>
                      <p>{notaReferencia}</p>
                    </div>
                  )}

                  { note === adjustedTargetNoteWithOctave && showNotesOnPiano && (
                    <div className={styles.feeedbackNote}>
                      <p>{notaAlvo}</p>
                  </div>
                  )}
                  
                </div>
                ))}
            </div>

            <div className={`${styles.octave4} ${styles.octave}`}>
              {notesOctaveFour.map((note) => (
                <div
                  key={note}
                  id={note}
                  className={`${note.includes('b') ? styles.black : styles.white} ${styles.key} ${styles[note]}`}
                  onClick={handleButtonClick} >
                  { note === adjustedReferenceNoteWithOctave && showNotesOnPiano && (
                    <div className={styles.feeedbackNote}>
                      <p>{notaReferencia}</p>
                    </div>
                  )}

                  { note === adjustedTargetNoteWithOctave && showNotesOnPiano && (
                    <div className={styles.feeedbackNote}>
                      <p>{notaAlvo}</p>
                  </div>
                  )}
                  
                </div>
                ))}
            </div>

            <div className={`${styles.octave5} ${styles.octave}`}>
              {notesOctaveFive.map((note) => (
                  <div
                    key={note}
                    id={note}
                    className={`${note.includes('b') ? styles.black : styles.white} ${styles.key} ${styles[note]}`}
                    onClick={handleButtonClick} >
                    { note === adjustedReferenceNoteWithOctave && showNotesOnPiano && (
                      <div className={styles.feeedbackNote}>
                        <p>{notaReferencia}</p>
                      </div>
                  )}

                  { note === adjustedTargetNoteWithOctave && showNotesOnPiano && (
                      <div className={styles.feeedbackNote}>
                        <p>{notaAlvo}</p>
                      </div>
                  )}
    
                  </div>
                  ))}
            </div>

            <div className={`${styles.octave6} ${styles.octave}`}>
              {notesOctaveSix.map((note) => (
                  <div
                    key={note}
                    id={note}
                    className={`${note.includes('b') ? styles.black : styles.white} ${styles.key} ${styles[note]}`}
                    onClick={handleButtonClick} >
                    { note === adjustedReferenceNoteWithOctave && showNotesOnPiano && (
                      <div className={styles.feeedbackNote}>
                        <p>{notaReferencia}</p>
                      </div>
                  )}

                  { note === adjustedTargetNoteWithOctave && showNotesOnPiano && (
                      <div className={styles.feeedbackNote}>
                        <p>{notaAlvo}</p>
                      </div>
                  )}
    
                  </div>
                  ))}
            </div>

        </div>
    </div>
);
}


