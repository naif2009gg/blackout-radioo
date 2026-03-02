// ===== CONFIG =====
const WEBHOOK_URL = "https://discord.com/api/webhooks/1476777850383110200/Z5oFbFXd-4lQWyeglZe_rzykxMchO62CwFWFHSjyyQq5y3-Z9B5Xh88jX6GbOW63zdWa";

// كودات الدخول الصحيحة — عدّلها حسب ما تبي
const VALID_CODES = ["blackout2025", "cfw1234", "lspd9999", "blackout3464"];

// ===== GIST CONFIG (للليدربورد) =====
// ⚠️ اتبع الخطوات في README لإنشاء Gist وضع المعلومات هنا
const GIST_TOKEN = "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";
const GIST_ID    = "6220e5ffec19244014a7b0f921206a83";

// ===== Particles =====
(function () {
  const c = document.getElementById("particles");
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.width = p.style.height = (Math.random() * 2.5 + 1) + "px";
    p.style.animationDuration = (Math.random() * 14 + 8) + "s";
    p.style.animationDelay = (Math.random() * 12) + "s";
    if (Math.random() > 0.75) p.style.background = "#f59e0b";
    c.appendChild(p);
  }
})();

// ===== Login =====
let loggedInName = "";

function doLogin() {
  const name = document.getElementById("loginName").value.trim();
  const code = document.getElementById("loginCode").value.trim();
  const errEl = document.getElementById("loginError");
  const btn   = document.querySelector(".login-btn");
  const spinner = document.getElementById("loginSpinner");
  const text    = document.getElementById("loginText");

  errEl.classList.add("hidden");

  if (!name) {
    errEl.textContent = "⚠️ أدخل اسم شخصيتك في اللعبة أولاً";
    errEl.classList.remove("hidden");
    return;
  }
  if (!VALID_CODES.includes(code.toLowerCase())) {
    errEl.textContent = "❌ الكود خاطئ أو غير مخوّل للدخول";
    errEl.classList.remove("hidden");
    return;
  }

  text.classList.add("hidden");
  spinner.classList.remove("hidden");
  btn.disabled = true;

  setTimeout(() => {
    loggedInName = name;
    const login = document.getElementById("loginPage");
    const main  = document.getElementById("mainSite");
    login.classList.add("leaving");

    document.getElementById("officerName").value = name;
    document.getElementById("headerOfficer").textContent = "👮 " + name;

    setTimeout(() => {
      login.style.display = "none";
      main.style.display = "block";
      setTimeout(() => main.classList.add("visible"), 30);
    }, 700);
  }, 600);
}

document.getElementById("loginCode").addEventListener("keydown", function (e) {
  if (e.key === "Enter") doLogin();
});

// ===== Members =====
let memberCount = 1;

const RANKS = [
  "Cadet Solo","Cadet Officer","Officer I","Officer II","Officer III","Senior Officer",
  "Sergeant","First Sergeant","Staff Sergeant",
  "Lieutenant","First Lieutenant","Captain","Major","Lieutenant Colonel","Colonel",
  "Brigadier General","Major General","Lieutenant General",
  "Deputy LSPD Chief","LSPD Chief General","Deputy Police Chief","Police Chief",
  "Deputy Minister of Interior","Minister of Interior"
];

function rankOptions(selected = "") {
  return `<option value="">— الرتبة —</option>` +
    RANKS.map(r => `<option${r === selected ? " selected" : ""}>${r}</option>`).join("");
}

function addMember() {
  memberCount++;
  const list = document.getElementById("radioMembers");
  const div = document.createElement("div");
  div.className = "member-item";
  div.innerHTML = `
    <span class="num-badge">${memberCount}</span>
    <input type="text" placeholder="اسم الشخصية" class="member-input">
    <input type="text" placeholder="اليونت (مثال: 1-Adam-4)" class="member-unit-input">
    <button type="button" class="rm-btn" onclick="removeMember(this)">✕</button>
  `;
  list.appendChild(div);
}

function removeMember(btn) {
  const list = document.getElementById("radioMembers");
  if (list.children.length <= 1) return;
  btn.closest(".member-item").remove();
  renumber("radioMembers", ".num-badge:not(.ach)");
}

// ===== Achievements =====
let achCount = 1;

function addAch() {
  achCount++;
  const list = document.getElementById("achievementsList");
  const div = document.createElement("div");
  div.className = "achievement-item";
  div.innerHTML = `
    <span class="num-badge ach">${achCount}</span>
    <input type="text" placeholder="مثال: تنسيق مطاردة والقبض على المشتبه به" class="ach-input">
    <button type="button" class="rm-btn" onclick="removeAch(this)">✕</button>
  `;
  list.appendChild(div);
}

function removeAch(btn) {
  const list = document.getElementById("achievementsList");
  if (list.children.length <= 1) return;
  btn.closest(".achievement-item").remove();
  renumber("achievementsList", ".num-badge.ach");
}

function renumber(listId, sel) {
  document.getElementById(listId).querySelectorAll(sel).forEach((el, i) => {
    el.textContent = i + 1;
  });
}

// ===== Danger colors =====
const dangerColors = {
  "🟢 هادئة":           0x22c55e,
  "🟡 متوسطة":          0xeab308,
  "🔴 عالية":           0xef4444,
  "⚫ بالغة الخطورة":   0x374151
};

// ===== LEADERBOARD (Gist) =====
async function saveToLeaderboard(officerName, rank) {
  if (GIST_TOKEN === "GIST_TOKEN_HERE" || GIST_ID === "GIST_ID_HERE") return; // لم يُعدَّل الكونفيغ بعد

  try {
    // قراءة البيانات الحالية
    const getRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        "Authorization": `token ${GIST_TOKEN}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    const gistData = await getRes.json();
    const raw = gistData.files["leaderboard.json"]?.content || "{}";
    let board = {};
    try { board = JSON.parse(raw); } catch(e) { board = {}; }

    // تحديث النقاط
    const key = officerName.trim();
    if (!board[key]) {
      board[key] = { name: key, rank: rank, reports: 0, lastReport: "" };
    }
    board[key].reports += 1;
    board[key].rank = rank;
    board[key].lastReport = new Date().toISOString();

    // حفظ
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        "Authorization": `token ${GIST_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
      },
      body: JSON.stringify({
        files: {
          "leaderboard.json": { content: JSON.stringify(board, null, 2) }
        }
      })
    });
  } catch (err) {
    console.warn("Leaderboard save failed:", err);
  }
}

// ===== Submit =====
document.getElementById("reportForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const errEl = document.getElementById("errorMsg");
  errEl.classList.add("hidden");

  const officerName = document.getElementById("officerName").value.trim();
  const rank        = document.getElementById("rank").value;
  const unit        = document.getElementById("unit").value.trim();
  const sessionDate = document.getElementById("sessionDate").value;
  const duration    = document.getElementById("duration").value.trim();
  const radioCount  = document.getElementById("radioCount").value.trim();
  const notes       = document.getElementById("notes").value.trim();

  const dangerEl = document.querySelector('input[name="danger"]:checked');

  if (!dangerEl) { showError("⚠️ يرجى تحديد حالة الخطورة."); return; }

  const danger = dangerEl.value;

  // Members
  const members = [];
  document.querySelectorAll(".member-item").forEach((item, idx) => {
    const n = item.querySelector(".member-input")?.value.trim();
    const u = item.querySelector(".member-unit-input")?.value.trim();
    if (n) members.push(`\`${idx + 1}\` **${n}**${u ? "  ·  " + u : ""}`);
  });

  // Achievements
  const achievements = [];
  document.querySelectorAll(".ach-input").forEach((input, idx) => {
    const v = input.value.trim();
    if (v) achievements.push(`\`${idx + 1}\` ${v}`);
  });

  if (achievements.length === 0) { showError("⚠️ يرجى إضافة إنجاز واحد على الأقل."); return; }

  const dateFormatted = sessionDate
    ? new Date(sessionDate).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })
    : "غير محدد";

  const embedColor = dangerColors[danger] ?? 0x3b82f6;

  const embed = {
    title: "📻  تقرير مسؤول الراديو — Black Out",
    color: embedColor,
    thumbnail: { url: "https://cdn.discordapp.com/attachments/1404697423246524416/1476788432134078596/1.gif?ex=69a265e7&is=69a11467&hm=56dad2ed5aec40820ef80a412f95f81a3b0af5fc777481e6b78c501a74ff80b6&" },
    fields: [
      {
        name: "👮  معلومات المسؤول",
        value:
          `**الشخصية:**  ${officerName}\n` +
          `**الرتبة:**  ${rank}\n` +
          `**اليونت:**  ${unit}`,
        inline: true
      },
      {
        name: "📅  بيانات الجلسة",
        value:
          `**التاريخ:**  ${dateFormatted}\n` +
          `**المدة:**  ${duration}\n` +
          `**عدد المتواجدين:**  ${radioCount || "—"}`,
        inline: true
      },
      { name: "\u200b", value: "\u200b", inline: false },
      {
        name: "🚦  الحالة",
        value: `**الخطورة:**  ${danger}`,
        inline: false
      },
      {
        name: `🎙️  المتواجدون في الراديو  (${members.length})`,
        value: members.length > 0 ? members.join("\n") : "_لم يكن أحد_",
        inline: false
      },
      {
        name: `🏅  الإنجازات  (${achievements.length})`,
        value: achievements.join("\n"),
        inline: false
      }
    ],
    footer: { text: "Black Out · FiveM CFW  |  Radio Report System" },
    timestamp: new Date().toISOString()
  };

  if (notes) embed.fields.push({ name: "📝  ملاحظات", value: notes, inline: false });

  const content = `📣 تقرير جديد من **${officerName}**`;

  const submitBtn     = document.getElementById("submitBtn");
  const submitText    = document.getElementById("submitText");
  const submitSpinner = document.getElementById("submitSpinner");
  submitText.classList.add("hidden");
  submitSpinner.classList.remove("hidden");
  submitBtn.disabled = true;

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, embeds: [embed] })
    });

    if (res.ok || res.status === 204) {
      // حفظ في الليدربورد
      await saveToLeaderboard(officerName, rank);

      document.getElementById("reportForm").classList.add("hidden");
      document.getElementById("successMsg").classList.remove("hidden");
    } else {
      const err = await res.json().catch(() => ({}));
      console.error(err);
      showError(`❌ فشل الإرسال (${res.status}). تأكد من صحة الويب هوك.`);
      resetBtn();
    }
  } catch (err) {
    console.error(err);
    showError("❌ خطأ في الاتصال. تأكد من الإنترنت وحاول مجدداً.");
    resetBtn();
  }
});

function showError(msg) {
  const el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.classList.remove("hidden");
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetBtn() {
  document.getElementById("submitText").classList.remove("hidden");
  document.getElementById("submitSpinner").classList.add("hidden");
  document.getElementById("submitBtn").disabled = false;
}

// ===== Reset Form =====
function resetForm() {
  document.getElementById("reportForm").reset();
  document.getElementById("officerName").value = loggedInName;
  document.getElementById("reportForm").classList.remove("hidden");
  document.getElementById("successMsg").classList.add("hidden");
  document.getElementById("errorMsg").classList.add("hidden");
  resetBtn();

  document.getElementById("radioMembers").innerHTML = `
    <div class="member-item">
      <span class="num-badge">1</span>
      <input type="text" placeholder="اسم الشخصية" class="member-input">
      <input type="text" placeholder="اليونت (مثال: 1-Adam-4)" class="member-unit-input">
      <button type="button" class="rm-btn" onclick="removeMember(this)">✕</button>
    </div>`;
  memberCount = 1;

  document.getElementById("achievementsList").innerHTML = `
    <div class="achievement-item">
      <span class="num-badge ach">1</span>
      <input type="text" placeholder="مثال: تنسيق مطاردة والقبض على المشتبه به" class="ach-input">
      <button type="button" class="rm-btn" onclick="removeAch(this)">✕</button>
    </div>`;
  achCount = 1;
}
