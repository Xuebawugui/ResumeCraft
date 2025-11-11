# ResumeCraft · 多语言简历生成器

ResumeCraft 是一个支持 **中 / 英 / 日三语言** 的智能简历生成器。  
使用 React + TypeScript + TailwindCSS + Groq AI 构建，支持在线编辑、AI 自动优化、简历实时预览以及 PDF 导出。

在线 Demo：即将上线（Vercel 部署）

---

## ✨ 功能特性

- ✅ **三语言支持：中文 / English / 日本語**
- ✅ **支持 Groq AI 自动生成/优化专业简历**
- ✅ **React + TypeScript 工程化开发**
- ✅ **i18next 国际化切换**
- ✅ **实时预览简历**
- ✅ **一键导出 PDF**
- ✅ **JSON 导入 / 导出（可选）**
- ✅ **适合求职日本 + 海外 IT 职位的展示项目**

---

## 🛠️ 技术栈

### 前端
- React 18
- TypeScript
- Vite
- TailwindCSS 3.x
- i18next（国际化）
- html2pdf.js（导出 PDF）

### AI
- Groq API（llama3-70b-8192）

---

## 📁 项目结构

ResumeCraft
├── src
│ ├── components
│ │ ├── FormSection.tsx
│ │ ├── ResumePreview.tsx
│ │ ├── LanguageSwitcher.tsx
│ │ └── PdfExportButton.tsx
│ ├── pages
│ │ └── Home.tsx
│ ├── hooks
│ │ └── useResumeData.ts
│ ├── i18n
│ │ ├── index.ts
│ │ ├── zh.json
│ │ ├── en.json
│ │ └── jp.json
│ ├── utils
│ │ ├── ai.ts
│ │ └── pdf.ts
│ ├── styles
│ │ └── global.css
│ └── main.tsx
├── public
├── package.json
└── README.md


---

## 🚀 本地开发

```bash
git clone https://github.com/yourname/ResumeCraft.git
cd ResumeCraft
npm install
npm run dev

环境变量

在根目录创建 .env 文件：

VITE_GROQ_KEY=your_api_key_here

构建生产环境
npm run build

部署（Vercel 推荐）

支持一键导入，自动识别 Vite 项目。

---

## 🧭 推送到 GitHub（Xuebawugui/ResumeCraft）

请确保 `.env` 不被提交（已在 `.gitignore` 中忽略）。如果之前已被纳入版本管理请执行：

```bash
git rm --cached .env
```

初始化并推送到你的仓库：

```bash
# 在本地仓库目录下
git init
git add .
git commit -m "chore: init ResumeCraft"
git branch -M main
git remote add origin https://github.com/Xuebawugui/ResumeCraft.git
git push -u origin main
```

开发与环境变量：

```bash
npm install

# 前后端并行启动
npm run dev:all

# 或仅前端
npm run dev

# 在根目录创建 .env（参考 .env.example）
GROQ_API_KEY=your_api_key_here
# 可选：指定模型
GROQ_MODEL=llama-3.3-70b-versatile
```

---

## 🚀 部署到 Vercel

本项目已内置 Vercel 的 Serverless API（`api/generate.js`），无需额外后端服务即可在 Vercel 运行。

步骤：

1. 将代码推送到 GitHub（参考上文）。
2. 登录 Vercel，点击 “New Project” → 选择你的仓库 `Xuebawugui/ResumeCraft`。
3. 在 Vercel 项目设置中添加环境变量：
   - `GROQ_API_KEY`: 你的 Groq API Key
   - 可选 `GROQ_MODEL`: 例如 `llama-3.3-70b-versatile`
4. 直接 Deploy。Vercel 会：
   - 使用 `npm run build` 构建前端（输出目录 `dist`）
   - 将 `/api/generate` 路由到 Serverless 函数（Node.js 20）

说明：
- 本地开发仍可使用 `npm run dev:all`（Vite 前端 + 本地 Express 后端），线上 Vercel 将自动使用 `api/generate`。
- 前端通过相对路径 `fetch('/api/generate')` 调用，无需额外代理配置。
- `.env` 不会被提交；线上通过 Vercel 的环境变量面板配置。