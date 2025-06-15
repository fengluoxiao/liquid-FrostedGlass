# Liquid Frosted Glass (液态磨砂玻璃)

这是一个基于 [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass) 项目（灵感来源于 iOS 26 Liquid Glass 效果）的进一步演进。

**Liquid Frosted Glass** 在原有的液态玻璃效果基础上，专注于实现更细腻、更自然的**液态磨砂玻璃**质感和交互体验。

## 主要特性：

*   **优化动画平滑度**：调整了切换动画的缓动函数，使其更接近 iOS 系统级别的流畅与克制。
*   **HDR 亮度变化**：在点击 Tab 导航时，整个玻璃容器的背景亮度会发生平滑变化，模拟 HDR 效果。
*   **液态形变动画**：Tab 切换时，滑块背景会呈现独特的"冲水气球"般形变与恢复动画，增强液态感。
*   **沉浸式交互**：支持长按并滑动选择 Tab，带来更直观、响应式的触控体验。
*   **可定制的磨砂效果**：保留并优化了对玻璃磨砂、阴影、染色等参数的实时调整能力。

## 灵感来源：

该项目深度借鉴了 Apple 即将推出的 iOS 26 中的 Liquid Glass 设计理念，并在此基础上进行了创意性的拓展与优化。特别感谢 [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass) 提供的基础框架和灵感。

## 使用方法：

1.  在浏览器中打开 `glass.html` 文件。
2.  通过点击或长按滑动 Tab 导航，体验 Liquid Frosted Glass 的动态效果。

## 浏览器兼容性：

*   **推荐使用**：Chrome (macOS/Windows)
*   **注意**：`backdrop-filter` 和 SVG 滤镜的支持在不同浏览器中可能有所差异。 