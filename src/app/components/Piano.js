'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/Piano.module.css';
import { converterNota } from '../utils/noteConversor';


export default function Piano({notaReferencia, notaAlvo, adjustedReferenceNoteWithOctave, adjustedTargetNoteWithOctave, showNotesOnPiano}) {

  const [audioContext, setAudioContext] = useState(null);

  //console.log("Onde vai ser tocado referencia: ", adjustedReferenceNoteWithOctave)
  //console.log("Onde vai ser tocado alvo: ", adjustedTargetNoteWithOctave)
  //console.log("A nota de referencia a ser exibida: ", notaReferencia)
  //console.log("A nota alvo a ser exibida: ", notaAlvo)
//
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new AudioContext());
    }
  }, []);

  let lastNotePlayed = null;
  let lastAudioSource = null;

  const playAudio = async (note) => {
    console.log(note)
    const audioFile = `/audio/electric_piano_1-mp3/${note}.mp3`;
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    if (note === lastNotePlayed && lastAudioSource) {
      lastAudioSource.stop();
    }

    try {
      const response = await fetch(audioFile);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      lastNotePlayed = note;
      lastAudioSource = source;
      source.onended = () => {
        if (note === lastNotePlayed) {
          lastNotePlayed = null;
          lastAudioSource = null;
        }
      };
    } catch (e) {
      console.error("Error with playing audio", e);
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

        </div>
    </div>
);
}


