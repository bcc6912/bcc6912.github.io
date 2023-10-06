// values used throughout game
// new decks
let Pdeck;
let Cdeck;
 
// objects for boards
let pBoard;
let cBoard;

// sound variables
let flip = new Audio("sounds/cardFlip.wav");
let shuffleSound = new Audio("sounds/shuffle.wav");
let heal = new Audio("sounds/magical_6.ogg");
let attack = new Audio("sounds/attack.wav");
let applause = new Audio("sounds/applause.wav");
let laugh = new Audio("sounds/laugh-evil-1.ogg");
let special = new Audio("sounds/magical_5.ogg");

const numCards = 12;

// health for both players
let playerHealth = 100;
let cpuHealth = 100;

// checks to see if computer's turn
let computerTurn = false;

// checks to see if cards are being shuffled
let shuffle = false;

// checks for sight effect
let sight = false;

// checks for double effect for both player and computer
let pDouble = false;
let cDouble = false;

// list of the cards the computer knows
let knowns = [];

// checks to seee if game being restarted
let restart = false;

window.onload = (e)=>{
  let game = document.getElementById("game");
  game.hidden = true;
  game.style.display = "none";
  document.querySelector("#start").onclick = SetUp;   
  let playAgain = document.getElementById("playAgain");
  playAgain.hidden = true;
  game.style.display = "none";
  document.querySelector("#playAgain").onclick = Restart;
}

function SetUp()
{
  let menu = document.getElementById("menu");
  menu.hidden = true;
  menu.style.display = "none";
  game.hidden = false;
  game.style.display = "grid";

  // shuffle makes sure cards are random
  // see bottom half for method
  Shuffle(true, true);
  Shuffle(false, true);
  pBoard = new Board(Pdeck, true);
  cBoard = new Board(Cdeck, false);
  StartGame();
}

function Restart()
{
  playerHealth = 100;
  cpuHealth = 100;
  computerTurn = false;

  Shuffle(true, false);
  Shuffle(false, false);
  pBoard = new Board(Pdeck, true);
  cBoard = new Board(Cdeck, false);
  StartGame();
}

function StartGame()
{
  // two board instances; playerBoard and computerBoard
  pBoard.CreateBoard();
  shuffle = true;
  cBoard.CreateBoard();

  let playAgain = document.getElementById("playAgain");
  playAgain.hidden = true;
  playAgain.style.display = "none";

  document.getElementById("results").style.color = "";
  document.getElementById("results").innerHTML = "Defeat the enemy wizard!";

  document.getElementById("playerHealth").style.color = "";
  document.getElementById("playerHealth").innerHTML = "Your HP: 100";

  document.getElementById("cpuHealth").style.color = "";
  document.getElementById("cpuHealth").innerHTML = "Enemy HP: 100";
}

function cardClicked() {
  // plays sounds for when card is flipped
  flip.play();

  // we do nothing if there are already two cards flipped.
  if (document.querySelectorAll(".card-flipped").length > 1) return;
       
  // inside of an event handling function, 'this' is the element that called the function
  this.classList.add("card-flipped");

  // check the pattern of both flipped card 0.7s later.    
  if (document.querySelectorAll(".card-flipped").length == 2) {
    // setTimeout() is used to schedule the execution a piece of code *once*
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
    setTimeout(checkPattern, 700);
  }
}

function checkPattern() {
  if (isSamePattern()) {
    // health points value of card that is being removed
    // used for damage calculations in ChangeHealth and to check effects
    let pulledCard;

    // here we are using array.forEach(), rather than for...of, for no particular reason :-)
    document.querySelectorAll(".card-flipped").forEach((element)=>{
      element.classList.remove("card-flipped");
      element.classList.add("card-removed");
      pulledCard = element;
      element.addEventListener("transitionend",removeMatchedCards);
    });
    if (computerTurn)
    {
      // checks to see if cards have any effects
      if (pulledCard.dataset.effect == "double")
      {
        cDouble = true;
        
        // adds display of what happened in case player missed it
        document.getElementById("results").style.color = "violet"
        document.getElementById("results").innerHTML = "The computer matched a double card!";

        special.play();
      }
      else {
        ChangeHealth(pulledCard);

        // ends double effect for computer
        cDouble = false;
      }
      if (Number(playerHealth) <= 0)
      {
        GameOver(false);
        return;
      }
      Shuffle(false, false);
      cBoard = new Board(Cdeck, false);
      cBoard.CreateBoard();
    }
    else
    {
      // checks to see if cards have any effects
      if (pulledCard.dataset.effect == "sight")
      {
        // ends double for player, but activates sight effect
        pDouble = false;
        sight = true;

        // adds display of what happened in case player missed it
        document.getElementById("results").style.color = "violet"
        document.getElementById("results").innerHTML = "You matched a sight card!";

        special.play();
      }
      else if (pulledCard.dataset.effect == "double")
      {
        // ends sight for player, but activates double effect
        sight = false;
        pDouble = true;

        // adds display of what happened in case player missed it
        document.getElementById("results").style.color = "violet"
        document.getElementById("results").innerHTML = "You matched a double card!";

        special.play();
      }
      else {
        ChangeHealth(pulledCard);

        // ends effects for player
        pDouble = false;
        sight = false;
      }
      if (Number(cpuHealth) <= 0)
      {
        GameOver(true);
        return;
      }
      Shuffle(true, false);
      pBoard = new Board(Pdeck, true);
      pBoard.CreateBoard();
    }

  } else {
    // I prefer array.forEach() over for...of when I can write it as a "one-liner"
    document.querySelectorAll(".card-flipped").forEach((element)=>{element.classList.remove("card-flipped")});
  }

  // computer's turn to do something
  if (computerTurn)
  {
    computerTurn = false;
    return;
  }
  else
  {
    setTimeout(computerSelect(), 1000);
  }
}

function isSamePattern() {
  let cards = document.querySelectorAll(".card-flipped");
  // the dataset object holds the .data-pattern property we created for each card in initBoard()
  let pattern1 = cards[0].dataset.pattern;
  let pattern2 = cards[1].dataset.pattern;

  // checks to see if either card is a matcher card
  // if one of them are, the matcher card turns into the other card
  if (cards[0].dataset.effect == "matcher")
  {
    cards[0].dataset.effect = cards[1].dataset.effect;
    cards[0].dataset.hp = cards[1].dataset.hp;
    pattern1 = cards[0].dataset.pattern;
    pattern2 = cards[0].dataset.pattern;
  }
  else if (cards[1].dataset.effect == "matcher")
  {
    cards[1].dataset.effect = cards[0].dataset.effect;
    cards[1].dataset.hp = cards[0].dataset.hp;
    pattern1 = cards[1].dataset.pattern;
    pattern2 = cards[1].dataset.pattern;
  }

  return pattern1 == pattern2;
}

function removeMatchedCards(){
  // another .forEach() "one-liner"
  document.querySelectorAll(".card-removed").forEach((element)=>{element.parentNode.removeChild(element);});
}

// function for computer's turn
function computerSelect()
{
  computerTurn = true;

  // sets array of cards to pick
  let cCards = document.querySelectorAll("#cCards > .card");
  
  // randomly selects a card from the array of available cards
  let card1Ind = Math.floor(Math.random()*cCards.length);
  
  // sets first card picked
  let card1 = cCards[card1Ind];

  // creates variable for following code
  let card2;

  // if the first card is a matcher card it will automatically pick a random card from the set of available cards
  if (card1.dataset.effect == "matcher")
  {
    let card2Ind = Math.floor(Math.random()*cCards.length);
    
    // ensures that the same card is not selected
    while(card2Ind == card1Ind)
    {
      card2Ind = Math.floor(Math.random()*cCards.length);
    }
    card2 = cCards[card2Ind];
  }
  // if the computer already knows where some cards are goes through this
  else if (knowns.length > 0)
  {
    for (let element of knowns)
    {
      // makes sure the card being compared is not the same as the card the computer has already selected
      // checks to see if patterns match
      if (card1 != element)
      {
        if (card1.dataset.pattern == element.dataset.pattern)
        {
          card2 = cCards[element.dataset.location];
        }
      }
    }
    // in the event that none of the known cards matched the first
    // randomly selects card the way the first if statement above did
    if (card2 == null)
    {
      let card2Ind = Math.floor(Math.random()*cCards.length);
      while(card2Ind == card1Ind)
      {
        card2Ind = Math.floor(Math.random()*cCards.length);
      }
      card2 = cCards[card2Ind];
      knowns.push(card1);
      knowns.push(card2);
    }
  }
  // if this is the computer's first look at the cards placed
  else
  {
    let card2Ind = Math.floor(Math.random()*cCards.length);
    while(card2Ind == card1Ind)
    {
      card2Ind = Math.floor(Math.random()*cCards.length);
    }
    card2 = cCards[card2Ind];
    
    knowns.push(card1);
    knowns.push(card2);
  }

  card1.classList.add("card-flipped");
  card2.classList.add("card-flipped");

  if (document.querySelectorAll(".card-flipped").length == 2) {
    // setTimeout() is used to schedule the execution a piece of code *once*
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
    setTimeout(checkPattern, 700);
  }
}

// card set is almost never the same
function Shuffle(playerDeck, firstShuffle)
{
  let cards = [];

  let card;

  // grabs six cards and puts two copies of it into the deck
  for (let i = 0; i < 6; i++)
  {
    card = GetCard();

    // ensures there are no duplicates in the the decks
    if (cards.length != 0)
    {
      let duplicates = true;

      while (duplicates)
      {
        for (let element of cards)
        {
          while (card.value == element.value)
          {
            card = GetCard();
          }
        }
        
        let isDuplicate = false;
        for (let element of cards)
        {
          if (element.value == card.value)
          {
            isDuplicate = true;
          }
        }
        if (!isDuplicate)
        {
          duplicates = false;
        }
      }
    }

    // for sight check if computer's shuffle
    let single = false;
    let normal = false;

    // if the card was the matcher it will only make one copy
    // removes the first two copies and adds the singular card
    if (card.effect == "matcher")
    {
      cards.push(card);
      i--;
    }
    // if the previous card was the matcher card, it will make one copy of this card
    // removes first two copies
    // ensures there will be 12 cards on the board
    else if (cards.length > 0 && cards[cards.length - 1].effect == "matcher")
    {
      cards.push(card);
      single = true;
    }
    else
    {
      cards.push(card);
      cards.push(card);
      normal = true;
    }

    // for computer
    // checks to see if the card added was also a sight card
    // if it was, it is taken out and count is pushed back to retry
    if (!playerDeck)
    {
      if (card.effect == "sight")
      {
        if (single)
        {
          cards.pop();
        }
        else if (normal)
        {
          cards.pop();
          cards.pop();
        }
        i--;
      }
    }
  }

  // google chrome doesn't allow for autoplay so the shuffle sound does not play on the first shuffle
  // shuffle eliminates all of the current cards on the current board
  // including the one it copies from so the start of the game can't have shuffle on 
  if (!firstShuffle)
  {
    shuffleSound.play();
    shuffle = true;
  }

  // ensures that the right board is being shuffled
  if (playerDeck)
  {
    Pdeck = cards;
  }
  else
  {
    // resets knowns as the available cards could be totally different
    knowns = [];
    Cdeck = cards;
  }
}

// makes card instance
// similar to construction of gif visual in GIF Finder
function GetCard()
{
  let row = Math.floor((Math.random() * 3) + 1);
  let column = Math.floor((Math.random() * 4) + 1);

  let card;

  let face = "cardR";

  if (row < 10)
  {
    face += "0" + row;
  }
  else
  {
    face += row;
  }
 
  if (column < 10)
  {
    face += "C0" + column;
  }
  else
  {
    face += "C" + column;
  }

  // columns 1 and 3 of the deck of cards are all damage cards
  if (column == 1 || column == 3)
  {
    card = new Card(face, "damage");
  }
  // column 2 is all health cards
  else if (column == 2)
  {
    card = new Card(face, "health");
  }
  // occurs when it's the 4th column
  else
  {
    // first card in the 4th column is the double card
    if (row == 1)
    {
      card = new Card(face, "double");
    }
    // second card in the 4th column is the matcher card
    else if (row == 2)
    {
      card = new Card(face, "matcher");
    }
    // third card in the 4th column is the sight card
    else
    {
      card = new Card(face, "sight");
    }
  }

  return card;
}

// changes health display on the page
function ChangeHealth(card)
{
  let value = card.dataset.hp;

  if (computerTurn)
  {
    if (cDouble)
    {
      value = Number(value) * 2;
    }

    // if the card takes away health
    if (Number(value) < 0)
    {
      attack.play();
      playerHealth = Number(playerHealth) + Number(value);
      document.getElementById("playerHealth").style.color = "red";
      document.getElementById("playerHealth").innerHTML = "Your HP: " + playerHealth;

      // adds display of what happened in case player missed it
      document.getElementById("results").style.color = "red"
      document.getElementById("results").innerHTML = "The enemy wizard matched a damage card!";
    }
    // otherwise heals user
    else
    {
      heal.play();
      cpuHealth = Number(cpuHealth) + Number(value);
      document.getElementById("cpuHealth").style.color = "lightgreen";
      document.getElementById("cpuHealth").innerHTML = "Enemy HP: " + cpuHealth;
      // adds display of what happened in case player missed it
      document.getElementById("results").style.color = "lightgreen"
      document.getElementById("results").innerHTML = "The enemy wizard matched a health card!";
    }
  }
  else
  {
    if (pDouble)
    {
      value = Number(value) * 2;
    }

    if (Number(value) < 0)
    {
      attack.play();
      cpuHealth = Number(cpuHealth) + Number(value);
      document.getElementById("cpuHealth").style.color = "red";
      document.getElementById("cpuHealth").innerHTML = "Enemy HP: " + cpuHealth;

      // adds display of what happened in case player missed it
      document.getElementById("results").style.color = "red"
      document.getElementById("results").innerHTML = "You matched a damage card!";
    }
    else
    {
      heal.play();
      playerHealth = Number(playerHealth) + Number(value);
      document.getElementById("playerHealth").style.color = "lightgreen";
      document.getElementById("playerHealth").innerHTML = "Your HP: " + playerHealth;
      // adds display of what happened in case player missed it
      document.getElementById("results").style.color = "lightgreen"
      document.getElementById("results").innerHTML = "You matched a health card!";
    }
  }
}

function GameOver(won)
{
  if (won)
  {
    applause.play();
    document.getElementById("results").style.color = "lightgreen"
    document.getElementById("results").innerHTML = "You Won!";
  }
  else
  {
    laugh.play();
    document.getElementById("results").style.color = "red"
    document.getElementById("results").innerHTML = "You Lose!";
  }
  let pCards = document.querySelectorAll("#pCards > .card");
  for(let element of pCards)
  {
    element.onclick = null;
  }

  playAgain = document.getElementById("playAgain");
  playAgain.hidden = false;
  playAgain.style.display = "block";
}