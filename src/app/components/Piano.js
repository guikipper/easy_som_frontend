import React, { useState, useEffect } from 'react';
import styles from '../styles/Piano.module.css';

// Cria uma instância única de AudioContext para ser compartilhada por todo o componente
const audioContext = new AudioContext()


// Variável para armazenar a referência ao AudioBufferSourceNode atualmente ativo
let lastNotePlayed = null;
// Armazena a referência para a instância de AudioBufferSourceNode da última nota tocada
let lastAudioSource = null;

export default function Piano() {
  // Não é mais necessário armazenar um estado para cada instância de áudio

  const playAudio = async (note) => {
    console.log(note)
    const audioFile = `/audio/electric_piano_1-mp3/${note}.mp3`;
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    // Só interrompe se a mesma nota for tocada novamente
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


      // Atualiza a última nota tocada e a referência para o novo source
      lastNotePlayed = note;
      lastAudioSource = source;

      source.onended = () => {
        // Limpa a última nota tocada e a referência se a nota que terminou é a última tocada
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

  // Renderização do componente Piano segue aqui...
  return (
    <div className={styles.piano}>
        <div className={styles.octaves}>
            <div className={`${styles.octave4} ${styles.octave}`}>
                <div className={`${styles.white} ${styles.key} ${styles.C4}`} id="C4" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Db4}`} id="Db4" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.D4}`} id="D4" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Eb4}`} id="Eb4" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.E4}`} id="E4" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.F4}`} id="F4" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Gb4}`} id="Gb4" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.G4}`} id="G4" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Ab4}`} id="Ab4" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.A4}`} id="A4" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Bb4}`} id="Bb4" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.B4}`} id="B4" onClick={handleButtonClick}></div>
            </div>

            <div className={`${styles.octave5} ${styles.octave}`}>
                <div className={`${styles.white} ${styles.key} ${styles.C5}`} id="C5" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Db5}`} id="Db5" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.D5}`} id="D5" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Eb5}`} id="Eb5" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.E5}`} id="E5" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.F5}`} id="F5" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Gb5}`} id="Gb5" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.G5}`} id="G5" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Ab5}`} id="Ab5" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.A5}`} id="A5" onClick={handleButtonClick}></div>
                <div className={`${styles.black} ${styles.key} ${styles.Bb5}`} id="Bb5" onClick={handleButtonClick}></div>
                <div className={`${styles.white} ${styles.key} ${styles.B5}`} id="B5" onClick={handleButtonClick}></div>
            </div>
        </div>
    </div>
);
}


