const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style></style>
<div>
    <div id="favorite-counter" class="box has-text-centered has-text-white has-background-grey mx-3 my-1 py-1">
        <p>Likes: 0</p>
    </div>
    <div id="card-holder"></div>
</div>
`;

class P1CommunityCard extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot`
        this.attachShadow({mode: "open"});

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.cardHolder = this.shadowRoot.querySelector("#card-holder");
        this.likesText = this.shadowRoot.querySelector("p");
        this._likes = 0;
        this._object = null;
    }

    connectedCallback() {
        this.render();
    }

    set likes(val) {
        this._likes = val;
        this.render();
    }

    get likes() {
        return this._likes;
    }

    set object(val) {
        this._object = val;
    }
  
    get object() {
        return this._object;
    }

    render() {
        this.likesText.innerHTML = `Likes: ${this._likes}`;
    }
} // end class

customElements.define('p1-community-card', P1CommunityCard);