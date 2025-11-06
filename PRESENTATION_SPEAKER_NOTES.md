# 手錶電商平台架構簡報 - 講者備忘錄

**文件用途**: 供簡報講者使用的詳細講解指南
**簡報檔案**: ARCHITECTURE_PRESENTATION.pptx
**預估時間**: 30-40 分鐘（可依需求調整）

---

## 簡報前準備事項

### 📋 事前檢查清單
- [ ] 確認投影設備正常運作
- [ ] 準備好專案 demo 環境（如需要）
- [ ] 瀏覽器開啟 GitHub repository（方便展示程式碼）
- [ ] 準備好常見問題的回答
- [ ] 測試網路連線（如需線上展示）

### 🎯 簡報目標
1. 讓聽眾理解專案的整體架構設計
2. 展示技術選型的考量與優勢
3. 說明核心功能的實作方式
4. 強調專案的技術亮點與特色

### 👥 目標聽眾
- 技術團隊成員
- 專案管理人員
- 潛在合作夥伴
- 技術面試官

---

## 投影片逐頁講解指南

### 第 1 張：標題投影片
**投影片標題**: 手錶電商平台架構簡報

#### 開場白範例
> "各位好，今天很高興能跟大家分享我們的手錶電商平台專案。這是一個使用 Nuxt 3 框架建置的全端電子商務系統，整合了 Firebase 作為後端服務。接下來大約 30 分鐘的時間，我會帶大家深入了解這個專案的技術架構、核心功能，以及一些技術上的亮點。"

#### 講解要點
- 簡單自我介紹（如適用）
- 說明簡報時間與流程
- 提醒聽眾可隨時提問或等到 Q&A 時間

#### 過場語
"首先，讓我們從專案的整體概述開始..."

---

### 第 2 張：專案概述
**投影片標題**: 專案概述

#### 講解要點

**1. 專案定位**
> "這是一個專門針對台灣市場設計的手錶電商平台。我們選擇了 Nuxt 3 全端框架搭配 Firebase 後端服務，目的是要快速建立一個功能完整且具備現代化使用者體驗的電商網站。"

**2. 核心功能說明**
依序介紹以下功能，並說明其重要性：

- **商品瀏覽與搜尋（依品牌分類）**
  - "使用者可以依照不同的手錶品牌來瀏覽商品，這是電商網站最基本也最重要的功能"

- **購物車管理**
  - "完整的購物車系統，支援商品數量調整、移除等操作"

- **商品收藏清單**
  - "使用者可以將喜歡的商品加入收藏，方便之後再次查看"

- **會員系統**
  - "包含註冊、登入、個人資料管理等完整功能，使用 Firebase Authentication 確保安全性"

- **訂單建立與歷史查詢**
  - "使用者可以建立訂單並查看過往的購買記錄"

- **台灣地址選擇器**
  - "專門針對台灣市場，提供縣市區域的選擇功能"

- **電子報訂閱功能**
  - "幫助平台維持與客戶的互動關係"

#### 重點強調
"這些功能涵蓋了一個電商平台從瀏覽、選購到結帳的完整流程，是一個功能完整的解決方案。"

#### 過場語
"接下來，讓我們看看支撐這些功能背後的技術棧..."

---

### 第 3 張：技術棧
**投影片標題**: 技術棧

#### 講解要點

**1. 前端技術選型**

> "在前端技術的選擇上，我們使用了現代化的技術堆疊："

- **Nuxt 3 (^3.6.5)**
  - "Nuxt 3 是 Vue 的全端框架，提供 SSR（伺服器端渲染）能力，對 SEO 非常友善"
  - "它的 file-based routing 讓路由管理變得非常直觀"

- **Vue 3**
  - "使用最新版本的 Vue，享受 Composition API 帶來的更好的程式碼組織能力"

- **TypeScript**
  - "全專案使用 TypeScript，提供完整的型別安全，減少執行時期錯誤"

- **Tailwind CSS (^6.3.1)**
  - "Utility-first 的 CSS 框架，開發速度快且容易維護"
  - "原子化 CSS 讓樣式管理更加模組化"

- **Pinia (^2.0.30)**
  - "Vue 官方推薦的狀態管理工具，比 Vuex 更輕量且類型安全"

**2. 後端服務說明**

> "後端我們選擇了 Firebase 的服務："

- **Firebase Realtime Database**
  - "NoSQL 即時資料庫，儲存商品、會員、訂單等資料"
  - "即時同步的特性讓資料更新非常快速"

- **Firebase Authentication**
  - "提供安全可靠的使用者認證機制"
  - "我們使用 Email/Password 認證方式"

**3. 第三方整合**

簡短介紹重要的第三方套件：
- **AOS**: 滾動動畫效果，提升使用者體驗
- **SweetAlert2**: 美觀的提示與對話框
- **GTM**: Google Tag Manager，用於追蹤使用者行為
- **dayjs**: 輕量的日期處理函式庫
- **VueUse**: 實用的 Vue Composition utilities

#### 重點強調
"這套技術棧的選擇考量了開發效率、效能表現、以及長期維護性。Nuxt 3 + Firebase 的組合讓我們能夠快速迭代，同時保持程式碼品質。"

#### 過場語
"了解了技術棧之後，讓我們看看專案的整體結構..."

---

### 第 4 張：專案結構
**投影片標題**: 專案結構

#### 講解要點

> "這張投影片展示了專案的目錄結構，我會挑幾個重要的資料夾來說明："

**1. pages/ 目錄**
- "Nuxt 的 file-based routing 核心，每個 .vue 檔案自動對應到一個路由"
- "例如 pages/index.vue 對應到首頁 '/'"
- "pages/product/[brand]/[id].vue 是動態路由，處理商品詳細頁"

**2. components/ 目錄**
- "存放可重用的 Vue 組件"
- "例如 ProductList、Pagination 等都是跨頁面使用的組件"

**3. stores/ 目錄**
- "Pinia 狀態管理的核心"
- "分為三個主要 store：main（全域）、product（商品）、member（會員）"
- "這樣的分類讓狀態管理更加清晰"

**4. composables/ 目錄**
- "存放可重用的組合式函數"
- "例如分頁邏輯、價格格式化等工具函數"

**5. middleware/ 目錄**
- "路由中介軟體，特別是 auth.ts 用來保護需要登入的頁面"

**6. plugins/ 目錄**
- "Nuxt 外掛，用來初始化第三方函式庫"
- "例如 SweetAlert2、AOS 動畫等"

**7. server/api/ 目錄**
- "Nuxt 的後端 API 路由"
- "我們這裡有一個 cityList.get.ts 提供台灣縣市資料"

#### 重點強調
"這樣的結構遵循了 Nuxt 3 的最佳實踐，讓專案保持良好的可維護性和可擴展性。每個資料夾都有其明確的職責，團隊成員能夠快速找到需要的檔案。"

#### 過場語
"有了清晰的專案結構，接下來我們來看核心功能是如何實作的，首先是路由系統..."

---

### 第 5 張：核心功能架構 - 路由系統
**投影片標題**: 核心功能架構

#### 講解要點

**1. 公開路由說明**

> "我們的路由分為兩大類：公開路由和受保護路由。"

> "公開路由是任何人都可以訪問的頁面："

- `/` - "首頁，展示推薦商品和 Hero Banner"
- `/login` 和 `/signup` - "使用者認證相關頁面"
- `/products/[brand]` - "品牌商品列表頁，使用動態路由參數"
- `/product/[brand]/[id]` - "商品詳細頁，同樣使用動態路由"
- `/cart` 和 `/wishlist` - "購物車和收藏清單"

**2. 受保護路由說明**

> "受保護路由需要使用者登入才能訪問："

- `/member` - "會員中心主頁"
- `/member/index` - "個人資料管理頁面"
- `/member/order` - "訂單歷史查詢"

**3. 路由保護機制**

> "我們使用 auth.ts middleware 來實作路由保護："

- "當使用者嘗試訪問受保護的頁面時，middleware 會檢查登入狀態"
- "如果未登入，會自動重導向到 `/login?redirect=member`"
- "登入成功後會回到原本想訪問的頁面"
- "這個機制確保了會員資料的安全性"

#### 實際案例說明
"舉個例子，如果使用者想查看訂單歷史但尚未登入，系統會先要求登入，登入成功後就會直接跳轉到訂單頁面，提供流暢的使用者體驗。"

#### 過場語
"路由系統確保了頁面導航的安全性，接下來讓我們看看狀態管理是如何運作的..."

---

### 第 6 張：狀態管理（Pinia Stores）
**投影片標題**: 狀態管理

#### 講解要點

> "狀態管理是現代前端應用的核心，我們使用 Pinia 並分為三個主要的 Store："

**1. useMainStore - 全域狀態**

> "這個 Store 管理全域共用的狀態："

- **alertMsg**: "臨時提示訊息，會在 1.3 秒後自動清除"
- **cities**: "台灣縣市區域資料"
- **getCities()**: "從 Server API 載入縣市資料"
- **setAlertMsgHandler()**: "顯示臨時提示給使用者"

**2. useProductStore - 商品狀態（持久化）**

> "這是電商的核心 Store，特別注意它有持久化功能："

- **products**: "所有商品資料的陣列"
- **states**: "使用者的購物車與收藏清單，這個會持久化到瀏覽器"
- **getProducts()**: "從 Firebase 取得所有商品"
- **getProduct(id)**: "取得單一商品的詳細資訊"
- **updateState()**: "新增或移除購物車/收藏項目"

強調：
> "這裡的 states 會自動儲存到 LocalStorage，所以使用者重新整理頁面或關閉瀏覽器後，購物車內容不會消失。"

**3. useMemberStore - 會員狀態（持久化）**

> "管理所有會員相關的狀態和操作："

- **loginInfo**: "認證 Token 和使用者 ID，同樣會持久化"
- **profile**: "使用者的個人資料"
- **orders**: "訂單歷史記錄"

主要方法：
- "userLogin() / userSignUp() - Firebase 認證"
- "readProfile() / updateProfile() - 個人資料管理"
- "updatePassword() / resetPassword() - 密碼管理"
- "readPreferences() / updatePreferences() - 購物車與收藏的雲端同步"
- "createOrder() / readOrders() - 訂單管理"

**4. 持久化策略說明**

> "我們使用 @pinia-plugin-persistedstate/nuxt 外掛來實作持久化："

- "loginInfo 會儲存，讓使用者保持登入狀態"
- "購物車和收藏會儲存，提供無縫的購物體驗"
- "這些資料會在瀏覽器 LocalStorage 中保存"

#### 重點強調
"透過這三個 Store 的分工，我們實現了清晰的關注點分離。持久化功能大幅提升了使用者體驗，使用者不會因為重新整理頁面而失去購物車內容。"

#### 過場語
"有了完善的狀態管理，接下來看看我們如何與後端 API 互動..."

---

### 第 7 張：API 架構
**投影片標題**: API 架構

#### 講解要點

> "我們的 API 架構分為三個部分：Firebase Realtime Database API、Firebase Authentication API，以及 Nuxt Server API。"

**1. Firebase Realtime Database API**

> "這是我們主要的資料存取層："

商品相關：
- "GET /products.json - 取得所有商品列表"
- "GET /product/:id.json - 取得單一商品詳情"

會員資料：
- "GET/PUT /member/:uid/profile.json - 讀取或更新會員個人資料"
- "GET/PUT /member/:uid/preferences.json - 管理購物車與收藏"

訂單管理：
- "GET /orders.json - 取得訂單列表"
- "POST /orders.json - 建立新訂單"

**2. Firebase Authentication API**

> "處理所有的使用者認證操作："

- "POST /accounts:signInWithPassword - 使用者登入"
- "POST /accounts:signUp - 新使用者註冊"
- "POST /accounts:update - 變更密碼"
- "POST /accounts:sendOobCode - 寄送密碼重設郵件"

**3. Nuxt Server API**

> "我們也有自己的伺服器端 API："

- "GET /api/cityList - 提供台灣縣市區域資料"
- "這個 API 是在 Nuxt 的 server 目錄中實作"

**4. 環境變數配置**

> "所有的 API 端點和金鑰都透過環境變數管理："

```
NUXT_DB_API_URL          # Firebase Database URL
NUXT_AUTH_API_URL        # Firebase Auth URL
NUXT_FIREBASE_API_KEY    # Firebase API Key
```

強調：
> "這樣的配置方式確保了敏感資訊不會被提交到版本控制系統，也方便在不同環境（開發、測試、正式）使用不同的設定。"

**5. 認證機制**

> "所有需要認證的 API 請求都會帶上 Firebase 的 idToken："

- "這是一個 JWT Token，確保請求的安全性"
- "Token 會在登入時取得，並儲存在 useMemberStore 中"
- "後續的 API 請求會自動帶上這個 Token"

#### 重點強調
"這套 API 架構充分利用了 Firebase 的 Backend-as-a-Service 特性，讓我們能專注在前端開發，同時保持良好的資料安全性。"

#### 過場語
"了解了 API 架構後，讓我們看看資料在系統中是如何流動的..."

---

### 第 8 張：資料流架構
**投影片標題**: 資料流架構

#### 講解要點

> "讓我用三個主要的流程來說明資料在系統中的流動："

**1. 使用者認證流程**

> "當使用者登入時，會經過以下步驟："

```
1. 使用者輸入 Email 和密碼
   ↓
2. 呼叫 useMemberStore.userLogin()
   ↓
3. 向 Firebase Auth API 發送認證請求
   ↓
4. Firebase 驗證成功後回傳 idToken（JWT Token）
   ↓
5. Token 儲存到 loginInfo（會持久化到 LocalStorage）
   ↓
6. 之後所有需要認證的 API 請求都會帶上這個 Token
```

強調：
> "這個流程確保了使用者身份的安全性，Token 機制是現代 Web 應用的標準做法。"

**2. 商品購買流程**

> "從瀏覽商品到完成訂單的完整流程："

```
瀏覽商品 → 加入購物車 → 購物車頁面 → 結帳確認
    ↓           ↓              ↓            ↓
商品詳細頁   updateState()   顯示購物車   createOrder()
            （本地儲存）     內容與總價      ↓
                                      儲存至 Firebase
                                           ↓
                                    會員訂單歷史
```

詳細說明：
- "使用者在商品詳細頁點擊「加入購物車」"
- "透過 updateState() 將商品加入本地的 states.cart"
- "購物車頁面顯示所有商品，計算總價"
- "確認結帳後，呼叫 createOrder() 將訂單儲存到 Firebase"
- "使用者可以在會員中心查看訂單歷史"

**3. 狀態同步機制**

> "這是一個重要的設計決策 - 我們採用『本地優先，遠端同步』的策略："

- **本地優先**:
  - "購物車和收藏會先儲存到本地（Pinia Store + LocalStorage）"
  - "這確保了快速的回應速度，使用者不需等待網路請求"

- **遠端同步**:
  - "當使用者登入後，透過 updatePreferences() 同步到 Firebase"
  - "這讓使用者可以在不同裝置間共用購物車"

- **資料載入**:
  - "登入時透過 readPreferences() 從 Firebase 載入雲端資料"
  - "如果雲端有資料，會合併到本地"

#### 實際案例說明
"舉個例子：使用者在手機上將商品加入購物車，回到家用電腦登入同一帳號，就能看到剛才加入的商品。但如果使用者沒有登入，購物車內容仍然會保留在本地瀏覽器中。"

#### 重點強調
"這種設計兼顧了效能和使用者體驗，既能快速回應使用者操作，又能提供跨裝置的資料同步。"

#### 過場語
"接下來讓我們看看在 UI/UX 方面，我們做了哪些優化..."

---

### 第 9 張：UI/UX 特色
**投影片標題**: UI/UX 特色

#### 講解要點

**1. 響應式設計**

> "我們採用 Mobile First 的設計理念："

- "優先針對行動裝置設計和優化"
- "使用 Tailwind CSS 的斷點系統：md: 和 lg:"
- "確保在手機、平板、桌面都有良好的體驗"

示例：
> "例如商品列表在手機上顯示單欄，平板顯示兩欄，桌面顯示三或四欄。"

**2. 動畫效果**

> "我們整合了 AOS（Animate On Scroll）函式庫："

- "Hero Banner 會有淡入效果"
- "商品列表滾動時會有動畫"
- "使用 data-aos 屬性來控制：fade-left、fade-right 等"

強調：
> "這些動畫不會影響效能，而且能大幅提升使用者的視覺體驗，讓網站感覺更生動。"

**3. 使用者體驗優化**

> "我們在細節上做了很多優化："

- **分頁機制**:
  - "每頁顯示 8 項商品，避免一次載入太多內容"
  - "減少初次載入時間，提升效能"

- **自訂指令 v-focus**:
  - "自動對焦輸入欄位"
  - "例如登入頁面載入後，Email 欄位會自動對焦"

- **價格格式化**:
  - "統一顯示為 NT$ X,XXX 格式"
  - "使用千分位符號，提升可讀性"

- **即時提示**:
  - "使用 SweetAlert2 顯示操作結果"
  - "例如：成功加入購物車、登入失敗等"
  - "提供清楚的視覺回饋"

#### 實際展示建議
"如果時間允許，可以在這裡實際展示網站的響應式效果和動畫。"

#### 重點強調
"這些 UI/UX 的細節累積起來，就能創造出流暢且專業的使用者體驗。我們不只是完成功能，更注重使用者的感受。"

#### 過場語
"除了使用者體驗，我們也重視開發體驗。讓我們看看開發與部署的流程..."

---

### 第 10 張：開發與部署
**投影片標題**: 開發與部署

#### 講解要點

**1. Node 版本需求**

> "專案要求 Node.js 版本 22.0.0 或以上："

- "這確保了我們能使用最新的 JavaScript 特性"
- "也確保了團隊成員的開發環境一致性"

**2. 開發指令說明**

> "我們有完整的開發工作流程："

```bash
npm run dev          # 開發伺服器（讀取 .env.local）
npm run prod         # 正式環境開發伺服器
npm run build        # 建置正式版本
npm run generate     # 產生靜態網站
npm run preview      # 預覽建置結果
```

詳細說明：
- **dev**: "本地開發使用，支援 Hot Module Replacement"
- **prod**: "模擬正式環境進行測試"
- **build**: "建置最佳化的生產版本"
- **generate**: "產生靜態 HTML 檔案，可部署到 CDN"
- **preview**: "預覽建置後的結果"

**3. nuxt.config.ts 關鍵設定**

> "Nuxt 的設定檔是專案的中樞，我挑幾個重要的來說明："

**Modules 模組：**
- "@nuxtjs/tailwindcss - Tailwind CSS 整合"
- "@nuxt/devtools - 強大的開發工具"
- "@pinia-plugin-persistedstate/nuxt - Store 持久化"
- "@pinia/nuxt - Pinia 整合與自動導入"
- "@zadigetvoltaire/nuxt-gtm - GTM 追蹤"

**GTM 設定：**
```typescript
gtm: {
  id: 'GTM-WWTCV42S'
}
```
> "我們的 Google Tag Manager ID，用於追蹤使用者行為和轉換。"

**Runtime Config：**
```typescript
runtimeConfig: {
  public: {
    dbApiUrl: process.env.NUXT_DB_API_URL,
    authApiUrl: process.env.NUXT_AUTH_API_URL,
    firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY
  }
}
```
> "這讓我們能在程式碼中安全地存取環境變數。"

**4. 開發工具**

> "Nuxt 3 提供了極佳的開發體驗："

- **Nuxt DevTools**: "視覺化的開發工具，可以檢視路由、組件、狀態等"
- **Hot Module Replacement**: "修改程式碼後立即看到結果，無需重新整理"
- **Auto-imports**: "自動導入組件和 composables，減少 import 語句"
- **TypeScript 支援**: "開箱即用的 TypeScript 支援"

#### 重點強調
"這套開發工具鏈讓我們能夠快速迭代，提高開發效率。Nuxt 3 的設定檔雖然看起來複雜，但其實大部分都是自動化處理的。"

#### 過場語
"接下來讓我們看看核心的資料結構定義..."

---

### 第 11 張：核心資料結構
**投影片標題**: 核心資料結構

#### 講解要點

> "TypeScript 的型別定義讓我們的程式碼更加安全可靠。讓我介紹幾個核心的資料結構："

**1. Product - 商品**

```typescript
interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string[]
}
```

說明：
- "id 是唯一識別碼"
- "imageUrl 是陣列，因為一個商品可能有多張圖片"
- "這是從 Firebase 取得的原始商品資料結構"

**2. Profile - 使用者資料**

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

說明：
- "edm 欄位記錄使用者是否同意接收電子報"
- "區分聯絡地址和配送地址，提供更彈性的配送選項"

**3. Address - 地址**

```typescript
interface Address {
  name: string                    // 收件人姓名
  cellPhone: string               // 聯絡電話
  city: string                    // 縣市
  area: string                    // 區域
  address: string                 // 詳細地址
}
```

說明：
- "完整的台灣地址結構"
- "city 和 area 會透過我們的地址選擇器來填寫"

**4. Order - 訂單**

```typescript
interface Order {
  orderID: string
  memberID: string
  content: OrderContent[]
  total: number
  createTime: number              // Unix Timestamp
}
```

說明：
- "orderID 是訂單的唯一識別碼"
- "memberID 關聯到下單的會員"
- "content 包含所有訂購的商品"
- "createTime 使用 Unix Timestamp 儲存，方便排序和計算"

#### 重點強調
"這些型別定義不只是文件，TypeScript 編譯器會在開發時期檢查我們的程式碼，確保我們正確使用這些資料結構。這大幅減少了執行時期的錯誤。"

#### 實際案例
"舉例來說，如果我們不小心把 price 當作字串處理，TypeScript 會立即提示錯誤，不需等到執行時才發現。"

#### 過場語
"有了清晰的資料結構，接下來讓我們談談安全性..."

---

### 第 12 張：安全性機制
**投影片標題**: 安全性機制

#### 講解要點

> "資料安全是電商平台的重中之重，我們在多個層面實作了安全機制："

**1. 認證與授權**

**Firebase Authentication:**
- "使用業界標準的 Firebase 認證服務"
- "Email/Password 認證方式，密碼會經過加密處理"
- "Firebase 會自動處理密碼強度、帳號鎖定等安全功能"

**JWT Token:**
- "登入後取得 idToken（JSON Web Token）"
- "所有需要認證的 API 請求都會帶上這個 Token"
- "Token 有過期時間，確保安全性"

**Route Middleware:**
- "使用 auth.ts middleware 保護會員專屬頁面"
- "未登入的使用者無法直接訪問 /member 相關頁面"
- "即使知道 URL 也無法繞過這個保護"

**Cookie-based Auth State:**
- "透過 Cookie 檢查登入狀態"
- "支援 SSR（伺服器端渲染）時的身份驗證"

**2. 環境變數管理**

> "敏感資訊的管理非常重要："

**本地開發：**
- "使用 .env.local 檔案儲存開發環境的變數"
- "這個檔案不會被提交到 Git repository"
- ".gitignore 會忽略所有 .env.* 檔案"

**正式環境：**
- "使用伺服器的環境變數設定"
- "不同環境（開發、測試、正式）可以使用不同的 Firebase 專案"

**環境變數範例：**
```
NUXT_DB_API_URL          # Firebase Database URL
NUXT_AUTH_API_URL        # Firebase Auth URL
NUXT_FIREBASE_API_KEY    # Firebase API Key
```

**3. 其他安全措施**

- **HTTPS**: "正式環境必須使用 HTTPS"
- **Input Validation**: "所有使用者輸入都會經過驗證"
- **XSS Protection**: "Vue 自動處理 XSS 防護"
- **CSRF Token**: "Firebase 的 Token 機制提供 CSRF 保護"

#### 重點強調
"安全性不是單一功能，而是多層次的防護。從認證機制、到環境變數管理、再到框架本身的安全特性，我們確保了使用者資料的安全。"

#### 常見問題預先準備
- Q: "如果 Token 被竊取怎麼辦？"
  - A: "Token 有過期時間，而且 HTTPS 加密傳輸。建議定期更新 Token。"

- Q: "密碼是如何儲存的？"
  - A: "Firebase Authentication 會自動處理密碼加密，我們不會看到明文密碼。"

#### 過場語
"最後，讓我們總結一下這個專案的技術亮點..."

---

### 第 13 張：專案特色總結
**投影片標題**: 專案特色總結

#### 講解要點

> "讓我從三個角度來總結這個專案：技術亮點、功能完整度、以及開發體驗。"

**1. 技術亮點**

逐項說明每個亮點：

- **全端 TypeScript**
  - "從前端到後端 API，全部使用 TypeScript"
  - "完整的型別安全，減少 bug"

- **Serverless 架構**
  - "使用 Firebase 作為 BaaS（Backend-as-a-Service）"
  - "不需管理伺服器，專注於業務邏輯"

- **狀態持久化**
  - "購物車和登入狀態跨裝置同步"
  - "提供一致的使用者體驗"

- **響應式設計**
  - "Mobile-first 設計理念"
  - "適配所有裝置"

- **SEO 友善**
  - "Nuxt 3 的 SSR 支援"
  - "對搜尋引擎更友善"

- **現代化工具鏈**
  - "Vite、Tailwind CSS、Pinia"
  - "最新的前端技術棧"

**2. 功能完整度**

> "這是一個功能完整的電商平台："

快速瀏覽核心功能：
- ✅ 商品瀏覽與搜尋
- ✅ 購物車管理
- ✅ 收藏清單
- ✅ 會員系統
- ✅ 訂單管理
- ✅ 地址選擇器（台灣地區）
- ✅ 動畫效果
- ✅ 使用者追蹤（GTM）

強調：
> "從使用者註冊到完成購買，整個購物流程都已經實作完成。"

**3. 開發體驗**

> "這個專案也提供了優秀的開發體驗："

- **TypeScript 型別安全**
  - "開發時期就能發現錯誤"

- **Nuxt DevTools 整合**
  - "視覺化的開發工具"

- **Hot Module Replacement**
  - "即時預覽修改結果"

- **自動導入**
  - "減少重複的 import 語句"

- **File-based Routing**
  - "直觀的路由管理"

#### 結語

> "總結來說，這個專案展示了如何使用現代化的技術棧來建立一個功能完整、效能優秀、且易於維護的電商平台。我們不只是追求功能的實現，更注重程式碼品質、使用者體驗、以及開發效率。"

#### 未來展望（選用）

如果時間允許，可以提及未來的發展方向：
- "未來可以考慮加入更多支付方式"
- "可以實作更進階的推薦系統"
- "可以加入即時客服功能"
- "可以擴展到其他國家市場"

#### 過場到 Q&A

> "以上就是我們手錶電商平台的架構介紹。接下來開放問答時間，歡迎大家提問！"

---

## Q&A 常見問題準備

### 技術選型相關

**Q1: 為什麼選擇 Nuxt 3 而不是 Next.js？**
> A: "我們團隊更熟悉 Vue 生態系，Nuxt 3 提供了類似的 SSR 能力，而且 Vue 的學習曲線相對平緩。此外，Nuxt 3 的 file-based routing 和 auto-imports 功能讓開發更加直觀。"

**Q2: 為什麼使用 Firebase 而不是自建後端？**
> A: "Firebase 提供了完整的 BaaS 解決方案，包含資料庫、認證、檔案儲存等。這讓我們能快速驗證商業模式，而不需在初期投入大量資源建設後端基礎設施。如果未來流量成長，也可以逐步遷移到自建後端。"

**Q3: Tailwind CSS 會不會讓 HTML 變得很雜亂？**
> A: "確實 class 會比較多，但我們將複雜的樣式抽成獨立的 component。而且 Tailwind 帶來的開發速度提升和一致性是值得的。團隊成員不需要猜測 class 名稱，看到 class 就知道效果。"

### 效能相關

**Q4: SSR 對效能有多大幫助？**
> A: "SSR 主要改善首次載入速度和 SEO。使用者第一次訪問時就能看到完整內容，不需等待 JavaScript 執行。而且搜尋引擎爬蟲能直接讀取到內容，對 SEO 很有幫助。"

**Q5: 購物車資料同時存在本地和雲端，會不會有衝突？**
> A: "我們採用『本地優先』策略。登入時會合併本地和雲端資料，如果有衝突，以最新的為準。實務上很少發生衝突，因為使用者通常在同一個裝置上操作。"

### 安全性相關

**Q6: Firebase 的安全性如何？**
> A: "Firebase 是 Google 的產品，有嚴格的安全標準。我們額外實作了：1) Token 驗證 2) Route middleware 保護 3) 環境變數管理 4) HTTPS 傳輸。多層次的防護確保了資料安全。"

**Q7: 如何防止惡意使用者大量下單？**
> A: "目前主要透過 Firebase 的 rate limiting。未來可以加入：1) 訂單數量限制 2) 驗證碼 3) 行為分析等機制。"

### 擴展性相關

**Q8: 如果商品數量增加到萬級，效能會如何？**
> A: "我們已經實作了分頁機制，每頁只載入 8 項商品。如果商品數量大幅增加，可以考慮：1) 更積極的快取策略 2) CDN 加速 3) 圖片懶載入 4) 搜尋引擎整合（如 Algolia）。"

**Q9: 如何支援多語系？**
> A: "Nuxt 3 有 i18n 模組支援。我們可以建立語言檔案，透過 key-value 方式管理翻譯。目前專案針對台灣市場，未來擴展到其他地區時再加入多語系功能。"

### 開發流程相關

**Q10: 團隊如何協作開發？**
> A: "我們使用 Git flow，每個功能都在獨立分支開發。TypeScript 和 ESLint 確保程式碼品質一致。Nuxt DevTools 讓團隊成員能快速了解專案結構。"

**Q11: 如何測試這個專案？**
> A: "目前主要是手動測試。未來可以加入：1) Unit tests（Vitest）2) E2E tests（Playwright）3) Visual regression tests。Nuxt 3 對測試框架有很好的支援。"

### 部署相關

**Q12: 這個專案可以部署到哪裡？**
> A: "Nuxt 3 支援多種部署方式：1) Vercel/Netlify（適合 SSR）2) 靜態檔案（npm run generate）部署到 CDN 3) Node.js 伺服器（自建或雲端）。我們選擇最適合的方式。"

---

## 簡報技巧提醒

### 時間控制
- **30 分鐘版本**: 每張投影片約 2-3 分鐘，重點說明
- **40 分鐘版本**: 每張投影片約 3-4 分鐘，加入更多細節和案例
- **預留 5-10 分鐘給 Q&A**

### 互動技巧
- 適時詢問聽眾是否有問題
- 使用「有人用過 XXX 技術嗎？」引發共鳴
- 適當停頓，不要連續講超過 5 分鐘

### 肢體語言
- 保持眼神接觸
- 適度的手勢強調重點
- 不要一直看著螢幕

### 語速控制
- 保持穩定的語速，不要太快
- 重點部分可以放慢，重複一次
- 技術術語第一次出現時要解釋

### 應對突發狀況
- **技術問題無法回答**: "這是個好問題，我會後續研究後再回覆您"
- **時間不夠**: 快速帶過較不重要的投影片，確保核心內容有講到
- **時間太多**: 準備一些額外的 demo 或深入的技術討論

---

## 簡報後跟進

### 提供資源
- GitHub repository 連結
- 架構文件（ARCHITECTURE.md）
- 聯絡方式

### 收集回饋
- 詢問聽眾是否有建議
- 記錄無法回答的問題，之後補充

### 持續改進
- 根據聽眾反應調整簡報內容
- 更新常見問題清單
- 優化投影片設計

---

**祝簡報順利！**
