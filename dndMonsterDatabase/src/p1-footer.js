const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
:host {
    display: block;
}
p, a {
    color: white;
    font-family: sans-serif;
    margin-top: .5rem;
    margin-bottom: .5rem;
}
a:hover {
    color: white;
}
</style>
<footer class="has-background-dark is-size-4 py-2 px-3">
    <p>&copy; Copyright 2022, Brian Corpus</p>
    <p>Current Page: <slot name="this-page"></slot></p>
    <a class="is-underlined">Back to Top</a>
</footer>
`;

class P1Footer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.a = this.shadowRoot.querySelector('a');
    }

    connectedCallback() {
        this.a.onclick = () => {
            document.querySelector("p1-navlist").scrollIntoView({behavior: "smooth"});
        };
    }
  } 
	
  customElements.define('p1-footer', P1Footer);