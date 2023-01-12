// import * as storage from "./localStorage.js";
import * as ajax from "./ajax.js";
import * as creator from "./info-creator.js";
import "./navigation.js";

// const monsterList = [];
const cards = [];
const url = './data/projects.json';
let fullView = null;

/*
const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-button");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");
const searchLimit = document.querySelector("#search-limit");
const searchType = document.querySelectorAll("#search-type");
const searchSize = document.querySelectorAll("#search-size");
const searchOrder = document.querySelectorAll("#search-order");
const searchAlignment = document.querySelectorAll("#search-alignment");
const recents = document.querySelectorAll("#recent-list");
*/
const output = document.querySelector("#output");
/*
const resultsNav = document.querySelector("#result-navigation");
const mobileSelect = document.querySelector("#mobile-cards");
const resultNavList = document.querySelector("#result-nav-list");
const mobileResultNav = document.querySelector("#results-pages");
const mobilePages = document.querySelector("#page-selection");
*/

/*
searchButton.onclick = searchClicked;
searchBar.onchange = e => {storage.setSearchInput(e.target.value)};

let offset = -1;
let maxOffset = -1;

searchLimit.onchange = e => {storage.setLimit(e.target.value)};
/*

/*
for (let s of searchType) {
    s.onchange = e => {
        storage.setTypeFilter(e.target.value);
        matchSelects(e.target.value, searchType);
        // console.log("Type Changed!");
    };
}
for (let s of searchSize) {
    s.onchange = e => {
        storage.setSizeFilter(e.target.value);
        matchSelects(e.target.value, searchSize);
        // console.log("Size Changed!");
    };
}
for (let s of searchOrder) {
    s.onchange = e => {
        storage.setOrder(e.target.value);
        matchSelects(e.target.value, searchOrder);
        // console.log("Order Changed!");
    };
}
for (let s of searchAlignment) {
    s.onchange = e => {
        storage.setAlignmentFilter(e.target.value);
        matchSelects(e.target.value, searchAlignment);
        // console.log("Alignment Changed!");
    };
}
*/

/*
function searchClicked() {
    if (searchLimit.value == "Select Result Limit") {
        alert("Select a result limit!");
    } else {
        searchButton.classList.add('is-loading');
        resultsNav.classList.add('is-hidden');
    
        document.querySelector("#output").innerHTML = "Searching...";
    
        let url = "https://api.open5e.com/monsters";
    
        const limit = `/?limit=2000`; // loads everything from api
    
        let searchString = `&search=${searchBar.value}`;
    
        if (searchBar.value == "")
        {
            searchString = ``;
        }
    
        url += limit + searchString;
    
        // console.log(url);
    
        ajax.loadJSONFetch(url, loadCards);
    }
}
*/

/*
const showRecents = () => {
    const recentList = storage.getRecents();
    recentList.reverse();

    try {
        for (let r of recentList)
        {
            for (let list of recents) {
                const div = document.createElement("div");
                const a = document.createElement("a");
                a.innerHTML = r.name;
                div.appendChild(a);
                div.onclick = () => {
                    creator.showFullInfo(r);
                    updateRecents(r);
                };
                list.appendChild(div);
            }
        }
    } catch {
        recents.innerHTML = "No Recents Yet!";
    }
};
*/

function loadCards(json) {
    resetList();
    // console.log(json);
    const projects = json.works;
    console.log(projects);

    const sortedProjects = sortCards(projects);

    /*
    let resultLimit = searchLimit.value;

    if (searchLimit.value == "All") {
        resultLimit = 2000;
    }

    const sortedMonsters = sortCards(monsters); // sort monsters first then filter

    for (let m of sortedMonsters) {
        filterCards(m); // will see if the current monster is a valid result based on user's filters. if not, the monster is not added to the global list

        if (monsterList.length == resultLimit) // used to make sure number of returned cards is not greater than number requested
        {
            break;
        }
    }
    */

    if (sortedProjects.length == 0) {
        output.innerHTML = `<p>No results found...</p>`;

        /*
        // mobile changes
        let option = document.createElement("option");
        option.innerHTML = "No results found";
        mobileSelect.appendChild(option);

        offset = -1;
        maxOffset = -1;
        storage.setOffset(offset);
        storage.setMaxOffset(maxOffset);
        */
    } else {
        // sortCards(); // sorts the results based on user's parameters

        /*
        // only used if searchLimit.value == "All" and there are more than 20 results given the parameters
        if (monsterList.length > 20) {
            // reveals results navigation buttons
            if (resultsNav.classList.contains('is-hidden')) {
                resultsNav.classList.remove('is-hidden');
                mobileResultNav.classList.remove('is-hidden');
                backButton.classList.add('is-hidden'); // user starts at page 1 so back button doesn't need to appear
            }

            // used to know limit that user can increase page number to
            maxOffset = (monsterList.length - (monsterList.length % 20)) / 20;
            if (monsterList.length % 20 != 0) {
                maxOffset++;
            }

            for (let i = 0; i < maxOffset; i++) {
                let option = document.createElement("option");
                option.innerHTML = i + 1;
                mobilePages.appendChild(option);
            }
            // console.log("Max Offset: " + maxOffset);

            createPagination();

            // resultText.innerHTML = `${offset * 20} to ${(offset + 1) * 20} of ${monsterList.length}`;
        } else {
            resultsNav.classList.add('is-hidden');
            mobileResultNav.classList.add('is-hidden');
        }
        */

        // following makes it so it will only display at most 20 cards, regardless of set limit 
        for (let p of sortedProjects) {
            console.log(p);
            cards.push(creator.loadProjectCard(p, output));
            /*
            if (cards.length == 20) {
                break;
            }
            */
        }

        /*
        // clicking on cards will make it so they will be added to recents
        for (let c of cards) {
            c.recentCallback = updateRecents;
        }
        */
    }

    /*
    storage.setResults(monsterList);
    storage.setLimit(searchLimit.value);
    storage.setTypeFilter(searchType[0].value);
    storage.setSizeFilter(searchSize[0].value);
    storage.setAlignmentFilter(searchAlignment[0].value);
    storage.setOrder(searchOrder[0].value);
    storage.setSearchInput(document.querySelector("#search-bar").value);
    storage.setOffset(offset);
    storage.setMaxOffset(maxOffset);
    */

    // searchButton.classList.remove('is-loading');
}

/*
function filterCards(obj) {
    let fitsFilter = true;

    // check type filter
    if (searchType[0].value != "Filter by type") {
        const type = obj.type.toLowerCase();
        if (!type.includes(searchType[0].value.toLowerCase())) {
            fitsFilter = false;
        }
    }

    // check size filter
    if (searchSize[0].value != "Filter by size") {
        const size = obj.size.toLowerCase();
        if (size != searchSize[0].value.toLowerCase()) {
            fitsFilter = false;
        }
    }

    // checks alignment filter
    if (searchAlignment[0].value != "Filter by alignment") {
        const alignment = obj.size.toLowerCase();
        if (alignment != searchAlignment[0].value.toLowerCase()) {
            fitsFilter = false;
        }
    }

    // final check to make sure obj passed filters
    if (fitsFilter)
    {
        monsterList.push(obj);
    }
}
*/

// sorts end results based on input
function sortCards(list) {
    list.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
    return list;
}

// only called when a new search starts
function resetList() {
    output.innerHTML = "";
    // mobileSelect.options.length = 0;
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
    // monsterList.length = 0;
    cards.length = 0;
    // offset = 0;
    // maxOffset = 0;
}

/*
// given to all cards in new set of results
const updateRecents = (obj) => {
    storage.addRecent(obj);
    const recentList = storage.getRecents();
    recentList.reverse();
    for (let r of recents) {
        r.innerHTML = "";
        for (let m of recentList) {
            const div = document.createElement("div");
            const a = document.createElement("a");
            a.innerHTML = m.name;
            div.appendChild(a);
            div.onclick = () => {
                creator.showFullInfo(m);
                updateRecents(m);
            };
            r.appendChild(div);
        }
    }
    fullView = document.querySelector("p1-full-info");
};
*/

/*
// goes to next set of results
function nextSet() {
    if (offset < maxOffset) {
        offset++;
        changePage();
    }
}

// goes to last set of results
function previousSet() {
    if (offset > 0) {
        offset--;
        changePage();
    }
}

// used when page is changed
function changePage() {
    output.innerHTML = "";
    cards.length = 0;
    mobileSelect.options.length = 0;

    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }

    const offsetInt = parseInt(offset); // makes sure an int is being passed into the for loop

    for (let i = offset * 20; i < ((offsetInt + 1) * 20); i++) {
        if (i == monsterList.length) {
            break;
        } else {
            cards.push(creator.loadMonsterCard(monsterList[i], output));
        }
    }

    for (let c of cards) {
        c.recentCallback = updateRecents;
    }

    if (fullView != null) {
        for (let c of cards) {
            if (c.object.name == fullView.object.name) {
                fullView.parentCard = c;
                c.childFull = fullView;
                break;
            }
        }
    }

    // reveals or hides buttons depending on what page the user is on
    if (backButton.classList.contains('is-hidden')) {
        if (offset != 0) {
            backButton.classList.remove('is-hidden');
        }
    } else {
        if (offset == 0) {
            backButton.classList.add('is-hidden');
        }
    }

    if (nextButton.classList.contains('is-hidden')) {
        if (offset != maxOffset - 1) {
            nextButton.classList.remove('is-hidden');
        }
    } else {
        if (offset == maxOffset - 1) {
            nextButton.classList.add('is-hidden');
        }
    }

    createPagination();

    storage.setOffset(offset);
}
*/

/*
function newSelection() {
    if (mobileSelect.value != "No Search" && mobileSelect.options.length != 0) {
        for (let m of monsterList) {
            if (m.name == mobileSelect.value) {
                creator.showFullInfo(m);
                document.querySelector("#full-view").scrollIntoView({behavior: "smooth"});
                storage.setMobileSelection(m);
                storage.setFull(m);
                updateRecents(m);
                break;
            }
        }
    }
}

function newPage() {
    if (mobilePages.value != "No Page Selected" && mobilePages.options.length != 0) {
        offset = mobilePages.value - 1;
        changePage();
    }
}

// ensures the filter selections match on mobile and desktop
function matchSelects(value, elements) {
    for (let e of elements) {
        e.value = value;
    }
}

// creates page change buttons for desktop
function createPagination() {
    resultNavList.innerHTML = "";

    if (maxOffset > 3) {
        createPageLink(0);
        if (offset > 2 && offset < maxOffset - 3) {
            createPageLink(-1);
            createPageLink(offset - 1);
            createPageLink(offset);
            createPageLink(offset + 1);
            createPageLink(-1);
        } else if (offset <= 2) {
            createPageLink(1);
            createPageLink(2);
            createPageLink(-1);
        } else if (offset >= maxOffset - 3) {
            createPageLink(-1);
            createPageLink(maxOffset - 3);
            createPageLink(maxOffset - 2);
        }
        createPageLink(maxOffset - 1);
    } else {
        for (let i = 0; i < maxOffset; i++) {
            createPageLink(i);
        }
    }
    
}

// creates page change buttons for desktop
function createPageLink(number) {
    if (number != -1) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('pagination-link');
        a.innerHTML = number + 1;

        if (number != offset) {
            a.onclick = () => {
                offset = number;
                changePage();
            };
        } else {
            a.classList.add('has-text-white');
            a.classList.add('has-background-grey');
        }

        li.appendChild(a);
        resultNavList.appendChild(li);
    } else {
        const ellipsisLi = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('pagination-ellipsis');
        span.innerHTML = `&hellip;`;
        ellipsisLi.appendChild(span);
        resultNavList.appendChild(ellipsisLi);
    }
}
*/

/*
function initializeState() {
    searchLimit.value = storage.getLimit(); // this is set first to check if this is the user's first time using the app

    let oldResults = storage.getResults();
    mobileSelect.options.length = 0;
    mobilePages.options.length = 0;
    for (let obj of oldResults) {
        monsterList.push(obj);
    }

    if (searchLimit.value != "Select Result Limit") {
        if (monsterList.length != 0) {
            output.innerHTML = "";
        } else {
            output.innerHTML = `<p>No results found...</p>`;
            let option = document.createElement("option");
            option.innerHTML = "No results found";
            mobileSelect.appendChild(option);
        }
    } else {
        if (monsterList.length == 0) {
            let option = document.createElement("option");
            option.innerHTML = "Waiting for Results";
            mobileSelect.appendChild(option);
        } else {
            output.innerHTML = "";
        }
    }

    matchSelects(storage.getTypeFilter(), searchType);
    matchSelects(storage.getSizeFilter(), searchSize);
    matchSelects(storage.getAlignmentFilter(), searchAlignment);
    matchSelects(storage.getOrder(), searchOrder);

    offset = parseInt(storage.getOffset());

    maxOffset = parseInt(storage.getMaxOffset());

    if (monsterList.length > 20) { // if the user was previously on a different page of results than the first page
        // reveals results navigation buttons
        resultsNav.classList.remove('is-hidden');

        mobileResultNav.classList.remove('is-hidden');
        if (offset != -1) {
            for (let i = 0; i < maxOffset; i++) {
                let option = document.createElement("option");
                option.innerHTML = i;
                mobilePages.appendChild(option);
            }
            for (let o of mobilePages.options) {
                if (o.innerHTML == offset) {
                    mobilePages.value = o.innerHTML;
                    break;
                }
            }
        }

        if (offset != 0 && offset <= maxOffset - 1) {
            document.querySelector("#back-button").classList.remove('is-hidden');
        }
        if (offset != 0 && offset == maxOffset - 1) {
            document.querySelector("#next-button").classList.add('is-hidden');
        }
        changePage();

    } else { // always true when user is on first page of results or did not have "All" selected as result limit
        // the following makes it so the site will only display at most 20 cards, regardless of set limit
        for (let m of monsterList) {
            cards.push(creator.loadMonsterCard(m, output));
            if (cards.length == 20) {
                break;
            }
        }
        
        // clicking on cards will make it so they will be added to recents
        for (let c of cards) {
            c.recentCallback = updateRecents;
        }
    }

    // makes sure mobile selection is not blank
    if (storage.getMobileSelection() != null && searchLimit.value != "Select Result Limit") {
        mobileSelect.value = storage.getMobileSelection().name;
        if (mobileSelect.value == "") {
            cards.push(creator.loadMonsterCard(storage.getMobileSelection(), null));
            mobileSelect.value = storage.getMobileSelection().name;
        }
    }

    const fullObj = storage.getFull();
    if (fullObj != null) {
        fullView = creator.showFullInfo(fullObj);
        for (let c of cards) {
            if (c.object.name == fullObj.name) {
                fullView.parentCard = c;
                c.childFull = fullView;
                break;
            }
        }
    }
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

    ajax.loadJSONFetch(url, loadCards);
};

init();