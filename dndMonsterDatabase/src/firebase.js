import { getDatabase, ref, set, push, onValue, increment, get } from  "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDj1iTgiAyJu_df1AHqZLA33sLaPnzODs",
    authDomain: "dnd-monster-guide-e6695.firebaseapp.com",
    projectId: "dnd-monster-guide-e6695",
    storageBucket: "dnd-monster-guide-e6695.appspot.com",
    messagingSenderId: "930713512438",
    appId: "1:930713512438:web:976d45c69d90323ad23fd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const monsterRef = ref(db, 'favorites');

export const writeFavorite = (obj) => {
    const monstersRef = ref(db, 'favorites/' + obj.name);
    set(monstersRef, {
        obj,
        favorites: increment(1)
    });
};

export const removeFavorite = (obj) => {
    const monstersRef = ref(db, 'favorites/' + obj.name);
    set(monstersRef, {
        obj,
        favorites: increment(-1)
    });
};

export const checkFavorites = () => {
    get(monsterRef)
    .then(response => {
        response.forEach(fav => {
            const childData = fav.val();
            // if monster has negative favorite count, it is set to 0
            if (childData.favorites < 0) {
                const newMonsterRef = ref(db, 'favorites/' + fav.key);
                let obj = childData.obj;
                set(newMonsterRef, {
                    obj,
                    favorites: 0
                });
            }
        });
    }).catch(error => {
        console.log(error);
    });
}

export const getFavorites = (callback) => {
    const favorites = [];

    checkFavorites(); // ensures no monster in firebase database has negative favorite count

    get(monsterRef)
    .then(response => {
        // console.log(response.size);
        // console.log(response.json());
        response.forEach(fav => {
            // console.log(fav.val().obj);
            const childData = fav.val();
            favorites.push(childData);
        });
        callback(favorites);
    }).catch(error => {
        console.log(error);
    });
};

export {monsterRef, onValue};