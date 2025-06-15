document.addEventListener('DOMContentLoaded', () => {
    // 获取所有标签
    const tabs = document.querySelectorAll('.logo');
    const sliderBg = document.querySelector('.slider-bg');
    const content = document.querySelector('.content');
    const glass = document.querySelector('.glass');
    
    // 动态获取tab宽度和gap
    const tabWidth = tabs[0].offsetWidth;
    const gap = parseInt(getComputedStyle(content).gap) || 0;

    // 移动滑块到指定索引
    function moveSlider(index) {
        sliderBg.style.transform = `translateY(-50%) translateX(${index * (tabWidth + gap)}px)`;
    }

    // 只变色联动
    function setActiveColor(index) {
        tabs.forEach((tab, i) => {
            const span = tab.querySelector('span');
            const svg = tab.querySelector('svg');
            if (i === index) {
                span.classList.add('logo-text-active');
                svg.classList.add('logo-svg-active');
            } else {
                span.classList.remove('logo-text-active');
                svg.classList.remove('logo-svg-active');
            }
        });
    }

    // 切换tab
    function activateTab(index) {
        tabs.forEach(t => t.classList.remove('logo_active'));
        tabs[index].classList.add('logo_active');

        // 添加冲水气球效果
        sliderBg.classList.add('is-squashing');
        setTimeout(() => {
            moveSlider(index);
        }, 0);
        setTimeout(() => {
            sliderBg.classList.remove('is-squashing');
        }, 250); // 确保在移动动画结束前恢复

        setActiveColor(index);
        switchPage(index);
    }

    // 普通点击
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('logo_active')) return;
            activateTab(index);
        });
    });
    // 默认激活第一个标签
    tabs[0].classList.add('logo_active');
    moveSlider(0);
    setActiveColor(0);

    // 长按滑动选中
    let isDragging = false;
    let lastIndex = 0;
    function getTabIndexFromEvent(e) {
        let clientX;
        if (e.touches) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        const rect = content.getBoundingClientRect();
        const x = clientX - rect.left;
        // 计算当前滑到哪个tab
        let idx = Math.floor(x / (tabWidth + gap));
        idx = Math.max(0, Math.min(tabs.length - 1, idx));
        return idx;
    }
    function onMove(e) {
        if (!isDragging) return;
        const idx = getTabIndexFromEvent(e);
        if (idx !== lastIndex) {
            activateTab(idx);
            lastIndex = idx;
        }
        e.preventDefault();
    }
    function addGlassActive() {
        glass.classList.add('glass-active');
    }
    function removeGlassActive() {
        glass.classList.remove('glass-active');
    }
    function onUp() {
        isDragging = false;
        removeGlassActive();
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
    }
    content.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastIndex = getTabIndexFromEvent(e);
        activateTab(lastIndex);
        addGlassActive();
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
    content.addEventListener('touchstart', (e) => {
        isDragging = true;
        lastIndex = getTabIndexFromEvent(e);
        activateTab(lastIndex);
        addGlassActive();
        document.addEventListener('touchmove', onMove, {passive: false});
        document.addEventListener('touchend', onUp);
    });
});

// 页面切换函数
function switchPage(index) {
    const pages = ['home', 'find', 'me', 'about'];
    console.log(`Switching to ${pages[index]} page`);
} 