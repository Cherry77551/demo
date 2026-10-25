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

## 替换成你们的测试对话

打开 `data.js`，改 `window.DEMO_DATA`：

- `brand.user` / `brand.workspace` / `brand.version`：侧栏与顶栏文字
- `quickCards`：首页四张卡片
- `events`：对话脚本，按顺序播放

`events` 支持的步骤：

```js
{ type: "user", text: "用户说的话" }
{ type: "thinking", text: "思考中…", duration: 900 }
{ type: "tool", label: "读取规则", detail: "references/xxx.md", ok: true, duration: 850 }
{ type: "assistant", text: "支持 **Markdown**、列表、代码", speed: 8 }
{ type: "ask", questions: [
    { header: "输出格式", question: "选哪种？", multiple: false,
      options: [{ label: "Word", description: "推荐" }, { label: "PDF" }] }
  ], selected: [["Word"]] }
{ type: "file", name: "毕业论文.docx", size: "128 KB", url: "#" }
```

- `selected` 用于 `autoPlay: true` 时自动选中并继续；关掉自动播放后由观众手动点选。
- `file.url` 为 `#` 时点击只弹提示；把真实文件放进 `assets/`，写成 `assets/xxx.docx` 即可下载。

## 本地预览

直接双击 `index.html` 即可（纯静态，无需服务器）。

如果浏览器限制本地文件，也可以起一个本地服务：

```bash
python -m http.server 8080
```

打开 <http://localhost:8080>。


## 说明

- 页面只做展示，不会真的调用模型或执行脚本。
- 所有对话内容都在 `data.js`，改文字不需要动 HTML/JS。
- 想加第二段对话：在 `data.js` 里再写一份 `events`，然后在 `app.js` 里增加入口即可。
