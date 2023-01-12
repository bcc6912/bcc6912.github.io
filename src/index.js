import * as ajax from "./ajax.js";
import * as creator from "./info-creator.js";
import "./navigation.js";

/*
// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});
*/

// const projects = [];
const works = document.querySelector("#works");
const url = './data/projects.json';

const project1Name = document.querySelector("#project1Name");
const project1Info = document.querySelector("#project1Info");
const project1Thumbnail = document.querySelector("#project1Thumbnail");
const project1Link = document.querySelector("#project1Link");

const project2Name = document.querySelector("#project2Name");
const project2Info = document.querySelector("#project2Info");
const project2Thumbnail = document.querySelector("#project2Thumbnail");
const project2Link = document.querySelector("#project2Link");

const project3Name = document.querySelector("#project3Name");
const project3Info = document.querySelector("#project3Info");
const project3Thumbnail = document.querySelector("#project3Thumbnail");
const project3Link = document.querySelector("#project3Link");

/*
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
*/

function loadProjects(json) {
    // resetList();
    // console.log(json);

    const projects = json.works;
    // console.log(projects);

    const sortedProjects = sortCards(projects);

    if (sortedProjects.length == 0) {
        works.innerHTML = `<p>No projects found...</p>`;
    } else {
        const project1 = sortedProjects[0];
        project1Name.innerHTML = project1.name;
        let description1String = "";
        for (let d of project1.description) {
            description1String += `${d}<br><br>`;
        }
        description1String += `Platforms: ${project1.platforms}`;
        description1String += `<br><br>`;
        description1String += `<i>Created in ${project1.created}</i>`;
        project1Info.innerHTML = description1String;
        project1Thumbnail.src = `${project1.image}`;
        project1Link.href = `${project1.link}`;

        const project2 = sortedProjects[1];
        project2Name.innerHTML = project2.name;
        let description2String = "";
        for (let d of project2.description) {
            description2String += `${d}<br><br>`;
        }
        description2String += `Platforms: ${project2.platforms}`;
        description2String += `<br><br>`;
        description2String += `<i>Created in ${project2.created}</i>`;
        project2Info.innerHTML = description2String;
        project2Thumbnail.src = `${project2.image}`;
        project2Link.href = `${project2.link}`;

        const project3 = sortedProjects[2];
        project3Name.innerHTML = project3.name;
        let description3String = "";
        for (let d of project3.description) {
            description3String += `${d}<br><br>`;
        }
        description3String += `Platforms: ${project3.platforms}`;
        description3String += `<br><br>`;
        description3String += `<i>Created in ${project3.created}</i>`;
        project3Info.innerHTML = description3String;
        project3Thumbnail.src = `${project3.image}`;
        project3Link.href = `${project3.link}`;
    }

    /*
    const moreProjectsDiv = document.createElement("div");
    moreProjectsDiv.classList.add('column is-full has-text-centered');
    const moreProjectsLink = document.createElement("a");
    moreProjectsLink.classList.add('has-text-weight-bold is-size-4');
    moreProjectsLink.href = `works.html`;
    moreProjectsLink.innerHTML = "View More";
    moreProjectsDiv.appendChild(moreProjectsLink);
    works.appendChild(moreProjectsDiv);
    */
}

function sortCards(list) {
    list.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
    return list;
}

/*
// only called when a new search starts
function resetList() {
    works.innerHTML = "";
    // mobileSelect.options.length = 0;
    while (works.firstChild) {
        works.removeChild(works.firstChild);
    }
    // monsterList.length = 0;
    projects.length = 0;
    // offset = 0;
    // maxOffset = 0;
}
*/

const init = () => {
    /*
    showRecents();
    nextButton.onclick = nextSet;
    backButton.onclick = previousSet;

    mobileSelect.onchange = newSelection;
    mobilePages.onchange = newPage;

    searchBar.value = storage.getSearchInput();

    initializeState();
    */

    ajax.loadJSONFetch(url, loadProjects);
};

init();