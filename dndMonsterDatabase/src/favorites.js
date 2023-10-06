import "./p1-header.js";
import "./p1-footer.js";
import "./p1-navlist.js";
import "./hamburger.js";
import "./p1-card.js";
import "./p1-full-info.js";

import * as storage from "./localStorage.js";
import * as creator from "./info-creator.js";
import * as firebase from "./firebase.js";

const output = document.querySelector("#output");
const clearButton = document.querySelector("#clear-button");

const cards = [];

const showFavorites = () => {
    const favorites = storage.getFavorites();
    favorites.reverse();

    try {
        // fullView.innerHTML = "";
        cards.length = 0;
        
        output.innerHTML = "";
        for (let f of favorites) {
            cards.push(loadFavorite(f));
        }

        // const cards = document.querySelectorAll("p1-card");
        for (let c of cards) {
            c.favoriteCallback = () => showFavorites();

            const full = document.querySelector("p1-full-info");
            if (full != null) {
                if (full.object.name == c.object.name) {
                    c.childFull = full;
                    full.parentCard = c;
                }
            }
        }

        if (favorites.length == 0) {
            output.innerHTML = "No Favorites Yet!";
        }

    } catch {
        output.innerHTML = "No Favorites Yet!";
    }
};

const init = () => {
    showFavorites();
    clearButton.onclick = clearFavorites;
};

const loadFavorite = obj => {
    let card = creator.loadMonsterCard(obj, output);
    card.favorited = true;
    return card;
};

const updateFavorites = () => {
    console.log("updateFavorites called");
    showFavorites();
};

const clearFavorites = () => {
    for (let obj of storage.getFavorites()) {
        firebase.removeFavorite(obj);
    }
    storage.clearFavorites();
    updateFavorites();
};

init();