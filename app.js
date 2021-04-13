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

    isFullscreen ? btnToggleFullScreen.style.backgroundImage="url(assets/menu-bar/fullscreen.png)" : btnToggleFullScreen.style.backgroundImage="url(assets/menu-bar/exitFullscreen.png)"
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

btnToggleFullScreen.onclick = toggleFullscreen;