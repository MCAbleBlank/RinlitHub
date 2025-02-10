const overlay = document.getElementById("overlay");
const declineButton = document.getElementById("decline-button");
const acceptButton = document.getElementById("accept-button");

function handleAccept(event) {
    event.preventDefault();
    // 跳转到画廊页面
    window.location.href = './gallery/';
}

function handleDecline(event) {
    event.preventDefault();
    window.location.href = 'https://classwidgets.rinlit.cn';
}

acceptButton.addEventListener("click", handleAccept);
declineButton.addEventListener("click", handleDecline);

// 初始化时禁止滚动
document.body.style.overflow = 'hidden';