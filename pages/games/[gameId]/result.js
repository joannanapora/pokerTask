import styles from "../../styles/Result.module.css";
import Cookies from "cookies";
import CardList from "../../components/CardList.component";
import Confetti from 'react-confetti'
import { compareHands } from '../../../src/gameStore';

export async function getServerSideProps(context) {
    const gameId = context.params.gameId;
    const cookies = new Cookies(context.req, context.res);
    const playerId = cookies.get("playerId");
    const results = compareHands(gameId, playerId);

    return {
        props: {
            ...results
        },
    };
}

const Result = ({ win, tie, myCards, winnerCards }) => {

    if (tie) {
        return (
            <div>
                <h2 className={styles.verdict} >TIE!</h2>
                <h2 className={styles.verdict} >Winning cards:</h2>
                <div className={styles.resultContainer}>
                    <CardList yourHandView={true} cards={myCards} />
                </div>
            </div>
        );
    }

    if (win) {
        return (
            <div>
                <Confetti
                    width='5000px'
                    height='5000px'
                />
                <h2 className={styles.verdict}  >You Win!</h2>
                <div className={styles.resultContainer}>
                    <CardList yourHandView={true} cards={myCards} />
                </div >
            </div>
        )
    }

    return (
        <div>
            <h2 className={styles.verdict}  >You Lost!</h2>
            <div className={styles.resultContainer}>
                <CardList yourHandView={true} cards={myCards} />
            </div >
            <h2 className={styles.verdict}  >Winning cards:</h2>
            <div className={styles.resultContainer}>
                <CardList yourHandView={true} cards={winnerCards} />
            </div>
        </div>
    )

};

export default Result;
