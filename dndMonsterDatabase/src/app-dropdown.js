const filterButton = document.querySelector("#dropdown-button-filters");
const filterMenu = document.querySelector("#filters-dropdown");

const recentButton = document.querySelector("#dropdown-button-recents");
const recentMenu = document.querySelector("#recents-dropdown");

filterButton.addEventListener('click', () => {
    filterMenu.classList.toggle('is-active');
    if (recentMenu.classList.contains('is-active')) {
        recentMenu.classList.remove('is-active');
    }
    // console.log("Dropdown Clicked!");
});

recentButton.addEventListener('click', () => {
    recentMenu.classList.toggle('is-active');
    if (filterMenu.classList.contains('is-active')) {
        filterMenu.classList.remove('is-active');
    }
    // console.log("Dropdown Clicked!");
});