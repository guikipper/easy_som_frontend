"use client";

import styles from "../styles/ExerciseConfig.module.css";
import { useMyContext } from "../contexts/UseContext";
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function ExerciseConfig() {

  const router = useRouter();
  const [direction, setDirection] = useState("ascendente");
  const [referenceNote, setReferenceNote] = useState('random');
  const [rounds, setRounds] = useState(0)
  const [dropdownItem, setDropdownItem] = useState("Aleatório")
  const [switchValue, setSwitchValue] = useState(false) 
  const [roundsMessage, setRoundsMessage] = useState(false)
  const [intervalOptions, setIntervalOptions] = useState({
    maior: false,
    menor: false,
    justo: false,
    aumentado: false,
  });
  const [intervalOptionsMessage, setIntervalOptionsMessage] = useState(false)
  
  const { setFormData } = useMyContext()

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue)
  }

  const handleDropdownItemSelected = (item) => {
    if (item == 'random') {
      setDropdownItem('Aleatório')
      setReferenceNote(item)
    } else {
      switch(item) {
        case 0:
          setDropdownItem('C')
          break;
        case 1:
          setDropdownItem('Db')
          break;
        case 2:
          setDropdownItem('D')
          break;
        case 3:
          setDropdownItem('Eb')
          break;
        case 4:
          setDropdownItem('E')
          break;
        case 5:
          setDropdownItem('F')
          break;
        case 6:
          setDropdownItem('Gb')
          break;
        case 7:
          setDropdownItem('G')
          break;
        case 8:
          setDropdownItem('Ab')
          break;
        case 9:
          setDropdownItem('A')
          break;
        case 10:
          setDropdownItem('Bb')
          break;
        case 11:
          setDropdownItem('B')
          break;
      }
      
      setReferenceNote(item)
    }

  }

  const handleOptionChange = (event) => {
    setDirection(event.target.value);
  };

  const incrementCont = (qtd) => {
    setRounds((prevRound) => prevRound + qtd )
  }

  const decrementCont = (qtd) => {
    if (rounds != 0) {
      setRounds((prevRound) => prevRound - qtd )
    }
  }

  const hasSelectedInterval = () => {
    const { maior, menor, justo, aumentado } = intervalOptions
    return maior || menor || justo || aumentado
  }
  

  const sendParams = () => {
    if (rounds <= 0 || !hasSelectedInterval()) {
      if (rounds <= 0) {
        setRoundsMessage(true)
        setTimeout(()=>{
          setRoundsMessage(false)
        }, 3000)
      }
      if (!hasSelectedInterval()) {
        setIntervalOptionsMessage(true)
        setTimeout(()=>{
          setIntervalOptionsMessage(false)
        }, 3000)
      }      
    } else {
      setFormData({
        referenceNote: referenceNote,
        direction: direction,
        intervalOptions,
        switchValue,
        rounds: rounds,
      });
      router.push('/intervals/exercise');
    }
  }

  return (
    <div className={styles.config}>
      <div className={styles.column}>
        <div className={styles.dropOp}>
          <p>Selecione a nota de referência:</p>

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
              <li>
                <a className="dropdown-item" onClick={ () => {
                  handleDropdownItemSelected('random')
                  }}>
                  Aleatório
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('C')
                  handleDropdownItemSelected(0)
                  }}>
                  C
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('Db')
                  handleDropdownItemSelected(1)
                  }}>
                  Db
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('D')
                  handleDropdownItemSelected(2)
                  }}>
                  D
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('Eb')
                  handleDropdownItemSelected(3)
                  }}>
                  Eb
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('E')
                  handleDropdownItemSelected(4)
                  }}>
                  E
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('F')
                  handleDropdownItemSelected(5)
                  }}>
                  F
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('Gb')
                  handleDropdownItemSelected(6)
                  }}>
                  Gb
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('G')
                  handleDropdownItemSelected(7)
                  }}>
                  G
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('Ab')
                  handleDropdownItemSelected(8)
                  }}>
                  Ab
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('A')
                  handleDropdownItemSelected(9)
                  }}>
                  A
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('Bb')
                  handleDropdownItemSelected(10)
                  }}>
                  Bb
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={ () => {
                  //handleDropdownItemSelected('B')
                  handleDropdownItemSelected(11)
                  }}>
                  B
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.direction}>
          <p>Escolha a direção dos intervalos:</p>
          <form>
            <label>
              <input
                type="radio"
                name="ascendente"
                value="ascendente"
                checked={direction === "ascendente"}
                onChange={handleOptionChange}
              />
              Ascendente
            </label>

            <label>
              <input
                type="radio"
                name="descendente"
                value="descendente"
                checked={direction === "descendente"}
                onChange={handleOptionChange}
              />
              Descendente
            </label>
          </form>
        </div>

        <div className={styles.intervalOptions}>
          <p>Selecione os invervalos que você deseja treinar:</p>
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
                name="maior"
                value="maior"
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
                checked={intervalOptions.aumentada}
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
                name="aumentado"
                value="aumentado"
                checked={intervalOptions.aumentado}
                onChange={() =>
                  setIntervalOptions({
                    ...intervalOptions,
                    aumentado: !intervalOptions.aumentado,
                  })
                }
              />
              Aumentado
            </label>
          </div>
          {intervalOptionsMessage && (
            <p className={styles.intervalOptionsMessage}>Informe ao menos um intervalo.</p>
          )}
          
        </div>

        <div className={styles.tryAgain}>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={switchValue}
              onChange={handleSwitchChange}
            />

            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Tentar de novo ao errar
            </label>
          </div>
        </div>

        <div className={styles.roundQtd}>
          <p>Informe quantas rodadas você gostaria de praticar:</p>
          <p>Rodadas: {rounds}</p>
          <div className={styles.roundQtdBtn}>
            
            <button type="button" className="btn btn-danger"
            disabled={rounds <= 0}
            onClick={() => {decrementCont(1)}}>
              -1
            </button>
            <button type="button" className="btn btn-danger"
            disabled={rounds <= 4}
            onClick={() => {
              if(rounds >= 5) {
                decrementCont(5)
              }
              }}>
              -5
            </button>
            <button type="button" className="btn btn-success" 
            onClick={() => {incrementCont(1)}}>
              +1
            </button>
            <button type="button" className="btn btn-success"
            onClick={() => {incrementCont(5)}}>
              +5
            </button>
            {roundsMessage && (
                <p className={styles.roundMessage}>Selecione um valor válido.</p>
            )}
          </div>
        </div>

        <div className={styles.confirmBtn}>
        
        <button type="button" className="btn btn-primary" onClick={sendParams}>
            Começar treino!
        </button>

        </div>
        
      </div>
    </div>
  );
}
