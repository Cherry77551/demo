# 星砚 · TeleAgent 演示页（静态）

纯静态页面，模仿 TeleAgent / 星辰超级智能体的 UI，只回放预设的测试对话。没有后端、没有密钥，可直接部署到 GitHub Pages。

## 目录

```
academic-writer-demo/
├── index.html      # 页面骨架（侧栏、顶栏、输入区）
├── styles.css      # 样式
├── app.js          # 首页渲染 + 对话回放
├── data.js         # ★ 只改这里：品牌信息、快捷卡片、对话内容
├── assets/         # 需要真实下载的文件放这里
└── README.md
```



## 说明

- 页面只做展示，不会真的调用模型或执行脚本。
- 所有对话内容都在 `data.js`，改文字不需要动 HTML/JS。
- 想加第二段对话：在 `data.js` 里再写一份 `events`，然后在 `app.js` 里增加入口即可。
