# 星砚 · TeleAgent 演示页（静态）

纯静态页面，模仿 TeleAgent / 星辰超级智能体的 UI，只回放预设的测试对话。没有后端、没有密钥，可直接部署到 GitHub Pages。

## 目录

```
academic-writer-demo/
├── index.html      # 页面骨架（侧栏、顶栏、输入区）
├── styles.css      # 样式
├── app.js          # 首页渲染 + 对话回放 + 文章预览
├── data.js         # 品牌信息、快捷卡片、第一个任务
├── data-tasks.js   # 其余对话任务（EXTRA_TASKS）
├── assets/         # 论文 docx/pdf、mammoth、需要下载的文件
└── README.md
```

## 多任务与切换

任务分两处：`data.js` 里的 `tasks`（第一个任务）和 `data-tasks.js` 里的 `EXTRA_TASKS`。新增任务时复制一个对象：

```js
{
  id: "task-2",
  title: "任务名",
  shortTitle: "侧栏显示名",
  status: "已完成",
  prompt: "用户的第一句话",
  events: [ ... ]
}
```

左侧「工作空间」会自动生成任务切换列表；首页卡片通过 `taskId` 指向任务。

直接打开某个任务：

```
index.html?task=revision#demo
index.html?task=english#preview
```

## 文章预览

对话里生成的文件卡片，点击即可在弹窗中预览。当前演示用 `assets/paper.pdf` 作为预览（由 `assets/paper.docx` 转出，公式完整），下载按钮给的是 Word 原稿。

- `preview: "pdf"` + `previewUrl`：内嵌 PDF（公式完整，推荐用于 Word 交付物）
- `preview: "docx"` + `url`：浏览器端 mammoth 渲染 docx（公式可能缺失）
- `preview: "markdown"` + `previewUrl`：渲染 Markdown（文献综述的两个 md）
- `preview: "image"`：内嵌图片（光伏与电价分析图）
- `preview: "html"` + `previewHtml`：直接渲染 HTML 字符串

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
