const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');
const navbar = document.querySelector("#navbar");
const backToTop = document.querySelector("#back-to-top");

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
        // console.log("scrolling down...");
        navbar.classList.add('is-hidden');
        // document.getElementById("logo").style.fontSize = "25px";
    } else {
        // console.log("scrolling up...");
        navbar.classList.remove('is-hidden');
        // document.getElementById("logo").style.fontSize = "35px";
    }
}

backToTop.addEventListener('click', () => {
    document.querySelector("#header").scrollIntoView({behavior: "smooth"});
})