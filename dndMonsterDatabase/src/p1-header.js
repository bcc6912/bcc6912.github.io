const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Alice&display=swap');
h1 {
    font-family: 'Alice', serif;
    margin-left: 1rem;
    margin-top: .75rem;
    margin-bottom: .5rem;
}
h2 {
    margin-left: 1rem;
    margin-top: 0rem;
    font-weight: normal;
}
</style>
<header>
    <h1><slot name="page-title">IGME 330 Project 1</h1>
    <h2><slot name="page-description">This site allows you to search for monsters within 5th Edition Dungeons and Dragons. If you find any of them interesting, you can favorite them and quickly reference them in your next campaign!</h2>
</header>
`;

class P1Header extends HTMLElement {
    constructor() {
        super();
        // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot`
        this.attachShadow({mode: "open"});

        // 2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
} // end class

customElements.define('p1-header', P1Header);