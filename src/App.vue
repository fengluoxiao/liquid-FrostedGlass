<script setup>
import LiquidFrostedGlass from './components/LiquidFrostedGlass.vue';
import HomeView from './views/HomeView.vue';
import FindView from './views/FindView.vue';
import MeView from './views/MeView.vue';
import AboutView from './views/AboutView.vue';
import { ref } from 'vue';
import findUnselectedImg from './assets/find.png'; // 未选中状态的图片
import findSelectedImg from './assets/find-selected.png'; // 选中状态的图片

const myTabsData = ref([
  {
    name: 'Home',
    iconType: 'svg',
    iconContent: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 10L12 3L21 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" /><path d="M5 10V20H19V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" /></svg>'
  },
  {
    name: 'Find',
    iconType: 'img',
    iconContent: findUnselectedImg,
    iconSelectedContent: findSelectedImg
  },
  {
    name: 'Me',
    iconType: 'svg',
    iconContent: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="6" fill="currentColor" /><ellipse cx="12" cy="18.5" rx="8.5" ry="5" fill="currentColor" /></ellipse></svg>'
  },
  {
    name: 'About',
    iconType: 'svg',
    iconContent: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" /><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="16" r="1" fill="currentColor" /></svg>'
  }
]);

const myViews = ref([
  HomeView,
  FindView,
  MeView,
  AboutView
]);
</script>

<template>
  <LiquidFrostedGlass :tabsData="myTabsData" :views="myViews" />
</template>

<style>
/* 根据您的需要添加全局样式 */
</style>