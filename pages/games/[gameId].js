import Cookies from "cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { allPlayersJoined, getGame, allPlayersExchanged, isPlayerAlreadyInGame, addPlayer } from "../../src/gameStore";
import GameMode from '../components/GameMode.component';

export async function getServerSideProps(context) {
  const gameId = context.params.gameId;
  const cookies = new Cookies(context.req, context.res);
  const playerId = cookies.get("playerId");

  let gameState;

  try {
    gameState = getGame(gameId);
  } catch (err) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  if (!isPlayerAlreadyInGame(gameId, playerId)) {
    addPlayer(gameId, playerId);
  }


  if (!allPlayersJoined(gameState)) {
    return {
      redirect: {
        destination: `/games/${gameId}/pending`,
        permanent: false,
      },
    };
  }

  if (allPlayersExchanged(gameId)) {
    return {
      redirect: {
        destination: `/games/${gameId}/result`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentPlayer: gameState.players[playerId],
    },
  };
}


const Game = ({ currentPlayer: { cards, exchanged } }) => {
  const router = useRouter();
  const { gameId } = router.query;


  useEffect(() => {
    if (exchanged) {
      setTimeout(() => {
        router.replace(router.asPath);
      }, 5000);
    }

  }, [exchanged])

  return (
    <div>
      <GameMode exchanged={exchanged} gameId={gameId} cards={cards} />
    </div>
  )
};

export default Game;