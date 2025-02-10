// 图片查看器功能
const imageViewer = document.getElementById('imageViewer');
const viewerImage = document.getElementById('viewerImage');
const closeViewer = document.getElementById('closeViewer');
const galleryLinks = document.querySelectorAll('.gallery-link');

// 缩放相关变量
let currentScale = 1;
const minScale = 0.5;
const maxScale = 5;
const scaleStep = 0.2;

// 拖拽相关变量
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

// 添加缩放控件引用
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');
const scaleText = document.getElementById('scaleText');

// 打开图片查看器
galleryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openImageViewer(link.href);
    });
});

// 打开图片查看器
function openImageViewer(imageSrc) {
    viewerImage.src = imageSrc;
    imageViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 重置位置和缩放
    resetImageTransform();
}

// 重置图片变换
function resetImageTransform() {
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// 更新图片变换
function updateImageTransform() {
    viewerImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    scaleText.textContent = `${Math.round(currentScale * 100)}%`;
}

// 开始拖拽
viewerImage.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // 只响应左键
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        viewerImage.classList.add('dragging');
    }
});

// 拖拽移动
window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateImageTransform();
    }
});

// 结束拖拽
window.addEventListener('mouseup', () => {
    isDragging = false;
    viewerImage.classList.remove('dragging');
});

// 缩放图片
function zoomImage(delta) {
    const newScale = currentScale + delta;
    if (newScale >= minScale && newScale <= maxScale) {
        currentScale = newScale;
        updateImageTransform();
    }
}

// 关闭图片查看器
function closeImageViewer() {
    imageViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetImageTransform();
}

// 鼠标滚轮缩放
imageViewer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -scaleStep : scaleStep;
    zoomImage(delta);
});

// 点击关闭按钮关闭查看器
closeViewer.addEventListener('click', closeImageViewer);

// 点击查看器背景关闭
imageViewer.addEventListener('click', (e) => {
    if (e.target === imageViewer) {
        closeImageViewer();
    }
});

// ESC键关闭图片查看器
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageViewer.classList.contains('active')) {
        closeImageViewer();
    }
});

// 添加缩放按钮事件监听
zoomInButton.addEventListener('click', () => zoomImage(scaleStep));
zoomOutButton.addEventListener('click', () => zoomImage(-scaleStep));

// 阻止页面上的图片被拖动
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// 为新加载的图片也添加阻止拖动
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeName === 'IMG') {
                node.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
            }
        });
    });
});

// 观察整个文档的变化
observer.observe(document.body, {
    childList: true,
    subtree: true
}); 