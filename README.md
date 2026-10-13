# Aoi Roux Trainers (桥式进阶训练器) 🧊

一个旨在辅助魔方桥式（Roux Method）日常训练的极简风辅助工具。基于 Onionhoney 的优秀开源项目进行了本土化适配与体验微调。

## 👨‍💻 关于本项目

本项目是 [Onionhoney's Roux Trainers](https://github.com/onionhoney/roux-trainers) 的优化版本。作为一名接触魔方不久的桥式爱好者（polo-aoi），为了在日常练习中获得更顺手、更沉浸的体验，我对原版进行了一点轻量级的“软装”与功能扩充。

## ✨ 核心优化与特性

* **🌊 连贯训练流 (Seamless Flow)**
    打通了 `FS` ➡️ `FBLP` ➡️ `SS` 的跳转逻辑，旨在为建立肌肉记忆和 Lookahead（预判衔接）的实战练习提供连贯的体验。
* **🎨 极简 UI 与本土化 (UI & Localization)**
    * 重新梳理底层的网格排版，追求更干净、克制的视觉体验。
    * 修复了中英文切换的细节问题。
    * 将打乱朝向适配为更直观的中文字样：“顶面/前面（底色/桥色）”。
* **⌨️ 交互微调 (Shortcut Tweaks)**
    * 修复了鼠标点击后，空格键（Spacebar）容易被 DOM 焦点劫持的 Bug。
    * 去除了实战盲练中容易误触的 `Enter` 键重置功能，专注计时与步骤流。

## 🚀 线上体验 (Live Demo)

🎉 **Vercel 部署地址：** https://polo-aoi.github.io/aoi-roux-trainers/#fs

## 🛠️ 本地运行 (Local Development)

如果你想在本地运行或二次修改本项目：

```bash
# 1. 克隆仓库
git clone [https://github.com/你的用户名/aoi-roux-trainer.git](https://github.com/你的用户名/aoi-roux-trainer.git)

# 2. 进入目录
cd aoi-roux-trainer

# 3. 安装依赖 (绝对不要上传 node_modules)
npm install

# 4. 启动本地预览
npm start

```

## ⚠️ 交流与指教

由于个人的魔方与代码资历尚浅，原版训练器中许多高阶、硬核的功能至今也还在努力摸索中。在微调代码的过程中难免会有新 Bug。
非常欢迎各位魔友多多指教！如果遇到体验不顺畅的地方，或有更好的创意，随时欢迎提 Issue 或直接联系我。

## ❤️ 致谢 (Credits)

* 本项目最核心的底层算法与框架均出自 **[Onionhoney](https://github.com/onionhoney)** 的开源心血。
* 原版开源 GitHub 仓库: [roux-trainers](https://github.com/onionhoney/roux-trainers)
* 最初灵感来源于 cubegrass.appspot.com

---

*Designed and optimized with ❤️ by polo-aoi.*

```

```
