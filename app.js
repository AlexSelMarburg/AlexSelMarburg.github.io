"use strict";

//--toggle-fullscreen----------------------------------------------------
const btnToggleFullScreen = document.querySelector("#toggle-screen-size-btn")

function toggleFullscreen(event) {
    let element = document.documentElement;

    if (event instanceof HTMLElement) {
        element = event;
    }

    let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () {
        return false;
    };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
        return false;
    };

    isFullscreen ? btnToggleFullScreen.style.backgroundImage = "url(assets/menu-bar/fullscreen.png)" : btnToggleFullScreen.style.backgroundImage = "url(assets/menu-bar/exitFullscreen.png)"
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

btnToggleFullScreen.onclick = toggleFullscreen;

//---toggle-card-flip----------------------------------------------------------

const btnInventory = document.querySelector('#toggle-inventory-btn');

btnInventory.onclick = function (evt) {
    const heroCards = document.querySelectorAll('.hero-card');
    const timer = ms => new Promise(res => setTimeout(res, ms))
    btnInventory.disabled = true;

    async function flip() { 
        for (let i = 0; i < heroCards.length; i++) {
            heroCards[i].querySelector(".hero-card-inner").classList.toggle("flip-card");
            await timer(210);
        }
        btnInventory.disabled = false;
    }

    flip();
}
