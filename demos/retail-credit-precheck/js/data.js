/* 脱敏模拟数据 — 演示专用 */
(function () {
  var ZHANG_ID = "CASE-20260917-0842";
  var WANG_ID = "CASE-20260916-1203";

  var caseDetails = {};

  /* —— 主路径：张*伟 · 有条件通过 —— */
  caseDetails[ZHANG_ID] = {
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
      suggestedAmount: 100000,
      suggestedAmountLabel: "¥100,000",
      ruleSummary: "R-INC-03 · R-DTI-07",
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
    ]
  };

  /* —— 对照路径：王*强 · 高风险 / AI 建议拒绝 —— */
  caseDetails[WANG_ID] = {
    materials: [
      { name: "身份证人像面", status: "warn", meta: "OCR 低置信 · 影像模糊，关键字段不可读", icon: "!" },
      { name: "身份证国徽面", status: "miss", meta: "未上传 · 缺国徽面", icon: "×" },
      { name: "人脸活体核验", status: "warn", meta: "活体分 61 · 光线异常，建议重采", icon: "!" },
      { name: "收入流水（近6月）", status: "miss", meta: "未上传 · 宣称收入无法核验", icon: "×" },
      { name: "征信授权书", status: "miss", meta: "授权已过期（2026-06-01）· 需重新签署", icon: "×" },
      { name: "工作证明", status: "miss", meta: "未上传 · 个体经营无在职证明", icon: "×" },
      { name: "用途声明", status: "ok", meta: "经营周转 · 已勾选承诺", icon: "✓" }
    ],
    rules: [
      { code: "R-BL-12", level: "block", title: "灰名单 / 欺诈特征预警", desc: "外部灰名单弱命中（同设备多头申请）；近 30 日关联申请行为异常，触发强制人审。" },
      { code: "R-DTI-07", level: "block", title: "负债收入比超限", desc: "无有效流水核验；按宣称收入估算 DTI ≈ 72%，远超产品线 50% 上限。" },
      { code: "R-AUTH-01", level: "block", title: "授权完整性阻断", desc: "征信授权过期或缺失，依法不得查询征信，流程不得自动通过。" },
      { code: "R-MAT-02", level: "warn", title: "关键材料严重缺失", desc: "身份证缺一面、工作证明缺失、收入流水缺失，材料完整率低于准入阈值。" },
      { code: "R-INC-03", level: "warn", title: "收入无法核验", desc: "无流水佐证宣称月入 ¥25,000；个体贸易收入波动风险未覆盖。" },
      { code: "R-AGE-01", level: "pass", title: "年龄准入", desc: "申请人年龄 41，符合 22–55 产品区间。" },
      { code: "R-GEO-02", level: "pass", title: "地域准入", desc: "户籍/常住深圳，属一类准入城市。" }
    ],
    aiSuggestion: {
      score: 28,
      verdict: "建议拒绝",
      verdictDetail: "材料严重缺失（身份证缺面、流水/工作证明缺失、征信授权过期）叠加灰名单弱命中与 DTI 超限，不得自动通过。建议拒绝或强制人审；若例外放行须书面说明并补齐全部关键材料后复评。",
      confidence: 86,
      suggestedAmount: 0,
      suggestedAmountLabel: "—（不适用）",
      ruleSummary: "R-BL-12 · R-DTI-07 · R-AUTH-01",
      factors: [
        { type: "neg", text: "关键材料缺失 ≥3 项：身份证国徽面、收入流水、工作证明；征信授权过期。" },
        { type: "neg", text: "R-BL-12 灰名单/欺诈特征预警命中，同设备多头申请异常。" },
        { type: "neg", text: "无流水核验下估算 DTI ≈ 72%，远超 50% 产品上限（R-DTI-07 阻断）。" },
        { type: "neg", text: "征信授权失效，依法不得继续自动审批（R-AUTH-01）。" },
        { type: "neu", text: "年龄与地域准入通过；用途声明已勾选，但不构成放行依据。" }
      ],
      actions: [
        "不得自动通过",
        "建议拒绝，或强制人审并要求补齐身份证全套、流水、工作证明与有效征信授权",
        "若人审改判有条件通过，须填写例外理由并写入审计时间线",
        "拒绝话术建议：材料与授权不完整，暂无法完成授信评估，补齐后可重申"
      ]
    },
    auditTimeline: [
      { time: "16:30:05", type: "sys", actor: "进件系统", text: "案件 CASE-20260916-1203 创建，渠道手机银行 · 申请 ¥280,000。" },
      { time: "16:30:12", type: "sys", actor: "材料引擎", text: "材料缺失：身份证国徽面、收入流水、工作证明；征信授权过期；人像面 OCR 低置信。" },
      { time: "16:30:18", type: "sys", actor: "规则引擎", text: "命中 R-BL-12、R-DTI-07、R-AUTH-01（阻断）；R-MAT-02、R-INC-03（预警）。" },
      { time: "16:30:25", type: "ai", actor: "AI 预审助手", text: "生成建议：建议拒绝 · 置信度 86% · 不得自动通过 · 强制人审。" },
      { time: "16:32:10", type: "human", actor: "预审岗 · 周*", text: "打开高风险对照案件，查看缺件与阻断规则。" },
      { time: "16:34:00", type: "human", actor: "预审岗 · 周*", text: "（演示）待人审：可维持拒绝，或改判有条件通过 / 退回补件并写入审计…" }
    ]
  };

  /* 其余案件：轻量占位，缺省回退张*伟详情 */
  caseDetails["CASE-20260917-0791"] = {
    materials: caseDetails[ZHANG_ID].materials.map(function (m) {
      return Object.assign({}, m);
    }),
    rules: caseDetails[ZHANG_ID].rules.map(function (r) {
      return Object.assign({}, r);
    }),
    aiSuggestion: Object.assign({}, caseDetails[ZHANG_ID].aiSuggestion, {
      score: 78,
      verdict: "有条件通过",
      verdictDetail: "建议核准额度 ¥80,000（与申请一致），关注流水稳定性即可。",
      confidence: 84,
      suggestedAmount: 80000,
      suggestedAmountLabel: "¥80,000",
      ruleSummary: "R-INC-03"
    }),
    auditTimeline: [
      { time: "08:45:02", type: "sys", actor: "进件系统", text: "案件 CASE-20260917-0791 创建，渠道线下支行。" },
      { time: "08:45:10", type: "ai", actor: "AI 预审助手", text: "生成建议：有条件通过 · 置信度 84%。" },
      { time: "08:50:00", type: "human", actor: "预审岗 · 周*", text: "（演示）复核中…" }
    ]
  };

  caseDetails["CASE-20260916-0955"] = {
    materials: caseDetails[ZHANG_ID].materials.map(function (m) {
      return Object.assign({}, m, m.status === "miss" ? { status: "ok", meta: "已补传 · 核验通过", icon: "✓" } : {});
    }),
    rules: caseDetails[ZHANG_ID].rules.map(function (r) {
      return Object.assign({}, r, { level: "pass", title: r.title, desc: r.level === "pass" ? r.desc : "已复核通过。" });
    }),
    aiSuggestion: Object.assign({}, caseDetails[ZHANG_ID].aiSuggestion, {
      score: 88,
      verdict: "建议通过",
      verdictDetail: "材料齐全、规则无预警，建议按申请额度 ¥50,000 通过。",
      confidence: 92,
      suggestedAmount: 50000,
      suggestedAmountLabel: "¥50,000",
      ruleSummary: "全部通过"
    }),
    auditTimeline: [
      { time: "11:20:01", type: "sys", actor: "进件系统", text: "案件 CASE-20260916-0955 创建。" },
      { time: "11:22:00", type: "ai", actor: "AI 预审助手", text: "建议通过 · 已人审确认。" },
      { time: "11:25:00", type: "human", actor: "预审岗 · 周*", text: "提交决策：通过。" }
    ]
  };

  caseDetails["CASE-20260915-2108"] = {
    materials: caseDetails[WANG_ID].materials.map(function (m) {
      return Object.assign({}, m);
    }),
    rules: caseDetails[WANG_ID].rules.map(function (r) {
      return Object.assign({}, r);
    }),
    aiSuggestion: Object.assign({}, caseDetails[WANG_ID].aiSuggestion, {
      score: 22,
      verdict: "建议拒绝",
      verdictDetail: "高风险规则命中，已拒绝结案（历史案件演示）。",
      confidence: 90,
      suggestedAmount: 0,
      suggestedAmountLabel: "—（不适用）",
      ruleSummary: "R-BL-12 · R-DTI-07"
    }),
    auditTimeline: [
      { time: "14:05:01", type: "sys", actor: "进件系统", text: "案件 CASE-20260915-2108 创建。" },
      { time: "14:10:00", type: "ai", actor: "AI 预审助手", text: "建议拒绝。" },
      { time: "14:15:00", type: "human", actor: "预审岗 · 周*", text: "提交决策：拒绝。" }
    ]
  };

  window.DEMO_DATA = {
    cases: [
      {
        id: ZHANG_ID,
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
        id: WANG_ID,
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

    caseDetails: caseDetails,
    defaultCaseId: ZHANG_ID,

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

  /* 兼容：全局 DEMO_DATA.materials 等默认指向张*伟详情 */
  Object.defineProperty(window.DEMO_DATA, "materials", {
    get: function () {
      return caseDetails[ZHANG_ID].materials;
    },
    enumerable: true
  });
  Object.defineProperty(window.DEMO_DATA, "rules", {
    get: function () {
      return caseDetails[ZHANG_ID].rules;
    },
    enumerable: true
  });
  Object.defineProperty(window.DEMO_DATA, "aiSuggestion", {
    get: function () {
      return caseDetails[ZHANG_ID].aiSuggestion;
    },
    enumerable: true
  });
  Object.defineProperty(window.DEMO_DATA, "auditTimeline", {
    get: function () {
      return caseDetails[ZHANG_ID].auditTimeline;
    },
    enumerable: true
  });
})();
