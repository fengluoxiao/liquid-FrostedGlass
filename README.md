# liquid-FrostedGlass

此模板旨在帮助您开始使用 Vite 进行 Vue 3 开发。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)。

## 自定义配置

请参阅 [Vite 配置参考](https://vite.dev/config/)。

## 项目设置

```sh
npm install
```

### 开发模式编译与热重载

```sh
npm run dev
```

### 生产模式编译与压缩

```sh
npm run build
```

## 使用方式

`LiquidFrostedGlass` 组件通过 `tabsData` 和 `views` 两个属性来渲染标签页和对应的内容视图。

您只需在您的 Vue 组件中传递这两个属性即可：

```vue
<template>
  <LiquidFrostedGlass :tabsData="myTabsData" :views="myViews" />
</template>

<script setup>
import { ref } from 'vue';
import LiquidFrostedGlass from './components/LiquidFrostedGlass.vue';
// 引入所有需要的视图组件，例如：
import HomeView from './views/HomeView.vue';
import FindView from './views/FindView.vue';
// ... 其他视图组件

// 定义 myTabsData 和 myViews 数组
// 具体结构请参考下面的 "属性 (Props)" 章节。
const myTabsData = ref([
  {
    name: '标签页名称', // 标签页显示的名称
    iconType: 'svg' || 'img' || 'icon', // 图标类型
    iconContent: 'SVG代码 或 未选中图片URL 或 字体图标类名', // 图标内容
    iconSelectedContent: '选中图片URL' // (可选) 仅当 iconType 为 'img' 时使用
  },
  // ... 更多标签页数据项
]);
const myViews = ref([
  HomeView,
  FindView,
  // MeView,
  // AboutView,
  // ... 更多视图组件
]);
</script>
```

### 属性 (Props)

- **`tabsData`**: (Array, 必填) 标签页的数据数组。每个对象应包含:
    - `name`: (String) 标签页显示的名称。
    - `iconType`: (String) 图标类型，可以是 `'svg'` (使用 SVG 代码), `'img'` (使用图片 URL), 或 `'icon'` (使用字体图标类名)。
    - `iconContent`: (String) 图标内容。如果是 `'svg'`，则是 SVG 字符串；如果是 `'img'`，则是未选中状态的图片 URL；如果是 `'icon'`，则是字体图标的类名。
    - `iconSelectedContent`: (String, 可选) 仅当 `iconType` 为 `'img'` 时使用，表示选中状态的图片 URL。
- **`views`**: (Array, 必填) 与 `tabsData` 顺序对应的组件数组。每个组件将作为标签页的内容视图被渲染。
