/*
 * ============================================================
 *  只改这个文件，就能替换成你们真实的测试对话。
 *
 *  events 里每个对象支持这些 type：
 *    user        { type:"user", text:"用户说的话" }
 *    thinking    { type:"thinking", text:"思考中…", duration:900 }
 *    tool        { type:"tool", label:"读取规则", detail:"references/xxx.md",
 *                  name:"read_skill_file", ok:true, exitCode:0, duration:850 }
 *    assistant   { type:"assistant", text:"支持 **Markdown** 和列表", speed:8 }
 *    ask         { type:"ask", questions:[{ header, question, multiple, options:[{label,description}] }],
 *                  selected:[["选项1"],["选项2"]] }
 *    file        { type:"file", name:"毕业论文.docx", size:"128 KB", url:"#" }
 *
 *  delay 表示这步结束后停顿多少毫秒，可省略。
 *  autoPlay:true 时选择题会自动选中 selected 并继续，适合无人值守演示。
 * ============================================================
 */

window.DEMO_DATA = {
  brand: {
    user: "胡辣汤与豆浆不配队",
    version: "v2.7.0-rc.1",
  },
  headline: "你说我做，随时待命",
  skill: "星砚超级skill",
  autoPlay: true,
  tabs: ["做调研", "做表格", "搭应用", "写文档", "替我办"],

  quickCards: [
    { icon: "doc", title: "写毕业论文", desc: "从开题、文献综述到规范成稿", prompt: "我要写一篇工科毕业论文，帮我把开题和文献综述梳理一下。" },
    { icon: "chart", title: "数据图表", desc: "把 CSV 数据做成期刊规范的图", prompt: "我有 CSV 数据，想做成符合期刊规范的折线图。" },
    { icon: "quote", title: "参考文献排版", desc: "GB/T 7714 / APA / IEEE 一键统一", prompt: "把这些参考文献按 GB/T 7714 排版。" },
    { icon: "pen", title: "语言润色", desc: "逐句对照，改表达不改事实", prompt: "帮我润色这段论文语言，并给出逐句对照。" },
  ],

  events: [
    { type: "user", text: "我要写一篇工科毕业论文，帮我把开题和文献综述梳理一下。" },

    { type: "thinking", text: "正在加载技能规则…", duration: 900 },

    {
      type: "tool",
      name: "read_skill_file",
      label: "读取需求确认规则",
      detail: "references/requirement-confirmation.md",
      duration: 700,
    },
    {
      type: "tool",
      name: "list_skill_files",
      label: "查看可复用示例",
      detail: "assets/examples",
      duration: 600,
    },

    {
      type: "assistant",
      text: "先不急着动笔。按技能要求，需要先和你确认七项：\n\n1. 输出格式\n2. 摘要\n3. 附带要素\n4. 排版规格\n5. 论文结构\n6. 篇幅\n7. 资料来源\n\n先从最关键的几项开始。",
    },

    {
      type: "ask",
      questions: [
        {
          header: "输出格式",
          question: "你希望最终交付哪种格式？",
          multiple: false,
          options: [
            { label: "Word 文档（可编辑）", description: "推荐，方便导师批注" },
            { label: "PDF（定稿）", description: "适合直接提交" },
            { label: "LaTeX", description: "适合公式较多的论文" },
          ],
        },
        {
          header: "摘要",
          question: "摘要需要哪些？",
          multiple: false,
          options: [
            { label: "中文摘要 + 英文摘要", description: "推荐" },
            { label: "仅中文摘要", description: "" },
            { label: "不要摘要", description: "" },
          ],
        },
        {
          header: "篇幅",
          question: "篇幅如何设定？",
          multiple: false,
          options: [
            { label: "按字数", description: "如 8000–10000 字" },
            { label: "按页数", description: "如 10–15 页" },
            { label: "不做要求", description: "按内容完整度来写（推荐）" },
          ],
        },
      ],
      selected: [
        ["Word 文档（可编辑）"],
        ["中文摘要 + 英文摘要"],
        ["不做要求"],
      ],
    },

    {
      type: "assistant",
      text: "收到。输出格式 Word、中英文摘要、篇幅不限；其余按技能推荐值执行：**宋体小四、标题黑体、四边 2.5cm、1.5 倍行距、目录独占一页、上标引用**。",
    },

    {
      type: "tool",
      name: "write_workspace_file",
      label: "写入论文规格",
      detail: "output/spec.json",
      duration: 650,
    },
    {
      type: "tool",
      name: "run_script",
      label: "生成 Word 文档",
      detail: "build_docx.py output/spec.json -o output/毕业论文.docx",
      duration: 1300,
    },

    { type: "file", name: "毕业论文.docx", size: "128 KB", url: "#" },

    {
      type: "assistant",
      text: "已生成 **毕业论文.docx**，包含标题、摘要、真实目录域、章节编号、参考文献与三线表。\n\n你可以直接下载，把导师的批注发回来，我按修订模式继续改。",
    },
  ],
};
