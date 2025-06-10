'use client';

import React, { useState } from 'react';
import styles from '../styles/ExerciseConfig.module.css';
import { useMyContext } from '../contexts/UseContext';
import { useRouter } from 'next/navigation';
import { notes } from '../utils/notes';
import Loading from './Loading';
import LoadingMessage from './LoadingMessage';
import { Form } from 'react-bootstrap';
import { FiHelpCircle } from 'react-icons/fi';

interface IntervalOptions {
  maior: boolean;
  menor: boolean;
  justo: boolean;
  tritono: boolean;
}

interface FormData {
  referenceNote: string;
  direction: string;
  intervalOptions: IntervalOptions;
  rounds: number;
  compoundIntervals: boolean;
}

const ExerciseConfig: React.FC = () => {
  const router = useRouter();
  const [compoundIntervals, setCompoundIntervals] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>('ascendente');
  const [referenceNote, setReferenceNote] = useState<string>('random');
  const [rounds, setRounds] = useState<number>(0);
  const [dropdownItem, setDropdownItem] = useState<string>('Aleatório');
  const [roundsMessage, setRoundsMessage] = useState<boolean>(false);
  const [intervalOptions, setIntervalOptions] = useState<IntervalOptions>({
    maior: false,
    menor: false,
    justo: false,
    tritono: false,
  });
  const [intervalOptionsMessage, setIntervalOptionsMessage] = useState<boolean>(false);

  const { setFormData } = useMyContext();

  const handleDropdownItemSelected = (note: string): void => {
    if (note === 'random') {
      setDropdownItem('Aleatório');
      setReferenceNote(note);
    } else {
      setDropdownItem(note);
      setReferenceNote(note);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDirection(event.target.value);
  };

  const incrementCont = (qtd: number): void => {
    setRounds((prevRound) => prevRound + qtd);
  };

  const decrementCont = (qtd: number): void => {
    if (rounds !== 0) {
      setRounds((prevRound) => prevRound - qtd);
    }
  };

  const hasSelectedInterval = (): boolean => {
    const { maior, menor, justo } = intervalOptions;
    return maior || menor || justo;
  };

  const sendParams = (): void => {
    if (rounds <= 0 || !hasSelectedInterval()) {
      if (rounds <= 0) {
        setRoundsMessage(true);
        setTimeout(() => {
          setRoundsMessage(false);
        }, 3000);
      }
      if (!hasSelectedInterval()) {
        setIntervalOptionsMessage(true);
        setTimeout(() => {
          setIntervalOptionsMessage(false);
        }, 3000);
      }
    } else {
      setShowLoading(true);
      const formData: FormData = {
        referenceNote,
        direction,
        intervalOptions,
        rounds,
        compoundIntervals,
      };
      setFormData(formData);
      router.push('/intervals/exercise');
    }
  };

  return (
    <div className={styles.config}>
      <div className={styles.column}>
        <div className={styles.dropOp}>
          <p className={styles.text}>Selecione a nota de referência:</p>

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {dropdownItem}
            </button>
            
            <ul className={`dropdown-menu ${styles.auxiliarDropdown}`}>
              {notes.map((note, index) => {
                let displayNote = note;
                if (note === 'random') {
                  displayNote = 'Aleatório';
                }

                return (
                  <li key={index}>
                    <a 
                      className="dropdown-item" 
                      onClick={() => handleDropdownItemSelected(note)}
                      role="button"
                    >
                      {displayNote}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.direction}>
          <p className={styles.text}>Escolha a direção dos intervalos:</p>
          <form>
            <label>
              <input
                type="radio"
                name="ascendente"
                value="ascendente"
                checked={direction === 'ascendente'}
                onChange={handleOptionChange}
              />
              Ascendente
            </label>

            <label>
              <input
                type="radio"
                name="descendente"
                value="descendente"
                checked={direction === 'descendente'}
                onChange={handleOptionChange}
              />
              Descendente
            </label>
          </form>
        </div>

        <div className={styles.intervalOptions}>
          <p className={styles.text}>Selecione os invervalos que você deseja treinar:</p>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="maior"
                value="maior"
                checked={intervalOptions.maior}
                onChange={() =>
                  setIntervalOptions({
                    ...intervalOptions,
                    maior: !intervalOptions.maior,
                  })
                }
              />
              Maior
            </label>

            <label>
              <input
                type="checkbox"
                name="menor"
                value="menor"
                checked={intervalOptions.menor}
                onChange={() =>
                  setIntervalOptions({
                    ...intervalOptions,
                    menor: !intervalOptions.menor,
                  })
                }
              />
              Menor
            </label>

            <label>
              <input
                type="checkbox"
                name="justo"
                value="justo"
                checked={intervalOptions.justo}
                onChange={() =>
                  setIntervalOptions({
                    ...intervalOptions,
                    justo: !intervalOptions.justo,
                  })
                }
              />
              Justo
            </label>

            <label>
              <input
                type="checkbox"
                name="tritono"
                value="tritono"
                disabled={!intervalOptions.justo && !intervalOptions.maior && !intervalOptions.menor}
                checked={intervalOptions.tritono}
                onChange={() =>
                  setIntervalOptions({
                    ...intervalOptions,
                    tritono: !intervalOptions.tritono,
                  })
                }
              />
              Trítono
            </label>
          </div>
          <div className={styles.messageDiv}>
            {intervalOptionsMessage && (
              <p className={styles.formMessage}>Informe ao menos um intervalo.</p>
            )}
          </div>

          <Form>
            <div className={styles.intervalosCompostos}>
              <p className="mb-0 mr-2">Intervalos compostos </p>
              <FiHelpCircle
                className={styles.questionIcon}
                title="Intervalos compostos são intervalos com mais de uma oitava."
              />
            </div>
            
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={compoundIntervals}
              onChange={(e) => setCompoundIntervals(e.target.checked)}
            />
          </Form>
        </div>

        <div className={styles.roundQtd}>
          <p className={styles.text}>Informe quantas rodadas você gostaria de praticar:</p>
          <p>Rodadas: {rounds}</p>
          <div className={styles.roundQtdBtn}>
            <button 
              type="button" 
              className="btn btn-danger"
              disabled={rounds <= 0}
              onClick={() => decrementCont(1)}
            >
              -1
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              disabled={rounds <= 4}
              onClick={() => {
                if (rounds >= 5) {
                  decrementCont(5);
                }
              }}
            >
              -5
            </button>
            <button 
              type="button" 
              className="btn btn-success"
              disabled={rounds >= 30}
              onClick={() => incrementCont(1)}
            >
              +1
            </button>
            <button 
              type="button" 
              className="btn btn-success"
              disabled={rounds >= 26}
              onClick={() => incrementCont(5)}
            >
              +5
            </button>
          </div>
          <div className={styles.messageDiv}>
            {roundsMessage && (
              <p className={styles.formMessage}>Selecione um valor válido.</p>
            )}
          </div>
        </div>

        <div className={styles.confirmBtn}>
          <button type="button" className="btn btn-primary" onClick={sendParams}>
            Começar treino!
          </button>
        </div>
      </div>

      {showLoading && (
        <div className={styles.loadingImage}>
          <LoadingMessage message="Carregando..." />
        </div>
      )}
    </div>
  );
};

export default ExerciseConfig; 