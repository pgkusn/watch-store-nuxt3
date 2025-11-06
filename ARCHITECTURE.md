# 手錶電商平台架構簡報

## 📋 專案概述

**專案名稱**: Watch Store Nuxt3
**專案類型**: 全端電子商務平台
**目標市場**: 台灣手錶線上購物
**技術架構**: Nuxt 3 全端框架 + Firebase 後端服務

### 核心功能
- 🛍️ 商品瀏覽與搜尋（依品牌分類）
- 🛒 購物車管理
- ❤️ 商品收藏清單
- 👤 會員系統（註冊、登入、個人資料管理）
- 📦 訂單建立與歷史查詢
- 📍 台灣地址選擇器（縣市區域）
- 📧 電子報訂閱功能

---

## 🏗️ 技術棧

### 前端技術
| 技術 | 版本 | 用途 |
|------|------|------|
| **Nuxt 3** | ^3.6.5 | Vue 全端框架 |
| **Vue 3** | latest | 前端框架 |
| **TypeScript** | - | 型別安全 |
| **Tailwind CSS** | ^6.3.1 | UI 樣式框架 |
| **Pinia** | ^2.0.30 | 狀態管理 |

### 後端服務
| 服務 | 用途 |
|------|------|
| **Firebase Realtime Database** | 商品、會員、訂單資料存儲 |
| **Firebase Authentication** | 使用者認證（Email/Password）|

### 第三方整合
| 套件 | 用途 |
|------|------|
| **AOS** | 滾動動畫效果 |
| **SweetAlert2** | 提示與對話框 |
| **GTM** | Google Tag Manager 追蹤 |
| **dayjs** | 日期處理 |
| **VueUse** | Vue 組合式工具集 |

---

## 📁 專案結構

```
watch-store-nuxt3/
│
├── 📄 pages/                    # 頁面路由（Nuxt 自動路由）
│   ├── index.vue                # 首頁（Hero Banner + 推薦商品）
│   ├── login.vue                # 登入頁
│   ├── signup.vue               # 註冊頁
│   ├── cart.vue                 # 購物車
│   ├── wishlist.vue             # 收藏清單
│   ├── member.vue               # 會員中心（受保護）
│   ├── member/
│   │   ├── index.vue            # 個人資料管理
│   │   └── order.vue            # 訂單歷史
│   ├── products/
│   │   └── [brand].vue          # 依品牌瀏覽商品
│   └── product/
│       └── [brand]/[id].vue     # 商品詳細頁
│
├── 🧩 components/               # 可重用組件
│   ├── ProductList.vue          # 商品列表網格
│   ├── ProductNav.vue           # 商品導航
│   ├── Pagination.vue           # 分頁組件
│   ├── HeaderBlock.vue          # 網站標頭
│   ├── FooterBlock.vue          # 網站頁尾
│   ├── CitySelect.vue           # 縣市區域選擇器
│   ├── Subscribe.vue            # 電子報訂閱
│   └── Alert.vue                # 提示訊息
│
├── 🗄️ stores/                   # Pinia 狀態管理
│   ├── main.ts                  # 全域狀態（提示訊息、縣市資料）
│   ├── product.ts               # 商品狀態（商品、購物車、收藏）
│   └── member.ts                # 會員狀態（認證、個人資料、訂單）
│
├── 🔧 composables/              # 組合式函數
│   ├── showList.ts              # 分頁邏輯（每頁 8 項）
│   └── formatPrice.ts           # 價格格式化（NT$）
│
├── 🛡️ middleware/               # 路由中介軟體
│   └── auth.ts                  # 身份驗證檢查
│
├── 🔌 plugins/                  # Nuxt 外掛
│   ├── sweetalert2.client.ts    # SweetAlert2 初始化
│   ├── aos.client.ts            # AOS 動畫初始化
│   └── directive.ts             # 自訂指令（v-focus）
│
├── 🌐 server/api/               # 後端 API 路由
│   └── cityList.get.ts          # 台灣縣市區域資料 API
│
├── 🎨 assets/                   # 靜態資源
│   ├── api.json                 # API 端點配置
│   ├── css/                     # 全域樣式
│   ├── scss/                    # SCSS 檔案
│   └── images/                  # 圖片資源
│
├── 📦 public/                   # 公開靜態檔案
│
└── ⚙️ 配置檔案
    ├── nuxt.config.ts           # Nuxt 配置
    ├── types.ts                 # TypeScript 型別定義
    ├── package.json             # 依賴套件
    └── tsconfig.json            # TypeScript 配置
```

---

## 🎯 核心功能架構

### 1. 路由系統

#### 公開路由
- `/` - 首頁
- `/login` - 登入
- `/signup` - 註冊
- `/products/[brand]` - 品牌商品列表
- `/product/[brand]/[id]` - 商品詳細頁
- `/cart` - 購物車
- `/wishlist` - 收藏清單

#### 受保護路由（需要登入）
- `/member` - 會員中心
- `/member/index` - 個人資料管理
- `/member/order` - 訂單歷史

**路由保護機制**: 使用 `auth.ts` middleware 檢查登入狀態，未登入者重導向至 `/login?redirect=member`

---

### 2. 狀態管理（Pinia Stores）

#### 📌 useMainStore（全域狀態）
```typescript
- alertMsg: 臨時提示訊息（1.3秒自動清除）
- cities: 台灣縣市區域資料
- getCities(): 從 Server API 取得縣市資料
- setAlertMsgHandler(): 顯示臨時提示
```

#### 🛍️ useProductStore（商品狀態）**【持久化】**
```typescript
- products: 所有商品資料
- states: 使用者的購物車與收藏（持久化至瀏覽器）
- getProducts(): 取得所有商品
- getProduct(id): 取得單一商品詳情
- updateState(): 新增/移除購物車或收藏項目
```

#### 👤 useMemberStore（會員狀態）**【持久化】**
```typescript
- loginInfo: 認證 Token 與使用者 ID（持久化至瀏覽器）
- profile: 使用者個人資料
- orders: 訂單歷史
- userLogin(): Firebase Email/密碼登入
- userSignUp(): Firebase 使用者註冊
- userLogout(): 登出並清除狀態
- readProfile(): 讀取個人資料
- updateProfile(): 更新個人資料
- updatePassword(): 變更密碼
- resetPassword(): 寄送密碼重設信
- readPreferences(): 讀取購物車與收藏
- updatePreferences(): 同步購物車與收藏至資料庫
- createOrder(): 建立新訂單
- readOrders(): 讀取訂單歷史
```

**持久化策略**: 使用 `@pinia-plugin-persistedstate/nuxt` 將 `loginInfo`（會員）與 `states`（購物車/收藏）自動儲存至瀏覽器儲存空間

---

### 3. API 架構

#### Firebase Realtime Database API
```
GET  /products.json                        # 取得所有商品
GET  /product/:id.json                     # 取得單一商品
GET  /member/:uid/profile.json             # 取得會員資料
PUT  /member/:uid/profile.json             # 更新會員資料
GET  /member/:uid/preferences.json         # 取得購物車與收藏
PUT  /member/:uid/preferences.json         # 更新購物車與收藏
GET  /orders.json                          # 取得所有訂單
POST /orders.json                          # 建立新訂單
```

#### Firebase Authentication API
```
POST /accounts:signInWithPassword          # 登入
POST /accounts:signUp                      # 註冊
POST /accounts:update                      # 變更密碼
POST /accounts:sendOobCode                 # 寄送密碼重設信
```

#### Nuxt Server API
```
GET /api/cityList                          # 取得台灣縣市區域資料
```

**環境變數配置**:
```env
NUXT_DB_API_URL          # Firebase Realtime Database URL
NUXT_AUTH_API_URL        # Firebase Auth API URL
NUXT_FIREBASE_API_KEY    # Firebase 專案 API Key
```

---

## 🔄 資料流架構

### 1. 使用者認證流程
```
使用者輸入 Email/密碼
    ↓
useMemberStore.userLogin()
    ↓
Firebase Auth API 驗證
    ↓
取得 idToken（JWT Token）
    ↓
儲存至 loginInfo（持久化）
    ↓
後續 API 請求帶入 idToken
```

### 2. 商品購買流程
```
瀏覽商品 → 加入購物車 → 購物車頁面
    ↓           ↓              ↓
Product     updateState()   結帳確認
Detail      (本地狀態)         ↓
                          createOrder()
                              ↓
                      儲存至 Firebase DB
                              ↓
                        會員訂單歷史
```

### 3. 狀態同步機制
- **本地優先**: 購物車與收藏先儲存至本地（Pinia Store + LocalStorage）
- **遠端同步**: 登入後透過 `updatePreferences()` 同步至 Firebase
- **資料載入**: 登入時透過 `readPreferences()` 從 Firebase 載入雲端資料

---

## 🎨 UI/UX 特色

### 響應式設計
- **Mobile First**: 優先針對行動裝置設計
- **Tailwind Breakpoints**: 使用 `md:` 和 `lg:` 斷點適配不同螢幕

### 動畫效果
- **AOS（Animate On Scroll）**:
  - Hero Banner 淡入效果
  - 商品列表滾動動畫
  - 使用屬性: `data-aos="fade-left"`, `data-aos="fade-right"`

### 使用者體驗優化
- **分頁機制**: 每頁顯示 8 項商品（購物車、商品列表）
- **自訂指令**: `v-focus` 自動對焦輸入欄位
- **價格格式化**: 統一顯示為 `NT$ X,XXX` 格式
- **即時提示**: 使用 SweetAlert2 顯示操作結果

---

## 🛠️ 開發與部署

### Node 版本需求
```
>= 22.0.0
```

### 開發指令
```bash
npm run dev          # 開發伺服器（讀取 .env.local）
npm run prod         # 正式環境開發伺服器
npm run build        # 建置正式版本
npm run generate     # 產生靜態網站
npm run preview      # 預覽建置結果
```

### 配置檔案

#### nuxt.config.ts 關鍵設定
```typescript
modules: [
  '@nuxtjs/tailwindcss',      // Tailwind CSS
  '@nuxt/devtools',           // 開發工具
  '@pinia-plugin-persistedstate/nuxt',  // Store 持久化
  '@pinia/nuxt',              // Pinia 整合
  '@zadigetvoltaire/nuxt-gtm' // GTM 追蹤
]

gtm: {
  id: 'GTM-WWTCV42S'          // Google Tag Manager ID
}

runtimeConfig: {
  public: {
    dbApiUrl: process.env.NUXT_DB_API_URL,
    authApiUrl: process.env.NUXT_AUTH_API_URL,
    firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY
  }
}
```

---

## 📊 核心資料結構

### 商品（Product）
```typescript
interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string[]
}
```

### 使用者資料（Profile）
```typescript
interface Profile {
  name: string
  gender: string
  cellPhone: string
  edm: boolean                    // 電子報訂閱同意
  address: {
    contact: Address              // 聯絡地址
    delivery: Address             // 配送地址
  }
}
```

### 地址（Address）
```typescript
interface Address {
  name: string                    // 收件人姓名
  cellPhone: string               // 聯絡電話
  city: string                    // 縣市
  area: string                    // 區域
  address: string                 // 詳細地址
}
```

### 訂單（Order）
```typescript
interface Order {
  orderID: string
  memberID: string
  content: OrderContent[]
  total: number
  createTime: number              // Unix Timestamp
}
```

---

## 🔐 安全性機制

### 認證與授權
- **Firebase Authentication**: Email/密碼認證
- **JWT Token**: 使用 `idToken` 進行 API 請求驗證
- **Route Middleware**: 保護會員專屬頁面
- **Cookie-based Auth State**: 透過 Cookie 檢查登入狀態

### 環境變數管理
- **敏感資訊**: API Key、URL 均透過環境變數管理
- **不同環境**: 開發環境使用 `.env.local`，正式環境使用系統環境變數

---

## 📈 分析與追蹤

### Google Tag Manager
- **GTM ID**: `GTM-WWTCV42S`
- **追蹤項目**:
  - 頁面瀏覽
  - 使用者互動
  - 轉換事件（加入購物車、完成訂單）

---

## 🌟 專案特色總結

### 技術亮點
✅ **全端 TypeScript** - 完整型別安全
✅ **Serverless 架構** - Firebase 後端服務
✅ **狀態持久化** - 購物車與登入狀態跨裝置同步
✅ **響應式設計** - Mobile-first 設計理念
✅ **SEO 友善** - Nuxt 3 SSR 支援
✅ **現代化工具鏈** - Vite、Tailwind CSS、Pinia

### 功能完整度
✅ 商品瀏覽與搜尋
✅ 購物車管理
✅ 收藏清單
✅ 會員系統
✅ 訂單管理
✅ 地址選擇器（台灣地區）
✅ 動畫效果
✅ 使用者追蹤（GTM）

### 開發體驗
✅ **TypeScript 型別安全**
✅ **Nuxt DevTools 整合**
✅ **Hot Module Replacement (HMR)**
✅ **自動導入（Auto-imports）**
✅ **File-based Routing**

---

## 📝 後台管理系統

專案包含獨立的後台管理系統，基於 [Admin Dashboard Template](https://justboil.me/tailwind-admin-templates/free-vue-dashboard/) 製作：

### 後台功能
- 商品 CRUD 操作
- 訂單管理
- 會員資料查詢

---

## 🎓 參考資源

- **設計稿**: https://reurl.cc/dGV2M6
- **Nuxt 3 文件**: https://nuxt.com/
- **Firebase 文件**: https://firebase.google.com/docs
- **Tailwind CSS**: https://tailwindcss.com/

---

**文件版本**: 1.0
**最後更新**: 2025-11-06
**Node 版本需求**: ≥ 22.0.0
