const overlay = document.getElementById("overlay");
const declineButton = document.getElementById("decline-button");
const acceptButton = document.getElementById("accept-button");

function handleAccept(event) {
    event.preventDefault();
    // 跳转到画廊页面，可以带上标签参数
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    window.location.href = tag ? `./gallery/?tag=${tag}` : './gallery/';
}

function handleDecline(event) {
    event.preventDefault();
    window.location.href = 'https://classwidgets.rinlit.cn';
}

// 为标签添加点击事件
document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.preview-tag');
    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const tagName = tag.textContent.trim().split(' ')[0]; // 获取标签名称
            acceptButton.click(); // 模拟点击接受按钮
        });
    });
});

acceptButton.addEventListener("click", handleAccept);
declineButton.addEventListener("click", handleDecline);

// 初始化时禁止滚动
document.body.style.overflow = 'hidden';