import { addPlayer } from "../../src/gameStore";
import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res);
  const playerId = cookies.get("playerId");
  const gameId = req.body.gameId;

  if (!gameId) {
    return res.redirect(`/games/error`);
  }

  try {
    await addPlayer(gameId, playerId);
  } catch (e) {
    return res.redirect(`/games/error`);
  }

  return res.redirect(`/games/${gameId}`);
}
