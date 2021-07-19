import { useState } from 'react';
import CardList from './CardList.component';
import styles from "../styles/GameMode.module.css"
import CardsBurner from './CardsBurner.component';
import DisplayerId from './DisplayerID.component';
import { useRouter } from "next/router";

const GameMode = ({ cards, gameId, exchanged }
) => {
    const router = useRouter();
    const [cardsToBurn, setCardsToBurn] = useState([]);
    const handleBurnCards = () => {
        fetch("/api/exchangeCards", {
            body: JSON.stringify({ cardsToBurn, gameId }),
            method: 'POST'
        }).then(() => {
            router.replace(router.asPath);
        })
    }

    const handleDiscard = (i) => {
        const index = cardsToBurn.indexOf(i)
        if (index === -1) {
            setCardsToBurn([...cardsToBurn, i])
        } else {
            cardsToBurn.splice(index, 1)
            setCardsToBurn(cardsToBurn)
        }
    }

    return (
        exchanged ?
            <div className={styles.gameModeWrapper} >
                <div className={styles.waitingModeTitle}>Your Hand:</div>
                <CardList yourHandView={exchanged} handleDiscard={handleDiscard} cards={cards} />
                <div className={styles.waitingModeText}>Waiting for other players to exchange their cards...</div>
            </div>
            :
            <div className={styles.gameModeWrapper}>
                <div className={styles.gameModeContainer} >
                    <CardsBurner exchanged={exchanged} className={styles.gameModeBurner} handleBurnCards={handleBurnCards} />
                    <CardList yourHandView={exchanged} handleDiscard={handleDiscard} cards={cards} />
                </div>
                <DisplayerId gameId={gameId} />
            </div>
    )
}

export default GameMode;