# 如何在 Chrome 中打开游戏

## ⚠️ 重要提示
**不能直接双击打开 `dist\index.html`**，因为浏览器安全策略会阻止加载模块文件。必须使用本地服务器运行。

---

## 🚀 方法 1：使用开发服务器（最简单，推荐）

### 双击 `start-game.bat` 文件
- ✅ 自动启动开发服务器
- ✅ 自动在 Chrome 中打开游戏
- ✅ 支持热重载（修改代码后自动刷新）
- ✅ 访问地址：`http://localhost:5173`

---

## 📦 方法 2：使用预览服务器（测试构建版本）

### 双击 `start-game-preview.bat` 文件
- ✅ 先构建项目
- ✅ 启动预览服务器
- ✅ 自动在 Chrome 中打开游戏
- ✅ 访问地址：`http://localhost:4173`

---

## 🌐 方法 3：使用简单 HTTP 服务器

### 选项 A：使用 Python（如果已安装）
双击 `open-html-server.bat`
- 需要先运行 `npm run build`
- 使用 Python 的 HTTP 服务器
- 访问地址：`http://localhost:8000`

### 选项 B：使用 Node.js http-server
双击 `open-html-server-node.bat`
- 需要先运行 `npm run build`
- 使用 npx http-server
- 访问地址：`http://localhost:8000`

---

## 🔧 手动启动（命令行）

### 开发模式：
```bash
npm run dev
```
然后在浏览器访问：`http://localhost:5173`

### 预览构建版本：
```bash
npm run build
npm run preview
```
然后在浏览器访问：`http://localhost:4173`

---

## ❌ 为什么不能直接打开 HTML 文件？

直接打开 `dist\index.html` 会使用 `file://` 协议，浏览器会阻止：
- ES6 模块加载（`type="module"`）
- CORS 跨域请求
- 某些安全策略

**解决方案：必须使用本地服务器（`http://localhost`）**

---

## 📝 快速开始

1. **最简单的方法**：双击 `start-game.bat`
2. 等待几秒钟，Chrome 会自动打开游戏
3. 要停止服务器，在命令窗口按 `Ctrl+C`

