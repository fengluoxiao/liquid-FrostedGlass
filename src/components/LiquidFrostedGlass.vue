<template>
  <div>
    <component :is="currentViewComponent" class="view-content" />
    <div class="glass-container">
      <div class="glass" :style="glassStyle">
        <div class="content" ref="content"
             @mousedown="startDragHandler"
             @touchstart="startDragHandler">
          <div class="slider-bg" :class="{ 'is-squashing': isSquashing }" :style="sliderBgStyle"></div>
          <div v-for="(tab, index) in tabsData" :key="index"
            class="logo"
            :class="{ 'logo_active': activeTabIndex === index }"
            @click="handleTabClick(index)">
            <div class="logo-img">
              <div v-if="tab.iconType === 'svg'" v-html="tab.iconContent" class="current-icon" :class="{ 'logo-active-icon': activeTabIndex === index }"></div>
              <img v-else-if="tab.iconType === 'img'" :src="activeTabIndex === index ? tab.iconSelectedContent : tab.iconContent">
              <i v-else-if="tab.iconType === 'icon'" :class="[tab.iconContent, 'current-icon', { 'logo-active-icon': activeTabIndex === index }]"></i>
            </div>
            <span :class="{ 'logo-text-active': activeTabIndex === index }">{{ tab.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

// State variables (aligned with original index.js)
const activeTabIndex = ref(0);
const isGlassActive = ref(false);
const isSquashing = ref(false);

// Dimensions (will be dynamically calculated on mounted)
const tabWidth = ref(0); // Initialize as 0, will be updated
const gap = ref(0);      // Initialize as 0, will be updated

// Hardcoded dimensions for slider (from original glass.html)
const tabHeight = ref(50);
const logoImgSize = ref(45); 

// Dynamically calculated slider widths based on tabWidth
const computedSliderOriginalWidth = computed(() => tabWidth.value + 6); // Original was 86px (80 + 6)
const computedSliderSquashedWidth = computed(() => tabWidth.value + 16); // Original was 96px (80 + 16)
const sliderOriginalHeight = ref(64);
const sliderSquashedHeight = ref(50);

// Define props
const props = defineProps({
  tabsData: {
    type: Array,
    required: true,
    validator: (value) => {
      // Basic validation for tabsData structure to guide user
      return value.every(tab => {
        if (tab.iconType === 'img') {
          return tab.name && tab.iconType && tab.iconContent && tab.iconSelectedContent;
        } else {
          return tab.name && tab.iconType && tab.iconContent;
        }
      });
    }
  },
  views: {
    type: Array,
    required: true // Make views required
  }
});

// Tab data from props
const tabsData = computed(() => props.tabsData);

// Current view component from props
const currentViewComponent = computed(() => props.views[activeTabIndex.value]);

// DOM refs
const content = ref(null);

// Reactive styles for the glass effect (aligned with original glass.html)
const computedGlassWidth = computed(() => {
    // Calculate width based on number of tabs, tabWidth, gap, and glass padding (2 * 10px)
    return (tabsData.value.length * tabWidth.value) + ((tabsData.value.length - 1) * gap.value) + 20;
});

const glassStyle = computed(() => ({
    '--frost-blur': `${9}px`, 
    '--noise-frequency': '0.000',
    '--distortion-strength': '77',  
    'transform': `scale(${isGlassActive.value ? 1.05 : 1})`, 
    '--tint-opacity': isGlassActive.value ? '0.25' : '0.11' 
}));

// Reactive styles for the slider background (aligned with original index.js)
const sliderBgStyle = computed(() => {
    // Calculate X offset based on active tab and dynamically obtained dimensions
    const xOffset = activeTabIndex.value * (tabWidth.value + gap.value) - 3; // Adjusted for centering
    return {
        'transform': `translateY(-50%) translateX(${xOffset}px)`,
        'width': `${isSquashing.value ? computedSliderSquashedWidth.value : computedSliderOriginalWidth.value}px`, // Dynamic width
        'height': `${isSquashing.value ? sliderSquashedHeight.value : sliderOriginalHeight.value}px`,
    };
});

// Methods (aligned with original index.js)
const setActiveColor = (index) => {
    // Class bindings in template handle this directly
};

const activateTab = (index) => {
    if (activeTabIndex.value === index) { // Allow re-activation for squashing effect
        isSquashing.value = true;
        nextTick(() => {
            setTimeout(() => {
                isSquashing.value = false;
            }, 250); // Duration matches CSS transition
        });
    } else {
        isSquashing.value = true;
        nextTick(() => {
            setTimeout(() => {
                activeTabIndex.value = index; // Update index after squashing animation starts
                isSquashing.value = false;
            }, 250); // Duration matches CSS transition
        });
    }
};

const handleTabClick = (index) => {
    // Original logic: if (tab.classList.contains('logo_active')) return; activateTab(index);
    // In Vue, we just check activeTabIndex.value === index
    activateTab(index);
};

const addGlassActive = () => {
    isGlassActive.value = true;
};

const removeGlassActive = () => {
    isGlassActive.value = false;
};

// Drag functionality (aligned with original index.js)
let isDragging = false; // Using let for mutable state as in original JS
let lastIndex = 0;

const getTabIndexFromEvent = (e) => {
    let clientX;
    if (e.touches) {
        clientX = e.touches[0].clientX;
    } else {
        clientX = e.clientX;
    }
    if (!content.value) return 0; // Safety check for ref
    const rect = content.value.getBoundingClientRect();
    const x = clientX - rect.left;
    let idx = Math.floor(x / (tabWidth.value + gap.value));
    idx = Math.max(0, Math.min(tabsData.value.length - 1, idx));
    return idx;
};

const onMove = (e) => {
    if (!isDragging) return;
    const idx = getTabIndexFromEvent(e);
    if (idx !== lastIndex) {
        activateTab(idx);
        lastIndex = idx;
    }
    e.preventDefault(); // Prevent scrolling on touch devices
};

const onUp = () => {
    isDragging = false;
    removeGlassActive();
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
};

const startDragHandler = (e) => {
    isDragging = true;
    lastIndex = getTabIndexFromEvent(e);
    activateTab(lastIndex); // Activate on mousedown/touchstart too
    addGlassActive();
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
};

onMounted(() => {
    // Dynamically get tabWidth and gap on mount, like original index.js
    // Assuming the first .logo element is the first tab
    if (content.value && content.value.children.length > 1) { 
        // Iterate through children to find the first actual .logo element, skipping slider-bg
        const logoElements = Array.from(content.value.children).filter(child => child.classList.contains('logo'));
        if (logoElements.length > 0) {
            tabWidth.value = logoElements[0].offsetWidth; 
        } else {
             tabWidth.value = 80; // Fallback
        }
        const computedStyle = getComputedStyle(content.value);
        gap.value = parseInt(computedStyle.gap) || 0;
    } else {
        // Fallback to hardcoded values if dynamic calculation fails (e.g., content not yet rendered)
        tabWidth.value = 80;
        gap.value = 20;
    }
    
    // Initial tab activation as per original index.js
    activateTab(0);

    console.log('Dynamically calculated tabWidth:', tabWidth.value);
    console.log('Dynamically calculated gap:', gap.value);
});

onUnmounted(() => {
    // Clean up global event listeners
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
});
</script>

<style>
/* CSS Variables from original glass.html, for clarity and consistency */
/* Note: some of these are effectively overridden by computed properties or JS manipulation */
:root {
    --shadow-offset: 0;
    --shadow-blur: 5px;
    --shadow-spread: -1px;
    --shadow-color: rgba(255, 255, 255, 0.7);

    --tint-color: 255, 255, 255;
    --tint-opacity: 0.11; /* Default opacity, updated by JS for HDR effect */
    --tint-opacity-active: 0.25; /* Active state opacity for brightness */

    --frost-blur: 9px;

    /* SVG noise/distortion */
    --noise-frequency: 0.000;
    --distortion-strength: 77;

    /* Outer shadow blur */
    --outer-shadow-blur: 32px;
}

.glass-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}

.glass {
    /* width is now dynamic via glassStyle computed property */
    height: 50px;
    border-radius: 28px;
    cursor: grab;
    padding: 10px;
    isolation: isolate;
    touch-action: none;
    box-shadow: 0px 6px var(--outer-shadow-blur) rgba(0, 0, 0, 0.2);
    z-index: 0;
    transition: transform 0.35s cubic-bezier(.4,1.5,.5,1);
    position: fixed;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}

/* Pseudo-elements for glass effect - CRITICAL for matching original HTML */
.glass::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: 28px;
    box-shadow: inset var(--shadow-offset) var(--shadow-offset) var(--shadow-blur) var(--shadow-spread) var(--shadow-color);
    background-color: rgba(var(--tint-color), var(--tint-opacity));
    transition: background-color 0.35s ease;
}

.glass::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 28px;
    backdrop-filter: blur(var(--frost-blur));
    isolation: isolate;
    -webkit-backdrop-filter: blur(var(--frost-blur));
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    position: relative;
    gap: 20px; /* Changed from 32px to 20px for 400px glass width with 4 tabs */
    z-index: 1; /* Ensure content is above slider */
}

.content span {
    font-size: 14px;
    font-weight: 600;
    user-select: none;
}

.logo {
    width: 80px; /* Keep hardcoded for now, will be used in dynamic calculation */
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    cursor: pointer;
    margin-right: 0;
    padding-top: 5px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.logo:last-child {
    margin-right: 0;
}

.logo span,
.logo .current-icon {
    color: #fff;
    opacity: 0.85;
    transition: color 0.3s, opacity 0.3s;
}


.logo-img img, .logo-img svg{
    width: 30px;
    height: 30px;
    transition: color 0.3s, opacity 0.3s;
}

.logo-text-active {
    color: #3388bb !important;
    opacity: 1 !important;
}

.logo-active-icon {
    color: #3388bb !important;
    opacity: 1 !important;
}

.slider-bg {
    position: absolute;
    top: 50%;
    left: 0px; 
    /* width and height are now dynamic via sliderBgStyle computed property */
    border-radius: 28px;
    background-color: rgba(var(--tint-color), var(--tint-opacity)); 
    box-shadow: inset var(--shadow-offset) var(--shadow-offset) var(--shadow-blur) var(--shadow-spread) var(--shadow-color);
    transform: translateY(-50%) translateX(0); 
    transition: transform 0.5s cubic-bezier(.4,1.5,.5,1),
                width 0.5s cubic-bezier(.4,0,.5,1),
                height 0.5s cubic-bezier(.4,1.5,.5,1),
                background 0.5s; 
    z-index: 0;
}

.slider-bg.is-squashing {
    /* width and height are now dynamic via sliderBgStyle computed property */
}

.glass-active {
    transform: scale(1.05);
    transition: transform 0.5s;
    --tint-opacity: var(--tint-opacity-active);
}

.view-content {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2; /* Ensure it's behind the glass */
}
</style> 