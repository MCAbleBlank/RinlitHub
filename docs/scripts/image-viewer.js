// 图片查看器功能
const imageViewer = document.getElementById('imageViewer');
const viewerImage = document.getElementById('viewerImage');
const closeViewer = document.getElementById('closeViewer');
const galleryLinks = document.querySelectorAll('.gallery-link');
const downloadBtn = document.getElementById('downloadBtn');

// 缩放相关变量
let currentScale = 1;
const minScale = 0.5;
const maxScale = 3;
const scaleStep = 0.1;

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
        viewerImage.src = link.href;
        imageViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 重置位置和缩放
        translateX = 0;
        translateY = 0;
        
        // 等待图片加载完成后计算初始缩放
        viewerImage.onload = function() {
            const containerWidth = window.innerWidth * 0.85;
            const containerHeight = window.innerHeight * 0.85;
            const imageRatio = this.naturalWidth / this.naturalHeight;
            const containerRatio = containerWidth / containerHeight;
            
            if (imageRatio > containerRatio) {
                currentScale = (containerWidth / this.naturalWidth) * 0.9;
            } else {
                currentScale = (containerHeight / this.naturalHeight) * 0.9;
            }
            
            updateImageTransform();
            updateScaleText();
        };
    });
});

// 更新图片变换
function updateImageTransform() {
    viewerImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

// 鼠标按下事件
viewerImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    viewerImage.classList.add('dragging');
});

// 鼠标移动事件
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
});

// 鼠标释放事件
window.addEventListener('mouseup', () => {
    isDragging = false;
    viewerImage.classList.remove('dragging');
});

// 下载按钮点击事件
downloadBtn.addEventListener('click', () => {
    // 在新窗口打开图片链接
    window.open(viewerImage.src, '_blank');
});

// 缩放图片
function zoomImage(delta) {
    const oldScale = currentScale;
    currentScale = Math.min(Math.max(currentScale + delta, minScale), maxScale);
    
    // 调整位置以保持缩放中心
    if (oldScale !== currentScale) {
        const scaleRatio = currentScale / oldScale;
        translateX = translateX * scaleRatio;
        translateY = translateY * scaleRatio;
    }
    
    updateImageTransform();
    updateScaleText();
}

// 关闭图片查看器
function closeImageViewer() {
    imageViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
    viewerImage.src = '';
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
    updateScaleText();
}

// 更新缩放文本显示
function updateScaleText() {
    scaleText.textContent = `${Math.round(currentScale * 100)}%`;
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