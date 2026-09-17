/* 共享导航与交互 */
(function () {
  const PAGES = [
    { id: "list", file: "index.html", label: "案件列表" },
    { id: "materials", file: "pages/materials.html", label: "材料/规则" },
    { id: "ai", file: "pages/ai-suggest.html", label: "AI 建议" },
    { id: "review", file: "pages/review.html", label: "人工复核" },
    { id: "metrics", file: "pages/metrics.html", label: "度量看板" }
  ];

  function basePath() {
    return window.location.pathname.includes("/pages/") ? "../" : "./";
  }

  function currentPageId() {
    const path = window.location.pathname;
    if (path.indexOf("materials") !== -1) return "materials";
    if (path.indexOf("ai-suggest") !== -1) return "ai";
    if (path.indexOf("review") !== -1) return "review";
    if (path.indexOf("metrics") !== -1) return "metrics";
    return "list";
  }

  function hrefFor(page) {
    return basePath() + page.file;
  }

  function renderShell(activeId) {
    const active = activeId || currentPageId();
    const idx = PAGES.findIndex(function (p) { return p.id === active; });

    const steps = PAGES.map(function (p, i) {
      var cls = "nav-step";
      if (p.id === active) cls += " active";
      else if (i < idx) cls += " done";
      return (
        (i > 0 ? '<span class="nav-sep"></span>' : "") +
        '<a class="' + cls + '" href="' + hrefFor(p) + '"><span class="num">' + (i + 1) + "</span>" + p.label + "</a>"
      );
    }).join("");

    return (
      '<div class="demo-banner">' +
      "<strong>演示原型</strong> · 模拟数据 · 不接生产系统 · 原生未来 · 银行零售信贷预审辅助" +
      "</div>" +
      '<div class="app-shell">' +
      '<header class="topbar">' +
      '<div class="brand">' +
      '<div class="brand-mark">原</div>' +
      '<div class="brand-text">' +
      "<h1>原生未来 · 信贷预审辅助</h1>" +
      "<p>零售消费贷 · AI 原生工作台（演示）</p>" +
      "</div></div>" +
      '<nav class="nav-steps" aria-label="主路径">' + steps + "</nav>" +
      "</header>" +
      '<main id="page-root"></main>' +
      "</div>" +
      '<div class="toast" id="toast" role="status"></div>'
    );
  }

  function showToast(msg, ms) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("show");
    }, ms || 2800);
  }

  function getSelectedCase() {
    var stored = sessionStorage.getItem("demo_case_id");
    var data = window.DEMO_DATA;
    if (!data) return null;
    if (stored) {
      var found = data.cases.find(function (c) { return c.id === stored; });
      if (found) return found;
    }
    return data.cases.find(function (c) { return c.selected; }) || data.cases[0];
  }

  function setSelectedCase(id) {
    sessionStorage.setItem("demo_case_id", id);
  }

  /** 按案件取详情；缺省回退张*伟 */
  function getCaseDetails(caseId) {
    var data = window.DEMO_DATA;
    if (!data || !data.caseDetails) return null;
    var id = caseId || (getSelectedCase() && getSelectedCase().id);
    if (id && data.caseDetails[id]) return data.caseDetails[id];
    var fallback = data.defaultCaseId || "CASE-20260917-0842";
    return data.caseDetails[fallback] || null;
  }

  function isHighRiskContrast(c) {
    return c && c.id === "CASE-20260916-1203";
  }

  function fmtStatusBadge(status) {
    var map = { pending: "badge-pending", review: "badge-review", pass: "badge-pass", reject: "badge-reject" };
    return map[status] || "badge-rule";
  }

  function fmtRiskBadge(level) {
    var map = { high: "badge-high", mid: "badge-mid", low: "badge-low" };
    return map[level] || "badge-rule";
  }

  window.DemoApp = {
    PAGES: PAGES,
    renderShell: renderShell,
    showToast: showToast,
    getSelectedCase: getSelectedCase,
    setSelectedCase: setSelectedCase,
    getCaseDetails: getCaseDetails,
    isHighRiskContrast: isHighRiskContrast,
    fmtStatusBadge: fmtStatusBadge,
    fmtRiskBadge: fmtRiskBadge,
    currentPageId: currentPageId,
    basePath: basePath
  };
})();
