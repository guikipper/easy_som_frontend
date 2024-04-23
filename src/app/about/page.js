import Image from 'next/image'
import styles from '../styles/About.module.css'

export default function About() {
    return (
        <div className={styles.about}>

            <div className={styles.divText}>
                <h1>Por baixo dos panos</h1>
                <p className={styles.text}>
                Bem-vindo ao Easy Som! Sou Guilherme Kipper, o desenvolvedor por trás deste projeto. 
                Aqui você encontra uma maneira simples e direta de treinar sua percepção auditiva. 
                Com uma abordagem descomplicada, o Easy Som torna o aprendizado musical uma experiência intuitiva. 
                Pratique e avance nos estudos de intervalos musicais, por meio de exercícios de treinamento de ouvido, armazene os dados e 
                compare a sua capacidade de percepção auditiva com o passar do tempo. O Easy Som é um projeto que está em construção, 
                ainda modesto, entretanto, se propõe a entregar com excelência a proposta atual.
                O projeto também consiste em uma demonstração prática de tecnologia, refletindo meu aprendizado e aprimoramento contínuo. 
                Me formei em Técnico de Informática pelo IFsul de Venâncio Aires e atualmente estou cursando Análise e Desenvolvimento de Sistemas na Univates. 
                Em busca de desafios e aprendizados, estou agora procurando minha primeira oportunidade como desenvolvedor, ansioso para aplicar 
                minhas habilidades em um ambiente prático.
                </p>
            </div>

            <div className={styles.divPhoto}>
              <Image
              src="/images/gui-guitar.jpg"
              alt="Guilherme Kipper"
              fill
              style={{ objectFit: 'cover', borderRadius: '10px'}}
          />
            </div>
          
        </div>
    )
}