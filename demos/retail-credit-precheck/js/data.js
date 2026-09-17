/* 脱敏模拟数据 — 演示专用 */
window.DEMO_DATA = {
  cases: [
    {
      id: "CASE-20260917-0842",
      applicant: "张*伟",
      product: "消费贷",
      amount: 150000,
      amountLabel: "¥150,000",
      tenure: "36期",
      channel: "手机银行",
      status: "pending",
      statusLabel: "待预审",
      riskLevel: "mid",
      riskLabel: "中",
      submitTime: "2026-09-17 09:12",
      city: "上海",
      income: "¥18,000/月（宣称）",
      employment: "民营·互联网",
      selected: true
    },
    {
      id: "CASE-20260917-0791",
      applicant: "李*芳",
      product: "消费贷",
      amount: 80000,
      amountLabel: "¥80,000",
      tenure: "24期",
      channel: "线下支行",
      status: "review",
      statusLabel: "复核中",
      riskLevel: "low",
      riskLabel: "低",
      submitTime: "2026-09-17 08:45",
      city: "杭州",
      income: "¥12,000/月（宣称）",
      employment: "国企·制造",
      selected: false
    },
    {
      id: "CASE-20260916-1203",
      applicant: "王*强",
      product: "消费贷",
      amount: 280000,
      amountLabel: "¥280,000",
      tenure: "48期",
      channel: "手机银行",
      status: "pending",
      statusLabel: "待预审",
      riskLevel: "high",
      riskLabel: "高",
      submitTime: "2026-09-16 16:30",
      city: "深圳",
      income: "¥25,000/月（宣称）",
      employment: "个体·贸易",
      selected: false
    },
    {
      id: "CASE-20260916-0955",
      applicant: "陈*婷",
      product: "消费贷",
      amount: 50000,
      amountLabel: "¥50,000",
      tenure: "12期",
      channel: "微信小程序",
      status: "pass",
      statusLabel: "已通过",
      riskLevel: "low",
      riskLabel: "低",
      submitTime: "2026-09-16 11:20",
      city: "南京",
      income: "¥9,500/月（宣称）",
      employment: "事业单位",
      selected: false
    },
    {
      id: "CASE-20260915-2108",
      applicant: "赵*磊",
      product: "消费贷",
      amount: 200000,
      amountLabel: "¥200,000",
      tenure: "36期",
      channel: "手机银行",
      status: "reject",
      statusLabel: "已拒绝",
      riskLevel: "high",
      riskLabel: "高",
      submitTime: "2026-09-15 14:05",
      city: "成都",
      income: "¥22,000/月（宣称）",
      employment: "民营·餐饮",
      selected: false
    }
  ],

  materials: [
    { name: "身份证人像面", status: "ok", meta: "OCR 通过 · 有效期至 2031-08", icon: "✓" },
    { name: "身份证国徽面", status: "ok", meta: "OCR 通过 · 签发机关核验一致", icon: "✓" },
    { name: "人脸活体核验", status: "ok", meta: "活体分 96 · 比对通过", icon: "✓" },
    { name: "收入流水（近6月）", status: "warn", meta: "PDF 已上传 · 月均入账波动偏大", icon: "!" },
    { name: "征信授权书", status: "ok", meta: "电子签 · 2026-09-17 09:08", icon: "✓" },
    { name: "工作证明", status: "miss", meta: "未上传 · 可选补件", icon: "×" },
    { name: "用途声明", status: "ok", meta: "消费装修 · 已勾选承诺", icon: "✓" }
  ],

  rules: [
    { code: "R-INC-03", level: "warn", title: "收入稳定性预警", desc: "近6月流水标准差超过阈值阈值 1.8×，建议交叉验证其他收入来源。" },
    { code: "R-DTI-07", level: "warn", title: "负债收入比偏高", desc: "估算 DTI ≈ 48%，接近产品线 50% 上限；消费贷额度建议下调。" },
    { code: "R-AGE-01", level: "pass", title: "年龄准入", desc: "申请人年龄 34，符合 22–55 产品区间。" },
    { code: "R-GEO-02", level: "pass", title: "地域准入", desc: "户籍/常住上海，属一类准入城市。" },
    { code: "R-BL-00", level: "pass", title: "黑名单/灰名单", desc: "行内黑名单、外部灰名单均未命中。" },
    { code: "R-AUTH-01", level: "pass", title: "授权完整性", desc: "征信、数据查询授权均已完成且在有效期内。" }
  ],

  aiSuggestion: {
    score: 72,
    verdict: "有条件通过",
    verdictDetail: "建议核准额度 ¥100,000（原申请 ¥150,000），期限维持 36 期；补件「工作证明」后可放行，或由复核岗确认收入波动可接受。",
    confidence: 81,
    factors: [
      { type: "pos", text: "行内黑名单、外部灰名单均未命中；身份与活体核验完整。" },
      { type: "pos", text: "征信授权与电子签流程完整，无异常断点。" },
      { type: "neu", text: "流水月均入账波动偏大（R-INC-03），对高额度敏感。" },
      { type: "neg", text: "估算 DTI 接近产品上限；原申请额度风险溢价不足。" },
      { type: "neu", text: "工作证明缺失，就业稳定性证据链不完整（可补件）。" }
    ],
    actions: [
      "下调核准额度至 ¥100,000 或要求补件后复评",
      "复核岗关注流水大额进出说明",
      "若拒绝，建议话术：额度与负债匹配度不足，可 90 日后重申"
    ]
  },

  auditTimeline: [
    { time: "09:12:03", type: "sys", actor: "进件系统", text: "案件 CASE-20260917-0842 创建，渠道手机银行。" },
    { time: "09:12:08", type: "sys", actor: "材料引擎", text: "OCR/活体/授权校验完成；工作证明标记为缺失。" },
    { time: "09:12:15", type: "sys", actor: "规则引擎", text: "命中 R-INC-03、R-DTI-07（预警）；其余准入规则通过。" },
    { time: "09:12:22", type: "ai", actor: "AI 预审助手", text: "生成建议：有条件通过 · 置信度 81% · 建议额度 ¥100,000。" },
    { time: "09:14:01", type: "human", actor: "预审岗 · 周*", text: "打开案件，查看材料与规则命中。" },
    { time: "09:16:40", type: "human", actor: "预审岗 · 周*", text: "（演示）待提交人工决策…" }
  ],

  metrics: {
    kpis: [
      { label: "日均预审量", value: "186", unit: "件", delta: "+12% vs 上周", deltaType: "up" },
      { label: "AI 建议采纳率", value: "78", unit: "%", delta: "+5pt", deltaType: "up" },
      { label: "人审平均耗时", value: "4.2", unit: "分", delta: "-1.1 分", deltaType: "up" },
      { label: "补件闭环率", value: "91", unit: "%", delta: "+3pt", deltaType: "up" }
    ],
    funnel: [
      { label: "进件", pct: 100, val: "930" },
      { label: "规则筛完", pct: 88, val: "818" },
      { label: "AI 建议", pct: 88, val: "818" },
      { label: "人审完成", pct: 72, val: "670" },
      { label: "终批通过", pct: 54, val: "502" }
    ],
    disagreement: [
      { label: "AI 通过 / 人拒", pct: 8, note: "多为额度争议" },
      { label: "AI 拒绝 / 人过", pct: 5, note: "多为政策例外" },
      { label: "一致", pct: 87, note: "主路径" }
    ]
  }
};
