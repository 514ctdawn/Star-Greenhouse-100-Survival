# 🌐 如何访问网站

## ⚠️ 重要提示

**不要直接双击打开 `index.html` 文件！**

如果您看到以下错误：
```
file:///C:/src/main.jsx
Access to script at 'file:///...' from origin 'null' has been blocked by CORS policy
```

这说明您直接打开了本地的 HTML 文件。

## ✅ 正确的访问方式

### 方法 1：访问 GitHub Pages（推荐）

**在浏览器地址栏输入：**
```
https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
```

**步骤：**
1. 打开浏览器（Chrome、Edge、Firefox 等）
2. 在地址栏输入上面的 URL
3. 按 Enter

### 方法 2：使用启动脚本

**双击 `打开网站.bat` 文件**

这会自动在浏览器中打开 GitHub Pages。

### 方法 3：使用本地开发服务器

**双击 `start-game.bat` 文件**

这会启动本地开发服务器，然后访问：`http://localhost:5173`

## 🔍 如何判断访问方式是否正确？

### ✅ 正确的 URL（应该看到）：
- `https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`
- `http://localhost:5173`

### ❌ 错误的 URL（不应该看到）：
- `file:///C:/...`
- `C:\RightPick\Gaming_primary\index.html`

## 📝 检查清单

- [ ] 我使用的是浏览器地址栏，不是文件资源管理器
- [ ] URL 以 `http://` 或 `https://` 开头
- [ ] 不是 `file://` 开头
- [ ] 不是直接双击 HTML 文件

## 🚀 快速开始

1. **打开浏览器**
2. **在地址栏输入：** `https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`
3. **按 Enter**

或者：

1. **双击 `打开网站.bat` 文件**

## 💡 为什么不能直接打开 HTML 文件？

直接打开 HTML 文件时：
- 浏览器使用 `file://` 协议
- 浏览器安全策略会阻止加载 ES6 模块
- 会出现 CORS 错误

必须使用 HTTP/HTTPS 协议：
- GitHub Pages 提供 HTTPS 协议
- 本地开发服务器提供 HTTP 协议
- 这样才能正常加载 JavaScript 模块

---

**记住：永远使用浏览器访问 GitHub Pages URL，不要直接打开本地文件！**

