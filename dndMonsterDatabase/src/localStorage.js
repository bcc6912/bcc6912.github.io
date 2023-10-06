const defaultData = {
    "favorites": [],
    "recents": [],
    "results": [],
    "full": null,
    "searchInput": "",
    "order": "Name (A-Z)",
    "sizeFilter": "Filter by size",
    "typeFilter": "Filter by type",
    "alignmentFilter": "Filter by alignment",
    "limit": "Select Result Limit",
    "offset": -1,
    "maxOffset": -1,
    "mobileSelection": "No Search"
  },
  storeName = "bcc6912-p1-settings";
  
const readLocalStorage = () => {
    let allValues = null;
  
    try {
        allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    } catch(err) {
        console.log(`Problem with JSON.parse() and ${storeName} !`);
        throw err;
    }
  
    return allValues;
};
  
const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
};
  
export const clearLocalStorage = () => writeLocalStorage(defaultData);
  
export const addFavorite = (str) => {
    const allValues = readLocalStorage();
  
    allValues.favorites.push(str);
    writeLocalStorage(allValues);

    // console.log("Favorite added!");
};
  
export const getFavorites = () => readLocalStorage().favorites;

export const removeFavorite = (obj) => {
    const allValues = readLocalStorage();

    let index = 0;
    for (let f of allValues.favorites) {
        if (f.name == obj.name) {
            allValues.favorites.splice(index, 1);
            // console.log(allValues.favorites);
            writeLocalStorage(allValues);
            break;
        } 
        index++;
    }
};
  
export const clearFavorites = () => {
    const allValues = readLocalStorage();
  
    allValues.recents = [];
    allValues.favorites = [];
    writeLocalStorage(allValues);

    // console.log("Favorites cleared!");
};

export const addRecent = (obj) => {
    const allValues = readLocalStorage();

    let index = 0;
    for (let r of allValues.recents) {
        if (r.name == obj.name) {
            allValues.recents.splice(index, 1);
            writeLocalStorage(allValues);
            break;
        } 
        index++;
    }

    allValues.recents.push(obj);
    if (allValues.recents.length > 10) {
        while (allValues.recents.length > 10) {
            allValues.recents.shift();
        }
    }
    writeLocalStorage(allValues);
};
export const getRecents = () => readLocalStorage().recents;

export const setResults = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.results = obj;
    writeLocalStorage(allValues);
};
export const getResults = () => readLocalStorage().results;

export const setFull = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.full = obj;
    writeLocalStorage(allValues);
};
export const getFull = () => readLocalStorage().full;

export const setSearchInput = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.searchInput = obj;
    writeLocalStorage(allValues);
};
export const getSearchInput = () => readLocalStorage().searchInput;

export const setOrder = (obj) => {
    const allValues = readLocalStorage();
    allValues.order = obj;
    writeLocalStorage(allValues);
};
export const getOrder = () => readLocalStorage().order;

export const setSizeFilter = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.sizeFilter = obj;
    writeLocalStorage(allValues);
};
export const getSizeFilter = () => readLocalStorage().sizeFilter;

export const setTypeFilter = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.typeFilter = obj;
    writeLocalStorage(allValues);
};
export const getTypeFilter = () => readLocalStorage().typeFilter;

export const setAlignmentFilter = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.alignmentFilter = obj;
    writeLocalStorage(allValues);
};
export const getAlignmentFilter = () => readLocalStorage().alignmentFilter;

export const setLimit = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.limit = obj;
    writeLocalStorage(allValues);
};
export const getLimit = () => readLocalStorage().limit;

export const setOffset = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.offset = obj;
    writeLocalStorage(allValues);
};
export const getOffset = () => readLocalStorage().offset;

export const setMaxOffset = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.maxOffset = obj;
    writeLocalStorage(allValues);
};
export const getMaxOffset = () => readLocalStorage().maxOffset;

export const setMobileSelection = (obj) => {
    const allValues = readLocalStorage();
    
    allValues.mobileSelection = obj;
    writeLocalStorage(allValues);
};
export const getMobileSelection = () => readLocalStorage().mobileSelection;