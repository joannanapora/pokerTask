import React from 'react';
import styles from '../styles/SingleCard.module.css'

const SingleCard = ({ cardImage, cardCode, handleDiscard, yourHandView }) => {

  return (
    yourHandView ?
      <div className={styles.card} >
        <img className={styles.cardImage} alt='' src={cardImage} />
      </div>
      :
      <div className={styles.card} >
        <img className={styles.cardImage} alt='' src={cardImage} />
        <div className={styles.discardbox}>
          <input onClick={() => handleDiscard(cardCode)} type='checkbox' className={styles.checkbox} ></input>
          <p style={{ fontSize: '1rem' }}>Discard</p>
        </div>
      </div>
  )
}

export default SingleCard;