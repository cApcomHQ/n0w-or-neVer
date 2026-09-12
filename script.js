/* =========================================================
TWITCH SETTINGS
========================================================= */

const TWITCH_CHANNEL =
"capcomhq";

const TWITCH_URL =
"https://www.twitch.tv/capcomhq";

/* =========================================================
ELEMENTS
========================================================= */

const twitchPlayerElement =
document.getElementById("twitchPlayer");

const streamStatus =
document.getElementById("streamStatus");

const statusDetail =
document.getElementById("statusDetail");

const statusDot =
document.getElementById("statusDot");

const headerStatus =
document.getElementById("headerStatus");

const toast =
document.getElementById("toast");

const openTwitch =
document.getElementById("openTwitch");

const fullscreenButton =
document.getElementById("fullscreenButton");

const popoutButton =
document.getElementById("popoutButton");

const copyLink =
document.getElementById("copyLink");

const menuButton =
document.getElementById("menuButton");

const playerFrame =
document.getElementById("playerFrame");

/* =========================================================
BASIC SETTINGS
========================================================= */

openTwitch.href =
TWITCH_URL;

document.getElementById("year").textContent =
new Date().getFullYear();

/* =========================================================
STREAM STATUS
========================================================= */

function setStatus(
title,
detail,
live = false
) {

streamStatus.textContent =
title;

statusDetail.textContent =
detail;

headerStatus.textContent =
live
? "LIVE"
: "TWITCH";

statusDot.classList.toggle(
"live",
live
);

}

/* =========================================================
TWITCH PLAYER
========================================================= */

let twitchPlayer =
null;

/*
Create Twitch player.

The parent domain must match the GitHub Pages
domain where the player is embedded.
*/

function createTwitchPlayer() {

if (
!window.Twitch ||
!window.Twitch.Player
) {

```
setStatus(
  "Player unavailable",
  "Twitch Player API could not be loaded",
  false
);

return;
```

}

if (
twitchPlayer
) {

```
return;
```

}

setStatus(
"Loading Twitch",
"Connecting to capcomhq…",
true
);

const width =
Math.max(
twitchPlayerElement.clientWidth,
320
);

const height =
Math.max(
Math.round(width * 9 / 16),
180
);

twitchPlayer =
new Twitch.Player(
"twitchPlayer",
{

```
    channel:
      TWITCH_CHANNEL,

    parent:
      [
        "capcomhq.github.io"
      ],

    width:
      "100%",

    height:
      "100%",

    autoplay:
      false,

    muted:
      false,

    controls:
      true

  }
);
```

/*
Twitch player ready.
*/

twitchPlayer.addEventListener(
Twitch.Player.READY,
() => {

```
  setStatus(
    "Ready",
    "Press play to watch cApcom on Twitch",
    false
  );

}
```

);

/*
Stream starts playing.
*/

twitchPlayer.addEventListener(
Twitch.Player.PLAY,
() => {

```
  setStatus(
    "LIVE",
    "n0w or neVer · cApcom",
    true
  );

}
```

);

/*
Player paused.
*/

twitchPlayer.addEventListener(
Twitch.Player.PAUSE,
() => {

```
  setStatus(
    "Paused",
    "Twitch stream paused",
    false
  );

}
```

);

/*
Player becomes online.
*/

twitchPlayer.addEventListener(
Twitch.Player.ONLINE,
() => {

```
  setStatus(
    "LIVE",
    "n0w or neVer · cApcom",
    true
  );

}
```

);

/*
Player becomes offline.
*/

twitchPlayer.addEventListener(
Twitch.Player.OFFLINE,
() => {

```
  setStatus(
    "Offline",
    "cApcom is currently not streaming",
    false
  );

}
```

);

/*
Player ended.
*/

twitchPlayer.addEventListener(
Twitch.Player.ENDED,
() => {

```
  setStatus(
    "Stream ended",
    "cApcom is currently offline",
    false
  );

}
```

);

/*
Error handling.
*/

twitchPlayer.addEventListener(
Twitch.Player.ERROR,
() => {

```
  setStatus(
    "Twitch error",
    "The Twitch player could not be loaded",
    false
  );

}
```

);

}

/* =========================================================
INITIALIZE TWITCH
========================================================= */

if (
window.Twitch &&
window.Twitch.Player
) {

createTwitchPlayer();

}

/* =========================================================
FULLSCREEN
========================================================= */

fullscreenButton.addEventListener(
"click",
() => {

```
if (
  twitchPlayer &&
  typeof twitchPlayer.setQuality === "function"
) {

  /*
     Twitch controls already provide fullscreen.

     We additionally fullscreen our player frame
     so the complete custom player area is used.
  */

  if (
    document.fullscreenElement
  ) {

    document.exitFullscreen();

    return;

  }


  if (
    playerFrame.requestFullscreen
  ) {

    playerFrame.requestFullscreen();

  }

}
```

}
);

/* =========================================================
OPEN TWITCH
========================================================= */

popoutButton.addEventListener(
"click",
() => {

```
window.open(
  TWITCH_URL,
  "_blank",
  "noopener,noreferrer"
);
```

}
);

/* =========================================================
COPY WEBSITE LINK
========================================================= */

copyLink.addEventListener(
"click",
async () => {

```
try {

  await navigator.clipboard.writeText(
    window.location.href
  );

  toast.textContent =
    "Link copied to clipboard";

}

catch {

  toast.textContent =
    "Copy this page URL from your browser";

}


toast.classList.add(
  "show"
);


setTimeout(
  () => {

    toast.classList.remove(
      "show"
    );

  },
  2500
);
```

}
);

/* =========================================================
MOBILE MENU
========================================================= */

menuButton.addEventListener(
"click",
() => {

```
document
  .querySelector(".desktop-nav")
  .classList.toggle(
    "mobile-open"
  );
```

}
);

/* =========================================================
MOBILE NAVIGATION
========================================================= */

document
.querySelectorAll(".desktop-nav a")
.forEach(
(link) => {

```
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
```

);

/* =========================================================
WINDOW RESIZE
========================================================= */

window.addEventListener(
"resize",
() => {

```
if (
  twitchPlayer
) {

  /*
     Twitch handles its own responsive sizing
     because the player uses 100% width/height.
  */

  return;

}
```

}
);
