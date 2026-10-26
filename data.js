/*
 * 演示数据：一个真实的 TeleAgent 对话任务
 * 用户需求 → 8 项可点击确认 → 汇总复述 → 开始执行 → 文献核实 → 生成 docx → 交付
 *
 * tasks 支持多个任务，左侧「工作空间」会自动生成切换列表。
 * events 支持的步骤：
 *   user      { type:"user", text:"..." }
 *   thinking  { type:"thinking", text:"...", duration:900 }
 *   tool      { type:"tool", label:"...", detail:"...", duration:850, ok:true }
 *   assistant { type:"assistant", text:"支持 **Markdown**", speed:8 }
 *   ask       { type:"ask", questions:[...], selected:[["选项"]], custom:["", "补充"] }
 *   file      { type:"file", name:"...", size:"286 KB", url:"assets/paper.docx",
 *               preview:"pdf", previewUrl:"assets/paper.pdf" }
 *
 * preview 说明：
 *   preview:"pdf"   → 弹窗内嵌 PDF（公式完整，评委无需装 Word）
 *   preview:"docx"  → 浏览器端 mammoth 渲染 docx（公式可能缺失）
 *   preview:"image" → 内嵌图片
 *   preview:"html"  → 直接渲染 previewHtml
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
    {
      icon: "doc",
      title: "智能电网调度优化",
      desc: "一篇完整论文的生成实录",
      taskId: "smart-grid",
    },
    {
      icon: "skill",
      title: "8 项需求确认",
      desc: "可点击选择题，确认后再动笔",
      taskId: "smart-grid",
    },
    {
      icon: "search",
      title: "联网核实文献",
      desc: "逐条标注出处与卷期页码",
      taskId: "smart-grid",
    },
    {
      icon: "chart",
      title: "Word 规范交付",
      desc: "公式、插图、三线表全部内嵌",
      taskId: "smart-grid",
    },
  ],

  tasks: [
    {
      id: "smart-grid",
      title: "智能电网调度优化论文",
      shortTitle: "智能电网调度优化论文",
      status: "已完成",
      prompt: "帮我写一篇智能电网调度优化的论文",
      events: [
        { type: "user", text: "帮我写一篇智能电网调度优化的论文" },

        { type: "thinking", text: "正在加载技能规范并梳理需求…", duration: 1200 },
        {
          type: "tool",
          name: "read_skill_file",
          label: "加载技能规范",
          detail: "references/requirement-confirmation.md",
          duration: 750,
        },

        {
          type: "assistant",
          text: "按技能要求，先和你确认八项需求；确认前不动笔。",
        },

        {
          type: "ask",
          questions: [
            {
              header: "排版模板",
              question: "有没有学校或期刊提供的排版模板 docx？",
              multiple: false,
              options: [
                { label: "无模板，按既定规格（推荐）", description: "使用技能默认排版基线" },
                { label: "有模板，稍后提供", description: "按模板解析并优先套用" },
              ],
            },
            {
              header: "类型与结构",
              question: "这篇论文按哪种类型和骨架来写？",
              multiple: false,
              options: [
                { label: "期刊论文·标准研究型（推荐）", description: "引言 → 综述 → 建模 → 算法 → 算例 → 结论" },
                { label: "课程论文（精简型）", description: "引言 → 主体 2~3 章 → 结论" },
                { label: "学位论文（完整骨架）", description: "完整章节与附录" },
              ],
            },
            {
              header: "输出格式",
              question: "最终交付什么格式？",
              multiple: false,
              options: [
                { label: "Word 文档（推荐）", description: "单文件，图表公式内嵌" },
                { label: "PDF", description: "定稿格式" },
                { label: "HTML", description: "网页格式" },
              ],
            },
            {
              header: "摘要",
              question: "摘要怎么处理？",
              multiple: false,
              options: [
                { label: "仅中文摘要 + 关键词", description: "无英文摘要" },
                { label: "中英文摘要（推荐）", description: "中文 + 英文" },
                { label: "不要摘要", description: "" },
              ],
            },
            {
              header: "附带要素",
              question: "正文需要哪些附带要素？可多选。",
              multiple: true,
              options: [
                { label: "表格", description: "按补充用三线表" },
                { label: "插图", description: "论文插图" },
                { label: "公式", description: "Word 原生 OMML，编号居右" },
                { label: "附录", description: "符号表" },
                { label: "目录", description: "目录独占一页" },
                { label: "封面", description: "标题页" },
              ],
            },
            {
              header: "篇幅",
              question: "篇幅怎么定？",
              multiple: false,
              options: [
                { label: "按页数", description: "如 8–12 页" },
                { label: "按字数", description: "如 8000–10000 字" },
                { label: "不做要求（推荐）", description: "按内容完整度来写" },
              ],
            },
            {
              header: "文献与数据",
              question: "文献与数据从哪里来？",
              multiple: false,
              options: [
                { label: "联网搜集并标注来源（推荐）", description: "逐条标注 URL / DOI / 访问日期" },
                { label: "我提供资料", description: "先用手上的文献" },
                { label: "检索式自查", description: "先给检索式和待检索清单" },
                { label: "复用演示素材", description: "使用已有示例素材" },
              ],
            },
            {
              header: "排版规格",
              question: "排版规格按既定基线执行吗？",
              multiple: false,
              options: [
                { label: "按既定基线（推荐）", description: "宋体小四 / Times New Roman / 黑体标题 / 纯黑 / 2.5cm" },
                { label: "改用其他", description: "请补充字体、字号、行距等" },
              ],
            },
          ],
          selected: [
            ["无模板，按既定规格（推荐）"],
            ["期刊论文·标准研究型（推荐）"],
            ["Word 文档（推荐）"],
            ["仅中文摘要 + 关键词"],
            ["表格", "插图", "公式", "附录"],
            ["按页数"],
            ["联网搜集并标注来源（推荐）"],
            ["按既定基线（推荐）"],
          ],
          custom: ["", "", "", "", "", "8-12", "", "行间距1倍"],
        },

        {
          type: "assistant",
          text: "八项都收到了，其中三处补充我单独标了出来。按流程汇总复述一遍，请核对：\n\n1. **类型与结构**：期刊论文·标准研究型，正文六章——引言 → 文献综述 → 调度模型建模 → 优化算法 → 算例分析 → 结论\n\n2. **输出格式**：Word 文档（.docx）单文件交付，不附带其他格式；图表、公式全部内嵌\n\n3. **摘要**：仅中文摘要 + 关键词（无英文摘要）\n\n4. **附带要素**：表格（按补充用三线表）、插图、公式（Word 原生 OMML、编号居右）、附录（符号表）；目录与封面未选，正文不带目录\n\n5. **篇幅**：按页数设定 8~12 页（A4，一般不严格卡死，按内容完整度落在区间内）\n\n6. **排版规格**：按既定基线执行，两处按你的修正调整——\n   行距改为 1 倍（原基线 1.5 倍）\n   其余不变：正文宋体小四、西文 Times New Roman、标题黑体、全文纯黑、标题居中、页边距 2.5cm、引用右上角上标、一级标题「一、二、三」、1/1.1 编号\n\n7. **文献与数据**：联网搜集并逐条标注出处、URL/DOI、访问日期，按 GB/T 7714 排版；百科、新闻、自媒体不作论据。网上核实不到的文献会减引并告知，不编造。算例数据用公开典型场景构建仿真设定，并在论文中如实标注。\n\n8. **完成预估**：文献搜集 → 写作 → 生成 docx → 格式校验与抽样渲染复核，预计 1 小时内交付初稿。\n\n需要留意的两点：① 既定基线含「目录独占一页」，但你未选目录——按「无目录」执行；② 若与预期不符请现在指出。",
          speed: 6,
        },

        {
          type: "ask",
          questions: [
            {
              header: "开始写作",
              question: "以上方案还有什么需要修改的地方吗？没有的话请点头，我将开始写。",
              multiple: false,
              options: [
                { label: "确认，开始写", description: "按上述方案执行" },
                { label: "需要修改", description: "请补充修改意见" },
              ],
            },
          ],
          selected: [["确认，开始写"]],
        },

        {
          type: "assistant",
          text: "点头收到，开始执行。先建任务清单并加载技能规范，然后联网检索文献。",
        },

        {
          type: "tool",
          label: "加载技能规范",
          detail: "SKILL.md / references/manuscript-format.md",
          duration: 700,
        },
        {
          type: "tool",
          label: "联网检索文献",
          detail: "核实期刊卷期页码与 DOI",
          duration: 900,
        },

        {
          type: "assistant",
          text: "规范已加载。先确认 `build_docx` 对插图的字段要求，并检查本机是否有可用的渲染工具。",
        },
        {
          type: "tool",
          label: "安装 matplotlib",
          detail: "后台安装，用于生成论文插图",
          duration: 850,
        },
        {
          type: "tool",
          label: "准备生成脚本",
          detail: "复制 build_docx 到 .temp，行距改为 1 倍",
          duration: 750,
        },

        {
          type: "assistant",
          text: "脚本就绪。现在并行推进：后台安装绘图库，同时开始第一轮文献检索。",
        },
        {
          type: "tool",
          label: "第一轮文献检索",
          detail: "中文核心 + 英文文献",
          duration: 800,
        },
        {
          type: "tool",
          label: "第二轮文献检索",
          detail: "核实卷期页码与作者信息",
          duration: 800,
        },

        {
          type: "assistant",
          text: "已核实两条关键文献：杨秀等（2013，电力系统保护与控制）、宋妍萌等（2024，中国农村水利水电）。继续补齐参考文献。",
        },
        {
          type: "tool",
          label: "生成 Word 文档",
          detail: "build_docx.py output/spec.json -o output/论文.docx",
          duration: 1400,
        },
        {
          type: "tool",
          label: "渲染校验",
          detail: "抽样渲染关键页，核对版式",
          duration: 1000,
        },

        {
          type: "assistant",
          text: "论文已完成并通过全部校验。",
        },

        {
          type: "file",
          name: "计及光伏与储能的智能电网日前调度优化方法研究.docx",
          size: "286 KB",
          url: "assets/paper.docx",
          preview: "pdf",
          previewUrl: "assets/paper.pdf",
        },

        {
          type: "assistant",
          text: "《计及光伏与储能的智能电网日前调度优化方法研究》\n\n8 页 / 286 KB。结构：摘要关键词 → 一、引言 → 二、文献综述（4 小节）→ 三、调度模型建模（11 个 OMML 编号公式）→ 四、优化算法（离散化动态规划）→ 五、算例分析（含参数敏感性分析）→ 六、结论 → 附录 A 符号表 → 参考文献 13 条。\n\n3 幅插图、5 张三线表全部内嵌。点击上方文件卡片可预览，或直接下载 Word 原稿。",
        },
      ],
    },
  ],
};
