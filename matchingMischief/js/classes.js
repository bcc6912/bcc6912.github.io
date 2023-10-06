class Card
{
    constructor(face, effect)
    {
        this.effect = effect;
        this.value = face;

        // if the card has the match effect, it can match with any card
        // if the card has a double effect, it doubles the values of the next match
        // if the card has the sight effect, the player can hover over a card and see what it is for the next match
        if (effect == "matcher" || effect == "double" || effect == "sight")
        {
            this.hp = 0;

            if (sight)
            {
                this.title = "This is a " + effect + " card!";
            }
        }
        // checks to see if the card is a damage card
        else if (effect == "damage")
        {
            this.hp = -20;
        }
        // otherwise a health card
        else
        {
            this.hp = 10;
        }
    }
}

class Board
{
    constructor(deck, player)
    {
        this.deck = deck;
        this.player = player;
        if (player)
        {
            this.board = "#pCards";
        }
        else
        {
            this.board = "#cCards";
        }
    }

    CreateBoard()
    {
        this.deck.sort(()=>{ return 0.5 - Math.random() }); // randomize the deck

        // if this is NOT the first time the boards have been made
        if (shuffle)
        {
            while (document.querySelector(`${this.board}`).firstChild)
            {
              document.querySelector(`${this.board}`).removeChild(document.querySelector(`${this.board}`).firstChild);
            }

            for(let i=0; i<numCards; i++){
                let newCard = document.querySelector(".card").cloneNode(true);
                document.querySelector(`${this.board}`).appendChild(newCard);
            }
        }
        // used only once at the start
        else
        {
            
            for(let i=0; i<numCards-1; i++){
                let newCard = document.querySelector(".card").cloneNode(true);
                document.querySelector(`${this.board}`).appendChild(newCard);
            }
        }

        let cards = document.querySelectorAll(`${this.board} > .card`);
        let index = 0; // we need this for positioning

        // loop through all of the card elements and assign a face to each card
        for (let element of cards){
            let x = (element.offsetWidth  + 20) * (index % 4);
            let y = (element.offsetHeight + 20) * Math.floor(index / 4);
            element.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

            // get a pattern from the shuffled deck
            let currentCard = this.deck.pop();
            let pattern = currentCard.value;

            // first removes pattern already on card
            if (element.querySelector(".back").classList.length > 2)
            {
            let oldElement = element.querySelector(".back").classList.item(2);
            element.querySelector(".back").classList.remove(oldElement);
            }

            // visually apply the pattern on the card's back side.
            // we do this by adding a class through the .classList property
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
            element.querySelector(".back").classList.add(pattern);

            // embed the pattern data into the DOM element.
            // this is an example of HTML5 Custom Data attributes
            // http://html5doctor.com/html5-custom-data-attributes/
            element.setAttribute("data-pattern",pattern);

            element.setAttribute("data-hp", currentCard.hp);

            element.setAttribute("data-effect", currentCard.effect);

            // listen for the click event on each card <div> element.
            // only if it's the player's board
            // also adds description of what the card is if sight is active
            if (this.player)
            {
                element.onclick = cardClicked;
                if (sight)
                {
                    element.title = "This is a " + currentCard.effect + " card!";
                }
                else
                {
                    element.title = "";
                }
            }

            // dataset for computer to know location of cards
            if (!this.player)
            {
                element.setAttribute("data-location", index);
            }
            index ++;
        }

        shuffle = false;
    }
}