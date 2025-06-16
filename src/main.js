import { createApp } from 'vue';
import App from './App.vue';
import LiquidFrostedGlass from './components/LiquidFrostedGlass.vue';

// Create Vue application instance
const app = createApp(App);

// Register the component
app.component('LiquidFrostedGlass', LiquidFrostedGlass);

// Mount the app to the DOM
app.mount('#app');

// You can also mount a root component directly:
// createApp(LiquidFrostedGlass).mount('#app');
// For this example, we'll register it and use it in index.html for clarity. 