# 🚀 部署说明

## GitHub Pages 部署

项目已成功部署到 GitHub Pages！

### 🌐 访问链接

**网站地址：** https://514ctdawn.github.io/Star-Greenhouse-100-Survival/

这个链接可以直接分享给任何人，无需在本地运行服务器。

---

## 📝 部署步骤（已完成）

1. ✅ 安装 `gh-pages` 部署工具
2. ✅ 配置 `package.json` 添加部署脚本
3. ✅ 修改 `vite.config.js` 设置正确的 base 路径
4. ✅ 执行 `npm run deploy` 部署到 GitHub Pages

---

## 🔄 如何更新网站

每次修改代码后，只需运行：

```bash
npm run deploy
```

这个命令会：
1. 自动构建项目（`npm run build`）
2. 将 `dist` 文件夹部署到 `gh-pages` 分支
3. GitHub Pages 会自动更新网站内容

---

## ⚙️ 配置说明

### package.json
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### vite.config.js
```javascript
base: '/Star-Greenhouse-100-Survival/', // GitHub Pages 路径
```

---

## 🌟 其他部署选项

### Vercel（推荐用于 React/Vite 项目）

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Add New" > "Project"
4. 导入 `Star-Greenhouse-100-Survival` 仓库
5. 点击 "Deploy"

**优点：**
- 自动识别 Vite 配置
- GitHub 更新时自动重新部署
- 提供自定义域名
- 更快的 CDN

### Netlify

1. 访问 https://netlify.com
2. 使用 GitHub 账号登录
3. 点击 "Add new site" > "Import an existing project"
4. 选择仓库并配置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 "Deploy site"

---

## ✅ 部署检查清单

- [x] 项目已推送到 GitHub
- [x] 安装 gh-pages
- [x] 配置部署脚本
- [x] 设置正确的 base 路径
- [x] 执行部署
- [x] 验证网站可访问

---

## 🐛 常见问题

### 404 错误
- 确保 `vite.config.js` 中的 `base` 路径正确
- 路径应该是 `/仓库名/`（注意前后斜杠）

### 资源加载失败
- 检查浏览器控制台的错误信息
- 确保所有资源路径都是相对路径
- 重新运行 `npm run deploy`

### 更新不生效
- GitHub Pages 可能需要几分钟才能更新
- 清除浏览器缓存后重试
- 检查 `gh-pages` 分支是否有最新内容

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 检查 GitHub Actions 日志
2. 查看浏览器控制台错误
3. 确认仓库设置中的 Pages 配置正确

