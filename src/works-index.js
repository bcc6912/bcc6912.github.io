// import * as storage from "./localStorage.js";
import * as creator from "./info-creator.js";
// import * as firebase from "./firebase.js"

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<div class="column is-one-fourth" id="project">
    <div class="columns is-centered is-multiline">
        <h3 id="name" class="subtitle is-3 has-text-centered has-text-weight-bold has-text-black my-2">Amateur Rhythm Game</h3>
        <div id="link" class="box has-background-grey-darker">
        </div>
        <div class="box has-background-grey-lighter">
            <p id="projectInfo">Initial Description
                <br><br>
                Info about Project
                <br><br>
                Platforms
                <br><br>
                <i>Creation Month and Year</i>
            </p>
        </div>
    </div>
</div>
`;

class WorksIndex extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot`
        this.attachShadow({mode: "open"});

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.name = this.shadowRoot.querySelector("#name");
        // this.thumbnail = this.shadowRoot.querySelector("#thumbnail");
        this.projectInfo = this.shadowRoot.querySelector("#projectInfo");
        this.link = this.shadowRoot.querySelector("#link");
        
        // this.fullButton = this.shadowRoot.querySelector("#full-card");
        // this.favButton = this.shadowRoot.querySelector("#favorite");
        // this._object = null;
        this._createdDate = null;
        // this._favorited = false;
        // this._childFull = null;
        // this.favoriteCallback = () => {return;}; // changes when used in favorites.js
        // this.recentCallback = (_object) => {return;}; // changes when used in app.js

        /*
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
        */
    }

    connectedCallback() {
        this.render();
    }

    set createdDate(val) {
        const d = new Date(val);
        this._createdDate = d;
    }

    get createdDate() {
        return this._createdDate;
    }

    set descriptions(val) {
        this._descriptions = val;
        this.render();
    }
  
    get descriptions() {
        return this._descriptions;
    }

    set url(val) {
        this._url = val;
    }

    get url() {
        return this._url;
    }

    render() {
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...title...</i>";
        const date = this.getAttribute('data-date') ? this.getAttribute('data-date') : "none";
        // const engine = this.getAttribute('data-engine') ? this.getAttribute('data-engine') : "none";
        const platforms = this.getAttribute('data-platforms') ? this.getAttribute('data-platforms') : "none";
        const link = this.getAttribute('data-link') ? this.getAttribute('data-link') : "https://bcc6912.github.io/";
        const thumbnail = this.getAttribute('data-thumbnail') ? this.getAttribute('data-thumbnail') : "./media/placeholderImage.png";

        // const typeCap = type.charAt(0).toUpperCase() + type.slice(1)

        this.name.innerHTML = `${name}`;
        // this.date.innerHTML = `Created in ${date}`;
        // this.engine.innerHTML = `Tools: ${engine}`;
        // this.platforms.innerHTML = `Platforms: ${platforms}`;
        // this.thumbnail.src = `${thumbnail}`;
        // this.thumbnail.alt = `Thumbnail of ${name}`;
        if (link != 'https://bcc6912.github.io/') {
            this.link.innerHTML = `<a href="${link}"><img src="${thumbnail}" alt="Thumbnail of ${name}"></a>`;
        } else {
            this.link.innerHTML = `<a href="index.html#works"><img id="thumbnail" src="media/placeholderImage.png" alt="project"></a>`;
        }
        

        let infoString = ``;
        for (let d of this._descriptions){
            infoString += d;
            infoString += `<br><br>`;
        }
        infoString += `Platforms: ${platforms}`;
        infoString += `<br><br>`;
        infoString += `<i>Created in ${date}</i>`;
        this.projectInfo.innerHTML = `${infoString}`;
    }
} // end class

customElements.define('works-index', WorksIndex);