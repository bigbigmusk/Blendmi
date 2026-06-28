# 免费上线指南 (Deploy for Free)

本项目可以 **完全免费** 部署，无需任何月费。下面是最简单的路径。

---

## 1. 免费部署到 Vercel（推荐）

Vercel 是 Next.js 官方平台，免费套餐对小品牌完全够用，自带 HTTPS、全球 CDN 和免费 `*.vercel.app` 域名。

**步骤：**

1. 代码已经在 GitHub 分支 `claude/blendmi-ecommerce-site-b24h76` 上。
2. 打开 <https://vercel.com> → 用 **GitHub 账号登录**（免费）。
3. 点击 **Add New → Project**，选择 `Blendmi` 仓库。
4. Vercel 会自动识别 Next.js，**无需任何配置**，直接点 **Deploy**。
5. 1～2 分钟后就能拿到一个线上网址，例如 `https://blendmi.vercel.app`。

> 之后每次 `git push`，Vercel 会自动重新部署。

绑定自己的域名（可选）：在 Vercel 项目的 **Settings → Domains** 里添加即可（域名本身需自行购买，部署不收费）。

---

## 2. 开启真实收款（Stripe，无月费）

网站默认是 **演示结账**（不真实扣款），一部署就能用。要收真钱：

1. 免费注册 <https://stripe.com>。
2. 在 Stripe 后台 → **Developers → API keys** 复制 **Secret key**
   （开发用 `sk_test_...`，正式收款用 `sk_live_...`）。
3. 回到 Vercel 项目 → **Settings → Environment Variables**，新增：
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** 你的密钥
4. 点 **Redeploy**。完成后结账会跳转到 Stripe 安全收银台，
   自动支持 **信用卡 / Apple Pay / Google Pay**，并自动收集收货地址。

Stripe 无月费，只对成功交易收取手续费（约 2.9% + $0.30/笔）。

---

## 2b. 开启 PayPal 收款（可选，无月费）

结账页已内置 PayPal 按钮，**配置后自动显示，不配置则自动隐藏**。

1. 免费登录 <https://developer.paypal.com/dashboard/applications> 创建一个 App，
   拿到 **Client ID** 和 **Secret**（先用 Sandbox 测试，正式收款再切 Live）。
2. 在 Vercel → **Settings → Environment Variables** 新增以下变量：
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID` = 你的 Client ID（浏览器端 SDK 需要）
   - `PAYPAL_CLIENT_ID` = 同一个 Client ID
   - `PAYPAL_CLIENT_SECRET` = 你的 Secret
   - `PAYPAL_ENV` = `sandbox`（测试）或 `live`（正式）
3. **Redeploy**。结账页就会在「按卡支付」下方出现 PayPal 按钮。

> Stripe 和 PayPal 可以同时开启，让顾客二选一；也可以只开其中一个。
> 金额都在服务端按商品库重新核对，防止前端篡改价格。

---

## 3. 本地开发

```bash
cp .env.example .env.local   # 可选：填入 STRIPE_SECRET_KEY 测试真实收款
npm install
npm run dev                  # http://localhost:3000
```

不填密钥时，结账走免费演示流程，方便先看效果。

---

## 4. 其它免费托管选项

| 平台 | 免费 | 说明 |
|------|------|------|
| **Vercel** | ✅ | Next.js 原生，推荐 |
| Netlify | ✅ | 需安装 Next.js 插件（自动） |
| Cloudflare Pages | ✅ | 支持 Next.js |

记得把社媒真实链接更新到 `lib/social.ts`，商品资料更新到 `lib/products.ts`。
