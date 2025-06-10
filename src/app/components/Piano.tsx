'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/Piano.module.css';

interface AudioBuffers {
  [key: string]: AudioBuffer;
}

interface PianoProps {
  notaReferencia: string;
  notaAlvo: string;
  adjustedReferenceNoteWithOctave: string;
  adjustedTargetNoteWithOctave: string;
  showNotesOnPiano: boolean;
  volume: number;
  audioBuffers: AudioBuffers;
}

const Piano: React.FC<PianoProps> = ({
  notaReferencia,
  notaAlvo,
  adjustedReferenceNoteWithOctave,
  adjustedTargetNoteWithOctave,
  showNotesOnPiano,
  volume,
  audioBuffers
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [currentGainNode, setCurrentGainNode] = useState<GainNode | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new AudioContext());
    }
  }, []);

  useEffect(() => {
    if (currentGainNode) {
      currentGainNode.gain.value = volume / 100;
    }
  }, [volume, currentGainNode]);

  const playAudio = async (note: string): Promise<void> => {
    try {
      if (!audioContext) return;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[note];

      const gainNode = audioContext.createGain();
      gainNode.gain.value = (volume/100);
      
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      setCurrentGainNode(gainNode);
      
      source.onended = () => {
        source.disconnect();
      };
      
      const fadeOutStart = 1.7; 
      const fadeOutDuration = 0.4; 

      source.start();

      gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime + fadeOutStart);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + fadeOutStart + fadeOutDuration);
      source.stop(audioContext.currentTime + fadeOutStart + fadeOutDuration);

    } catch (error) {
      console.error("Error with playing audio", error);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const note = event.currentTarget.id;
    playAudio(note);
  };

  const notesOctaveThree = [
    'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3'
  ];
  const notesOctaveFour = [
    'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'
  ];
  const notesOctaveFive = [
    'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5'
  ];
  const notesOctaveSix = [
    'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6'
  ];

  const renderOctave = (notes: string[], octaveNumber: number) => (
    <div className={`${styles[`octave${octaveNumber}`]} ${styles.octave}`}>
      {notes.map((note) => (
        <div
          key={note}
          id={note}
          className={`${note.includes('b') ? styles.black : styles.white} ${styles.key} ${styles[note]}`}
          onClick={handleButtonClick}
        >
          {note === adjustedReferenceNoteWithOctave && showNotesOnPiano && (
            <div className={styles.feeedbackNote}>
              <p>{notaReferencia}</p>
            </div>
          )}

          {note === adjustedTargetNoteWithOctave && showNotesOnPiano && (
            <div className={styles.feeedbackNote}>
              <p>{notaAlvo}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.piano}>
      <div className={styles.octaves}>
        {renderOctave(notesOctaveThree, 3)}
        {renderOctave(notesOctaveFour, 4)}
        {renderOctave(notesOctaveFive, 5)}
        {renderOctave(notesOctaveSix, 6)}
      </div>
    </div>
  );
};

export default Piano; 