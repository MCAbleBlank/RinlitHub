let galleryData = null;
let activeTag = 'all';

async function loadGallery() {
    try {
        const response = await fetch('../data/gallery.json');
        galleryData = await response.json();
        
        // 检查 URL 参数中是否有预选标签
        const urlParams = new URLSearchParams(window.location.search);
        const tagParam = urlParams.get('tag');
        if (tagParam && galleryData.tags[tagParam]) {
            activeTag = tagParam;
        }
        
        // 初始化标签筛选器
        initializeTagsFilter();
        
        // 渲染图片
        renderGallery();
        
        // 更新 URL
        updateURL();
        
    } catch (error) {
        console.error('加载图片数据失败:', error);
        showErrorMessage('加载失败，请刷新页面重试');
    }
}

function initializeTagsFilter() {
    const tagsFilter = document.getElementById('tagsFilter');
    tagsFilter.innerHTML = `<button class="tag-button ${activeTag === 'all' ? 'active' : ''}" data-tag="all">全部</button>`;
    
    // 为每个标签创建按钮
    Object.entries(galleryData.tags).forEach(([tagId, tagInfo]) => {
        const count = galleryData.images.filter(img => img.tags.includes(tagId)).length;
        const button = document.createElement('button');
        button.className = `tag-button ${activeTag === tagId ? 'active' : ''}`;
        button.dataset.tag = tagId;
        button.innerHTML = `
            <span class="tag-dot" style="background-color: ${tagInfo.color}"></span>
            ${tagInfo.name}
            <span class="tag-count">${count}</span>
        `;
        
        button.addEventListener('click', () => filterByTag(tagId));
        tagsFilter.appendChild(button);
    });
    
    // 添加"全部"按钮的点击事件
    document.querySelector('[data-tag="all"]').addEventListener('click', () => filterByTag('all'));
}

function filterByTag(tag) {
    activeTag = tag;
    
    // 更新按钮状态
    document.querySelectorAll('.tag-button').forEach(button => {
        button.classList.toggle('active', button.dataset.tag === tag);
    });
    
    // 更新 URL
    updateURL();
    
    // 使用过渡动画重新渲染画廊
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.style.opacity = '0';
    
    setTimeout(() => {
        renderGallery();
        galleryGrid.style.opacity = '1';
    }, 200);
}

function updateURL() {
    const url = new URL(window.location.href);
    if (activeTag === 'all') {
        url.searchParams.delete('tag');
    } else {
        url.searchParams.set('tag', activeTag);
    }
    window.history.pushState({}, '', url);
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    const filteredImages = galleryData.images.filter(image => 
        activeTag === 'all' || image.tags.includes(activeTag)
    );
    
    if (filteredImages.length === 0) {
        showEmptyMessage();
        return;
    }
    
    filteredImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const tags = image.tags.map(tagId => {
            const tagInfo = galleryData.tags[tagId];
            return `<span class="image-tag" style="background-color: ${tagInfo.color}">${tagInfo.name}</span>`;
        }).join('');
        
        galleryItem.innerHTML = `
            <div class="gallery-image-wrapper">
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
                <div class="image-overlay">
                    <button class="view-button">查看原图</button>
                </div>
            </div>
            <div class="gallery-content">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <div class="image-tags">${tags}</div>
            </div>
        `;
        
        // 添加点击事件
        const viewButton = galleryItem.querySelector('.view-button');
        viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            openImageViewer(image.src);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

function showEmptyMessage() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = `
        <div class="empty-message">
            <p>没有找到相关图片 😅</p>
            <button class="tag-button" onclick="filterByTag('all')">显示全部</button>
        </div>
    `;
}

function showErrorMessage(message) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button class="tag-button" onclick="location.reload()">重新加载</button>
        </div>
    `;
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadGallery);

// 初始化图片查看器
function initializeImageViewer() {
    const galleryLinks = document.querySelectorAll('.gallery-link');
    // ... 重新绑定图片查看器相关事件 ...
} 