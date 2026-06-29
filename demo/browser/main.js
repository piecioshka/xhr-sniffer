'use strict';

function makeRequest() {
    const xhr = new window.XMLHttpRequest();
    xhr.open('GET', '/');
    xhr.send();
}

function makeFetch() {
    window.fetch('/');
}

makeRequest();
makeFetch();
