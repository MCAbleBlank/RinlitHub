const video = document.getElementById("video");
const overlay = document.getElementById("overlay");
const declineButton = document.getElementById("decline-button");
const acceptButton = document.getElementById("accept-button");
let hasClicked = false;

window.onbeforeunload = function () {
    if (hasClicked) return true;
};

function buttonClick1(event) {
    event.preventDefault();
    if (!hasClicked) hasClicked = true;
    overlay.hidden = true;
    video.play();
    videoClick();
}

function buttonClick2(event) {
    window.location.href = 'https://space.bilibili.com/569522843';
}

function videoClick(event) {
    if (event) event.preventDefault();
    const { documentElement } = document;
    if (documentElement.requestFullscreen) documentElement.requestFullscreen();
    else if (documentElement.mozRequestFullScreen) documentElement.mozRequestFullScreen();
    else if (documentElement.webkitRequestFullscreen) documentElement.webkitRequestFullscreen();
    else if (documentElement.msRequestFullscreen) documentElement.msRequestFullscreen();
}

acceptButton.addEventListener("click", buttonClick1);
declineButton.addEventListener("click", buttonClick2);
video.addEventListener("click", videoClick);