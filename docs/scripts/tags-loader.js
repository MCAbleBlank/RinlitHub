async function loadTags() {
    try {
        const response = await fetch('data/gallery.json');
        const data = await response.json();
        const tagsPreview = document.getElementById('tagsPreview');
        
        // 计算每个标签的图片数量
        const tagCounts = {};
        data.images.forEach(image => {
            image.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        
        // 创建标签预览
        Object.entries(data.tags).forEach(([tagId, tagInfo]) => {
            const count = tagCounts[tagId] || 0;
            const tagElement = document.createElement('div');
            tagElement.className = 'preview-tag';
            tagElement.style.backgroundColor = tagInfo.color;
            
            tagElement.innerHTML = `
                ${tagInfo.name}
                <span class="tag-count">${count}</span>
            `;
            
            tagsPreview.appendChild(tagElement);
        });
        
    } catch (error) {
        console.error('加载标签数据失败:', error);
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadTags); 