import styles from '../styles/CardBurner.module.css'

const CardsBurner = ({ handleBurnCards, exchanged }) => {
    return (
        <div className={styles.burner} >
            <div>
                <div className={styles.burnerTitle} >5 Card Draw</div>
                <div className={styles.burnerText} >It's like poker but easy</div></div>
            <button disabled={exchanged} onClick={handleBurnCards} className={styles.burnerButton} type='submit' >Burn selected cards</button>
        </div>
    )
}

export default CardsBurner;