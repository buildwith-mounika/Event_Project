// ==== Toggle helpers ====
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
}
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

// Wire toggle links
document.addEventListener("DOMContentLoaded", () => {
  const goLogin = document.getElementById("goLogin");
  const goRegister = document.getElementById("goRegister");
  if (goLogin) goLogin.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });
  if (goRegister) goRegister.addEventListener("click", (e) => { e.preventDefault(); showRegister(); });

  // Forms
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", onRegister);
  }
  if (loginForm) {
    loginForm.addEventListener("submit", onLogin);
  }
});

// ==== Simple storage helpers ====
const STORAGE_KEY = "eventgo_users"; // array of users

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function findUserByUsername(username) {
  return getUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
}

// ==== Registration logic ====
function onRegister(e) {
  e.preventDefault();

  const form = e.target;
  const username = form.username.value.trim();
  const password = form.password.value;
  const email = form.email.value.trim();
  const errorEl = document.getElementById("registerError");
  const successEl = document.getElementById("registerSuccess");

  errorEl.style.display = "none";
  successEl.style.display = "none";

  // Basic validations / conditions you asked for:
  // 1) Username must be 4+ chars and alphanumeric/underscore
  const usernameOK = /^[A-Za-z0-9_]{4,}$/.test(username);
  if (!usernameOK) {
    errorEl.textContent = "Username must be 4+ characters and only letters/numbers/_ allowed.";
    errorEl.style.display = "block";
    return;
  }

  // 2) Password must be 6+ chars with at least one number
  const passwordOK = /^(?=.*\d).{6,}$/.test(password);
  if (!passwordOK) {
    errorEl.textContent = "Password must be 6+ characters and include at least one number.";
    errorEl.style.display = "block";
    return;
  }

  // 3) Unique username
  if (findUserByUsername(username)) {
    errorEl.textContent = "Username already exists. Try a different one.";
    errorEl.style.display = "block";
    return;
  }

  const users = getUsers();
  users.push({ username, password, email });
  saveUsers(users);

  successEl.textContent = "Registration successful! You can log in now.";
  successEl.style.display = "block";

  // Optionally, switch to login after a second
  setTimeout(() => {
    showLogin();
    // Pre-fill username
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.username.value = username;
    }
  }, 800);
}

// ==== Login logic ====
function onLogin(e) {
  e.preventDefault();

  const form = e.target;
  const username = form.username.value.trim();
  const password = form.password.value;
  const errorEl = document.getElementById("loginError");

  errorEl.style.display = "none";

  // Option A: Allow a demo hardcoded admin for testing
  const DEMO = { username: "Mooni", password: "Mooni@123" };

  // Check local users first
  const user = findUserByUsername(username);
  const localMatch = user && user.password === password;

  // Or demo match
  const demoMatch = username === DEMO.username && password === DEMO.password;

  if (localMatch || demoMatch) {
    // Success → go to u1.html (front-end redirect)
    window.location.href = "u1.html";
    return;
  }

  // Wrong creds
  errorEl.textContent = "Wrong username or password.";
  errorEl.style.display = "block";
}

// (Optional) Forgot password demo
const forgotLink = document.getElementById("forgotLink");
if (forgotLink) {
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Demo: Password reset is not connected to a backend yet.");
  });
}

