const OWNCAST_URL = "https://nowornever.ddnss.eu";

const iframe = document.getElementById("owncastPlayer");
const openOwncast = document.getElementById("openOwncast");
const streamStatus = document.getElementById("streamStatus");
const statusDetail = document.getElementById("statusDetail");
const statusDot = document.getElementById("statusDot");
const headerStatus = document.getElementById("headerStatus");
const toast = document.getElementById("toast");

iframe.src = OWNCAST_URL;
openOwncast.href = OWNCAST_URL;

document.getElementById("year").textContent = new Date().getFullYear();

function setStatus(text, detail, live = false) {
  streamStatus.textContent = text;
  statusDetail.textContent = detail;
  headerStatus.textContent = live ? "LIVE" : "ONLINE";
  statusDot.classList.toggle("live", live);
}

// Owncast may block cross-origin fetches depending on configuration.
// The iframe itself is the primary availability check.
iframe.addEventListener("load", () => {
  setStatus("Player connected", "Owncast is reachable", true);
});

document.getElementById("fullscreenButton").addEventListener("click", () => {
  const frame = document.getElementById("playerFrame");
  if (frame.requestFullscreen) frame.requestFullscreen();
});

document.getElementById("popoutButton").addEventListener("click", () => {
  window.open(OWNCAST_URL, "_blank", "noopener");
});

document.getElementById("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.textContent = "Link copied to clipboard";
  } catch {
    toast.textContent = "Copy this page URL from your browser";
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
});

// Small-screen navigation toggle.
document.getElementById("menuButton").addEventListener("click", () => {
  document.querySelector(".desktop-nav").classList.toggle("mobile-open");
});
