//declarations etc
import readlineSync from "readline-sync";

let highScore = 0;

const suits = ["♠", "♥", "♦", "♣"];

const faceCards = ["J", "Q", "K"];

const playerHand = [];
const dealerHand = [];

let playerTotal = 0;
let dealerTotal = 0;
let playerMoney = 1000;
let bet = 0;

//functions

function createDeck() {
  let deck = [];
  for (const suit of suits) {
    for (let i = 2; i < 12; i++) {
      if (i === 10) {
        for (let face of faceCards) {
          let card = {};
          card.suit = suit;
          card.value = 10;
          card.face = face;
          deck.push(card);
        }
      }
      let card = {};

      card.suit = suit;
      card.value = i;
      card.face = i.toString();
      if (i === 11) {
        card.altValue = 1;
        card.face = "A";
      }
      deck.push(card);
    }
  }

  return deck;
}

function getAscii(card) {
  let facePlus = card.face;
  if (card.face !== "10") {
    facePlus = card.face + " ";
  }
  return `
 _________ 
| ${facePlus}      |
|         |
|         |
|    ${card.suit}    |
|         |
|       ${facePlus}|
|_________|`;
}

function displayCards(cards) {
  const cardRows = [[], [], [], [], [], [], [], [], []];
  cards.forEach((card) => {
    const ascii = getAscii(card).split("\n");
    for (let i = 0; i < ascii.length; i++) {
      cardRows[i].push(ascii[i]);
    }
  });
  cardRows.forEach((row) => {
    console.log(row.join("   "));
  });
}

function shuffleDeck() {
  const tempDeck = [...deck];
  const shuffledDeck = [];
  while (tempDeck.length > 0) {
    let randIndex = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck[randIndex]);
    tempDeck.splice(randIndex, 1);
  }
  return shuffledDeck;
}

function dealCards(hand, amount) {
  let currHand = [];
  for (let i = 0; i < amount; i++) {
    currHand.push(deck.pop());
  }
  hand.push(currHand);
}

function wins() {
  playerMoney += bet * 2;
  console.log(String.raw`
 /$$     /$$ /$$$$$$  /$$   /$$       /$$      /$$ /$$$$$$ /$$   /$$
|  $$   /$$//$$__  $$| $$  | $$      | $$  /$ | $$|_  $$_/| $$$ | $$
 \  $$ /$$/| $$  \ $$| $$  | $$      | $$ /$$$| $$  | $$  | $$$$| $$
  \  $$$$/ | $$  | $$| $$  | $$      | $$/$$ $$ $$  | $$  | $$ $$ $$
   \  $$/  | $$  | $$| $$  | $$      | $$$$_  $$$$  | $$  | $$  $$$$
    | $$   | $$  | $$| $$  | $$      | $$$/ \  $$$  | $$  | $$\  $$$
    | $$   |  $$$$$$/|  $$$$$$/      | $$/   \  $$ /$$$$$$| $$ \  $$
    |__/    \______/  \______/       |__/     \__/|______/|__/  \__/
                                                                    
                                                                    
                                                                    
`);
}

function mainTable() {
  playerTotal = 0;
  for (let i = 0; i < playerHand.length; i++) {
    while (true) {
      playerTotal = 0;
      console.clear();
      for (let j = 0; j < playerHand[i].length; j++) {
        playerTotal += playerHand[i][j].value;
      }
      console.log(`\nYour Money: $${playerMoney}`);

      if (playerHand.length > 1) {
        console.log(`Split ${i + 1}`);
      }
      console.log(`\nBet: $${bet}\n`);
      displayCards(playerHand[i]);
      console.log(`\nTotal: ${playerTotal}`);

      console.log(
        `\n\n\n--------------------------------------------\n\nDealer:`
      );

      console.log(getAscii(dealerHand[0][0]));

      if (
        playerTotal === 21 &&
        playerHand[i].some((card) => card.value === 11)
      ) {
        wins();
        break;
      }
      console.log(`\nPlease choose an option:`);
      let userchoice = readlineSync.questionInt(
        `\n1. Hit\n2. Stand\n${
          playerHand[i][0].value === playerHand[i][1].value ? "3. Split" : ""
        }\n>`,
        {
          limit: `${
            playerHand[i][0].value === playerHand[i][1].value ? "12" : "123"
          }`,
        }
      );
      if (userchoice === 1) {
        playerHand[i].push(deck.pop());
      }
    }
  }
  //put cards back into deck!!!
  return;
}

//create deck
let deck = createDeck();

//welcome screen

console.clear();

console.log(String.raw`
♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠   
__________.____       _____  _________  ____  __.      ____.  _____  _________  ____  __.
\______   \    |     /  _  \ \_   ___ \|    |/ _|     |    | /  _  \ \_   ___ \|    |/ _|
 |    |  _/    |    /  /_\  \/    \  \/|      <       |    |/  /_\  \/    \  \/|      <  
 |    |   \    |___/    |    \     \___|    |  \  /\__|    /    |    \     \___|    |  \ 
 |______  /_______ \____|__  /\______  /____|__ \ \________\____|__  /\______  /____|__ \
        \/        \/       \/        \/        \/                  \/        \/        \/

♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠
`);

console.log(`\n\n\n\n                                 PRESS ENTER TO START`);
readlineSync.question("");

//start main game loop

while (true) {
  playerTotal = 0;
  dealerTotal = 0;
  bet = 0;
  console.clear();

  console.log(String.raw`
♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠   
__________.____       _____  _________  ____  __.      ____.  _____  _________  ____  __.
\______   \    |     /  _  \ \_   ___ \|    |/ _|     |    | /  _  \ \_   ___ \|    |/ _|
 |    |  _/    |    /  /_\  \/    \  \/|      <       |    |/  /_\  \/    \  \/|      <  
 |    |   \    |___/    |    \     \___|    |  \  /\__|    /    |    \     \___|    |  \ 
 |______  /_______ \____|__  /\______  /____|__ \ \________\____|__  /\______  /____|__ \
        \/        \/       \/        \/        \/                  \/        \/        \/

♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠♥♦♣♠
`);
  console.log(`\n\n\nYour Record: $${highScore}`);

  const options = ["DEAL CARDS", "QUIT"];
  const userChoice = readlineSync.keyInSelect(
    options,
    "\n\n\nChoose an option:"
  );

  if (userChoice === 0) {
    console.clear();
    console.log(`\nYou have $${playerMoney}`);
    do {
      bet = readlineSync.questionInt("\nPlace your Bets:\n>");
    } while (bet <= 0 || bet > playerMoney);
    playerMoney -= bet;
    deck = shuffleDeck();

    console.clear();
    const frames = ["|", "/", "-", "\\"];
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(
        "\r" + frames[i++ % frames.length] + " Shuffling..."
      );
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      console.log("\nDone!");
      dealCards(playerHand, 2);
      dealCards(dealerHand, 2);
      mainTable();
    }, 2000);
  } else {
    console.log("Goodbye");
    process.exit(0);
  }
  break;
}
