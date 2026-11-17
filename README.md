# 序白 XU BAI · 简约服装商城

基于 **uni-app + Vue 3 + TypeScript** 的服装品牌商城演示项目，一套代码同时支持：

- 📱 **微信小程序**（`mp-weixin`）
- 🌐 **手机浏览器 H5**（已部署到 GitHub Pages）

品牌定位：年轻人的简约服装品牌。配色为米白 `#f7f5f0`、黑色 `#1a1a1a`、浅灰 `#e8e5df`。

## 目录

```
xubai-mall/
├── src/
│   ├── data/          # 商品模拟数据（与页面分离，后续可直接换后台接口）
│   ├── store/         # 购物车 / 地址 / 订单状态（本地持久化）
│   ├── static/images/ # AI 生成的品牌海报、商品图
│   ├── static/tabbar/ # tabBar 图标
│   └── pages/         # 首页/分类/详情/购物车/下单/我的/订单/地址
├── tools/             # 生图与图标脚本（可删）
└── .github/workflows/ # H5 自动部署到 GitHub Pages
```

## 页面与功能

| 页面 | 功能 |
| --- | --- |
| 首页 | 品牌海报、新品推荐、商品列表 |
| 分类 | 上衣/裤装/外套/配饰，价格排序 + 颜色筛选 |
| 商品详情 | 图片轮播（可预览）、颜色/尺码/数量选择、加入购物车 |
| 购物车 | 勾选、修改数量、删除、合计计算 |
| 下单页 | 收货地址选择、商品清单、**模拟**提交订单 |
| 我的 | 订单列表、订单详情（含模拟支付）、地址管理 |

## 重要说明

- **模拟数据**：商品、价格、订单、支付均为前端模拟，不会发生任何真实交易与扣款；下单页/订单页均有醒目「模拟」标注。
- **本地存储**：购物车、地址、订单保存在本机（`uni.setStorageSync`），同时兼容 H5 与小程序，未使用仅浏览器支持的 API。
- **小程序 appid**：`src/manifest.json` 中 `mp-weixin.appid` 为空，请替换为自己的小程序 appid（可在微信公众平台注册，或用开发者工具的测试号）。

## 运行步骤（VS Code）

### 0. 准备环境

- 安装 [Node.js](https://nodejs.org/) 18+（LTS 版本即可）
- VS Code 建议插件：Vue - Official（Volar）、uni-app-snippet

### 1. 安装依赖

```bash
cd xubai-mall
npm install
```

### 2. H5 启动（手机浏览器）

```bash
npm run dev:h5
```

浏览器打开提示的地址（默认 `http://localhost:5173/xubai-mall/`），用手机模式（F12 → 设备模拟）体验最佳。

### 3. 微信小程序

```bash
npm run dev:mp-weixin
```

然后：

1. 打开【微信开发者工具】→ 导入项目
2. 目录选择 `xubai-mall/dist/dev/mp-weixin`
3. appid 填自己的（或选测试号），即可预览

生产构建：`npm run build:mp-weixin`，产物在 `dist/build/mp-weixin`。

### 4. H5 生产构建

```bash
npm run build:h5
```

产物在 `dist/build/h5`，任意静态托管均可部署。

## 接入真实后台

商品数据集中在 `src/data/goods.ts`，字段结构（`src/data/types.ts`）按常见商品模型设计。接入后台时：

1. 新建 `src/api/goods.ts`，用 `uni.request` 请求接口返回同结构数据
2. 页面中的 `import { goodsList } from '../data/goods'` 改为调用接口（配合 `ref` + `onLoad`/`onShow` 拉取）
3. 购物车/地址/订单的本地存储可逐步替换为服务端接口

## 图片素材说明

所有图片为 AI 生成（1024×1024），存放在 `src/static/images/`，同款商品的主图与细节图通过提示词约束保持款式、颜色一致。生图提示词如下（可复用再生成）：

**统一风格后缀**（所有商品图共用）：
> 极简电商服装商品摄影，浅米白色纯色背景，柔和均匀的自然光，居中构图，大量留白，高级质感，无文字无水印

| 文件 | 提示词 |
| --- | --- |
| poster.png | 服装品牌宣传海报，米白色背景上挂着一件米白色宽松衬衫与一条浅灰色休闲长裤的木质衣架挂拍组合，大面积留白，柔和晨光斜照产生淡淡阴影，极简主义构图，中文时尚杂志质感 |
| logo.png | 极简风格服装品牌徽标，正圆形，黑色细线条勾勒出一件简约衬衫的正面轮廓，米白色底色，矢量插画风格 |
| tee-white-1/2 | 纯白色宽松圆领短袖T恤，正面平铺拍摄 / 领口与棉质面料纹理特写 |
| hoodie-black-1/2 | 黑色宽松oversize连帽卫衣，正面挂拍 / 背面挂拍展示整体廓形 |
| trousers-cream-1/2 | 米白色直筒阔腿休闲长裤，正面平铺拍摄 / 腰头与垂坠面料细节特写 |
| cargo-black-1/2 | 黑色多口袋工装休闲长裤，正面挂拍 / 侧面挂拍，工装口袋细节特写 |
| blazer-grey-1/2 | 浅灰色落肩廓形西装外套，正面挂拍 / 翻领与纽扣细节特写 |
| trench-cream-1/2 | 米白色中长款翻领风衣，正面挂拍 / 背面挂拍展示整体廓形 |
| scarf-grey-1/2 | 浅灰色羊毛针织围巾，整齐叠放拍摄 / 针织纹理细节特写 |
| tote-cream-1/2 | 米白色帆布托特包，正面立放拍摄 / 袋口与帆布提手细节特写 |

替换素材时保持文件名不变即可，无需改代码。

## 在线访问（H5）

推送代码后由 GitHub Actions 自动构建部署：

- 仓库：`github.com/Qian0729/xubai-mall`
- 线上地址：`https://qian0729.github.io/xubai-mall/`

> 注意：`src/manifest.json` 中 `h5.router.base` 已设为 `/xubai-mall/` 以适配 GitHub Pages 子路径；若改为其他托管方式（根路径部署），改回 `"/"` 即可。
