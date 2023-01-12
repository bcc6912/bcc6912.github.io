const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<footer class="has-background-black has-text-centered has-text-weight-bold is-size-4 py-6">
    <p class="has-text-white">&copy; Copyright 2022, Brian Corpus</p>
    <a class="has-text-white" href="works.html">Back to the top</a>
</footer>
`;

class PortfolioFooter extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.a = this.shadowRoot.querySelector('a');
    }

    connectedCallback() {
        this.a.onclick = () => {
            document.querySelector("header").scrollIntoView({behavior: "smooth"});
        };
    }
  } 
	
  customElements.define('portfolio-footer', PortfolioFooter);