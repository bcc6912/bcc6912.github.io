import "./p1-header.js";
import "./p1-footer.js";
import "./p1-navlist.js";
import "./hamburger.js";

import * as creator from "./info-creator.js";
import * as firebase from "./firebase.js";

const output = document.querySelector("#output");
const refreshButton = document.querySelector("#refresh-button");

const cards = [];

const displayCommunityFavorites = (communityFav) => {    
    output.innerHTML = "";
    let favs = communityFav;
    favs.sort(function (obj1, obj2) {return eval(obj1.favorites) - eval(obj2.favorites)});
    console.log(favs);
    cards.length = 0;
    for (let data of favs) {
        if (data.favorites >= 1) {
            // console.log(data.favorites);

            let communityCard = creator.createCommunityCard(data.obj, data.favorites);
            cards.push(communityCard);
            // console.log("Card printed");
        }
    }
    if (cards.length == 0) {
        output.innerHTML = "No Community Favorites or Database Not Renewed!";
    }
};

// allows for community cards to be dynamically updated
function updateCommunityCards(snapshot) {
    // console.log("updateCommunityCards called!");
    snapshot.forEach(favorite => {
        for (let card of cards) {
            if (card.object.name == favorite.val().obj.name) {
                card.likes = favorite.val().favorites;
                // console.log(card.likes);
                break;
            }
        }
    });
}

const init = () => {
    try {
        firebase.getFavorites(displayCommunityFavorites);
        refreshButton.onclick = () => {
            while (output.firstChild) {
                output.removeChild(output.firstChild);
            }
            firebase.getFavorites(displayCommunityFavorites);
        };
    } catch {
        output.innerHTML = "No Community Favorites or Database Not Renewed!";
    }
};

init();
firebase.onValue(firebase.monsterRef, updateCommunityCards);