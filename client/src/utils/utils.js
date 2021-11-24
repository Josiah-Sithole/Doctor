const cookie = require('js-cookie');

//Function for setting cookie
//check if window is open
const setCookie = (key, value) => {
    if(window != 'undefined'){
        cookie.set(key, value, {
            expires: 1
        })
    }
}
//Function for saving to localstorage
//Check if window is open
const saveToLocalstorage = (key, value) => {
    if(window != 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}
//Function for saving user info to storage 
const authenticateUser = (response, next) => {
    setCookie('token', response.data.token);
    saveToLocalstorage('user', response.data.user);
    next();
}

export {setCookie, saveToLocalstorage, authenticateUser}