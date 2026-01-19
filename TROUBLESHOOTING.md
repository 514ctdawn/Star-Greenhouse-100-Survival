# 🔧 故障排除指南

## 404 错误：Failed to load main.jsx

如果您看到 "Failed to load main.jsx" 错误，请按照以下步骤解决：

### ✅ 解决方案 1：清除浏览器缓存（最重要）

1. **Chrome/Edge：**
   - 按 `Ctrl + Shift + Delete`
   - 选择"缓存的图片和文件"
   - 时间范围选择"全部时间"
   - 点击"清除数据"

2. **或者强制刷新：**
   - 按 `Ctrl + F5` 或 `Ctrl + Shift + R`
   - 这会强制浏览器重新加载所有资源

### ✅ 解决方案 2：等待 GitHub Pages 更新

GitHub Pages 可能需要 **5-10 分钟** 才能更新内容。

1. 检查部署是否完成：
   - 访问：https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages
   - 确认 "Source" 设置为 `gh-pages` 分支
   - 查看是否有部署状态

2. 等待几分钟后再次访问：
   - https://514ctdawn.github.io/Star-Greenhouse-100-Survival/

### ✅ 解决方案 3：检查 URL 是否正确

确保访问的是正确的 URL：
- ✅ 正确：`https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`
- ❌ 错误：`https://514ctdawn.github.io/Star-Greenhouse-100-Survival/index.html`
- ❌ 错误：`http://localhost:5173`（这是本地开发服务器）

### ✅ 解决方案 4：检查浏览器控制台

1. 按 `F12` 打开开发者工具
2. 切换到 "Console" 标签
3. 查看具体错误信息
4. 如果看到资源路径错误，说明需要等待 GitHub Pages 更新

### ✅ 解决方案 5：验证部署文件

检查 `gh-pages` 分支是否正确：

1. 访问：https://github.com/514ctdawn/Star-Greenhouse-100-Survival/tree/gh-pages
2. 确认有以下文件：
   - `index.html`
   - `assets/index-DnsFjRCT.js`
   - `assets/index-Ex6GwyET.css`

### ✅ 解决方案 6：重新部署

如果问题持续存在，可以重新部署：

```bash
npm run deploy
```

然后等待 5-10 分钟，清除浏览器缓存后重试。

---

## 🔍 常见错误及解决方法

### 错误 1：空白页面
- **原因：** JavaScript 文件未加载
- **解决：** 清除缓存，等待 GitHub Pages 更新

### 错误 2：样式丢失
- **原因：** CSS 文件路径错误
- **解决：** 检查 `vite.config.js` 中的 `base` 路径是否正确

### 错误 3：404 Not Found
- **原因：** GitHub Pages 还未更新或 URL 错误
- **解决：** 等待几分钟，确认 URL 正确

---

## 📞 验证网站是否正常

1. 访问：https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
2. 应该看到：
   - 深色背景
   - 顶部资源条（氧气、电力、生物废料）
   - 中央 10x10 网格
   - 右侧控制面板

如果看到这些内容，说明网站正常运行！

---

## 🚀 如果问题仍然存在

1. 检查 GitHub Actions（如果有）：
   - https://github.com/514ctdawn/Star-Greenhouse-100-Survival/actions

2. 检查仓库设置：
   - Settings > Pages
   - 确认 Source 是 `gh-pages` 分支
   - 确认路径是 `/ (root)`

3. 尝试使用无痕模式访问：
   - 按 `Ctrl + Shift + N`（Chrome）
   - 访问网站，看是否正常

4. 检查网络连接：
   - 确保可以访问 GitHub
   - 尝试使用其他网络

---

## 💡 提示

- GitHub Pages 更新通常需要 **5-10 分钟**
- 首次部署可能需要更长时间
- 清除浏览器缓存是最常见的解决方法
- 使用无痕模式可以排除缓存问题

