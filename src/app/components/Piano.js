'use client'

import React from 'react';
import styles from '../styles/Piano.module.css';

export default function Piano({setAudioInstance, setIsPlaying, audioInstance, isPlaying}) {

    const reproduceNote = (note) => {
        stopAudio()
        const audioFile = `/audio/electric_piano_1-mp3/${note}.mp3`;
        playAudio(audioFile)
      };

    const playAudio = (audioFile) => {
        const audio = new Audio(audioFile);
        audio.addEventListener('ended',() => {
            setIsPlaying(false)
        })
        audio.play();
        setIsPlaying(true)
        setAudioInstance(audio)
    }

    const stopAudio = () => {
        if (isPlaying && audioInstance) {
            audioInstance.pause();
            audioInstance.currentTime = 0;
            setIsPlaying(false)
        }
    }

    const handleButtonClick = (event) => {
        reproduceNote(event.target.id)
        console.log("Entrou, segue Id: ", event.target.id)
    }

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
