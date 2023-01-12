import "./works-card.js";
import "./works-full-info.js";
import "./works-index.js";
// import * as storage from "./localStorage.js";

// const output = document.querySelector("#output");
// const mobileSelect = document.querySelector("#mobile-cards");

const loadProjectCard = (obj, output) => {
    // add to desktop output
    let card = document.createElement("works-card");
    card.dataset.name = obj.name ?? "no name found";
    // card.dataset.date = obj.created ?? "?";
    // card.dataset.engine = obj.engine ?? "?";
    // card.dataset.platforms = obj.platforms ?? "?";
    card.dataset.thumbnail = obj.image ?? "";
    card.object = obj;
    card.createdDate = obj.date ?? "9999-99";
    // card.id = `${obj.slug}`;

    /*
    let favorites = storage.getFavorites();
    for (let f of favorites) {
        if (f.name == obj.name) {
            card.favorited = true;
            break;
        }
    }
    */

    if (output != null) {
        output.appendChild(card);
    }

    /*
    // add to mobile selection
    if (mobileSelect != null) {
        let option = document.createElement("option");
        option.innerHTML = obj.name;
        mobileSelect.appendChild(option);
    }
    */

    return card;
};

const showFullInfo = obj => {
    let fullView = document.querySelector("#full-view");

    while (fullView.firstChild) {
        fullView.removeChild(fullView.firstChild);
    }

    const fullInfo = document.createElement("works-full-info");
    fullInfo.dataset.name = obj.name ?? "no name found";
    fullInfo.dataset.date = obj.created ?? "?";
    fullInfo.dataset.engine = obj.engine ?? "?";
    fullInfo.dataset.platforms = obj.platforms ?? "?";
    fullInfo.dataset.thumbnail = obj.image ?? "";
    fullInfo.object = obj;
    fullInfo.createdDate = obj.date ?? "9999-99";
    fullInfo.dataset.description = obj.description ?? "no description";
    fullInfo.dataset.link = obj.link ?? "https://bcc6912.github.io/";
    fullInfo.dataset.linkname = obj.linkname ?? "No Link";

    let descriptionString = "";
    for (let d of obj.description) {
        descriptionString += `<p>${d}</p>`;
    }
    fullInfo.descriptions = descriptionString;

    /*
    fullInfo.dataset.name = obj.name ?? "no name found";
    fullInfo.dataset.alignment = obj.alignment ?? "Unaligned";

    fullInfo.dataset.type = obj.type ?? "?";
    fullInfo.dataset.size = obj.size ?? "?";
    fullInfo.dataset.rating = obj.challenge_rating ?? "";
    fullInfo.dataset.hp = obj.hit_points ?? "?";
    fullInfo.dataset.dice = obj.hit_dice ?? "?";

    fullInfo.dataset.senses = obj.senses ?? "?";
    fullInfo.dataset.languages = obj.languages ?? "?";

    fullInfo.dataset.str = obj.strength ?? "?";
    fullInfo.dataset.dex = obj.dexterity ?? "?";
    fullInfo.dataset.con = obj.constitution ?? "?";
    fullInfo.dataset.int = obj.intelligence ?? "?";
    fullInfo.dataset.wis = obj.wisdom ?? "?";
    fullInfo.dataset.cha = obj.charisma ?? "?";

    const skillKeys = obj.skills;
    let skills = [];
    for(const [key, value] of Object.entries(skillKeys)){
        const skillName = key.charAt(0).toUpperCase() + key.slice(1)
        const skillString = `${skillName}: ${value}`;
        skills.push(skillString);
    }
    fullInfo.skills = skills;

    const speedKeys = obj.speed;
    let speeds = [];
    for(const [key, value] of Object.entries(speedKeys)){
        const speedName = key.charAt(0).toUpperCase() + key.slice(1)
        const speedString = `${speedName}: ${value}`;
        speeds.push(speedString);
    }
    fullInfo.speeds = speeds;

    let abilityString = "";
    for (let ability of obj.special_abilities) {
        abilityString += `<p><b>${ability["name"]}: </b><i>${ability["desc"]}</i></p>`;
    }
    fullInfo.abilities = abilityString;

    let actionString = "";
    for (let action of obj.actions) {
        actionString += `<p><b>${action["name"]}: </b><i>${action["desc"]}</i></p>`;
    }
    fullInfo.actions = actionString;

    let legendString = "";
    for (let legend of obj.legendary_actions) {
        legendString += `<p><b>${legend["name"]}: </b><i>${legend["desc"]}</i></p>`;
    }
    fullInfo.actionsLegend = legendString;

    fullInfo.object = obj;

    let favorites = storage.getFavorites();
    for (let f of favorites) {
        if (f.name == obj.name) {
            fullInfo.favorited = true;
            break;
        }
    }

    fullView.appendChild(fullInfo);

    try {
        if (document.querySelector("p1-header").dataset.title == "D&D Monster Guide App") {
            storage.setFull(obj);
        }
    } catch {
        console.log("Not on App Page!");
    }

    */
    
    fullView.appendChild(fullInfo);
    return fullInfo;
};

const loadIndexInfo = (obj, output) => {
    let indexInfo = document.createElement("works-index");
    indexInfo.dataset.name = obj.name ?? "no name found";
    indexInfo.dataset.date = obj.created ?? "?";
    // card.dataset.engine = obj.engine ?? "?";
    indexInfo.dataset.platforms = obj.platforms ?? "?";
    indexInfo.dataset.thumbnail = obj.image ?? "";
    indexInfo.createdDate = obj.date ?? "9999-99";
    indexInfo.dataset.description = obj.description ?? "no description";
    indexInfo.dataset.link = obj.link ?? "https://bcc6912.github.io/";

    let descriptionString = "";
    for (let d of obj.description) {
        descriptionString += `${d}<br><br>`;
    }
    indexInfo.descriptions = descriptionString;

    output.appendChild(indexInfo);
    return indexInfo;
}

/*
const createCommunityCard = (obj, likes) => {
    let output = document.querySelector('#output');
    let communityCard = document.createElement('p1-community-card');
    let cardHolder = communityCard.cardHolder;
    let card = loadMonsterCard(obj, cardHolder);
    card.object = obj;
    communityCard.object = obj;
    communityCard.likes = likes;

    output.appendChild(communityCard);
    return communityCard;
}
*/

export {loadProjectCard, showFullInfo, loadIndexInfo};