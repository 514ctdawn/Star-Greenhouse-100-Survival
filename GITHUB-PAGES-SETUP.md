# 🔧 GitHub Pages 设置指南

## 问题
GitHub Pages 没有正确加载，因为配置指向了错误的源分支。

## ✅ 解决方案（选择一种）

### 方法 1：使用 GitHub Actions 自动部署（推荐）⭐

**步骤：**

1. **确保工作流文件存在**
   - 文件：`.github/workflows/deploy.yml`
   - 已配置为自动构建和部署

2. **在 GitHub 上设置 Pages**
   - 访问：`https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages`
   - 在 "Source" 部分：
     - 选择：**"GitHub Actions"**
     - 不要选择 "Deploy from a branch"
   - 点击 **"Save"**

3. **触发部署**
   - 推送到 `main` 分支会自动触发部署
   - 或手动触发：Actions → Deploy to GitHub Pages → Run workflow

4. **等待部署完成**
   - 查看 Actions 标签页
   - 等待 "Deploy to GitHub Pages" 工作流完成
   - 通常需要 1-3 分钟

5. **访问网站**
   - 地址：`https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`

### 方法 2：手动指向 gh-pages 分支（快速修复）

**步骤：**

1. **访问 GitHub Pages 设置**
   - `https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages`

2. **配置 Source**
   - Source: **"Deploy from a branch"**
   - Branch: **"gh-pages"**
   - Folder: **"/ (root)"**
   - 点击 **"Save"**

3. **等待部署**
   - 等待 1-5 分钟让 GitHub Pages 更新

4. **访问网站**
   - `https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`

## 🔍 验证设置

### 检查 GitHub Pages 设置：
1. 访问仓库 Settings → Pages
2. 确认 Source 设置正确：
   - ✅ 使用 GitHub Actions（推荐）
   - 或 ✅ 使用 gh-pages 分支

### 检查部署状态：
1. 访问 Actions 标签页
2. 查看最新的工作流运行
3. 确认部署成功（绿色勾号）

### 检查网站：
1. 访问：`https://514ctdawn.github.io/Star-Greenhouse-100-Survival/`
2. 按 F12 打开开发者工具
3. 检查 Network 标签，确认文件加载正常
4. 不应该看到 404 错误

## 📝 重要提示

- **不要**将 Source 设置为 `main` 分支
- `main` 分支只有源代码，没有构建后的文件
- 构建后的文件在 `gh-pages` 分支或由 GitHub Actions 自动部署

## 🎯 推荐方案

**使用方法 1（GitHub Actions）**：
- ✅ 自动构建和部署
- ✅ 每次推送到 main 自动更新
- ✅ 不需要手动操作
- ✅ 更可靠

## 🚀 现在执行

1. 访问：`https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages`
2. 设置 Source 为 **"GitHub Actions"**
3. 保存
4. 等待部署完成
5. 访问网站

---

**如果仍有问题，检查 Actions 标签页中的错误信息。**
