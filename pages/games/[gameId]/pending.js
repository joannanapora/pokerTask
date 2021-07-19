import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Pending.module.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Pending = () => {
  const router = useRouter();
  const { gameId } = router.query;
  const [coppied, setCopy] = useState(false);

  useEffect(() => {
    setTimeout(() => (document.location = `/games/${gameId}`), 5000);
  }, []);

  return (
    <div>
      <h3>Waiting for other players to join...</h3>
      <p>
        Share the game ID <b>{gameId}</b> with the other players so they can join this
        game.
      </p>
      <h2>Share the link to invite the opponent</h2>
      <CopyToClipboard text={`localhost:3000/games/${gameId}`}
        onCopy={() => setCopy(true)}>
        <button className={styles.copyButton} >Copy Link to clipboard</button>
      </CopyToClipboard>
      {coppied && <div className={styles.copyConfirm}>Copy Success!</div>}
    </div>
  );
};

export default Pending;
