// user 事件可带 files: [{ name, size, url, preview, previewUrl }]，会显示在用户气泡里。
window.EXTRA_TASKS = [
  {
    id: "revision",
    title: "按导师批注改稿",
    shortTitle: "按导师批注改稿",
    status: "已完成",
    prompt: "请按批注逐条修改，输出修订说明回执表",
    events: [
      {
        type: "user",
        text: "请按批注逐条修改，输出修订说明回执表",
        files: [
          {
            name: "导师批注.docx",
            size: "303 KB",
            url: "assets/advisor-comments.docx",
            preview: "pdf",
            previewUrl: "assets/advisor-comments.pdf",
          },
        ],
      },
      { type: "thinking", text: "正在解析导师批注与修订…", duration: 1000 },
      { type: "tool", label: "解析导师批注", detail: "2 条批注 + 2 处修订", duration: 800 },
      {
        type: "assistant",
        text: "批注内容已提取：\n\n- **批注 1**：插入的半句语法不通，请重写衔接；建议补 1–2 篇近三年储能调度的文献支撑。\n- **批注 2**：「显著提升」过于绝对，要么给出具体数字，要么改成「有所提升」。\n\n两处修订也一并处理。",
      },
      { type: "tool", label: "补充近三年文献", detail: "宋妍萌 2024 / 凌煦 2026，均经期刊官网核实", duration: 800 },
      { type: "tool", label: "核验数字", detail: "弃光率 3.00%→0，成本下降 2.09%", duration: 700 },
      { type: "assistant", text: "按批注逐条修改，并生成回执表；先跑格式校验。" },
      { type: "tool", label: "生成回执文档", detail: "修订说明回执-导师批注.docx", duration: 900 },
      { type: "tool", label: "格式校验", detail: "check_format 13 项 PASS", duration: 800 },
      { type: "tool", label: "渲染复核", detail: "表 2 列宽修复，三线表 4px / 1–2px / 4px", duration: 900 },
      { type: "assistant", text: "全部校验通过，交付回执。原修订稿未改动。" },
      {
        type: "file",
        name: "修订说明回执-导师批注.docx",
        size: "6.5 KB",
        url: "assets/revision-receipt.docx",
        preview: "pdf",
        previewUrl: "assets/revision-receipt.pdf",
      },
      {
        type: "assistant",
        text: "核心修改对照：\n\n- **结论（语法修复）**：重写半句，用分号衔接两个并列关系，并补引 [1–2]。\n- **结论（去绝对化）**：「显著提升」→「提升」，并给出弃光率 3.00%→0、综合成本下降 2.09% 的真实算例数字。\n- **新增 2 篇近三年储能调度文献**：宋妍萌等（2024）、凌煦等（2026）。\n\n格式校验 13 项全 PASS；表 2 列宽已修复，三线表线型经像素复核确认。",
      },
    ],
  },

  {
    id: "data-viz",
    title: "光伏与电价数据分析",
    shortTitle: "光伏与电价数据分析",
    status: "已完成",
    prompt: "分析数据做可视化图表",
    events: [
      {
        type: "user",
        text: "分析数据做可视化图表",
        files: [
          {
            name: "某天光伏与电价相关数据.csv",
            size: "0.5 KB",
            url: "assets/pv-price-data.csv",
            preview: "text",
            previewUrl: "assets/pv-price-data.csv",
          },
        ],
      },
      { type: "thinking", text: "正在读取数据并判断图表方案…", duration: 1000 },
      { type: "tool", label: "读取 CSV", detail: "24 小时负荷 / 光伏出力 / 分时电价", duration: 700 },
      {
        type: "assistant",
        text: "数据结构清楚了：24 小时的负荷、光伏出力、分时电价三列——典型「鸭形曲线 + 峰谷电价」。`plot.py` 只支持单序列常规图，这张需要手写 matplotlib。",
      },
      { type: "tool", label: "绘制图表", detail: "双面板：三序列总览 + 净负荷鸭形曲线", duration: 1200 },
      {
        type: "file",
        name: "光伏与电价数据分析图.png",
        size: "297 KB",
        url: "assets/pv-price-chart.png",
        preview: "image",
        previewUrl: "assets/pv-price-chart.png",
      },
      {
        type: "assistant",
        text: "图表已交付（双面板，200 dpi）。\n\n1. **典型鸭形曲线**：光伏正午峰值 521.7 MW（12 时），净负荷午间压到 588.8 MW，比凌晨低谷 592.8 MW 还低。\n2. **净负荷峰谷差 598.8 MW**：午间谷 588.8（12 时）→ 晚峰 1187.6（20 时），19→20 时每小时爬升 84.4 MW。\n3. **电价峰值与负荷峰值重合、与光伏错位**：峰价 700 元/MWh 落在 19–20 时，光伏大发时反而最低 380 元。\n4. **光伏渗透率 19.8%**：日发电 4312.4 MWh / 负荷 21801.5 MWh。\n5. **负荷双峰**：午后高原 13–16 时约 1100 MW + 晚峰 20 时 1187.6 MW。\n\n上方文件卡片可预览或下载原图。",
      },
    ],
  },

  {
    id: "literature",
    title: "文献综述框架",
    shortTitle: "文献综述框架",
    status: "已完成",
    prompt: "目前没有现成资料，我想自己搜索，先给我检索式和待检索清单",
    events: [
      { type: "user", text: "目前没有现成资料，我想自己搜索，先给我检索式和待检索清单" },
      { type: "thinking", text: "正在按文献模块生成检索方案…", duration: 900 },
      { type: "tool", label: "读取文献模块", detail: "references/literature-review.md", duration: 700 },
      { type: "tool", label: "生成检索式", detail: "知网 / 万方 / Web of Science / 百度学术", duration: 800 },
      {
        type: "file",
        name: "检索式与待检索清单-智能电网调度优化.md",
        size: "5.6 KB",
        url: "assets/lit-search-plan.md",
        preview: "markdown",
        previewUrl: "assets/lit-search-plan.md",
      },
      {
        type: "assistant",
        text: "清单已生成：5 组检索式 + 11 条待检索清单，分 6 组（背景与政策、经典方法、多能互补、智能算法、同型算例对照、英文可选），并标注了优先级与需回填字段。你查完后把结果发我，我再逐条核验。",
      },
      {
        type: "user",
        text: "我查到了这批文献，帮我梳理成综述框架：\n\n1. 王强, 刘敏. 智能电网调度优化方法研究[J]. 电力系统自动化, 2021, 45(12): 1-9.\n2. Chen W, Li M, Zhao Q. A Deep Reinforcement Learning Approach to Smart Grid Dispatch. IEEE Transactions on Smart Grid. 2022;13(4):2210-2220.\n3. 《考虑光伏接入的配电网优化调度》——刘志远 等，《中国电机工程学报》，2020 年，第 40 卷第 8 期，pp. 2456-2465\n4. 李晓峰. 储能系统在电网调峰中的应用综述[J]. 电网技术, 2019, 43(6): 201-208\n5. 赵天宇、孙浩. 基于分时电价的需求响应建模, 电力系统保护与控制, 2023 年第 15 期, 51 卷, 112-120 页\n6. Zhang Y, et al. Multi-objective optimization for microgrid scheduling. Applied Energy, 2024, 359: 122660.\n7. 《储能系统原理与工程应用》刘志远 主编 北京 科学出版社 2019 年\n8. 郑海涛. 分时电价下用户侧储能容量优化配置研究[博士学位论文]. 东南大学, 2022.",
      },
      { type: "thinking", text: "正在验料并聚类主题…", duration: 1000 },
      { type: "tool", label: "验料", detail: "8 条一手来源；3 处字段缺口已标注", duration: 800 },
      { type: "tool", label: "生成综述框架", detail: "按主题聚类四条线索", duration: 900 },
      {
        type: "file",
        name: "文献综述框架-智能电网调度优化.md",
        size: "6.7 KB",
        url: "assets/lit-framework.md",
        preview: "markdown",
        previewUrl: "assets/lit-framework.md",
      },
      {
        type: "assistant",
        text: "框架已生成，按主题聚类为四条线索：\n\n- **方法主线演进**：确定性规划 → 多目标 → 深度强化学习；模型驱动与数据驱动两线未合流。\n- **光伏消纳约束**：高渗透倒逼调度显式计及消纳。\n- **储能作为调度资源**：原理 → 电网侧调峰 → 用户侧配置；配置与运行视角互补。\n- **需求响应与源荷互动**：分时电价把调度弹性扩展到负荷侧。\n\n验料说明：8 条均为一手来源；#3 缺前 3 位作者、#6 缺第 2/3 位作者、#8 缺保存地，已在文档中标注。",
      },
    ],
  },

  {
    id: "english",
    title: "IEEE TSG 英文成稿",
    shortTitle: "IEEE TSG 英文成稿",
    status: "已完成",
    prompt: "帮我写一篇投 IEEE Transactions on Smart Grid 的论文",
    events: [
      { type: "user", text: "帮我写一篇投 IEEE Transactions on Smart Grid 的论文" },
      { type: "thinking", text: "正在判断语言与 LaTeX 环境…", duration: 1000 },
      { type: "tool", label: "加载英文写作模块", detail: "references/english-writing.md", duration: 700 },
      { type: "tool", label: "检查 LaTeX 环境", detail: "TeX Live 2023 / IEEEtran.cls / pdflatex", duration: 800 },
      {
        type: "assistant",
        text: "语言判定为英文（目标期刊 IEEE TSG）。按流程确认 6 项：诚实基准定位、LaTeX IEEEtran、6–8 页、联网核验英文文献、按 IEEE 惯例、需要 Cover Letter。",
      },
      {
        type: "ask",
        questions: [
          {
            header: "论文定位",
            question: "论文定位怎么定？",
            multiple: false,
            options: [
              { label: "诚实基准定位（推荐）", description: "明确是精确 DP 基准研究，不夸大新颖性" },
              { label: "强调新颖性", description: "与现有算例定位不符，风险较高" },
            ],
          },
          {
            header: "输出格式",
            question: "输出什么格式？",
            multiple: false,
            options: [
              { label: "LaTeX IEEEtran（推荐）", description: "真正双栏投稿版式" },
              { label: "Word", description: "便于批注" },
            ],
          },
          {
            header: "篇幅",
            question: "篇幅怎么定？",
            multiple: false,
            options: [
              { label: "6~8 页（推荐）", description: "TSG 常规长度" },
              { label: "8~10 页", description: "更长" },
            ],
          },
          {
            header: "参考文献",
            question: "参考文献怎么处理？",
            multiple: false,
            options: [
              { label: "联网核验英文为主（推荐）", description: "现有 13 条均为中文，TSG 英文占比应更高" },
              { label: "沿用中文文献", description: "不推荐" },
            ],
          },
          {
            header: "摘要与体例",
            question: "摘要、结构、体例按 IEEE 惯例执行吗？",
            multiple: false,
            options: [
              { label: "按 IEEE 惯例（推荐）", description: "含插图重绘为英文标注" },
              { label: "自定义", description: "请补充" },
            ],
          },
          {
            header: "Cover Letter",
            question: "需要随稿生成 Cover Letter 吗？",
            multiple: false,
            options: [
              { label: "需要（推荐）", description: "1 页投稿信" },
              { label: "不需要", description: "" },
            ],
          },
        ],
        selected: [
          ["诚实基准定位（推荐）"],
          ["LaTeX IEEEtran（推荐）"],
          ["6~8 页（推荐）"],
          ["联网核验英文为主（推荐）"],
          ["按 IEEE 惯例（推荐）"],
          ["需要（推荐）"],
        ],
      },
      { type: "assistant", text: "六项全部确认，开始执行。" },
      { type: "tool", label: "联网核验英文文献", detail: "Wood & Wollenberg / NREL / Bellman / Zia 2018 等", duration: 900 },
      { type: "tool", label: "重绘英文插图", detail: "fig1–fig4 英文标注", duration: 800 },
      { type: "tool", label: "撰写 IEEEtran 稿", detail: "main.tex / refs.bib", duration: 1200 },
      { type: "tool", label: "编译主稿", detail: "pdflatex ×2 + bibtex", duration: 1000 },
      { type: "tool", label: "生成 Cover Letter", detail: "cover_letter.tex → 1 页 PDF", duration: 800 },
      { type: "tool", label: "数字完整性抽查", detail: "DP 复现 / 图表 / 参考文献页码", duration: 800 },
      { type: "assistant", text: "全部 7 页目检 PASS，主稿定稿；Cover Letter 编译完成（1 页）。" },
      {
        type: "file",
        name: "main.pdf",
        size: "320 KB",
        url: "assets/english-paper.pdf",
        preview: "pdf",
        previewUrl: "assets/english-paper.pdf",
      },
      {
        type: "file",
        name: "cover_letter.pdf",
        size: "48 KB",
        url: "assets/cover-letter.pdf",
        preview: "pdf",
        previewUrl: "assets/cover-letter.pdf",
      },
      {
        type: "assistant",
        text: "IEEE TSG 英文论文全套完成并交付。\n\n- 正文 7 页，IEEEtran 双栏，图表英文标注\n- 参考文献已逐条核验，Cover Letter 1 页\n- 源文件、插图与四个脚本已一并整理；投稿前建议在本地跑一遍 `code/` 下的脚本确认环境一致。",
      },
    ],
  },
];
