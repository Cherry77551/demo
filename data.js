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
      desc: "中文成稿：8 项确认到 Word 交付",
      taskId: "smart-grid",
    },
    {
      icon: "pen",
      title: "按导师批注改稿",
      desc: "逐条修订 + 回执表 + 版式复核",
      taskId: "revision",
    },
    {
      icon: "chart",
      title: "光伏与电价数据分析",
      desc: "鸭形曲线 + 峰谷电价双面板",
      taskId: "data-viz",
    },
    {
      icon: "quote",
      title: "文献综述框架",
      desc: "检索式 → 8 篇文献 → 综述骨架",
      taskId: "literature",
    },
    {
      icon: "doc",
      title: "IEEE TSG 英文成稿",
      desc: "LaTeX 论文 + Cover Letter",
      taskId: "english",
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
        { type: "exec", time: "10:58", duration: "96.9 秒" },
        {
          type: "reasoning",
          time: "10:58",
          duration: "96.9 秒",
          text: "用户再次请求：「帮我写一篇智能电网调度优化的论文」（Help me write a paper on smart grid dispatch optimization）。\n\n背景：他们刚说过「清除以上所有记忆，回答我下面的问题」——意味着要重新开始，忽略之前的对话。现在又问了同样的问题。\n\n所以这实际上是对论文请求的一次全新开始。技能（academic-writer）此前已在对话中加载，我也读过 requirement-confirmation.md。用户的记忆（MEMORY.md）里仍保留着他们的偏好——那是长期记忆，他们说过不要删除。\n\n他们的偏好：\n\n- 需求确认必须用可点击选择题（可补充选项），禁止开放式填空\n- 先确认完整方案、用户点头后再动手实施\n- 排版硬性要求：正文宋体小四、西文 Times New Roman、标题黑体、全文纯黑字、标题居中、目录独占一页、参考文献引用右上角上标；一级标题「一、二、三」，二级/三级 1.1 / 1.1.1\n- 公式须为 Word 原生公式对象（OMML）且编号居右\n- 未注明表类型默认全线表格",
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
        { type: "exec", time: "11:01", duration: "81.2 秒" },
        {
          type: "assistant",
          text: "八项都收到了，其中三处补充我单独标了出来。按流程汇总复述一遍，请核对：\n\n1. **类型与结构**：期刊论文·标准研究型，正文六章——引言 → 文献综述 → 调度模型建模 → 优化算法 → 算例分析 → 结论\n\n2. **输出格式**：Word 文档（.docx）单文件交付，不附带其他格式；图表、公式全部内嵌\n\n3. **摘要**：仅中文摘要 + 关键词（无英文摘要）\n\n4. **附带要素**：表格（按补充用三线表）、插图、公式（Word 原生 OMML、编号居右）、附录（符号表）；目录与封面未选，正文不带目录\n\n5. **篇幅**：按页数设定 8~12 页（A4，一般不严格卡死，按内容完整度落在区间内）\n\n6. **排版规格**：按既定基线执行，两处按你的修正调整——行距改为 1 倍（原基线 1.5 倍）；其余不变：正文宋体小四、西文 Times New Roman、标题黑体、全文纯黑、标题居中、页边距 2.5cm、引用右上角上标、一级标题「一、二、三」、1/1.1 编号\n\n7. **文献与数据**：联网搜集并逐条标注出处、URL/DOI、访问日期，按 GB/T 7714 排版；百科、新闻、自媒体不作论据。网上核实不到的文献会减引并告知，不编造。算例数据用公开典型场景构建仿真设定，并在论文中如实标注。\n\n8. **完成预估**：文献搜集 → 写作 → 生成 docx → 格式校验与抽样渲染复核，预计 1 小时内交付初稿。\n\n需要留意的两点：① 既定基线含「目录独占一页」，但你未选目录——按「无目录」执行；② 若与预期不符请现在指出。",
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
        { type: "exec", time: "11:02", duration: "18.4 秒" },
        { type: "assistant", text: "点头收到，开始执行。先建任务清单并加载技能规范，然后联网检索文献。" },
        { type: "exec", time: "11:02", duration: "122.4 秒" },
        {
          type: "assistant",
          text: "规范已加载。本机无 matplotlib/numpy/PIL、无 LibreOffice，有 pdftoppm（TeX Live 自带）。先确认 build_docx 对插图的字段要求，并查 Word 是否可用于渲染校验：",
        },
        { type: "exec", time: "11:04", duration: "120.6 秒" },
        {
          type: "assistant",
          text: "规范要点已明确：插图仅支持 PNG/JPEG（`{path, width_cm, caption}` 字段）、`toc` 要设 false、Word 可用于渲染校验。build_docx 正文行距硬编码 1.5 倍，与您确认的 1 倍不符——我把脚本复制到 `.temp/` 打补丁（不动技能包原件），校验脚本无行距强检，不冲突。",
        },
        { type: "exec", time: "11:06", duration: "24.0 秒" },
        {
          type: "assistant",
          text: "脚本就绪。现在并行推进：后台安装 matplotlib（绘图用），同时开始第一轮文献检索：",
        },
        { type: "exec", time: "11:07", duration: "43.3 秒" },
        {
          type: "assistant",
          text: "第一轮命中质量一般（多为主题页，需甄别来源等级）。知网条目可用作线索。继续第二轮检索，分别覆盖中文核心文献与英文文献：",
        },
        { type: "exec", time: "11:07", duration: "38.6 秒" },
        {
          type: "assistant",
          text: "有几条可用线索：期刊官网（华北电力大学学报平台、武汉大学《中国农村水利水电》官网）和知网页面，权威度合格。现在抓取两个页面核实完整卷期页码信息：",
        },
        { type: "exec", time: "11:08", duration: "40.0 秒" },
        {
          type: "assistant",
          text: "两条已核实：① 杨秀等《基于经济调度的微网储能优化配置》电力系统保护与控制 2013,41(1):53-59（作者中文名待核）；② 宋妍萌等《风光水火储多能互补双层优化调度研究》中国农村水利水电 2024(3):34-40。继续核实更多文献并检查后台安装进度：",
        },
        { type: "exec", time: "12:02", duration: "10.6 秒" },
        { type: "assistant", text: "这个 TeX Live 版本的 pdftoppm 不支持 jpeg，改用 png：" },
        { type: "exec", time: "12:05", duration: "180.4 秒" },
        {
          type: "assistant",
          text: "全部渲染校验通过。做交付前最后检查——工作目录状态与后台任务清理确认：",
        },
        { type: "exec", time: "12:06", duration: "52.3 秒" },
        { type: "assistant", text: "论文已完成并通过全部校验。" },
        {
          type: "assistant",
          text: "《计及光伏与储能的智能电网日前调度优化方法研究》\n\n8 页 / 286 KB。结构：摘要关键词 → 一、引言 → 二、文献综述（4 小节）→ 三、调度模型建模（11 个 OMML 编号公式）→ 四、优化算法（离散化动态规划）→ 五、算例分析（含参数敏感性分析）→ 六、结论 → 附录 A 符号表 → 参考文献 13 条。\n\n3 幅插图、5 张三线表全部内嵌。",
        },
        {
          type: "assistant",
          text: "### 质量核验（全部通过）\n\n| 检查项 | 结果 |\n|---|---|\n| check_format 13 项（字体、标题居中、纯黑、公式 OMML、上标引用、三线表、页边距等） | 13/13 PASS |\n| 段长错落（相邻段差 ≥30%、三档交替、无连续同档） | 达标 |\n| 渲染抽查 7 页（标题页、公式页×2、图表页×3、参考文献页） | 逐页复核通过 |\n| 页数 | 8 页，落在确认的 8~12 |\n\n### 内容说明\n\n结果真实可复现：算例不是编的——24 小时经济调度用动态规划真实求解（状态=荷电状态×火电出力，4000+ 离散状态），三场景对照：优化调度弃光 70 MWh→0、综合成本降 2.09%；敏感性分析发现 240 MWh 是「够用即可」拐点（120→240 再降 0.29 万元，240→360 仅再降 41 元）。复现脚本在 `.temp\\compute_dispatch.py`、`sensitivity.py`、`make_figures.py`。\n\n文献 13 条全部联网核实，无编造：期刊论文经期刊官网原文页、知网条目页或期刊官网参考文献列表核实（含《中国电机工程学报》《电网技术》等一手文献，逐条可回查 URL/DOI 与访问日期 2026-10-23）；装机数据引自国家能源局官网原文；GB/T 31464-2022 经国家标准全文公开系统核实。\n\n### 三点如实说明\n\n1. **渲染核验引擎**：本机 Word COM 导出反复挂起（已清理我启动的遗留进程，您自己开着的 Word 未受影响），渲染抽查改用 WPS 引擎完成——公式结构另经 `check_format` 程序化双重验证，风险很低。\n2. **目录**：您选择了无目录，strict 校验中「必须有目录」一项按默认模式口径处理（其余检查等价覆盖）。\n3. `.temp\\render\\` 下的 PDF 与页面是校验中间产物，不属于交付内容。\n\n如需调整（比如某章扩写、改作者信息、增删文献），告诉我具体位置即可。",
        },
        {
          type: "file",
          name: "智能电网调度优化论文.docx",
          size: "286 KB",
          url: "assets/paper.docx",
          preview: "pdf",
          previewUrl: "assets/paper.pdf",
        },
      ],
    },
  ],
};
