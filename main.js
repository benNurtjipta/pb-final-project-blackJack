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
  console.log(`\n\n\n\n`);

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
  console.log(`\n\n\n\nPress Enter to Continue`);
  readlineSync.question("");
}

function blackJack() {
  playerMoney += bet * 2;
  console.log(`\n\n\n\n`);

  console.log(String.raw`
 /$$$$$$$  /$$        /$$$$$$   /$$$$$$  /$$   /$$          /$$$$$  /$$$$$$   /$$$$$$  /$$   /$$
| $$__  $$| $$       /$$__  $$ /$$__  $$| $$  /$$/         |__  $$ /$$__  $$ /$$__  $$| $$  /$$/
| $$  \ $$| $$      | $$  \ $$| $$  \__/| $$ /$$/             | $$| $$  \ $$| $$  \__/| $$ /$$/ 
| $$$$$$$ | $$      | $$$$$$$$| $$      | $$$$$/              | $$| $$$$$$$$| $$      | $$$$$/  
| $$__  $$| $$      | $$__  $$| $$      | $$  $$         /$$  | $$| $$__  $$| $$      | $$  $$  
| $$  \ $$| $$      | $$  | $$| $$    $$| $$\  $$       | $$  | $$| $$  | $$| $$    $$| $$\  $$ 
| $$$$$$$/| $$$$$$$$| $$  | $$|  $$$$$$/| $$ \  $$      |  $$$$$$/| $$  | $$|  $$$$$$/| $$ \  $$
|_______/ |________/|__/  |__/ \______/ |__/  \__/       \______/ |__/  |__/ \______/ |__/  \__/
                                                                                                
                                                                                                
                                                                                                
`);
  console.log(`\n\n\n\nPress Enter to Continue`);
  readlineSync.question("");
}

function loses() {
  console.log(`\n\n\n\n`);
  console.log(String.raw`
 /$$     /$$ /$$$$$$  /$$   /$$       /$$        /$$$$$$   /$$$$$$  /$$$$$$$$
|  $$   /$$//$$__  $$| $$  | $$      | $$       /$$__  $$ /$$__  $$| $$_____/
 \  $$ /$$/| $$  \ $$| $$  | $$      | $$      | $$  \ $$| $$  \__/| $$      
  \  $$$$/ | $$  | $$| $$  | $$      | $$      | $$  | $$|  $$$$$$ | $$$$$   
   \  $$/  | $$  | $$| $$  | $$      | $$      | $$  | $$ \____  $$| $$__/   
    | $$   | $$  | $$| $$  | $$      | $$      | $$  | $$ /$$  \ $$| $$      
    | $$   |  $$$$$$/|  $$$$$$/      | $$$$$$$$|  $$$$$$/|  $$$$$$/| $$$$$$$$
    |__/    \______/  \______/       |________/ \______/  \______/ |________/
                                                                             
                                                                             
                                                                             
`);
  console.log(`\n\n\n\nPress Enter to Continue`);
  readlineSync.question("");
}

function push() {
  console.log(`\n\n\n\n`);
  console.log(String.raw`
 /$$$$$$$  /$$   /$$  /$$$$$$  /$$   /$$
| $$__  $$| $$  | $$ /$$__  $$| $$  | $$
| $$  \ $$| $$  | $$| $$  \__/| $$  | $$
| $$$$$$$/| $$  | $$|  $$$$$$ | $$$$$$$$
| $$____/ | $$  | $$ \____  $$| $$__  $$
| $$      | $$  | $$ /$$  \ $$| $$  | $$
| $$      |  $$$$$$/|  $$$$$$/| $$  | $$
|__/       \______/  \______/ |__/  |__/
                                        
                                        
                                        
`);
  playerMoney += bet;
  console.log(`\n\n\n\nPress Enter to Continue`);
  readlineSync.question("");
}

function dealerPlay(index) {
  while (true) {
    playerTotal = 0;
    dealerTotal = 0;
    console.clear();
    for (let j = 0; j < playerHand[index].length; j++) {
      playerTotal += playerHand[index][j].value;
    }

    console.log(`\nYour Money: $${playerMoney}`);

    if (playerHand.length > 1) {
      console.log(`Split ${i + 1}`);
    }
    console.log(`\nBet: $${bet}\n`);
    displayCards(playerHand[index]);
    console.log(`\nTotal: ${playerTotal}`);

    console.log(
      `\n\n\n--------------------------------------------\n\nDealer:`
    );
    for (let j = 0; j < dealerHand[0].length; j++) {
      dealerTotal += dealerHand[0][j].value;
    }
    if (dealerTotal > 21 && dealerHand[0].some((card) => card.value === 11)) {
      dealerTotal -= 10;
    }
    displayCards(dealerHand[0]);
    console.log(`\nTotal: ${dealerTotal}`);
    if (dealerTotal === 21 && dealerHand[0].some((card) => card.value === 11)) {
      blackJack();
      return;
    }
    if (dealerTotal <= 16) {
      dealerHand[0].push(deck.pop());
    }
    if (dealerTotal === playerTotal) {
      push();
      return;
    }
    if (dealerTotal > 21 || dealerTotal < playerTotal) {
      wins();
      return;
    }
    if (dealerTotal > playerTotal) {
      loses();
      return;
    }
    console.log(`\n\n\n\nPress Enter to Continue`);
    readlineSync.question("");
  }
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
      if (playerTotal > 21 && playerHand[i].some((card) => card.value === 11)) {
        playerTotal -= 10;
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
        blackJack();
        break;
      }
      if (playerTotal > 21) {
        loses();
        break;
      }
      console.log(`\nPlease choose an option:`);
      let userchoice = readlineSync.questionInt(
        `\n1. Hit\n2. Stand\n${
          playerHand[i][0].face === playerHand[i][1].face ? "3. Split" : "" //doesnt work for one card after split
        }\n>`,
        {
          limit: `${
            playerHand[i][0].face === playerHand[i][1].face ? "12" : "123"
          }`,
        }
      );
      if (userchoice === 1) {
        playerHand[i].push(deck.pop());
      }
      if (userchoice === 2) {
        dealerPlay(i);
        return;
      }
      if (userchoice === 3) {
        playerMoney -= bet;
        let tempArr = playerHand[i].splice(1, 1);
        playerHand.push(tempArr);
        // what happens is it splits multiple times.....FUCK. write a function/use extra counter i+extracounter, extracounter++
      }
    }
  }
  playerHand.length = 0;
  dealerHand.length = 0;
  return;
}

//create deck
let originalDeck = createDeck();
let deck = [];
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

  deck = originalDeck;
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
  console.log(`\nBalance: $${playerMoney}`);
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
    // const frames = ["|", "/", "-", "\\"];
    // let i = 0;
    // const interval = setInterval(() => {
    //   process.stdout.write(
    //     "\r" + frames[i++ % frames.length] + " Shuffling..."
    //   );
    // }, 100);

    // setTimeout(() => {
    //   clearInterval(interval);
    //   console.log("\nDone!");
    //   dealCards(playerHand, 2);
    //   dealCards(dealerHand, 2);
    //   mainTable();
    // }, 2000);
    dealCards(playerHand, 2);
    dealCards(dealerHand, 2);
    mainTable();
  } else {
    console.log("Goodbye");
    process.exit(0);
  }
}
