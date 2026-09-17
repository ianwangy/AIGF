# 原生未来 · 银行零售信贷预审辅助（演示原型）

脱敏、可点击的 Web 演示：覆盖「案件列表 → 材料/规则 → AI 建议 → 人工复核（审计时间线）→ 轻量度量看板」。  
**无后端、无登录、无真实 API。** 顶部常驻横幅：「演示原型 · 模拟数据 · 不接生产系统」。

---

## 环境要求

- 现代桌面浏览器（Chrome / Edge / Safari / Firefox）
- Python 3（仅用于本地静态文件服务；也可用任意静态服务器）

无需 Node、无需构建。

---

## 本地启动

```bash
cd /workspace/native-future-credit-precheck-demo
python3 -m http.server 8080
```

浏览器打开：

```
http://127.0.0.1:8080/
```

主入口：`index.html`（案件列表）。

其他端口示例：

```bash
python3 -m http.server 8765
# → http://127.0.0.1:8765/
```

> 建议通过 `http://` 访问，避免部分浏览器对 `file://` 下脚本的限制。

---

## 目录结构

```
native-future-credit-precheck-demo/
├── index.html              # 主入口 · 案件列表
├── css/styles.css
├── js/data.js              # 脱敏模拟数据
├── js/app.js               # 导航与公共交互
├── pages/
│   ├── materials.html      # 材料 / 规则
│   ├── ai-suggest.html     # AI 建议
│   ├── review.html         # 人工复核 + 审计时间线
│   └── metrics.html        # 度量看板
├── README.md               # 本文件
├── DEMO_SCRIPT.md          # 2–3 分钟演示脚本
├── AIGF_MAP.md             # AIGF 焦点编码映射
└── GAP_LIST.md             # 与正式试点差距
```

---

## 主路径（决策者 2–3 分钟）

1. 列表选中案件 → 2. 材料与规则 → 3. AI 建议（可预采纳）→ 4. 人审提交（看审计追加）→ 5. 度量与 CTA。

详见 [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)。

---

## 文档

| 文件 | 用途 |
|------|------|
| [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) | 开场问题、点击顺序、差异点、收尾 CTA |
| [AIGF_MAP.md](./AIGF_MAP.md) | 01CS / 03CO / 08VT / 07VO / 11OO / 14RG / 16RT |
| [GAP_LIST.md](./GAP_LIST.md) | 数据、合规、集成、审计、模型治理等差距 |

均可直接粘贴进 Notion。

---

## 说明

- UI 语言：中文；桌面优先（约 1280px 内容宽）。
- 姓名等已脱敏（如「张*伟」）；金额与规则均为虚构。
- 会话级状态（选中案件、预采纳）存于 `sessionStorage`，刷新列表页可继续。
