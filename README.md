# Labs Frontend Exercise

Hello, if you've been sent this link then we would like to better understand how you work, to do this we'd like you to undertake a small assignment.

At the Labs team, we mainly use node backend services and React SPAs on the frontend. This assignment has been created to help us assess your proficiencies across these areas.

The task is to complete the functionality required to play an online game of 5 Card Draw Poker. The game is part way complete, and the tasks outlined below should allow it to be played by multiple players.

It should only take a few hours and there's no deadline. You won't be judged on the completion time, so there's no rush, just let us know once it's completed.

We'd like to see how you write code so try to keep it simple, but don't be afraid to add any features you think are missing or would be helpful. Please send us a link to your github repository once the task is complete.

We're looking forward to seeing what you produce! Thanks for your time.

## Project Setup

- Fork the exercise repo in github into your own github account, and then checkout a local copy.
- Run `npm install` to grab the dependencies.
- `npm run dev` will start the server, and you can view the WIP at http://localhost:3000

To test the game (as two players) you will need to open two browser windows (one in incognito mode) as it uses cookies to identify each player. Then you should be able to play against yourself.

## Exercise Tasks

The game is [5 Card drawer poker](https://en.wikipedia.org/wiki/Five-card_draw). Each player receives 5 cards, they are then able to select one or more of those cards to discard, and then these cards are replaced with new ones. Once every player has exchanged their cards then the player with the best poker hand wins.

We are using the [http://deckofcardsapi.com/]() to create a shuffled deck of cards, and then request cards from that deck which are then assigned to each player.

### Part 1

_Existing functionality_: You can create a new game, or join an existing game, and the server requires all players to have joined before proceeding to deal out each players first 5 cards.

_To do:_ Once a game has started, the react component at `/pages/games/[gameId].js` will receive a `cards` prop with the following structure that represents the current players 5 card hand. 
```
[
  {
    "images": {
      "svg": "https://deckofcardsapi.com/static/img/4H.svg",
      "png": "https://deckofcardsapi.com/static/img/4H.png"
    },
    "code": "4H",
    "value": "4",
    "suit": "HEARTS",
    "image": "https://deckofcardsapi.com/static/img/4H.png"
  },
  {
    "images": {
      "svg": "https://deckofcardsapi.com/static/img/9D.svg",
      "png": "https://deckofcardsapi.com/static/img/9D.png"
    },
    "code": "9D",
    "value": "9",
    "suit": "DIAMONDS",
    "image": "https://deckofcardsapi.com/static/img/9D.png"
  },
  ...
]
```

Render the cards passed to this component on the page, matching the layout of the designs below:

![Layout](https://imgur.com/t4e0HRo.png) ![Layout](https://imgur.com/GFJ2wMY.png)

### Part 2

When the cards you want to discard are selected, clicking the "Burn selected cards" button should post the form with the selected discarded card indexes to `/api/exchangeCards`. Setup this API route (in `./pages/api/exchangeCards.js`) and from there call the `exchangeCards` function in `lib/gameStore.js`. This will fetch the new cards you need and replace the ones you had selected to discard. Return the user to the game view so they can view their new cards, and disable the "Burn" button now they have finished exchanging (should render as below)

![](https://i.imgur.com/k07LPkc.png)

### Part 3

You'll need to work out how to check for when all players have exchanged their cards. At this point you should redirect every player to a result page like below.  You will need to integrate an existing library to work out which player has the winning hand. On the results page display the current users hand and the winning hand.

![](https://i.imgur.com/Y2awNiQ.png)