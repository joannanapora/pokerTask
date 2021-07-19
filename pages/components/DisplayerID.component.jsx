import styles from '../styles/DisplayerID.module.css';

const DisplayerId = ({ gameId }) => {

    return (
        <div className={styles.displayer}>GAME ID: {gameId}</div>
    )
}

export default DisplayerId;