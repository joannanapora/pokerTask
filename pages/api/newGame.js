import { createNewGame } from "../../src/gameStore";
import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res);
  const playerId = cookies.get("playerId");

  const gameId = await createNewGame(
    parseInt(req.body.numPlayers, 10),
    playerId
  );
  return res.redirect(`/games/${gameId}`);
}
