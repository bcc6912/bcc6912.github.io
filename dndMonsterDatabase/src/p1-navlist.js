const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style></style>
<div class="tabs is-large is-full-width is-hidden-touch mb-0">
    <ul class="px-3">
        <li>
            <span class="icon">
                <i class="fa-solid fa-dice-d20 fa-lg"></i>
            </span>
        </li>
        <li id="home"><a href="home.html">Home</a></li>
        <li id="app"><a href="app.html">App</a></li>
        <li id="favorites"><a href="favorites.html">Favorites</a></li>
        <li id="community"><a href="community.html">Community</a></li>
        <li id="documentation"><a href="documentation.html">Documentation</a></li>
    </ul>
</div>
`;

class P1Navlist extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot`
        this.attachShadow({mode: "open"});

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.home = this.shadowRoot.querySelector("#home");
        this.app = this.shadowRoot.querySelector("#app");
        this.doc = this.shadowRoot.querySelector("#documentation");
        this.fav = this.shadowRoot.querySelector("#favorites");
        this.comm = this.shadowRoot.querySelector("#community");
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const current = this.getAttribute('data-active') ? this.getAttribute('data-active') : "home";

        if (current == "home") {
            this.home.classList.toggle('is-active');
            this.home.querySelector("a").href = "";
        } else if (current == "app") {
            this.app.classList.toggle('is-active');
            this.app.querySelector("a").href = "";
        } else if (current == "documentation") {
            this.doc.classList.toggle('is-active');
            this.doc.querySelector("a").href = "";
        } else if (current == "favorites") {
            this.fav.classList.toggle('is-active');
            this.fav.querySelector("a").href = "";
        } else if (current == "community") {
            this.comm.classList.toggle('is-active');
            this.comm.querySelector("a").href = "";
        }
    }
} // end class

customElements.define('p1-navlist', P1Navlist);