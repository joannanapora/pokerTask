import fs from "fs";
import got from "got";
import { v4 as uuidv4 } from "uuid";
const Hand = require('pokersolver').Hand;

const chunk = (arr, len) => {
  const chunks = [];
  const n = arr.length;
  let i = 0;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
};

const readFromFile = () => {
  try {
    return JSON.parse(fs.readFileSync("game_store.json"));
  } catch (err) {
    return {};
  }
};

const writeToFile = (gameStore) =>
  fs.writeFileSync("game_store.json", JSON.stringify(gameStore));

const fetchNewDeck = async () => {
  const { deck_id } = await got(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5",
    { responseType: "json", resolveBodyOnly: true }
  );
  return deck_id;
};

const dealInitialCards = async (game) => {
  const { cards } = await got(
    `https://deckofcardsapi.com/api/deck/${game.deck}/draw/?count=${5 * game.numPlayers
    }`,
    { responseType: "json", resolveBodyOnly: true }
  );
  const hands = chunk(cards, 5);
  return {
    ...game,
    players: Object.keys(game.players).reduce((acc, key, index) => {
      acc[key] = { ...game.players[key], cards: hands[index] };
      return acc;
    }, {}),
  };
};

export const exchangeCards = async (gameId, playerId, discardedCardIndexes) => {
  const game = await getGame(gameId);
  const { cards: newCards } = await got(
    `https://deckofcardsapi.com/api/deck/${game.deck}/draw/?count=${discardedCardIndexes.length}`,
    { responseType: "json", resolveBodyOnly: true }
  );
  let playerHand = game.players[playerId].cards;
  discardedCardIndexes.forEach(
    (discardIndex, i) => (playerHand[discardIndex] = newCards[i])
  );
  return updateGame(gameId, {
    ...game,
    players: {
      ...game.players,
      [playerId]: { cards: playerHand, exchanged: true },
    },
  });
};

export const createNewGame = async (numPlayers, firstPlayerId) => {
  const gameId = uuidv4();
  const deck = await fetchNewDeck();
  const newGameState = {
    deck,
    numPlayers,
    players: { [firstPlayerId]: { cards: [], exchanged: false } },
  };
  updateGame(gameId, newGameState);
  return gameId;
};

export const getGame = (gameId) => {
  const games = readFromFile();
  if (!games.hasOwnProperty(gameId)) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  return games[gameId];
};

export const updateGame = (gameId, newGameState) => {
  const games = readFromFile();
  writeToFile({ ...games, [gameId]: newGameState });
  return newGameState;
};

export const allPlayersJoined = (game) =>
  Object.keys(game.players).length === game.numPlayers;

export const addPlayer = async (gameId, playerId) => {
  const game = getGame(gameId);
  if (allPlayersJoined(game)) {
    throw new Error("That game is already full");
  }
  let newGameState = {
    ...game,
    players: { ...game.players, [playerId]: { cards: [], exchanged: false } },
  };
  if (allPlayersJoined(newGameState)) {
    newGameState = await dealInitialCards(newGameState);
  }

  return updateGame(gameId, newGameState);
};

export const allPlayersExchanged = (gameId) => {
  const { players } = getGame(gameId);
  return (
    Object.keys(players).filter((pk) => players[pk].exchanged === true)
      .length === Object.keys(players).length
  );
};

export const compareHands = (gameId, playerId) => {
  const { players } = getGame(gameId);
  const playersIds = Object.keys(players);

  let allHands = [];
  let allPlayers = [];
  let currentPlayerIndex = null;

  Object.keys(players).map((id) => {
    let codesList = players[id].cards.map(el => el.code);
    allHands.push(Hand.solve(codesList));
    allPlayers.push(id)
  });
  currentPlayerIndex = allPlayers.indexOf(playerId);

  let winnerHands;

  try {
    winnerHands = Hand.winners(allHands);
  } catch (e) {
    // SOMETIMES CARDS ARE DUPLICATED
    // SINCE THERE ARE NO REQUIREMENTS AND 5 DECKS ARE USED
    // FIX IS NOT IMPLEMENTED
  }

  let winnerPlayerIndexes = [];

    winnerHands.forEach(el => {

    const index = allHands.indexOf(el)

    if (index > -1) {
      winnerPlayerIndexes = [...winnerPlayerIndexes, index]
    }
  })

  const myCards = players[playerId].cards;

  if (winnerPlayerIndexes.length > 1 && winnerPlayerIndexes.includes(currentPlayerIndex)) {
    return {
      tie: true,
      myCards
    }
  }

  if (winnerPlayerIndexes.length === 1 && winnerPlayerIndexes.includes(currentPlayerIndex)) {
    return {
      win: true,
      myCards
    }
  } else {
    const winnerCards = players[playersIds[winnerPlayerIndexes[0]]].cards;
    return {
      win: false,
      winnerCards: winnerCards,
      myCards
    }
  }
};


export const isPlayerAlreadyInGame = (gameId, playerId) => {
  const { players } = getGame(gameId);
  return (
    Object.keys(players).find((pk) => pk === playerId)
  )
};

