import * as storage from "./localStorage.js";
import * as creator from "./info-creator.js";
import * as firebase from "./firebase.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
div#card {
    width: 195px;
}
</style>
<div id="card" class="card mx-2 my-2 is-clearfix">
    <header class="card-header">
        <p id="name" class="card-header-title">
        Monster
        </p>
    </header>
    <div id="card-content" class="card-content pb-auto">
        <div class="content">
            <p id="type">Type: </p>
            <p id="size">Size: </p>
            <p id="challenge-rating">Challenge Rating: </p>
            <p id="hp">Hit Points: </p>
        </div>
    </div>
    <footer class="card-footer has-text-centered">
        <a id="full-card" class="card-footer-item">Full Card</a>
        <a id="favorite" class="card-footer-item">Favorite</a>
    </footer>
</div>
`;

class P1Card extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot`
        this.attachShadow({mode: "open"});

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.name = this.shadowRoot.querySelector("#name");
        this.type = this.shadowRoot.querySelector("#type");
        this.size = this.shadowRoot.querySelector("#size");
        this.rating = this.shadowRoot.querySelector("#challenge-rating");
        this.hp = this.shadowRoot.querySelector("#hp");
        this.fullButton = this.shadowRoot.querySelector("#full-card");
        this.favButton = this.shadowRoot.querySelector("#favorite");
        this._object = null;
        this._favorited = false;
        this._childFull = null;
        this.favoriteCallback = () => {return;}; // changes when used in favorites.js
        this.recentCallback = (_object) => {return;}; // changes when used in app.js

        this.getFullView = () => { 
            let full = creator.showFullInfo(this._object);
            full.favorited = this._favorited;
            full.parentCard = this;
            full.callback = this.favoriteCallback;
            this._childFull = full;
            document.querySelector("#full-view").scrollIntoView({behavior: "smooth"});
            storage.addRecent(this._object);
            storage.setFull(this._object);
            // console.log("GetFullView Called");
        };
        this.favorite = () => {
            if (!this.favorited) {
                storage.addFavorite(this._object);
                this.favorited = true;
                if (this._childFull != null) {
                    this._childFull.favorited = true;
                }
                // console.log(this._childFull.object.name);
                firebase.writeFavorite(this._object);
                // this.favButton.innerHTML = "Unfavorite";
            } else {
                storage.removeFavorite(this._object);
                this.favorited = false;
                if (this._childFull != null) {
                    this._childFull.favorited = false;
                }
                firebase.removeFavorite(this._object);
                // this.favButton.innerHTML = "Favorite";
            }
        }
    }

    connectedCallback() {
        this.fullButton.onclick = () => {
            this.getFullView();
            this.recentCallback(this._object);
        }
        this.favButton.onclick = () => {
            this.favorite();
            this.favoriteCallback();
        };
        this.render();
    }

    set object(val) {
        this._object = val;
    }

    get object() {
        return this._object;
    }

    set url(val) {
        this._url = val;
        // this.render();
    }

    get url() {
        return this._url;
    }

    set favorited(val) {
        this._favorited = val;
        this.render();
    }

    get favorited() {
        return this._favorited;
    }

    set childFull(val) {
        this._childFull = val;
        this.render();
    }
  
    get childFull() {
        return this._childFull;
    }

    render() {
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...monster name...</i>";
        const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "none";
        const size = this.getAttribute('data-size') ? this.getAttribute('data-size') : "small";
        const rating = this.getAttribute('data-rating') ? this.getAttribute('data-rating') : "0";
        const hp = this.getAttribute('data-hp') ? this.getAttribute('data-hp') : "0";

        const typeCap = type.charAt(0).toUpperCase() + type.slice(1)

        this.name.innerHTML = `${name}`;
        this.type.innerHTML = `Type: ${typeCap}`;
        this.size.innerHTML = `Size: ${size}`;
        this.rating.innerHTML = `Challenge Rate: ${rating}`;
        this.hp.innerHTML = `Hit Points: ${hp}`;

        if (this.favorited) {
            this.favButton.innerHTML = "Unfavorite";
            this.favButton.classList.add("has-background-danger");
            this.favButton.classList.add("has-text-white");
        } else {
            this.favButton.innerHTML = "Favorite";
            this.favButton.classList.remove("has-background-danger");
            this.favButton.classList.remove("has-text-white");
        }

        let fullCard = document.querySelector("p1-full-info");
        if (fullCard != null) {
            if (fullCard.object.name == this._object.name) {
                this._childFull = fullCard;
                fullCard.parentCard = this;
            }
        }
    }
} // end class

customElements.define('p1-card', P1Card);