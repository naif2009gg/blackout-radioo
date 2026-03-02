# 🚀 دليل الإعداد — Black Out Radio System

## الخطوات بالترتيب

---

## 📌 الخطوة 1 — إنشاء GitHub Gist (قاعدة البيانات)

الـ Gist هو ملف على GitHub يخزن نقاط الضباط مجاناً.

1. افتح: https://gist.github.com
2. سجّل دخول أو أنشئ حساب GitHub
3. في **"Gist description"** اكتب: `leaderboard`
4. في **"Filename"** اكتب: `leaderboard.json`
5. في المحتوى اكتب: `{}`
6. اضغط **"Create secret gist"**
7. انسخ الـ **ID** من الرابط:
   ```
   https://gist.github.com/YourName/هذا_هو_الـ_ID
   ```

---

## 📌 الخطوة 2 — إنشاء GitHub Token

1. افتح: https://github.com/settings/tokens
2. اضغط **"Generate new token (classic)"**
3. في **"Note"** اكتب: `blackout-radio`
4. في **"Expiration"** اختر: `No expiration`
5. ضع علامة ✅ على: **`gist`** فقط
6. اضغط **"Generate token"**
7. انسخ الـ Token (يظهر مرة وحدة فقط!)

---

## 📌 الخطوة 3 — تعديل الملفات

### في `script.js` (السطر 7-8):
```js
const GIST_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx";  // ← الـ Token هنا
const GIST_ID    = "abc123def456...";            // ← الـ Gist ID هنا
```

### في `leaderboard.html` (السطر في أسفل الصفحة):
```js
const GIST_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx";  // ← نفس الـ Token
const GIST_ID    = "abc123def456...";            // ← نفس الـ Gist ID
const LB_CODE    = "admin2025";                  // ← غيّر هذا الكود حسب ما تبي
```

---

## 📌 الخطوة 4 — رفع الموقع على GitHub Pages

1. افتح: https://github.com/new
2. اسم الـ Repository: `blackout-radio` (أو أي اسم تبيه)
3. اجعله **Public**
4. اضغط **"Create repository"**

### رفع الملفات:
5. اضغط **"uploading an existing file"**
6. ارفع هذه الملفات كلها:
   - `index.html`
   - `leaderboard.html`
   - `script.js`
   - `style.css`
   - `logo.gif`
7. اضغط **"Commit changes"**

### تفعيل GitHub Pages:
8. اذهب لـ **Settings** في الـ Repository
9. من القائمة الجانبية اضغط **"Pages"**
10. في **"Source"** اختر: `Deploy from a branch`
11. في **"Branch"** اختر: `main` → `/ (root)`
12. اضغط **Save**

### ✅ الرابط سيكون:
```
https://YourGitHubName.github.io/blackout-radio/
```
لوحة الترتيب:
```
https://YourGitHubName.github.io/blackout-radio/leaderboard.html
```

---

## 📌 ملخص الأكواد

| الكود | الاستخدام |
|-------|-----------|
| `blackout2025` | كود دخول الضباط |
| `cfw1234`       | كود دخول الضباط |
| `lspd9999`      | كود دخول الضباط |
| `blackout3464`  | كود دخول الضباط |
| `admin2025`     | كود دخول لوحة الترتيب ← **غيّره!** |

---

## ⚠️ تنبيهات مهمة

- **لا تشارك الـ Token** مع أحد، هو مثل كلمة سر
- الـ Token يمنح صلاحية تعديل الـ Gist فقط (ليس حسابك كله)
- إذا تسرّب الـ Token، احذفه فوراً من: https://github.com/settings/tokens
- الـ Gist ID عام (public)، لكن البيانات لا يمكن تعديلها بدون الـ Token

---

## 🆘 مشاكل شائعة

**المشكلة: الليدربورد لا يحفظ**
→ تأكد أن `GIST_TOKEN` و `GIST_ID` صحيحين في كلا الملفين

**المشكلة: GitHub Pages يقول 404**
→ انتظر 2-5 دقائق بعد التفعيل

**المشكلة: التوكن انتهى**
→ أنشئ توكن جديد وعدّل الملفين
