const ICONS = {
  task: '<rect x="4" y="3" width="12" height="14" rx="2"/><path d="M7 7h6M7 10h6M7 13h3"/>',
  search: '<circle cx="9" cy="9" r="5"/><path d="M13 13l4 4"/>',
  skill: '<path d="M10 2.5l6.5 3.8v7.4L10 17.5l-6.5-3.8V6.3z"/><path d="M10 7l3 1.7v3.6L10 14l-3-1.7V8.7z"/>',
  chat: '<path d="M4 4.5h12v8H8.5L5 15.5v-3H4z"/>',
  mobile: '<rect x="6" y="2.5" width="8" height="15" rx="2"/><path d="M9 15h2"/>',
  collapse: '<rect x="3" y="4" width="14" height="12" rx="2"/><path d="M8 4v12"/>',
  folder: '<path d="M3 6a2 2 0 012-2h3l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  chevron: '<path d="M6 8l4 4 4-4"/>',
  upload: '<path d="M10 13V4"/><path d="M6 8l4-4 4 4"/><path d="M4 13v3h12v-3"/>',
  link: '<path d="M8 12l4-4"/><path d="M7 9a3 3 0 010-4l1-1a3 3 0 014 4"/><path d="M13 11a3 3 0 010 4l-1 1a3 3 0 01-4-4"/>',
  bell: '<path d="M10 3a5 5 0 015 5v4l1.5 1.5H3.5L5 12V8a5 5 0 015-5z"/><path d="M8 16a2 2 0 004 0"/>',
  paperclip: '<path d="M15 9l-5.5 5.5a3 3 0 01-4.2-4.2l6-6a2 2 0 012.8 2.8l-5.8 5.8a1 1 0 01-1.4-1.4L11 6.5"/>',
  globe: '<circle cx="10" cy="10" r="7"/><path d="M3 10h14"/><path d="M10 3c2.5 2.8 2.5 11.2 0 14"/><path d="M10 3c-2.5 2.8-2.5 11.2 0 14"/>',
  sliders: '<path d="M3 6h14M3 10h14M3 14h14"/><circle cx="7" cy="6" r="1.8" fill="currentColor"/><circle cx="13" cy="10" r="1.8" fill="currentColor"/><circle cx="9" cy="14" r="1.8" fill="currentColor"/>',
  cap: '<path d="M2.5 8L10 4.5 17.5 8 10 11.5z"/><path d="M5.5 9.5v3.5c2.5 1.5 6.5 1.5 9 0V9.5"/><path d="M17.5 8v4"/>',
  send: '<path d="M3.2 10.1L17 3.8l-4.2 12.4-3-5.1z" fill="currentColor" stroke="none"/>',
  refresh: '<path d="M16 10a6 6 0 11-1.8-4.3"/><path d="M16 3.5V7h-3.5"/>',
  doc: '<path d="M5 2.5h6l4 4v11H5z"/><path d="M11 2.5v4h4"/><path d="M7.5 10h5M7.5 13h5"/>',
  chart: '<path d="M3 16V4"/><path d="M3 16h14"/><path d="M6 13l3-4 3 2 4-6"/>',
  quote: '<path d="M4 5h5v5H6c0 2 1 3 3 3v2c-3 0-5-2-5-5z"/><path d="M11 5h5v5h-3c0 2 1 3 3 3v2c-3 0-5-2-5-5z"/>',
  pen: '<path d="M3 17l1-4 9-9 4 4-9 9z"/><path d="M11 5l4 4"/>',
  tool: '<path d="M11 2L4 11h5l-1 7 7-9h-5z" fill="currentColor" stroke="none"/>',
  download: '<path d="M10 3v9"/><path d="M6 9l4 4 4-4"/><path d="M4 16h12"/>',
};

const TAB_ICONS = {
  "做调研": "search",
  "做表格": "chart",
  "搭应用": "skill",
  "写文档": "doc",
  "替我办": "cap",
};

const DATA = window.DEMO_DATA || {};
const view = document.getElementById("view");
const promptEl = document.getElementById("prompt");
const sendBtn = document.getElementById("send");
const toastEl = document.getElementById("toast");

let playToken = 0;
let autoPlay = DATA.autoPlay !== false;
let firstPrompt = "";

function svg(name) {
  return `<svg class="ic-svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

function logoSvg() {
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M19 5 L33 35 H25.5 L19 19.5 L12.5 35 H5 Z" fill="url(#brandGrad)"/><path d="M33 5 l1.5 4.2 L38.5 10.7 l-4 1.5 L33 16.4 l-1.5-4.2 L27.5 10.7 l4-1.5 Z" fill="#7aa2ff"/></svg>`;
}

function fillIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = svg(el.dataset.icon);
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function scrollBottom() {
  view.scrollTop = view.scrollHeight;
}

let toastTimer = null;
function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

/* ---------------- markdown ---------------- */

function inlineMd(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}

function mdToHtml(src) {
  const lines = String(src || "").replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let inCode = false;
  let code = [];
  let list = null;

  const closeList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.trimStart().startsWith("```")) {
      if (inCode) {
        out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      i++;
      continue;
    }
    if (inCode) {
      code.push(line);
      i++;
      continue;
    }
    if (/^\s*$/.test(line)) {
      closeList();
      i++;
      continue;
    }
    let m;
    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      closeList();
      const n = m[1].length;
      out.push(`<h${n}>${inlineMd(m[2])}</h${n}>`);
      i++;
      continue;
    }
    if ((m = line.match(/^\s*[-*+]\s+(.*)$/))) {
      if (list !== "ul") {
        closeList();
        out.push("<ul>");
        list = "ul";
      }
      out.push(`<li>${inlineMd(m[1])}</li>`);
      i++;
      continue;
    }
    if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      if (list !== "ol") {
        closeList();
        out.push("<ol>");
        list = "ol";
      }
      out.push(`<li>${inlineMd(m[1])}</li>`);
      i++;
      continue;
    }
    if ((m = line.match(/^\s*>\s?(.*)$/))) {
      closeList();
      out.push(`<blockquote>${inlineMd(m[1])}</blockquote>`);
      i++;
      continue;
    }
    closeList();
    out.push(`<p>${inlineMd(line)}</p>`);
    i++;
  }
  closeList();
  if (inCode) out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
  return out.join("");
}

/* ---------------- home ---------------- */

function renderHome() {
  playToken++;
  const cards = (DATA.quickCards || []).map((card, index) => `
    <button class="card" data-card="${index}">
      <div class="card-ic">${svg(card.icon || "doc")}</div>
      <h3>${esc(card.title)}</h3>
      <p>${esc(card.desc)}</p>
    </button>`).join("");

  const tabs = (DATA.tabs || ["做调研", "做表格", "搭应用", "写文档", "替我办"])
    .map((name, index) => `
      <button class="tab ${index === 0 ? "active" : ""}" data-tab="${index}">
        ${svg(TAB_ICONS[name] || "doc")}<span>${esc(name)}</span>
      </button>`).join("");

  view.innerHTML = `
    <div class="home">
      <div class="hero">
        <div class="hero-logo">${logoSvg()}</div>
        <h1>${esc(DATA.headline || "你说我做，随时待命")}</h1>
      </div>
      <div class="prompt-row">
        <span class="prompt-label">想做点什么：</span>
        <div class="tabs">${tabs}</div>
      </div>
      <div class="cards">${cards}</div>
      <div class="refresh-row">
        <button class="refresh" id="refresh">${svg("refresh")} 换一换</button>
      </div>
    </div>`;

  view.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      view.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  view.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const item = (DATA.quickCards || [])[Number(card.dataset.card)];
      openConversation(item && item.prompt ? item.prompt : "");
    });
  });

  const refresh = view.querySelector("#refresh");
  if (refresh) {
    refresh.addEventListener("click", () => {
      DATA.quickCards = (DATA.quickCards || []).slice().sort(() => Math.random() - 0.5);
      renderHome();
      toast("已换一组");
    });
  }
}

/* ---------------- conversation ---------------- */

function renderConversation() {
  view.innerHTML = `
    <div class="conv">
      <div class="conv-top">
        <div class="conv-title">${svg("skill")}<span>${esc(DATA.skill || "学术全能 · academic-writer")}</span></div>
        <div class="conv-actions">
          <label class="auto"><input type="checkbox" id="autoPlay" ${autoPlay ? "checked" : ""}/> 自动播放</label>
          <button id="replay">${svg("refresh")} 重播</button>
          <button id="homeBtn">返回首页</button>
        </div>
      </div>
      <div class="thread" id="thread"></div>
    </div>`;

  const auto = view.querySelector("#autoPlay");
  if (auto) {
    auto.addEventListener("change", () => {
      autoPlay = auto.checked;
    });
  }
  view.querySelector("#replay").addEventListener("click", () => play());
  view.querySelector("#homeBtn").addEventListener("click", () => renderHome());
}

function openConversation(promptText) {
  firstPrompt = (promptText || "").trim();
  renderConversation();
  play();
}

function normalizeEvents(events) {
  const list = (events || []).map((event) => ({ ...event }));
  if (firstPrompt) {
    const index = list.findIndex((event) => event.type === "user");
    if (index >= 0) list[index].text = firstPrompt;
    else list.unshift({ type: "user", text: firstPrompt });
  }
  return list;
}

async function play() {
  const token = ++playToken;
  const thread = view.querySelector("#thread");
  if (!thread) return;
  thread.innerHTML = "";

  for (const event of normalizeEvents(DATA.events)) {
    if (token !== playToken) return;
    await runEvent(event, thread, token);
    if (token !== playToken) return;
    await sleep(event.delay == null ? 420 : event.delay);
  }
  if (token === playToken) scrollBottom();
}

async function runEvent(event, thread, token) {
  switch (event.type) {
    case "user":
      appendUser(thread, event.text);
      break;
    case "thinking":
      await runThinking(thread, event);
      break;
    case "tool":
      await runTool(thread, event);
      break;
    case "assistant":
      await runAssistant(thread, event, token);
      break;
    case "ask":
      await runAsk(thread, event, token);
      break;
    case "file":
      appendFile(thread, event);
      break;
    default:
      break;
  }
  scrollBottom();
}

function appendUser(thread, text) {
  const wrap = document.createElement("div");
  wrap.className = "turn user";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text || "";
  wrap.appendChild(bubble);
  thread.appendChild(wrap);
  scrollBottom();
}

function assistantShell(thread) {
  const last = thread.lastElementChild;
  if (last && last.classList.contains("turn") && last.classList.contains("assistant") && last.dataset.group === "1") {
    return last.querySelector(".body");
  }
  const wrap = document.createElement("div");
  wrap.className = "turn assistant";
  wrap.dataset.group = "1";
  wrap.innerHTML = `<div class="avatar">${logoSvg()}</div><div class="body"></div>`;
  thread.appendChild(wrap);
  return wrap.querySelector(".body");
}

async function runThinking(thread, event) {
  const body = assistantShell(thread);
  const step = document.createElement("div");
  step.className = "step";
  step.innerHTML = '<span class="spinner"></span>';
  const label = document.createElement("span");
  label.className = "step-name";
  label.textContent = event.text || "思考中…";
  step.appendChild(label);
  body.appendChild(step);
  scrollBottom();
  await sleep(event.duration == null ? 900 : event.duration);
  step.remove();
  if (!body.children.length) {
    const turn = body.closest(".turn");
    if (turn) turn.remove();
  }
}

async function runTool(thread, event) {
  const body = assistantShell(thread);
  const step = document.createElement("div");
  step.className = "step";
  step.innerHTML = `<span class="ic">${svg("tool")}</span>`;
  const name = document.createElement("span");
  name.className = "step-name";
  name.textContent = event.label || event.name || "工具调用";
  step.appendChild(name);
  if (event.detail) {
    const detail = document.createElement("span");
    detail.className = "detail";
    detail.textContent = event.detail;
    step.appendChild(detail);
  }
  const status = document.createElement("span");
  status.className = "status";
  status.textContent = "运行中…";
  step.appendChild(status);
  body.appendChild(step);
  scrollBottom();

  await sleep(event.duration == null ? 850 : event.duration);
  const failed = event.ok === false || (event.exitCode !== undefined && event.exitCode !== 0);
  step.classList.add(failed ? "failed" : "done");
  status.textContent = failed
    ? (event.exitCode !== undefined ? `退出码 ${event.exitCode}` : "失败")
    : "完成";
}

async function runAssistant(thread, event, token) {
  const body = assistantShell(thread);
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  body.appendChild(bubble);
  await typeInto(bubble, event.text || "", token, event.speed == null ? 8 : event.speed);
  bubble.innerHTML = mdToHtml(event.text || "");
}

function typeInto(el, text, token, speed) {
  return new Promise((resolve) => {
    if (speed <= 0 || text.length > 700) {
      el.textContent = text;
      resolve();
      return;
    }
    el.innerHTML = '<span class="typed"></span><span class="cursor">▍</span>';
    const typed = el.querySelector(".typed");
    let index = 0;
    const timer = setInterval(() => {
      if (token !== playToken) {
        clearInterval(timer);
        resolve();
        return;
      }
      index += 3;
      typed.textContent = text.slice(0, index);
      scrollBottom();
      if (index >= text.length) {
        clearInterval(timer);
        el.textContent = text;
        resolve();
      }
    }, speed);
  });
}

async function runAsk(thread, event, token) {
  const body = assistantShell(thread);
  const card = document.createElement("div");
  card.className = "ask-card";
  body.appendChild(card);

  const selections = (event.questions || []).map(() => new Set());

  (event.questions || []).forEach((question, qi) => {
    const block = document.createElement("div");
    block.className = "ask-q";

    const head = document.createElement("div");
    head.className = "ask-head";
    head.textContent = question.header || "请选择";

    const text = document.createElement("div");
    text.className = "ask-text";
    text.textContent = question.question || "";

    const opts = document.createElement("div");
    opts.className = "ask-opts";

    (question.options || []).forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ask-opt";
      const label = document.createElement("span");
      label.textContent = option.label || "";
      btn.appendChild(label);
      if (option.description) {
        const desc = document.createElement("span");
        desc.className = "desc";
        desc.textContent = option.description;
        btn.appendChild(desc);
      }
      btn.addEventListener("click", () => {
        if (question.multiple) {
          if (selections[qi].has(option.label)) {
            selections[qi].delete(option.label);
            btn.classList.remove("selected");
          } else {
            selections[qi].add(option.label);
            btn.classList.add("selected");
          }
        } else {
          selections[qi].clear();
          selections[qi].add(option.label);
          opts.querySelectorAll(".ask-opt").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
      });
      opts.appendChild(btn);
    });

    block.appendChild(head);
    block.appendChild(text);
    block.appendChild(opts);
    card.appendChild(block);
  });

  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "ask-submit";
  submit.textContent = "提交";
  card.appendChild(submit);
  scrollBottom();

  if (autoPlay) {
    const chosen = event.selected || (event.questions || []).map((q) => {
      const first = (q.options || [])[0];
      return first ? [first.label] : [];
    });
    await sleep(500);
    if (token !== playToken) return;
    (event.questions || []).forEach((question, qi) => {
      const wanted = new Set(chosen[qi] || []);
      const block = card.querySelectorAll(".ask-q")[qi];
      block.querySelectorAll(".ask-opt").forEach((btn) => {
        const label = btn.querySelector("span");
        if (label && wanted.has(label.textContent)) btn.classList.add("selected");
      });
    });
    await sleep(950);
    if (token !== playToken) return;
    card.classList.add("submitted");
    submit.disabled = true;
    submit.textContent = "已提交";
    return;
  }

  await new Promise((resolve) => {
    submit.addEventListener("click", () => {
      card.classList.add("submitted");
      submit.disabled = true;
      submit.textContent = "已提交";
      resolve();
    });
  });
}

function fileBadge(name) {
  const match = String(name || "").match(/\.([a-zA-Z0-9]+)$/);
  const ext = match ? match[1].toLowerCase() : "";
  if (ext === "docx" || ext === "doc") return "DOC";
  if (ext === "pdf") return "PDF";
  if (["png", "jpg", "jpeg", "svg"].includes(ext)) return "IMG";
  if (["csv", "xlsx", "xls"].includes(ext)) return "DATA";
  return ext ? ext.slice(0, 4).toUpperCase() : "FILE";
}

function appendFile(thread, event) {
  const body = assistantShell(thread);
  const link = document.createElement("a");
  link.className = "file-card";
  link.href = event.url || "#";
  if (event.url && event.url !== "#") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  link.innerHTML = `
    <span class="file-ic">${esc(fileBadge(event.name))}</span>
    <span class="file-meta">
      <span class="file-name">${esc(event.name)}</span>
      <span class="file-size">${esc(event.size || "")}</span>
    </span>
    <span class="ic">${svg("download")}</span>`;
  if (!event.url || event.url === "#") {
    link.addEventListener("click", (clickEvent) => {
      clickEvent.preventDefault();
      toast("演示文件：" + (event.name || ""));
    });
  }
  body.appendChild(link);
  scrollBottom();
}

/* ---------------- composer & shell ---------------- */

function autoResize() {
  promptEl.style.height = "auto";
  promptEl.style.height = Math.min(promptEl.scrollHeight, 160) + "px";
  sendBtn.classList.toggle("ready", promptEl.value.trim().length > 0);
}

function submitPrompt() {
  const text = promptEl.value.trim();
  promptEl.value = "";
  autoResize();
  const onHome = !!view.querySelector(".home");
  if (onHome) {
    openConversation(text);
  } else {
    firstPrompt = text;
    renderConversation();
    play();
  }
}

function bindShell() {
  sendBtn.addEventListener("click", submitPrompt);
  promptEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitPrompt();
    }
  });
  promptEl.addEventListener("input", autoResize);

  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const action = el.dataset.action;
      if (action === "home") {
        renderHome();
        return;
      }
      if (action === "demo") {
        openConversation("");
        return;
      }
      toast("演示页面，仅展示预设内容");
    });
  });

  fillIcons();
}

function syncBrand() {
  const brand = DATA.brand || {};
  const user = document.querySelector(".sb-user span");
  if (user && brand.user) user.textContent = brand.user;
  const title = document.querySelector(".ws-title");
  if (title && brand.workspace) title.textContent = brand.workspace;
  const version = document.querySelector(".ver");
  if (version && brand.version) version.textContent = brand.version;
}

renderHome();
bindShell();
syncBrand();
autoResize();

if (location.hash === "#demo") {
  openConversation("");
}
