// assets/js/login.js

(function () {
  const form = document.getElementById("loginForm");
  if (!form) return;

  // Akun dummy yang diizinkan
  const VALID_USERNAME = "staff";
  const VALID_PASSWORD = "0987651!";

  // Elemen pesan error (buat kalau belum ada)
  let msgEl = document.querySelector(".login-error");
  if (!msgEl) {
    msgEl = document.createElement("div");
    msgEl.className = "login-error";
    msgEl.style.color = "#b00020";
    msgEl.style.marginTop = "8px";
    msgEl.style.fontSize = "14px";
    msgEl.style.textAlign = "left";
    msgEl.style.display = "none";
    // letakkan di atas tombol submit (di dalam form)
    const btn = form.querySelector("button[type='submit']");
    btn.parentNode.insertBefore(msgEl, btn);
  }

  // Proteksi percobaan login
  const MAX_ATTEMPTS = 3;
  const LOCK_SECONDS = 8;
  let attempts = 0;
  let lockedUntil = 0;

  function setError(text) {
    msgEl.textContent = text;
    msgEl.style.display = text ? "block" : "none";
  }

  function lockLogin(seconds) {
    lockedUntil = Date.now() + seconds * 1000;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    let remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
    setError(`Terlalu banyak percobaan salah. Coba lagi dalam ${remaining} detik.`);

    const timer = setInterval(() => {
      remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining > 0) {
        setError(`Terlalu banyak percobaan salah. Coba lagi dalam ${remaining} detik.`);
      } else {
        clearInterval(timer);
        btn.disabled = false;
        attempts = 0;
        setError("");
      }
    }, 1000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // cek locked
    if (Date.now() < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      setError(`Terlalu banyak percobaan salah. Coba lagi dalam ${remaining} detik.`);
      return;
    }

    const username = (document.getElementById("username")?.value || "").trim();
    const password = document.getElementById("password")?.value || "";

    // validasi sederhana
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // login success
      setError("");
      // contoh: set flag di localStorage lalu redirect ke dashboard
      try {
        localStorage.setItem("isLoggedIn", "true");
      } catch (err) { /* ignore jika storage diblokir */ }

      // redirect (ganti dashboard.html sesuai strukturmu)
      window.location.href = "dashboard.html";
    } else {
      // login gagal
      attempts += 1;
      const remainingAttempts = MAX_ATTEMPTS - attempts;
      if (remainingAttempts > 0) {
        setError(`Username atau password salah. Sisa percobaan: ${remainingAttempts}.`);
      } else {
        lockLogin(LOCK_SECONDS);
      }
    }
  });
})();
