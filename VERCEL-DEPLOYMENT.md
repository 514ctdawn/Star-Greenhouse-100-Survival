# 🚀 Vercel 部署指南

## 快速部署到 Vercel（推荐）

Vercel 是最适合 React/Vite 项目的部署平台，提供免费的 HTTPS 域名和自动部署。

### 步骤 1：注册/登录 Vercel

1. 访问：https://vercel.com
2. 点击右上角 "Sign Up"
3. 选择 "Continue with GitHub"
4. 使用您的 GitHub 账号登录

### 步骤 2：导入项目

1. 登录后，点击 "Add New" > "Project"
2. 在 "Import Git Repository" 中找到您的仓库：
   - `514ctdawn/Star-Greenhouse-100-Survival`
3. 点击 "Import"

### 步骤 3：配置项目（Vercel 会自动检测）

Vercel 会自动检测到这是一个 Vite 项目，配置如下：

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**您不需要修改任何设置！** 直接点击 "Deploy" 即可。

### 步骤 4：等待部署完成

部署通常需要 1-2 分钟。完成后，您会看到：

- ✅ 部署成功页面
- 🌐 一个类似 `star-greenhouse-100-survival.vercel.app` 的网址

### 步骤 5：分享链接

将这个链接直接发给老板即可！例如：
```
https://star-greenhouse-100-survival.vercel.app
```

## ✨ Vercel 的优势

1. **自动部署：** 每次推送到 GitHub，Vercel 会自动重新部署
2. **HTTPS：** 自动提供 SSL 证书
3. **全球 CDN：** 网站加载速度快
4. **自定义域名：** 可以绑定自己的域名（可选）
5. **免费：** 个人项目完全免费

## 🔄 更新网站

以后每次更新代码：

1. 推送到 GitHub：
   ```bash
   git push origin main
   ```

2. Vercel 会自动检测并重新部署（通常 1-2 分钟）

3. 网站自动更新，无需任何操作！

## 📝 当前关卡配置

### Level A（基礎關卡）
- 總容量：100 格 (10×10)
- 廢料：0 格 (0%)
- 目標：40%
- 時間限制：60 秒

### Level B（進階關卡）
- 總容量：50 格 (10×5)
- 廢料：5 格 (10%)
- 目標：40%
- 時間限制：45 秒

### Level C（挑戰關卡）
- 總容量：80 格 (10×8)
- 廢料：8 格 (10%)
- 目標：25%
- 時間限制：30 秒

## ✅ 判定公式

```javascript
// 判斷方式：(手動填滿 + 廢料) 是否等於 (總格數 * 目標百分比 / 100)
const requiredCount = Math.round((totalCells * targetPercentage) / 100);
const currentTotal = manualFilledCount + wasteCount;
const isCorrect = currentTotal === requiredCount;
```

## 🎯 功能确认

- ✅ 多关卡系统（A → B → C → A）
- ✅ 动态网格大小
- ✅ 废料系统
- ✅ Apply 按钮在所有关卡都显示
- ✅ 精确的判定逻辑
- ✅ 关卡切换功能

## 📞 需要帮助？

如果部署过程中遇到问题：
1. 检查 GitHub 仓库是否正确连接
2. 确认 `package.json` 中有 `build` 脚本
3. 查看 Vercel 的部署日志

---

**部署完成后，您就可以直接分享链接给老板了！** 🎉

