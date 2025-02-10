async function loadGallery() {
    try {
        const response = await fetch('../data/gallery.json');
        const data = await response.json();
        const galleryGrid = document.getElementById('galleryGrid');
        
        data.images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <div class="gallery-image-wrapper">
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                </div>
                <div class="gallery-content">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                    <a href="${image.src}" class="gallery-link" target="_blank">查看原图</a>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
        
        // 重新初始化图片查看器的事件监听
        initializeImageViewer();
    } catch (error) {
        console.error('加载图片数据失败:', error);
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadGallery);

// 初始化图片查看器
function initializeImageViewer() {
    const galleryLinks = document.querySelectorAll('.gallery-link');
    // ... 重新绑定图片查看器相关事件 ...
} 