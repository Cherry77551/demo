# 星砚 · TeleAgent 演示页（静态）

纯静态页面，模仿 TeleAgent / 星辰超级智能体的 UI，只回放预设的测试对话。没有后端、没有密钥，可直接部署到 GitHub Pages。

## 目录

```
academic-writer-demo/
├── index.html      # 页面骨架（侧栏、顶栏、输入区）
├── styles.css      # 样式
├── app.js          # 首页渲染 + 对话回放 + 文章预览
├── data.js         # 品牌信息、快捷卡片、对话内容
├── assets/         # 论文 docx、mammoth、需要下载的文件
└── README.md
```

## 文章预览

对话里生成的 `.docx` 文件卡片，点击即可在弹窗中预览。当前演示使用 `assets/paper.docx`（真实生成的论文），由本地 mammoth 在浏览器中转成 HTML。

- `preview: "docx"` + `url`：docx 预览（当前用法）
- `preview: "html"` + `previewHtml`：直接渲染 HTML 字符串
- `preview: "pdf"`：内嵌 PDF
- `preview: "image"`：内嵌图片

直接打开文章预览（跳过对话回放）：

```
index.html#preview
```

## GitHub 源码

顶栏有 GitHub 图标和「GitHub 源码」文字，点击打开：

```
https://github.com/Cherry77551/teleSkill
```

如果仓库是 Private，评委点开会看到 404，记得设为 Public。

## 演示声明

首页与对话页都显示声明：对话来自与 TeleAgent 的真实测试记录，仅用于向评委展示 skill 技能包的调用过程与结果；页面为静态演示，不连接真实模型，也不收集数据。

## 说明

- 页面只做展示，不会真的调用模型或执行脚本。
- 所有对话内容都在 `data.js`，改文字不需要动 HTML/JS。
- 想加第二段对话：在 `data.js` 里再写一份 `events`，然后在 `app.js` 里增加入口即可。
