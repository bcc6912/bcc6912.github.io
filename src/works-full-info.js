/*
import * as storage from "./localStorage.js";
import * as firebase from "./firebase.js";
*/
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
ul {
    list-style: inside;
}
</style>
<div class=" has-background-grey-light box">
    <div class="columns has-text-black">
        <div class="column">
            <h1 id="name" class="title has-text-black">Project</h1>
            <h2 id="date" class="subtitle has-text-black">Created in </h2>

            <p id="engine" class="has-text-black">Tools: </p>
            <p id="platforms" class="has-text-black">Platforms: </p>
            <p id="link" class="has-text-black">Link: </p>
            <!--
            <p id="description">Challenge Rating: </p>
            <p id="hp">Hit Points: </p>
            <p id="hit-dice">Hit Dice: </p>
            <p id="senses">Senses: </p>
            <p id="languages">Languages: </p>
            -->

            <h2 class="subtitle mb-1 mt-3 has-text-weight-bold is-underlined has-text-black">Description</h2>
            <div>
                <p id="description" class="has-text-black"><i>project description</i></p>
            </div>

            <!--
            <h2 class="subtitle is-6 mb-1 mt-3 has-text-weight-bold">Notes:</h2>
            -->

        </div>

        <div class="column">
            <div id="card-image" class="card-image">
                <figure class="image is-1by1">
                    <img id="thumbnail" src="./media/placeholderImage.png" alt="Placeholder image">
                </figure>
            </div>
            <div id="card-video">
                <iframe id="video" height="500px" width="500px" src=""></iframe>
            </div>
        </div>
    </div>
    <div>
        <!-- <button id="favorite-button" class="button mx-auto my-2">Favorite</button> -->
        <button id="close-button" class="button mx-auto my-2">Close</button>
    </div>
</div>
`;

class WorksFullInfo extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot`
        this.attachShadow({mode: "open"});

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        /*
        this.name = this.shadowRoot.querySelector("#name");
        this.alignment = this.shadowRoot.querySelector("#alignment");

        this.type = this.shadowRoot.querySelector("#type");
        this.size = this.shadowRoot.querySelector("#size");
        this.rating = this.shadowRoot.querySelector("#challenge-rating");
        this.hp = this.shadowRoot.querySelector("#hp");
        this.hitDice = this.shadowRoot.querySelector("#hit-dice");

        this.speed = this.shadowRoot.querySelector("#speed");
        this.senses = this.shadowRoot.querySelector("#senses");
        this.languages = this.shadowRoot.querySelector("#languages");
        this.skill = this.shadowRoot.querySelector("#skills");

        this.strength = this.shadowRoot.querySelector("#strength");
        this.dexterity = this.shadowRoot.querySelector("#dexterity");
        this.constitution = this.shadowRoot.querySelector("#constitution");
        this.intelligence = this.shadowRoot.querySelector("#intelligence");
        this.wisdom = this.shadowRoot.querySelector("#wisdom");
        this.charisma = this.shadowRoot.querySelector("#charisma");

        this.ability = this.shadowRoot.querySelector("#abilities");
        this.action = this.shadowRoot.querySelector("#actions");
        this.actionLegend = this.shadowRoot.querySelector("#actions-legendary");

        this.favButton = this.shadowRoot.querySelector("#favorite-button");
        */
        this.closeButton = this.shadowRoot.querySelector("#close-button");

        this.name = this.shadowRoot.querySelector("#name");
        this.date = this.shadowRoot.querySelector("#date");
        this.engine = this.shadowRoot.querySelector("#engine");
        this.platforms = this.shadowRoot.querySelector("#platforms");
        this.thumbnail = this.shadowRoot.querySelector("#thumbnail");
        this.description = this.shadowRoot.querySelector("#description");
        this.link = this.shadowRoot.querySelector("#link");
        this.video = this.shadowRoot.querySelector("#video");

        this._object = null;
        this._createdDate = null;

        this._descriptions = null;

        /*
        this._skills = [];
        this._speeds = [];
        this._abilities = null;
        this._actions = null;
        this._actionsLegend = null;

        this._favorited = false;
        */

        this._parentCard = null;

        /*
        this.callback = () => {return}; // changes when used in favorites.js

        this.favorite = () => {
            console.log(this._object.name);
            if (!this.favorited) {
                storage.addFavorite(this._object);
                this.favorited = true;
                if (this._parentCard != null) {
                    this._parentCard.favorited = true;
                }
                firebase.writeFavorite(this._object);
                // this.favButton.innerHTML = "Unfavorite";
            } else {
                storage.removeFavorite(this._object);
                this.favorited = false;
                if (this._parentCard != null) {
                    this._parentCard.favorited = false;
                }
                firebase.removeFavorite(this._object);
                // this.favButton.innerHTML = "Favorite";
            }
        }
        */
    }

    
    connectedCallback() {
        /*
        this.favButton.onclick = () => {
            this.favorite();
            this.callback();
        }
        */

        this.closeButton.onclick = () => {
            if (this._parentCard != null) {
                this._parentCard.childFull = null;
            }
            // storage.setFull(null);
            this.remove();
        }
        
        this.render();
    }

    set object(val) {
        this._object = val;
    }
  
    get object() {
        return this._object;
    }

    set createdDate(val) {
        const d = new Date(val);
        this._createdDate = d;
    }

    get createdDate() {
        return this._createdDate;
    }

    set parentCard(val) {
        this._parentCard = val;
        this.render();
    }
  
    get parentCard() {
        return this._parentCard;
    }

    set descriptions(val) {
        this._descriptions = val;
        this.render();
    }
  
    get descriptions() {
        return this._descriptions;
    }

    /*
    set favorited(val) {
        this._favorited = val;
        this.render();
    }
  
    get favorited() {
        return this._favorited;
    }

    set speeds(val) {
        this._speeds = [...val];
        this.render();
    }
  
    get speeds() {
        return [...this._speeds];
    }

    set skills(val) {
        this._skills = [...val];
        this.render();
    }
  
    get skills() {
        return [...this._skills];;
    }
    
    set abilities(val) {
        this._abilities = val;
        this.render();
    }
  
    get abilities() {
        return this._abilities;
    }

    set actions(val) {
        this._actions = val;
        this.render();
    }
  
    get actions() {
        return this._actions;
    }

    set actionsLegend(val) {
        if (val == "") {
            this._actionsLegend = "None";
        } else {
            this._actionsLegend = val;
        }
        this.render();
    }
  
    get actionsLegend() {
        return this._actionsLegend;
    }
    */

    render() {
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...title...</i>";
        const date = this.getAttribute('data-date') ? this.getAttribute('data-date') : "none";
        const engine = this.getAttribute('data-engine') ? this.getAttribute('data-engine') : "none";
        const platforms = this.getAttribute('data-platforms') ? this.getAttribute('data-platforms') : "none";
        const thumbnail = this.getAttribute('data-thumbnail') ? this.getAttribute('data-thumbnail') : "./media/placeholderImage.png";
        const link = this.getAttribute('data-link') ? this.getAttribute('data-link') : "no link";
        const linkName = this.getAttribute('data-linkname') ? this.getAttribute('data-linkname') : "No Link";
        const video = this.getAttribute('data-video') ? this.getAttribute('data-video') : "";

        this.name.innerHTML = `${name}`;
        this.date.innerHTML = `<i>Created in ${date}</i>`;
        this.engine.innerHTML = `Tools: ${engine}`;
        this.platforms.innerHTML = `Platforms: ${platforms}`;
        this.thumbnail.src = `${thumbnail}`;

        if ((thumbnail == "./media/placeholderImage.png" && video != "") || (thumbnail != "./media/placeholderImage.png" && video != ""))
        {
            this.shadowRoot.querySelector("#card-image").classList.add('is-hidden');
            this.video.src = `${video}`;
        } else {
            this.shadowRoot.querySelector("#video").height = "0";
            this.shadowRoot.querySelector("#video").width = "0";
            this.shadowRoot.querySelector("#card-video").classList.add('is-hidden');
        }

        this.description.innerHTML = `${this._descriptions}`;

        if (link != "no link") {
            this.link.innerHTML = `Link: <a href="${link}">${linkName}</a>`;
        } else {
            this.link.innerHTML = `Link: ${linkName}`;
        }

        /*
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>monster name</i>";
        const alignment = this.getAttribute('data-alignment') ? this.getAttribute('data-alignment') : "none";

        const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "none";
        const size = this.getAttribute('data-size') ? this.getAttribute('data-size') : "small";
        const rating = this.getAttribute('data-rating') ? this.getAttribute('data-rating') : "0";
        const hp = this.getAttribute('data-hp') ? this.getAttribute('data-hp') : "0";
        const hitDice = this.getAttribute('data-dice') ? this.getAttribute('data-dice') : "none";

        const senses = this.getAttribute('data-senses') ? this.getAttribute('data-senses') : "none";
        const languages = this.getAttribute('data-languages') ? this.getAttribute('data-languages') : "None";

        const str = this.getAttribute('data-str') ? this.getAttribute('data-str') : "0";
        const dex = this.getAttribute('data-dex') ? this.getAttribute('data-dex') : "0";
        const con = this.getAttribute('data-con') ? this.getAttribute('data-con') : "0";
        const int = this.getAttribute('data-int') ? this.getAttribute('data-int') : "0";
        const wis = this.getAttribute('data-wis') ? this.getAttribute('data-wis') : "0";
        const cha = this.getAttribute('data-cha') ? this.getAttribute('data-cha') : "0";
        
        const typeCap = type.charAt(0).toUpperCase() + type.slice(1);

        this.name.innerHTML = `${name}`;

        const alignCap = alignment.charAt(0).toUpperCase() + alignment.slice(1);

        this.alignment.innerHTML = `Alignment: ${alignCap}`;

        this.type.innerHTML = `<b>Type:</b> ${typeCap}`;
        this.size.innerHTML = `<b>Size:</b> ${size}`;
        this.rating.innerHTML = `<b>Challenge Rating:</b> ${rating}`;
        this.hp.innerHTML = `<b>Hit Points:</b> ${hp}`;
        this.hitDice.innerHTML = `<b>Hit Dice:</b> ${hitDice}`;

        this.speed.innerHTML = this._speeds.map(sp =>`<li>${sp}</li>`).join("");
        
        this.senses.innerHTML = `<b>Senses:</b> ${senses}`;
        if (languages == "-") {
            this.languages.innerHTML = `<b>Languages:</b> None`;
        } else {
            this.languages.innerHTML = `<b>Languages:</b> ${languages}`;
        }

        if (this._skills.length == 0) {
            this.skill.innerHTML = `<li>None</li>`;
        } else {
            this.skill.innerHTML = this._skills.map(sk => `<li>${sk}</li>`).join("");
        }

        this.strength.innerHTML = `${str}`;
        this.dexterity.innerHTML = `${dex}`;
        this.constitution.innerHTML = `${con}`;
        this.intelligence.innerHTML = `${int}`;
        this.wisdom.innerHTML = `${wis}`;
        this.charisma.innerHTML = `${cha}`;

        this.ability.innerHTML = `${this._abilities}`;
        this.action.innerHTML = `${this._actions}`;
        this.actionLegend.innerHTML = `${this._actionsLegend}`;

        if (this.favorited) {
            this.favButton.innerHTML = "Unfavorite";
            this.favButton.classList.add("has-background-danger");
            this.favButton.classList.add("has-text-white");
        } else {
            this.favButton.innerHTML = "Favorite";
            this.favButton.classList.remove("has-background-danger");
            this.favButton.classList.remove("has-text-white");
        }
        */
    }
} // end class

customElements.define('works-full-info', WorksFullInfo);