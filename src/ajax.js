export function loadJSONFetch(concatURL, callback) {
    fetch(concatURL)
    .then(response => {
        // If the response is successful, return the JSON
        if (response.ok) {
            // console.log("fetch Successful");
            // console.log(response.json());
            return response.json();
        }

        // else throw an error that will be caught below
        return response.text().then(text =>{
            throw text;
        });
    }) // send the response.json() promise to the next .then()
    .then(json => { // the second promise is resolved, and `json` is a JSON object
        // document.querySelector("#search-button").classList.remove('is-loading');
        callback(json);
    }).catch(error => {
        // error
        console.log(error);
    });
}