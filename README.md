# 星砚 · TeleAgent 演示页（静态）

纯静态页面，模仿 TeleAgent / 星辰超级智能体的 UI，只回放预设的测试对话。没有后端、没有密钥，可直接部署到 GitHub Pages。

## 目录

```
academic-writer-demo/
├── index.html      # 页面骨架（侧栏、顶栏、输入区）
├── styles.css      # 样式
├── app.js          # 首页渲染 + 对话回放 + 文章预览
├── data.js         # 品牌信息、快捷卡片、对话内容
├── assets/         # 示例文章、mammoth、需要下载的文件
└── README.md
```

## 文章预览

对话里生成的 `.docx` 文件卡片，点击即可在弹窗中预览：

- `preview: "html"` + `previewHtml`：直接渲染一段 HTML 文章（最稳，示例见 `assets/sample-article.js`）
- `preview: "pdf"`：内嵌 PDF
- `preview: "image"`：内嵌图片
- `preview: "docx"` + `url`：用本地 `assets/mammoth.browser.min.js` 在浏览器里把 docx 转成 HTML

直接打开文章预览（跳过对话回放）：

```
index.html#preview
```

## GitHub 源码图标

顶栏有一个 GitHub 图标，链接到：

```
https://github.com/Cherry77551/teleSkill
```

鼠标悬停会显示「GitHub 源码」提示。如果仓库是 Private，评委点开会看到 404，记得设为 Public。

## 说明

- 页面只做展示，不会真的调用模型或执行脚本。
- 所有对话内容都在 `data.js`，改文字不需要动 HTML/JS。
- 想加第二段对话：在 `data.js` 里再写一份 `events`，然后在 `app.js` 里增加入口即可。
