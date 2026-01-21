# 🚀 设置 GitHub Pages - 完整指南

## 问题
看到 "There isn't a GitHub Pages site here" 说明 GitHub Pages 还没有正确设置。

## ✅ 解决步骤

### 步骤 1：确保 gh-pages 分支存在并已推送

在命令行中运行：
```bash
npm run deploy
```

这会：
1. 构建项目（`npm run build`）
2. 将 `dist` 文件夹的内容推送到 `gh-pages` 分支

### 步骤 2：在 GitHub 上启用 GitHub Pages

1. **访问仓库设置页面**：
   ```
   https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages
   ```

2. **配置 Source**：
   - 在 "Source" 部分，选择 **"Deploy from a branch"**
   - Branch: 选择 **"gh-pages"**
   - Folder: 选择 **"/ (root)"**
   - 点击 **"Save"** 按钮

3. **等待部署**：
   - GitHub Pages 需要几分钟来构建和部署
   - 通常需要 1-5 分钟
   - 页面顶部会显示 "Your site is live at..." 当部署完成时

### 步骤 3：验证部署

部署完成后，访问：
```
https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
```

如果看到游戏界面，说明部署成功！

## 🔍 检查清单

- [ ] `gh-pages` 分支已创建并推送
- [ ] GitHub Pages Source 设置为 `gh-pages` 分支
- [ ] GitHub Pages Folder 设置为 `/ (root)`
- [ ] 已等待 1-5 分钟让 GitHub Pages 构建
- [ ] 可以访问网站（可能需要清除缓存）

## 📝 如果仍然不工作

### 检查 gh-pages 分支内容

在命令行运行：
```bash
git fetch origin gh-pages
git show origin/gh-pages:index.html
```

应该看到构建后的 `index.html`，包含：
- `/Star-Greenhouse-100-Survival/assets/index-xxx.js`
- `/Star-Greenhouse-100-Survival/assets/index-xxx.css`

**不应该**看到：
- `/src/main.jsx`（这是开发版本）

### 重新部署

如果 `gh-pages` 分支内容不正确：
```bash
npm run deploy
```

然后再次检查 GitHub Pages 设置。

## 🎯 快速操作

1. **运行部署命令**：
   ```bash
   npm run deploy
   ```

2. **访问设置页面**：
   https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages

3. **配置 Source**：
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Save

4. **等待并访问**：
   https://514ctdawn.github.io/Star-Greenhouse-100-Survival/

---

**记住：GitHub Pages 需要从 `gh-pages` 分支部署，而不是 `main` 分支！**
