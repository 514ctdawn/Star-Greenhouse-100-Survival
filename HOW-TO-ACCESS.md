# 🌐 如何正确访问网站

## ⚠️ 重要：不要直接打开本地 HTML 文件！

如果您看到以下错误：
```
file:///C:/src/main.jsx
Access to script at 'file:///...' from origin 'null' has been blocked by CORS policy
```

这说明您**直接双击打开了本地的 HTML 文件**，这是不对的！

## ✅ 正确的访问方式

### 方法 1：通过 GitHub Pages 访问（推荐）

**访问链接：**
```
https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
```

**步骤：**
1. 打开浏览器（Chrome、Edge、Firefox 等）
2. 在地址栏输入上面的 URL
3. 按 Enter

**不要：**
- ❌ 不要双击 `index.html` 文件
- ❌ 不要使用 `file://` 协议
- ❌ 不要直接打开本地文件

### 方法 2：使用本地开发服务器

如果您想在本地测试，必须使用服务器：

**双击 `start-game.bat` 文件**

或者手动运行：
```bash
npm run dev
```

然后访问：`http://localhost:5173`

## 🔍 如何判断您访问的方式是否正确？

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
4. **等待页面加载**

如果仍然看到错误，请：
1. 清除浏览器缓存（`Ctrl + Shift + Delete`）
2. 使用无痕模式（`Ctrl + Shift + N`）
3. 等待 5-10 分钟（GitHub Pages 可能需要时间更新）

