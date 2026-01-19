# 🔧 修复 404 错误：main.jsx 无法加载

## 问题

如果您看到以下错误：
```
main.jsx:1 Failed to load resource: the server responded with a status of 404
```

这说明您**直接打开了本地的 `index.html` 文件**，而不是通过 GitHub Pages 访问。

## ✅ 解决方案

### 方法 1：访问 GitHub Pages（推荐）

**在浏览器地址栏输入：**
```
https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
```

**不要：**
- ❌ 双击 `index.html` 文件
- ❌ 使用 `file://` 协议
- ❌ 直接打开本地文件

### 方法 2：使用启动脚本

**双击 `打开网站.bat` 文件**

这会自动在浏览器中打开正确的 GitHub Pages URL。

### 方法 3：使用本地开发服务器

**双击 `start-game.bat` 文件**

这会启动本地开发服务器，然后访问：`http://localhost:5173`

## 🔍 为什么会出现这个错误？

### 开发版本 vs 生产版本

**开发版本（`index.html`）：**
```html
<script type="module" src="/src/main.jsx"></script>
```
- 只能在开发服务器运行时访问
- 直接打开文件会失败（404 错误）

**生产版本（`dist/index.html`）：**
```html
<script type="module" crossorigin src="/Star-Greenhouse-100-Survival/assets/index-XXXXX.js"></script>
<link rel="stylesheet" crossorigin href="/Star-Greenhouse-100-Survival/assets/index-XXXXX.css">
```
- 已编译和优化的文件
- 可以在 GitHub Pages 上正常访问

## 📝 检查清单

- [ ] 我使用的是浏览器地址栏，不是文件资源管理器
- [ ] URL 以 `https://` 开头（不是 `file://`）
- [ ] 不是直接双击 HTML 文件
- [ ] 访问的是 GitHub Pages URL

## 🚀 快速开始

1. **打开浏览器**
2. **在地址栏输入：** `https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`
3. **按 Enter**

或者：

1. **双击 `打开网站.bat` 文件**

## 🆘 如果问题仍然存在

1. **清除浏览器缓存：**
   - 按 `Ctrl + Shift + Delete`
   - 清除"缓存的图片和文件"
   - 时间范围：全部时间

2. **使用无痕模式：**
   - 按 `Ctrl + Shift + N`（Chrome）
   - 访问网站

3. **检查 GitHub Pages 设置：**
   - 访问：https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages
   - 确认 Source 是 `gh-pages` 分支
   - 确认路径是 `/ (root)`

---

**记住：永远不要直接双击 `index.html` 文件！**

