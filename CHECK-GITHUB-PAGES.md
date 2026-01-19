# 🔍 检查 GitHub Pages 设置

## ⚠️ 如果仍然看到 404 错误

请按照以下步骤检查 GitHub Pages 设置：

### 步骤 1：检查 GitHub Pages 设置

1. 访问：https://github.com/514ctdawn/Star-Greenhouse-100-Survival/settings/pages

2. **确认以下设置：**
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` （不是 `main`！）
   - Folder: `/ (root)`

3. **如果设置不正确：**
   - 选择 `gh-pages` 分支
   - 点击 "Save"
   - 等待 5-10 分钟让 GitHub Pages 更新

### 步骤 2：验证 gh-pages 分支的内容

访问：https://github.com/514ctdawn/Star-Greenhouse-100-Survival/tree/gh-pages

**应该看到：**
- ✅ `index.html` - 应该包含 `/Star-Greenhouse-100-Survival/assets/index-XXXXX.js`
- ✅ `assets/` 文件夹
- ✅ `assets/index-XXXXX.js`
- ✅ `assets/index-XXXXX.css`

**不应该看到：**
- ❌ `src/` 文件夹
- ❌ `package.json`
- ❌ 其他源代码文件

### 步骤 3：查看 index.html 的原始内容

在 GitHub 上：
1. 进入 `gh-pages` 分支
2. 点击 `index.html`
3. 点击 "Raw" 按钮
4. **确认内容应该是：**

```html
<script type="module" crossorigin src="/Star-Greenhouse-100-Survival/assets/index-XXXXX.js"></script>
```

**不应该看到：**
```html
<script type="module" src="/src/main.jsx"></script>
```

### 步骤 4：如果 gh-pages 分支内容错误

如果 `gh-pages` 分支上的 `index.html` 仍然包含 `/src/main.jsx`，请：

1. **删除 gh-pages 分支：**
   ```bash
   git push origin --delete gh-pages
   ```

2. **重新部署：**
   ```bash
   npm run deploy
   ```

3. **等待 5-10 分钟**

4. **重新检查 GitHub Pages 设置**

### 步骤 5：清除浏览器缓存

1. 按 `Ctrl + Shift + Delete`
2. 清除"缓存的图片和文件"
3. 时间范围：全部时间
4. 使用无痕模式测试：`Ctrl + Shift + N`

## 🎯 正确的访问方式

**访问链接：**
```
https://514ctdawn.github.io/Star-Greenhouse-100-Survival/
```

**不要：**
- ❌ 直接打开本地 `index.html` 文件
- ❌ 使用 `file://` 协议
- ❌ 双击 HTML 文件

## 📝 验证清单

- [ ] GitHub Pages 设置指向 `gh-pages` 分支
- [ ] `gh-pages` 分支包含正确的 `index.html`
- [ ] `index.html` 引用构建后的文件（不是 `/src/main.jsx`）
- [ ] 使用浏览器访问 GitHub Pages URL（不是本地文件）
- [ ] 清除浏览器缓存
- [ ] 等待 5-10 分钟让 GitHub Pages 更新

## 🆘 如果问题仍然存在

请提供：
1. GitHub Pages 设置的截图（Settings > Pages）
2. `gh-pages` 分支上 `index.html` 的原始内容（Raw 视图）
3. 浏览器访问的实际 URL

