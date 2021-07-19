import { exchangeCards } from "../../src/gameStore";
import Cookies from "cookies";

export default async function handler(req, res) {

  const cookies = new Cookies(req, res);
  const playerId = cookies.get("playerId");

  const body = JSON.parse(req.body)

  await exchangeCards(body.gameId, playerId, body.cardsToBurn)

  return res.status(200).end();
}
