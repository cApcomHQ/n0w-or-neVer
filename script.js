/* =========================================================
   TWITCH SETTINGS
========================================================= */

const TWITCH_CHANNEL =
  "capcomhq";

const TWITCH_URL =
  `https://www.twitch.tv/${TWITCH_CHANNEL}`;

/*
   Your GitHub Pages domain.

   IMPORTANT:
   This must match the domain where the website runs
   (hostname only, no path, no protocol, no trailing slash).
*/

const TWITCH_PARENT =
  "capcomhq.github.io";


/* =========================================================
   ELEMENTS
========================================================= */

const twitchPlayerFrame =
  document.getElementById("twitchPlayer");

const streamStatus =
  document.getElementById("streamStatus");

const statusDetail =
  document.getElementById("statusDetail");

const statusDot =
  document.getElementById("statusDot");

const headerStatus =
  document.getElementById("headerStatus");

const headerStatusDot =
  document.getElementById("headerStatusDot");

const chatLiveDot =
  document.getElementById("chatLiveDot");

const twitchChat =
  document.getElementById("twitchChat");

const openTwitch =
  document.getElementById("openTwitch");

const menuButton =
  document.getElementById("menuButton");


/* =========================================================
   BASIC SETTINGS
========================================================= */

openTwitch.href =
  TWITCH_URL;


document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================================
   TWITCH VIDEO PLAYER
   (plain iframe — no Twitch.Embed JS API, which has known,
   long-standing sizing bugs. The CSS in style.css already
   stretches this iframe to fill the 16:9 frame.)
========================================================= */

const videoIframe =
  document.createElement("iframe");

videoIframe.src =
  `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${TWITCH_PARENT}&muted=false`;

videoIframe.setAttribute(
  "allowfullscreen",
  "true"
);

videoIframe.setAttribute(
  "allow",
  "autoplay; fullscreen"
);

videoIframe.frameBorder =
  "0";

twitchPlayerFrame.appendChild(
  videoIframe
);


/*
   We can't reliably detect live/offline status from a plain
   iframe (Twitch doesn't expose that to outside scripts
   without OAuth). Twitch itself shows an "offline" screen
   inside the player when the channel isn't streaming, so we
   just keep the badge text generic instead of guessing.
*/

streamStatus.textContent =
  "Twitch channel";

statusDetail.textContent =
  "Live when cApcom is streaming";

headerStatus.textContent =
  "TWITCH";

statusDot.classList.remove("live");

headerStatusDot.classList.add("offline");

chatLiveDot.classList.add("offline");


/* =========================================================
   TWITCH CHAT
========================================================= */

twitchChat.src =
  `https://www.twitch.tv/embed/${TWITCH_CHANNEL}/chat?parent=${TWITCH_PARENT}&darkpopout`;


/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener(
  "click",
  () => {

    document
      .querySelector(".desktop-nav")
      .classList.toggle(
        "mobile-open"
      );

  }
);


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

document
  .querySelectorAll(
    ".desktop-nav a"
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          document
            .querySelector(".desktop-nav")
            .classList.remove(
              "mobile-open"
            );

        }
      );

    }
  );
