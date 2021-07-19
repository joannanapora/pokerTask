import SingleCard from './SingleCard.component';
import styles from '../styles/CardList.module.css'

const CardList = ({ cards, handleDiscard, yourHandView }) => {
    return (
        <div className={yourHandView ? styles.yourHand : styles.cardList} >
            {cards.map((el, i) => {
                return (
                    <SingleCard yourHandView={yourHandView} key={i} handleDiscard={() => handleDiscard(i)} cardCode={el.code} cardImage={el.images.png} />
                )
            })}
        </div>
    )
}

export default CardList;