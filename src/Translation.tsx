// ============================================================
// Roux Trainer - 多语言翻译字典 (zh / en)
// ============================================================

type TranslationDict = typeof zh;

// ---- 中文 ----
const zh = {
  COMMON: {
    SHOW: "显示",
    HIDE: "隐藏",
    ON: "开启",
    OFF: "关闭",
    YES: "是",
    NO: "否",
    OK: "确定",
    CLOSE: "关闭",
    CANCEL: "取消",
    CONFIRM: "确认",
    EDIT: "编辑",
    SELECT: "选择",
    NEXT: "下一个",
    REVEAL: "显示答案",
    SCRAMBLE: "打乱",
    SOLUTIONS: "解法",
    CASE: "案例",
    LEVEL: "级别",
    ANY: "任意",
    ADD: "添加",
    INPUT: "输入",
    NO_SOLUTION: "按空格获取新题目",
    CHAIN_PRACTICE: "连贯练习 →",
  },

  NAV: {
    APP_TITLE: "Roux 训练器",
    APP_TITLE_SHORT: "Roux 训练器",
    GOT_IT: "知道了！",
    LANGUAGE: "语言",
  },

  MODES: {
    FB: { full: "左桥 (固定)", short: "FB (固定)" },
    ANALYZER: { full: "左桥分析器 (x2y | CN)", short: "FB 分析器 (x2y | CN)" },
    FS: { full: "左桥方块", short: "FB 方块" },
    FSDR: { full: "左桥方块 + DR 棱块", short: "FB 方块 + DR" },
    FBDR: { full: "左桥最后组对 (+ DR 棱块)", short: "FB 最后组对 (+DR)" },
    FBSS: { full: "左桥最后组对 + 第二方块", short: "FB 最后组对 + SS" },
    SS: { full: "右桥方块", short: "SB 方块" },
    CMLL: { full: "CMLL", short: "CMLL" },
    LSE_4C: { full: "LSE 4c", short: "LSE 4c" },
    EOLR: { full: "EOLR / EOLRb", short: "EOLR(b)" },
  },

  CONFIG: {
    VIRTUAL_CUBE: "虚拟魔方",
    THEME: "主题",
    THEME_BRIGHT: "亮色",
    THEME_DARK: "暗色",
    SOLUTION_SORTING: "解法排序方式",
    SORT_DEFAULT: "默认",
    SORT_QTM: "QTM",
    MOVE_COUNT_HINT: "显示步数提示",
    NUM_SOLUTIONS: "解法数量",
    COLOR_SCHEME_LABEL: "打乱朝向 (U-F)",

    CMLL_AUF: "CMLL AUF",
    CMLL_AUF_NONE: "无",
    SB_LAST_PAIR_TRIGGER: "SB 最后组对触发器（全部取消则为纯 CMLL）",
    CUBE_MASK: "魔方遮罩",
    CUBE_MASK_SHOW: "显示",
    CUBE_MASK_HIDE: "隐藏",
    CUBE_MASK_HIDE_LSE: "隐藏 LSE",
    VISUALIZE_AS: "显示方式",
    VIS_FLAT3D: "平面 3D",
    VIS_3D: "3D",
    VIS_2D: "2D",
    SHOW_L_FACE: "显示 L 面",
    LR_FACES_REVEAL: "显示的 L/R 面",
    RECOG_STICKERS_ONLY: "仅显示识别贴纸",
    NMCLL_RECOG_MODE: "NMCLL 识别模式",
    NMCLL_OFF: "关闭",
    BATCH_MODE: "批量模式",

    SELECT_CMLL_CASES: "选择 CMLL 案例",
    SELECT_OLLCP_CASES: "选择 OLLCP 案例",
    SELECT_BY_NMCLL: "按 NMCLL 选择",
    NMCLL_DIALOG_TITLE: "按 NMCLL 识别选择案例（这是独立于上述选择的筛选，仅在 L/R 或 F/B 模式下生效）",

    FB_ORIENTATION: "FB 朝向",
    ORI_X2Y_WY: "x2y 白/黄",
    ORI_X2Y_BG: "x2y 蓝/绿",
    ORI_X2Y_RO: "x2y 红/橙",
    ORI_CN: "全色中立",
    ORGANIZE: "排列方式",
    ORGANIZE_BY_FB: "按 FB 分组",
    ORGANIZE_COMBINED: "合并显示",
    FB_STAGE: "FB 阶段",
    FB_STAGE_FB: "FB",
    FB_STAGE_FS: "FS",
    FB_STAGE_PSEUDO_FS: "伪 FS",
    FB_STAGE_ELINE: "E-Line+1",
    FB_STAGE_FS_LINE: "FS/Line",
    HINTS: "提示？",

    DIFFICULTY: "难度",
    DIFF_RANDOM: "随机",
    DIFF_DL_SOLVED: "DL 已还原",
    DIFF_BL_SOLVED: "BL 已还原",
    DIFF_HARD: "困难",

    FB_BASIS: "FB 基准（视为已还原的块），默认为 L 中心已还原",
    FB_BASIS_DEFAULT: "默认",
    POSITION_OF_SQUARE: "方块位置",
    FS_AT_BACK: "FS 在后",
    FS_AT_FRONT: "FS 在前",
    EITHER: "任意",
    FRONT_FS: "前 FS",
    BACK_FS: "后 FS",
    BOTH: "两者",
    FRONT_SS: "前 SS",
    BACK_SS: "后 SS",
    FRONT_FBLP: "前 FBLP",
    BACK_FBLP: "后 FBLP",
    SS_POSITION: "SS 位置",

    SCRAMBLE_TYPE: "打乱类型",
    SCRAMBLE_SHORT: "短打乱（仅涉及 FBDR 块）",
    SCRAMBLE_RANDOM_STATE: "随机状态（整个魔方，适合练习 F2B）",
    SCRAMBLE_SHORT_LSE: "短打乱",
    SCRAMBLE_RANDOM_STATE_LSE: "随机状态",
    PIECES_TO_SOLVE: "要还原的块",
    FB_LAST_PAIR_DR: "FB 最后组对 + DR",
    FB_LAST_PAIR_ONLY: "仅 FB 最后组对",
    LAST_PAIR_PATTERN: "最后组对模式",
    RANDOM: "随机",
    SOLVED: "已还原",
    POSITION_OF_FB_EDGE: "FB 棱块位置",
    POSITION_OF_DR: "DR 位置",
    ORIENTATION_OF_DR: "DR 朝向",
    ORIENTED: "已归位",
    MISORIENTED: "未归位",
    SS_LABEL: "SS",
    DR_FIXED: "DR 固定",

    LSE_CENTER: "中心",
    ALIGNED: "对齐",
    MISALIGNED: "错位",
    EO_PAIR: "EO 对",
    STAGE: "阶段",
    STAGE_4B_MC: "4b (MC，1步 EO对插入)",
    STAGE_M2_4C: "M2 到 4c",
    STAGE_4C: "4c",
    EO: "EO",
    EO_SOLVED: "已还原",
    EO_ARROW: "箭头",
    CENTER_STRATEGY: "中心策略",
    EOLR_MC_NONMC_ONLY: "仅显示非 MC 最优的案例",
    EOLR_MC_ONLY_OPTIMAL: "仅显示 MC 最优的案例",
    EOLR_COMBINED: "合并",
    EOLR_MC_ONLY: "仅显示 MC 解法",
    EOLR_NONMC_ONLY: "仅显示非 MC 解法",
    EOLR_EOLRB: "EOLR / EOLRb",

    OBSCURE_NON_LR: "遮挡非 L/R 块",
    OBSCURED_STICKER_WIDTH: "遮挡贴纸宽度",
    WIDTH_THIN: "细",
    WIDTH_MEDIUM: "中",
    WIDTH_THICK: "粗",
    FULL_CORNER_MASKING: "完全遮挡角块",

    FBDR_LEVEL: "FBDR-级别",
    FBSS_LEVEL: "FBSS-级别",
    FS_LEVEL: "FS-级别",
    FB_LEVEL: "FB-级别",
    SS_LEVEL: "SS-级别",

    SCRAMBLE_ORI_WG: "白绿",
    SCRAMBLE_ORI_OTHER: "其他",
    FILTER_OPTIONS: "筛选选项",
    CHAIN_TARGET_LABEL: "连贯训练目标",
    CHAIN_TARGET_FBLP_DR: "FBLP + DR",
    CHAIN_TARGET_FBLP_SS: "FBLP + 第二方块",
  },

  ANALYZER: {
    SCRAMBLE_INPUT: "打乱",
    GEN: "生成",
    GO: "开始",
    MY_SOLUTION: "我的解法",
    INPUT_YOUR_SOLUTION: "输入你的解法",
    INPUT_SOLUTION_DIALOG: "输入你的还原解法",
    INPUT_SCRAMBLE_DIALOG: "输入你自己的解法 / 打乱（每行一个）",
    USE_AS_SOLUTION: "作为解法使用",
    USE_AS_SCRAMBLE: "作为打乱使用",
    CLICK_TO_REVEAL: "（点击显示）",
    EXISTS_STM_SOLUTION: (n: number, tag: string) => `存在 ${n}-STM 的 ${tag} 解法，位于：`,

    FB_ORI_DIALOG_TITLE: "设置打乱朝向（桥色）和配色方案",
    COLOR: "颜色",
    COLOR_HELPER: "绿,蓝,红,橙,黄,白,灰",
    SET_COLOR: "设置颜色",
    ORI_AND_COLOR_SCHEME: "打乱朝向（桥色）和配色方案",
  },

  CMLL: {
    USAGE: "操作：按空格获取下一个案例。按 Enter 重置。/ 显示答案。",
  },

  LSE: {
    USAGE: "操作：按空格获取下一个案例。按 Enter 重置。\n\n虚拟魔方：I/K (E/D) 对应 M'/M，J/F 对应 U/U'",
  },

  FAV: {
    DELETE_TITLE: "从收藏中删除此算法？",
    ADD_TITLE: "添加新题目",
    ADD_INSTRUCTIONS: "在此输入你的题目（每行一个）\n格式：[类别], [准备算法]。\n类别 := fb | fbdr | ss-front | ss-back",
    ADD_ALL: "全部添加",
    SCRAMBLE_HEADER: "打乱",
  },

  CASE_SELECT: {
    SELECT_ALL: "全选",
    DESELECT_ALL: "取消全选",
  },

  LEVEL_SELECT: {
    LEVEL: "级别",
    ANY: "任意",
    TOGGLE_SELECT_ALL: "切换全选",
    TOGGLE_ALL_ORIENTED: "切换全部已归位",
  },

  TRACKER: {
    MODE: "模式",
    WATCH_FS_TRACK_LP: "观察 FS，追踪最后组对",
    WATCH_FS_TRACK_LP_DR: "观察 FS，追踪最后组对 + DR",
    WATCH_FB_TRACK_DR: "观察 FB，追踪 DR",
    WATCH_FB_TRACK_SB: "观察 FB，追踪 SB 组对",
    WATCH_FB_TRACK_DR_SB: "观察 FB，追踪 DR + SB 组对",
    WATCH_CROSS_TRACK_F2L: "观察十字，追踪 F2L 组对（当然不会实现）",
    MOVE_COUNT: "步数",
    MOVE_GROUP: "移动组",
  },

  INTRO: {
    MARKDOWN: "# Roux Trainers (桥式进阶训练器 - aoi优化版)\n一个旨在辅助桥式（Roux）日常训练的辅助工具 ❤️\n\n## 关于本版本（写在前面）\n本项目基于原作者 Onionhoney（孙大师）的优秀开源项目进行了一些本土化适配和细节微调。\n\n本人是 polo-aoi，作为一名刚接触魔方半年多的桥式爱好者，在日常练习中为了让自己用得更顺手，我尝试对原版进行了一点小小的功能扩充与\"软装\"：\n\n- **连贯训练尝试**：试着打通了 FS ➡️ FBLP ➡️ SS 的跳转逻辑，希望能在肌肉记忆和 Lookahead（预判衔接）的实战练习上提供一点连贯的体验。\n- **界面与多语言适配**：重新梳理了底层的网格排版，修复了中英文切换的一些细节问题，并将打乱朝向适配为了更直观的\"顶面/前面（底色/桥色）\"中文字样。\n- **快捷键交互微调**：修复了鼠标点击后空格键容易被焦点劫持的 Bug，并去除了在实战中容易误触的 Enter 键重置功能。\n\n## 恳请多多指教\n由于我个人的魔方资历尚浅，孙大师原版训练器中许多高阶、硬核的强大功能，我至今也还在努力摸索和学习中。\n\n在这次微调代码的过程中，难免会有理解不到位或者修改出的新 Bug。非常欢迎各位魔友、路过的大佬多多指教！如果你在训练过程中遇到了任何奇奇怪怪的报错、体验不顺畅的地方，或者有更好的功能创意，随时欢迎联系我进行修改和讨论，我们一起把这个训练器变得更好用。\n\n## 致谢 (Credits)\n- 本项目最核心的底层算法与框架均出自 Onionhoney 的开源心血。\n- 灵感最初来源于 cubegrass.appspot.com。\n- 原版开源 GitHub 仓库：https://github.com/onionhoney/roux-trainers",
  },

  DIFFICULTY_ANNOTATION:
    "说明：\n" +
    "这些模式对你的 FB 状态施加不同的约束。\n" +
    "[困难] 表示没有自由的组对，且没有棱块连接到 L 中心。",

  LEVEL_FAIL_WARNING:
    "我们未能在时间限制内生成你的级别。你可以再试一次——某些级别几次尝试内就能达到。",

  EOLR_MODE: {
    NONMC_SHORTER_ONLY: "仅显示非 MC 最优的案例",
    MC_SHORTER_ONLY: "仅显示 MC 最优的案例",
    COMBINED: "合并",
    MC_ONLY: "仅显示 MC 解法",
    NONMC_ONLY: "仅显示非 MC 解法",
  },

  COLOR_SCHEMES: {
    WG: "白顶绿前（黄底橙桥）", WB: "白顶蓝前（黄底红桥）", WO: "白顶橙前（黄底蓝桥）", WR: "白顶红前（黄底绿桥）",
    YG: "黄顶绿前（白底红桥）", YB: "黄顶蓝前（白底橙桥）", YO: "黄顶橙前（白底绿桥）", YR: "黄顶红前（白底蓝桥）",
    BW: "蓝顶白前（绿底橙桥）", BY: "蓝顶黄前（绿底红桥）", BO: "蓝顶橙前（绿底黄桥）", BR: "蓝顶红前（绿底白桥）",
    GW: "绿顶白前（蓝底红桥）", GY: "绿顶黄前（蓝底橙桥）", GO: "绿顶橙前（蓝底白桥）", GR: "绿顶红前（蓝底黄桥）",
    OW: "橙顶白前（红底绿桥）", OY: "橙顶黄前（红底蓝桥）", OB: "橙顶蓝前（红底白桥）", OG: "橙顶绿前（红底黄桥）",
    RW: "红顶白前（橙底蓝桥）", RY: "红顶黄前（橙底绿桥）", RB: "红顶蓝前（橙底黄桥）", RG: "红顶绿前（橙底白桥）",
  },
};

// ---- English ----
const en: typeof zh = {
  COMMON: {
    SHOW: "Show",
    HIDE: "Hide",
    ON: "On",
    OFF: "Off",
    YES: "Yes",
    NO: "No",
    OK: "Ok",
    CLOSE: "Close",
    CANCEL: "Cancel",
    CONFIRM: "Confirm",
    EDIT: "Edit",
    SELECT: "SELECT",
    NEXT: "Next",
    REVEAL: "Reveal",
    SCRAMBLE: "Scramble",
    SOLUTIONS: "Solutions",
    CASE: "Case",
    LEVEL: "Level",
    ANY: "Any",
    ADD: "Add",
    INPUT: "Input",
    NO_SOLUTION: "Press next for new case",
    CHAIN_PRACTICE: "Chain →",
  },

  NAV: {
    APP_TITLE: "Roux Trainer",
    APP_TITLE_SHORT: "Roux Trainer",
    GOT_IT: "Got it!",
    LANGUAGE: "Language",
  },

  MODES: {
    FB: { full: "First Block (Fixed)", short: "FB (fixed)" },
    ANALYZER: { full: "First Block Analyzer (x2y | CN)", short: "FB analyzer (x2y | CN)" },
    FS: { full: "First Block Square", short: "FB square" },
    FSDR: { full: "First Block Square + DR edge", short: "FB square + DR" },
    FBDR: { full: "First Block Last Pair (+ DR edge)", short: "FB last pair (+DR)" },
    FBSS: { full: "First Block Last Pair + Second Square", short: "FB last pair + SS" },
    SS: { full: "Second Block Square", short: "SB square" },
    CMLL: { full: "CMLL", short: "CMLL" },
    LSE_4C: { full: "LSE 4c", short: "LSE 4c" },
    EOLR: { full: "EOLR / EOLRb", short: "EOLR(b)" },
  },

  CONFIG: {
    VIRTUAL_CUBE: "Virtual Cube",
    THEME: "Theme",
    THEME_BRIGHT: "bright",
    THEME_DARK: "dark",
    SOLUTION_SORTING: "Solution Sorting Metrics",
    SORT_DEFAULT: "Default",
    SORT_QTM: "QTM",
    MOVE_COUNT_HINT: "Show Movecount Hint",
    NUM_SOLUTIONS: "Number of solutions",
    COLOR_SCHEME_LABEL: "Scramble Orientation (U-F)",

    CMLL_AUF: "CMLL AUF",
    CMLL_AUF_NONE: "None",
    SB_LAST_PAIR_TRIGGER: "SB Last Pair Trigger (Uncheck all for pure CMLL)",
    CUBE_MASK: "Virtual Cube",
    CUBE_MASK_SHOW: "Show",
    CUBE_MASK_HIDE: "Hide",
    CUBE_MASK_HIDE_LSE: "Hide LSE",
    VISUALIZE_AS: "Visualize as",
    VIS_FLAT3D: "flat3D",
    VIS_3D: "3D",
    VIS_2D: "2D",
    SHOW_L_FACE: "Show L face",
    LR_FACES_REVEAL: "L/R faces to reveal",
    RECOG_STICKERS_ONLY: "Display recog stickers only",
    NMCLL_RECOG_MODE: "NMCLL Recog Mode",
    NMCLL_OFF: "off",
    BATCH_MODE: "Batch Mode",

    SELECT_CMLL_CASES: "Select CMLL Cases",
    SELECT_OLLCP_CASES: "Select OLLCP Cases",
    SELECT_BY_NMCLL: "Select by NMCLL",
    NMCLL_DIALOG_TITLE: "Select cases by NMCLL recog (this is a separate selection from above, only activated when you're in L/R or F/B mode)",

    FB_ORIENTATION: "FB Orientation",
    ORI_X2Y_WY: "x2y on W/Y",
    ORI_X2Y_BG: "x2y on B/G",
    ORI_X2Y_RO: "x2y on R/O",
    ORI_CN: "Color Neutral",
    ORGANIZE: "Organize",
    ORGANIZE_BY_FB: "By FB",
    ORGANIZE_COMBINED: "Combined",
    FB_STAGE: "FB Stage",
    FB_STAGE_FB: "FB",
    FB_STAGE_FS: "FS",
    FB_STAGE_PSEUDO_FS: "Pseudo FS",
    FB_STAGE_ELINE: "E-Line+1",
    FB_STAGE_FS_LINE: "FS/Line",
    HINTS: "Hints?",

    DIFFICULTY: "Difficulty",
    DIFF_RANDOM: "Random",
    DIFF_DL_SOLVED: "DL Solved",
    DIFF_BL_SOLVED: "BL Solved",
    DIFF_HARD: "Hard",

    FB_BASIS: "Basis (piece considered solved) for FB. Default is L-center solved.",
    FB_BASIS_DEFAULT: "Default",
    POSITION_OF_SQUARE: "Position of square",
    FS_AT_BACK: "FS at back",
    FS_AT_FRONT: "FS at front",
    EITHER: "Either",
    FRONT_FS: "Front FS",
    BACK_FS: "Back FS",
    BOTH: "Both",
    FRONT_SS: "Front SS",
    BACK_SS: "Back SS",
    FRONT_FBLP: "Front FBLP",
    BACK_FBLP: "Back FBLP",
    SS_POSITION: "SS Position",

    SCRAMBLE_TYPE: "Type of scramble",
    SCRAMBLE_SHORT: "Short (Concerning FBDR Pieces only)",
    SCRAMBLE_RANDOM_STATE: "Random State (Entire cube, useful for practicing F2B)",
    SCRAMBLE_SHORT_LSE: "Short",
    SCRAMBLE_RANDOM_STATE_LSE: "Random State",
    PIECES_TO_SOLVE: "Pieces to solve",
    FB_LAST_PAIR_DR: "FB Last Pair + DR",
    FB_LAST_PAIR_ONLY: "FB Last Pair Only",
    LAST_PAIR_PATTERN: "Last Pair pattern",
    RANDOM: "Random",
    SOLVED: "Solved",
    POSITION_OF_FB_EDGE: "Position of FB edge",
    POSITION_OF_DR: "Position of DR",
    ORIENTATION_OF_DR: "Orientation of DR",
    ORIENTED: "Oriented",
    MISORIENTED: "Misoriented",
    SS_LABEL: "SS",
    DR_FIXED: "DR fixed",

    LSE_CENTER: "Center",
    ALIGNED: "Aligned",
    MISALIGNED: "Misaligned",
    EO_PAIR: "EO Pair",
    STAGE: "Stage",
    STAGE_4B_MC: "4b for MC(1 move EOPair insert)",
    STAGE_M2_4C: "M2 to 4c",
    STAGE_4C: "4c",
    EO: "EO",
    EO_SOLVED: "solved",
    EO_ARROW: "arrow",
    CENTER_STRATEGY: "Center strategy",
    EOLR_MC_NONMC_ONLY: "Only show cases where non-MC is optimal",
    EOLR_MC_ONLY_OPTIMAL: "Only show cases where MC is optimal",
    EOLR_COMBINED: "Combined",
    EOLR_MC_ONLY: "Only show MC solutions",
    EOLR_NONMC_ONLY: "Only show non-MC solutions",
    EOLR_EOLRB: "EOLR / EOLRb",

    OBSCURE_NON_LR: "Obscure Non-L/R",
    OBSCURED_STICKER_WIDTH: "Obscured Sticker Width",
    WIDTH_THIN: "Thin",
    WIDTH_MEDIUM: "Medium",
    WIDTH_THICK: "Thick",
    FULL_CORNER_MASKING: "Full Corner Masking",

    FBDR_LEVEL: "fbdr-level",
    FBSS_LEVEL: "fbss-level",
    FS_LEVEL: "fs-level",
    FB_LEVEL: "fb-level",
    SS_LEVEL: "ss-level",

    SCRAMBLE_ORI_WG: "WG",
    SCRAMBLE_ORI_OTHER: "Other",
    FILTER_OPTIONS: "Filter Options",
    CHAIN_TARGET_LABEL: "Next Step Target",
    CHAIN_TARGET_FBLP_DR: "FBLP + DR",
    CHAIN_TARGET_FBLP_SS: "FBLP + SS",
  },

  ANALYZER: {
    SCRAMBLE_INPUT: "Scramble",
    GEN: "Gen",
    GO: "GO",
    MY_SOLUTION: "My Solution",
    INPUT_YOUR_SOLUTION: "Input Your Solution",
    INPUT_SOLUTION_DIALOG: "Input your reconstructed solution",
    INPUT_SCRAMBLE_DIALOG: "Input your own solution / scrambles (one per line)",
    USE_AS_SOLUTION: "Use as solution",
    USE_AS_SCRAMBLE: "Use as scramble",
    CLICK_TO_REVEAL: "(Click to reveal)",
    EXISTS_STM_SOLUTION: (n: number, tag: string) => `There exists ${n}-STM ${tag || "solution"} in: `,

    FB_ORI_DIALOG_TITLE: "Scramble Orientation (Bridge) & Color Scheme",
    COLOR: "Color",
    COLOR_HELPER: "G,B,R,O,Y,W,Gray",
    SET_COLOR: "Set color",
    ORI_AND_COLOR_SCHEME: "Scramble Orientation (Bridge) & Color Scheme",
  },

  CMLL: {
    USAGE: "Usage: Press space for next case. Enter to redo. / to reveal.",
  },

  LSE: {
    USAGE: "Usage: Press space for next case. Enter to redo.\n\nVirtual Cube: I/K (E/D) for M'/M, J/F for U/U'",
  },

  FAV: {
    DELETE_TITLE: "Delete this alg from favorites?",
    ADD_TITLE: "Add New Cases",
    ADD_INSTRUCTIONS: "Input your cases here. (one per line)\nFormat: [category], [setup algorithm].\ncategory := fb | fbdr | ss-front | ss-back",
    ADD_ALL: "Add All",
    SCRAMBLE_HEADER: "Scramble",
  },

  CASE_SELECT: {
    SELECT_ALL: "Select All",
    DESELECT_ALL: "Deselect All",
  },

  LEVEL_SELECT: {
    LEVEL: "Level",
    ANY: "Any",
    TOGGLE_SELECT_ALL: "Toggle Select All",
    TOGGLE_ALL_ORIENTED: "Toggle All Oriented",
  },

  TRACKER: {
    MODE: "Mode",
    WATCH_FS_TRACK_LP: "Watch FS, Track Last Pair",
    WATCH_FS_TRACK_LP_DR: "Watch FS, Track Last Pair + DR",
    WATCH_FB_TRACK_DR: "Watch FB, Track DR",
    WATCH_FB_TRACK_SB: "Watch FB, Track SB Pair",
    WATCH_FB_TRACK_DR_SB: "Watch FB, Track DR + SB Pair",
    WATCH_CROSS_TRACK_F2L: "Watch Cross, Track F2L Pair (will not be implemented, of course)",
    MOVE_COUNT: "MoveCount",
    MOVE_GROUP: "MoveGroup",
  },

  INTRO: {
    MARKDOWN: "# Roux Trainers (aoi's Optimized Edition)\nA tool designed to assist with daily Roux method training ❤️\n\n## About This Version\nThis project is built upon the excellent open-source work by the original author, Onionhoney, with some localization and fine-tuning.\n\nI am polo-aoi. As a Roux enthusiast who has only been cubing for about half a year, I tried to add a few small features and UI facelifts to the original version to make it handier for my daily practice:\n\n- **Seamless Training Flow**: Bridged the transition logic from FS ➡️ FBLP ➡️ SS, hoping to provide a more coherent experience for building muscle memory and practicing Lookahead in real solves.\n- **UI & Localization**: Reworked the underlying grid layout, fixed minor issues with the EN/ZH toggle, and localized the scramble orientations into a more intuitive \"Top/Front (Bottom/Bridge color)\" format.\n- **Shortcut Tweaks**: Fixed the bug where the Spacebar was easily hijacked by element focus after a mouse click, and removed the Enter key reset function to prevent accidental presses during intensive training.\n\n## Feedback Welcome\nGiven my limited cubing experience, I am still exploring and learning many of the advanced, hardcore features of Onionhoney's original trainer.\n\nDuring these code tweaks, there might inevitably be some misunderstandings or new bugs introduced. Feedback and guidance from fellow cubers and experts are highly appreciated! If you encounter any weird errors, clunky experiences, or have brilliant ideas for new features, please feel free to reach out for discussion. Let's make this trainer better together.\n\n## Credits\n- The core underlying algorithms and framework of this project are entirely the open-source efforts of Onionhoney.\n- Originally inspired by cubegrass.appspot.com.\n- Original Open-Source GitHub Repository: https://github.com/onionhoney/roux-trainers",
  },

  DIFFICULTY_ANNOTATION:
    "Explanation:\n" +
    "These modes apply different constraints on your FB state.\n" +
    "[Hard] means there's no free pair AND no edges attached to the L center.",

  LEVEL_FAIL_WARNING:
    "We weren't able to generate your level within time limit. You can try again -- some levels are reachable within a few tries.",

  EOLR_MODE: {
    NONMC_SHORTER_ONLY: "Only show cases where non-MC is optimal",
    MC_SHORTER_ONLY: "Only show cases where MC is optimal",
    COMBINED: "Combined",
    MC_ONLY: "Only show MC solutions",
    NONMC_ONLY: "Only show non-MC solutions",
  },

  COLOR_SCHEMES: {
    WG: "WG", WB: "WB", WO: "WO", WR: "WR",
    YG: "YG", YB: "YB", YO: "YO", YR: "YR",
    BW: "BW", BY: "BY", BO: "BO", BR: "BR",
    GW: "GW", GY: "GY", GO: "GO", GR: "GR",
    OW: "OW", OY: "OY", OB: "OB", OG: "OG",
    RW: "RW", RY: "RY", RB: "RB", RG: "RG",
  },
};

// ---- Reactive language system ----
const LANG_KEY = "roux_language";
export type Language = "zh" | "en";

let currentLang: Language = (() => {
  try {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "zh") return stored;
  } catch (_) { /* localStorage unavailable */ }
  return "zh";
})();

export function getLanguage(): Language {
  return currentLang;
}

export function setLanguage(lang: Language) {
  currentLang = lang;
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch (_) { /* ignore */ }
}

function getDict(): TranslationDict {
  return currentLang === "en" ? en : zh;
}

// Deep-proxy the full translation tree so X.COMMON.SHOW works without per-level proxies
function deepProxy(path: string[] = []): any {
  return new Proxy({}, {
    get(_target, prop: string) {
      const dict = getDict();
      let current: any = dict;
      for (const key of path) {
        current = current?.[key];
      }
      const val = current?.[prop];
      if (val === undefined) {
        let zhCurrent: any = zh;
        for (const key of path) {
          zhCurrent = zhCurrent?.[key];
        }
        return zhCurrent?.[prop];
      }
      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        return deepProxy([...path, prop]);
      }
      return val;
    }
  });
}

export const X: TranslationDict = deepProxy() as any;
