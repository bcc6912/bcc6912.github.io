import "./p1-card.js";
import "./p1-full-info.js";
import "./p1-community-card.js";
import * as storage from "./localStorage.js";

// const output = document.querySelector("#output");
const mobileSelect = document.querySelector("#mobile-cards");

const loadMonsterCard = (obj, output) => {
    // add to desktop output
    let card = document.createElement("p1-card");
    card.dataset.name = obj.name ?? "no name found";
    card.dataset.type = obj.type ?? "?";
    card.dataset.size = obj.size ?? "?";
    card.dataset.rating = obj.challenge_rating ?? "";
    card.dataset.hp = obj.hit_points ?? "?";
    card.object = obj;
    card.id = `${obj.slug}`;

    let favorites = storage.getFavorites();
    for (let f of favorites) {
        if (f.name == obj.name) {
            card.favorited = true;
            break;
        }
    }

    if (output != null) {
        output.appendChild(card);
    }

    // add to mobile selection
    if (mobileSelect != null) {
        let option = document.createElement("option");
        option.innerHTML = obj.name;
        mobileSelect.appendChild(option);
    }

    return card;
};

const showFullInfo = obj => {
    let fullView = document.querySelector("#full-view");

    while (fullView.firstChild) {
        fullView.removeChild(fullView.firstChild);
    }

    const fullInfo = document.createElement("p1-full-info");
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
    try {
        for (let ability of obj.special_abilities) {
            abilityString += `<p><b>${ability["name"]}: </b><i>${ability["desc"]}</i></p>`;
        }
    }
    catch {
        abilityString = "No Special Abilities";
    }
    fullInfo.abilities = abilityString;

    let actionString = "";
    for (let action of obj.actions) {
        actionString += `<p><b>${action["name"]}: </b><i>${action["desc"]}</i></p>`;
    }
    fullInfo.actions = actionString;

    let legendString = "";
    try {
        for (let legend of obj.legendary_actions) {
            legendString += `<p><b>${legend["name"]}: </b><i>${legend["desc"]}</i></p>`;
        }
    }
    catch {
        legendString = "No Legendary Actions";
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

    return fullInfo;
};

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

export {loadMonsterCard, showFullInfo, createCommunityCard};