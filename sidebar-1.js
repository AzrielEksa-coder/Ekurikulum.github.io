/* ====================================================
   sidebar.js — Ekurikulum Pro
   ==================================================== */

// ── State ──────────────────────────────────────────
let cart = [];
let activeUser = null;
let transactionHistory = [];
let sidebarOpen = true;
let carouselIndex = 0;
let carouselTimer = null;

// ── Data ───────────────────────────────────────────
const dataKantin = [
  { id: 1, nama: "Jam Pelajaran", icon: "⏰" },
  { id: 2, nama: "Jadwal Pelajaran", icon: "📆" },
  { id: 3, nama: "Jadwal guru", icon: "🧑‍🏫" },
  { id: 4, nama: "Daftar Jurusan", icon: "🏫" },
  { id: 5, nama: "Informasi Raport Sekolah", icon: "📒" },
];

const dataMenu = [
  { id: 101, kId: 1, nama: "Jam KBM Kelas X 25/26", img: "WhatsApp Image 2026-05-08 at 20.23.53 (1).jpeg" },
  { id: 102, kId: 1, nama: "Jadwal Pelajaran", img: "WhatsApp Image 2026-05-08 at 20.23.53.jpeg" },
  { id: 201, kId: 2, nama: "Jadwal Pelajaran", img: "jadwal.jpeg" },
  {
    id: 202,
    kId: 2,
    nama: "Jadwal Pelajaran",
    img: "X DPIB A_pages-to-jpg-0001.jpg",
  },
  { id: 203, kId: 2, nama: "Jadwal Pelajaran", img: "X PPLG A_page-0001.jpg" },
  { id: 401, kId: 4, nama: "Jadwal Pelajaran", img: "jadwal.jpeg" },
];

// ── Init ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  initCarousel();
  initKeyboardShortcut();
});

function initApp() {
  const container = document.getElementById("kantin-container");
  container.innerHTML = dataKantin
    .map(
      (k) => `
    <div class="kantin-card" onclick="openKantin(${k.id}, '${k.nama}')">
      <div class="card-icon">${k.icon}</div>
      <h6>${k.nama}</h6>
    </div>
  `,
    )
    .join("");
}

// ── Carousel ───────────────────────────────────────
function initCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const dotsEl = document.getElementById("carousel-dots");

  items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(i);
    dotsEl.appendChild(dot);
  });

  startCarouselAuto();
}

function goToSlide(index) {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");
  items[carouselIndex].classList.remove("active");
  dots[carouselIndex].classList.remove("active");
  carouselIndex = (index + items.length) % items.length;
  items[carouselIndex].classList.add("active");
  dots[carouselIndex].classList.add("active");
}

function moveCarousel(dir) {
  resetCarouselAuto();
  goToSlide(carouselIndex + dir);
}

function startCarouselAuto() {
  carouselTimer = setInterval(() => goToSlide(carouselIndex + 1), 4000);
}

function resetCarouselAuto() {
  clearInterval(carouselTimer);
  startCarouselAuto();
}

// ── Sidebar ────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const wrapper = document.getElementById("layout-wrapper");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  } else {
    sidebarOpen = !sidebarOpen;
    if (sidebarOpen) {
      sidebar.style.transform = "translateX(0)";
      wrapper.style.marginLeft = "var(--sidebar-width)";
    } else {
      sidebar.style.transform = "translateX(-100%)";
      wrapper.style.marginLeft = "0";
    }
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

function initKeyboardShortcut() {
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      toggleSidebar();
    }
  });
}

// ── Navigation ─────────────────────────────────────
function showSection(id) {
  ["home", "katalog", "checkout", "history"].forEach((s) => {
    document.getElementById(s + "-section").classList.add("d-none");
  });
  document.getElementById(id + "-section").classList.remove("d-none");
  document.body.classList.toggle("is-checkout", id === "checkout");

  // Breadcrumb update
  const names = {
    home: "Beranda",
    katalog: "Detail Menu",
    checkout: "Checkout",
    history: "Riwayat Login",
  };
  document.getElementById("breadcrumb-current").textContent = names[id] || id;

  // Active nav button
  document
    .querySelectorAll(".sidebar-menu-btn")
    .forEach((b) => b.classList.remove("active"));
  const map = { home: "nav-home", history: "nav-history" };
  if (map[id]) document.getElementById(map[id])?.classList.add("active");

  // Close mobile sidebar after navigation
  if (window.innerWidth <= 768) closeSidebar();

  window.scrollTo(0, 0);
}

function openKantinById(id) {
  const k = dataKantin.find((k) => k.id === id);
  if (k) openKantin(k.id, k.nama);
}

function openKantin(id, name) {
  if (id === 2) {
    window.location.href = "jadwal guru.html";
    return;
  }
  if (id === 5) {
    window.location.href = "Layout raport.html";
    return;
  }
  if (id === 3) {
    window.location.href = "Jadewal.html";
    return;
  }
  if (id === 4) {
    window.location.href = "DAFTAR JURUSAN.html";
    return;
  }

  document.getElementById("kantin-name-title").innerText = name;

  const items = dataMenu.filter((m) => m.kId === id);
  document.getElementById("menu-container").innerHTML = items
    .map(
      (m) => `
    <div class="menu-card">
      <img src="${m.img}" class="menu-img" alt="${m.nama}">
      <div class="menu-card-body">
        <h6>${m.nama}</h6>
        <button class="btn-view" onclick="checkLoginAndOpen('${m.img}')">
          <i class="bi bi-eye"></i> Lihat Gambar
        </button>
      </div>
    </div>
  `,
    )
    .join("");

  showSection("katalog");
}

// ── Auth ───────────────────────────────────────────
function showLoginModal() {
  document.getElementById("loginModal").classList.add("show");
  setTimeout(
    () => document.getElementById("loginBox").classList.add("show"),
    10,
  );
  if (window.innerWidth <= 768) closeSidebar();
}

function closeModal() {
  document.getElementById("loginBox").classList.remove("show");
  document.getElementById("loginModal").classList.remove("show");
}

function handleLogin() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value.trim();

  if (u.length < 6) return alert("Nama minimal harus 6 karakter!");
  if (p.length < 8) return alert("Password minimal harus 8 karakter!");

  activeUser = u;

  // Update UI
  document.getElementById("login-nav-item").style.display = "none";
  document.getElementById("logout-nav-item").style.display = "block";
  document.getElementById("history-nav-item").style.display = "block";

  document.getElementById("sidebar-footer-user").style.display = "block";
  document.getElementById("sidebar-user-name").textContent = u;

  document.getElementById("topbar-user-badge").style.display = "flex";
  document.getElementById("topbar-user-name").textContent = u;

  closeModal();
}

function doLogout() {
  activeUser = null;
  cart = [];

  document.getElementById("login-nav-item").style.display = "block";
  document.getElementById("logout-nav-item").style.display = "none";
  document.getElementById("history-nav-item").style.display = "none";
  document.getElementById("sidebar-footer-user").style.display = "none";
  document.getElementById("topbar-user-badge").style.display = "none";

  showSection("home");
}

function checkLoginAndOpen(imgSrc) {
  if (!activeUser) {
    showLoginModal();
    return;
  }
  openImagePage(imgSrc);
}

function openImagePage(imgSrc) {
  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html><head><title>Lihat Gambar</title>
  <style>
    body { margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
           min-height:100vh; background:#f5f5f5; font-family:Arial,sans-serif; }
    img  { max-width:90%; max-height:80vh; border-radius:12px; }
    button { margin-top:20px; padding:12px 25px; border:none; border-radius:30px;
             background:#0d6efd; color:#fff; font-weight:bold; cursor:pointer; }
  </style></head><body>
    <img src="${imgSrc}" alt="Gambar">
    <button onclick="window.close()">← Kembali</button>
  </body></html>`);
}

// ── History ────────────────────────────────────────
function renderHistory() {
  document.getElementById("history-list").innerHTML =
    transactionHistory
      .map(
        (h) => `
      <div class="history-item">
        <span>${h.date}</span>
        <b>${h.method}</b>
      </div>
    `,
      )
      .join("") ||
    '<p style="text-align:center;color:#9ca3af;padding:40px 0">Belum ada riwayat.</p>';
}
