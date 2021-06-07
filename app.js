"use strict";

let inFight = false;
const heroDataArray = JSON.parse(localStorage.getItem("savegame")) || [];

// initiate
document.addEventListener('DOMContentLoaded', function (e) {

    const heroCards = document.querySelectorAll('#heroes-container .hero-card')
    const heroDataCards = document.querySelectorAll('.hero-data-card')

    // heroCards.querySelector('.hero-portrait').style.backgroundImage = heroDataArray[0].portrait;
    console.log(heroDataCards)

    for (let i = 0; i < heroCards.length; i++) {
        heroCards[i].querySelector('.hero-portrait').style.backgroundImage = heroDataArray[i].portrait;
    }

    for (let i = 0; i < heroDataCards.length; i++) {
        heroDataCards[i].querySelector('.hero-name').textContent = heroDataArray[i].name;
    }

});

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
    const timer = ms => new Promise(res => setTimeout(res, ms));
    const partyInventory = document.querySelector('#party-inventory');
    const partyStatsCards = document.querySelectorAll('.hero-data-card');

    btnInventory.disabled = true;

    async function flip() {

        toggleInventory();
        toggleHeroStats();

        for (let i = 0; i < heroCards.length; i++) {
            heroCards[i].querySelector(".hero-card-inner").classList.toggle("flip-card");
            await timer(150); //time passed after each cardflip (next iteration)
        }

        await timer(800); // time bevor btn is anabled again
        btnInventory.disabled = false;
    }

    async function toggleInventory() {

        if (!inFight) {
            if (partyInventory.classList.contains("fadeOut")) {
                await timer(1200);
                partyInventory.classList.toggle("fadeOut");
                partyInventory.classList.toggle("fadeIn");
            } else {
                partyInventory.classList.toggle("fadeOut");
                partyInventory.classList.toggle("fadeIn");
            }
        }

    }

    async function toggleHeroStats() {

        if (!inFight) {
            await timer(1200);
            for (let statsCard of partyStatsCards) {
                if (statsCard.classList.contains("fadeOut")) {
                    statsCard.classList.toggle("fadeOut");
                    statsCard.classList.toggle("fadeIn");
                } else {
                    statsCard.classList.toggle("fadeOut");
                    statsCard.classList.toggle("fadeIn");
                }
            }
        }
    }

    flip();
}