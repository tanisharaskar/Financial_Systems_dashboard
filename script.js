// ── PERIOD DATA ───────────────────────────────────────
const data = {
  fy: {
    revenue:     ["$4.9M", "$2.4M", "$1.6M", "$1.1M"],
    cogs:        ["$(3.1M)", "$(1.6M)", "$(0.9M)", "$(0.8M)"],
    grossProfit: ["$1.8M", "$0.8M", "$0.7M", "$0.3M"],
    ebitda:      ["$1.0M", "$0.6M", "$0.3M", "$0.2M"],
    netIncome:   ["$0.4M", "$0.3M", "$0.1M", "$0.1M"],
    margins:     [37, 33, 44, 27],
    totalRev: "$10.0M", totalGP: "$3.8M", totalEBITDA: "$2.1M", totalNI: "$0.9M", totalMargin: 38,
  },
  q3: {
    revenue:     ["$1.3M", "$0.6M", "$0.4M", "$0.3M"],
    cogs:        ["$(0.8M)", "$(0.4M)", "$(0.2M)", "$(0.2M)"],
    grossProfit: ["$0.5M", "$0.2M", "$0.2M", "$0.1M"],
    ebitda:      ["$0.3M", "$0.15M", "$0.08M", "$0.05M"],
    netIncome:   ["$0.1M", "$0.07M", "$0.03M", "$0.02M"],
    margins:     [38, 33, 50, 33],
    totalRev: "$2.6M", totalGP: "$1.0M", totalEBITDA: "$0.58M", totalNI: "$0.22M", totalMargin: 38,
  },
  q2: {
    revenue:     ["$1.2M", "$0.6M", "$0.4M", "$0.3M"],
    cogs:        ["$(0.75M)", "$(0.4M)", "$(0.23M)", "$(0.21M)"],
    grossProfit: ["$0.45M", "$0.2M", "$0.17M", "$0.09M"],
    ebitda:      ["$0.25M", "$0.14M", "$0.07M", "$0.04M"],
    netIncome:   ["$0.09M", "$0.06M", "$0.02M", "$0.01M"],
    margins:     [37, 33, 42, 30],
    totalRev: "$2.5M", totalGP: "$0.91M", totalEBITDA: "$0.50M", totalNI: "$0.18M", totalMargin: 36,
  },
  q1: {
    revenue:     ["$1.1M", "$0.55M", "$0.38M", "$0.26M"],
    cogs:        ["$(0.70M)", "$(0.37M)", "$(0.22M)", "$(0.19M)"],
    grossProfit: ["$0.40M", "$0.18M", "$0.16M", "$0.07M"],
    ebitda:      ["$0.22M", "$0.12M", "$0.06M", "$0.03M"],
    netIncome:   ["$0.08M", "$0.05M", "$0.02M", "$0.01M"],
    margins:     [36, 32, 42, 27],
    totalRev: "$2.29M", totalGP: "$0.81M", totalEBITDA: "$0.43M", totalNI: "$0.16M", totalMargin: 35,
  },
};

// ── PERIOD TOGGLE ─────────────────────────────────────
function setPeriod(period, event) {
  const d = data[period];
  const divisions = ["mfg", "dist", "svc", "tech"];

  divisions.forEach((div, i) => {
    document.getElementById(`${div}-rev`).textContent    = d.revenue[i];
    document.getElementById(`${div}-cogs`).textContent   = d.cogs[i];
    document.getElementById(`${div}-gp`).textContent     = d.grossProfit[i];
    document.getElementById(`${div}-ebitda`).textContent = d.ebitda[i];
    document.getElementById(`${div}-ni`).textContent     = d.netIncome[i];
    document.getElementById(`${div}-bar`).style.width    = d.margins[i] + "%";
    document.getElementById(`${div}-pct`).textContent    = d.margins[i] + "%";
  });

  document.getElementById("total-rev").textContent    = d.totalRev;
  document.getElementById("total-gp").textContent     = d.totalGP;
  document.getElementById("total-ebitda").textContent = d.totalEBITDA;
  document.getElementById("total-ni").textContent     = d.totalNI;
  document.getElementById("total-bar").style.width    = d.totalMargin + "%";
  document.getElementById("total-pct").textContent    = d.totalMargin + "%";

  document.querySelectorAll(".toggle").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

// ── SIDEBAR NAVIGATION ────────────────────────────────
function showSection(name, el) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById("sec-" + name).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  el.classList.add("active");
}

// ── MONTHS (shared by all charts) ─────────────────────
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── CHART 1: REVENUE BAR ─────────────────────────────
const monthlyRevenue = [0.72,0.68,0.81,0.84,0.91,0.88,0.79,0.83,0.92,0.87,0.82,1.01];

new Chart(document.getElementById("revenueChart").getContext("2d"), {
  type: "bar",
  data: {
    labels: months,
    datasets: [{
      label: "Revenue ($M)",
      data: monthlyRevenue,
      backgroundColor: monthlyRevenue.map((_, i) => i === 11 ? "#1e56a0" : "#bfdbfe"),
      borderRadius: 5,
      borderSkipped: false,
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: v => "$" + v.raw + "M" } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { ticks: { callback: v => "$" + v + "M", font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.04)" } },
    },
  },
});

// ── CHART 2: CASH BALANCE LINE ────────────────────────
new Chart(document.getElementById("cashChart").getContext("2d"), {
  type: "line",
  data: {
    labels: months,
    datasets: [{
      label: "Cash Balance ($M)",
      data: [2.1,1.9,2.3,2.6,2.9,3.1,2.8,3.0,3.4,3.6,3.9,4.2],
      borderColor: "#1e56a0",
      backgroundColor: "rgba(30,86,160,0.08)",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#1e56a0",
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: v => "$" + v.raw + "M" } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { ticks: { callback: v => "$" + v + "M", font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.04)" } },
    },
  },
});

// ── CHART 3: BUDGET VS ACTUAL BARS ───────────────────
const budgetData = [0.68,0.65,0.78,0.80,0.87,0.85,0.80,0.82,0.88,0.90,0.85,0.92];

new Chart(document.getElementById("varChart").getContext("2d"), {
  type: "bar",
  data: {
    labels: months,
    datasets: [
      {
        label: "Budget",
        data: budgetData,
        backgroundColor: "#e5e7eb",
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: "Actual",
        data: monthlyRevenue,
        backgroundColor: "#1e56a0",
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { font: { size: 11 }, boxWidth: 12 } },
      tooltip: { callbacks: { label: v => v.dataset.label + ": $" + v.raw + "M" } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { ticks: { callback: v => "$" + v + "M", font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.04)" } },
    },
  },
});

// ── AUTOMATION LOG ────────────────────────────────────
const logLines = [
  { cls: "l-info", msg: "[06:00:01]  INFO   Pipeline started: monthly_close_dec2025" },
  { cls: "l-info", msg: "[06:00:04]  INFO   Connecting to GP_PROD SQL Server..." },
  { cls: "l-ok",   msg: "[06:00:09]  OK     Connection established." },
  { cls: "l-ok",   msg: "[06:01:22]  OK     Extracted 1,248 rows across 4 divisions" },
  { cls: "l-info", msg: "[06:01:23]  INFO   Applying account mapping rules v3.2..." },
  { cls: "l-ok",   msg: "[06:01:31]  OK     Mapping complete. 0 unmapped accounts." },
  { cls: "l-info", msg: "[06:01:31]  INFO   Running intercompany reconciliation..." },
  { cls: "l-ok",   msg: "[06:01:45]  OK     Interco eliminations: $0.3M — balanced." },
  { cls: "l-info", msg: "[06:01:46]  INFO   Validating against prior period thresholds..." },
  { cls: "l-warn", msg: "[06:01:52]  WARN   Division EU: FX rate delta > 2% (EUR/USD)" },
  { cls: "l-warn", msg: "[06:01:53]  WARN   3 accounts flagged for manual review" },
  { cls: "l-ok",   msg: "[06:02:10]  OK     2 warnings logged. Proceeding to load..." },
  { cls: "l-info", msg: "[06:02:11]  INFO   Loading to OneStream via REST API..." },
  { cls: "l-ok",   msg: "[06:03:44]  OK     Load complete. Consolidation triggered." },
  { cls: "l-ok",   msg: "[06:04:02]  OK     Close notification sent to 12 recipients." },
  { cls: "l-ok",   msg: "[06:04:02]  ✓      Pipeline complete — 4m 01s" },
];

function replayLog() {
  const el = document.getElementById("log-el");
  el.innerHTML = "";
  logLines.forEach((l, i) => {
    setTimeout(() => {
      const span = document.createElement("span");
      span.className = l.cls;
      span.textContent = l.msg;
      el.appendChild(span);
      el.scrollTop = el.scrollHeight;
    }, i * 80);
  });
}

// ── INIT ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sec-consolidation").classList.add("active");
  replayLog();
});
