/*
Requires:
- api_url.js
*/

function checkAuth() {
    /* Check the validity of the access token in session storage. 
    
    Returns a promise that will resolve to the username in the token if the
    latter is valid, or will be rejected is the token is not valid.
    */

    const accessToken = window.sessionStorage.getItem("AccessToken");

    if(accessToken) {
        const url = apiUrl + "/auth/check?token=" + accessToken;
        return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        })
        .then(json => {
            return json['username']
        })
        .catch(res => {
            if (res.status == 401) {
                return Promise.reject();
            }
            throw new Error(
                `Login query returned unexpected ${res.status}.`
            );
        });
    } else {
        return Promise.reject();
    }
}