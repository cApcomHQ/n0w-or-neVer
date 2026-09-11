const OWNCAST_URL = "https://nowornever.ddnss.eu";
const VIDEO_EMBED_URL = `${OWNCAST_URL}/embed/video?autoplay=always`;

const iframe = document.getElementById("owncastPlayer");
const playButton = document.getElementById("playButton");
const streamStatus = document.getElementById("streamStatus");
const statusDetail = document.getElementById("statusDetail");
const statusDot = document.getElementById("statusDot");
const headerStatus = document.getElementById("headerStatus");
const toast = document.getElementById("toast");
const openOwncast = document.getElementById("openOwncast");

openOwncast.href = OWNCAST_URL;
document.getElementById("year").textContent = new Date().getFullYear();

function setStatus(title, detail, live = false) {
  streamStatus.textContent = title;
  statusDetail.textContent = detail;
  headerStatus.textContent = live ? "LIVE" : "OWNCAST";
  statusDot.classList.toggle("live", live);
}

// The custom button starts loading the official Owncast video-only embed.
// This keeps the player exactly edge-to-edge inside the 16:9 frame.
playButton.addEventListener("click", () => {
  if (!iframe.src) iframe.src = VIDEO_EMBED_URL;
  playButton.classList.add("is-hidden");
  setStatus("Stream loading", "Starting Owncast player…", true);
});

iframe.addEventListener("load", () => {
  setStatus("Player connected", "Owncast video is ready", true);
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

document.getElementById("menuButton").addEventListener("click", () => {
  document.querySelector(".desktop-nav").classList.toggle("mobile-open");
});
