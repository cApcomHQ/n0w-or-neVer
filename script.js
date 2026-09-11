/* =========================================================
OWNCAST SETTINGS
========================================================= */

const OWNCAST_URL =
"https://nowornever.ddnss.eu";

const VIDEO_EMBED_URL =
`${OWNCAST_URL}/embed/video`;

/* =========================================================
ELEMENTS
========================================================= */

const iframe =
document.getElementById("owncastPlayer");

const playButton =
document.getElementById("playButton");

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

const openOwncast =
document.getElementById("openOwncast");

const fullscreenButton =
document.getElementById("fullscreenButton");

const popoutButton =
document.getElementById("popoutButton");

const copyLink =
document.getElementById("copyLink");

const menuButton =
document.getElementById("menuButton");

/* =========================================================
BASIC SETTINGS
========================================================= */

/*
Set the Owncast link automatically.
*/

openOwncast.href =
OWNCAST_URL;

/*
Set the current year automatically.
*/

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
: "OWNCAST";

statusDot.classList.toggle(
"live",
live
);

}

/* =========================================================
OWNCAST VIDEO PLAYER
========================================================= */

/*
The player is allowed to start only once.

This prevents multiple iframe reloads
when the user clicks the play button
more than once.
*/

let playerStarted =
false;

function startPlayer() {

/*
Stop if the player was already started.
*/

if (playerStarted) {


return;


}

/*
Mark the player as started BEFORE
loading the iframe.


 This protects against double clicks.


*/

playerStarted =
true;

/*
Load the Owncast video embed.


 The iframe is loaded exactly once.


*/

iframe.src =
VIDEO_EMBED_URL;

/*
Hide the custom play overlay.
*/

playButton.classList.add(
"is-hidden"
);

/*
Update the stream status.
*/

setStatus(


"Stream loading",

"Connecting to Owncast…",

true


);

}

/*
Start the stream.

The event listener itself can only
run once.
*/

playButton.addEventListener(

"click",

startPlayer,

{
once: true
}

);

/* =========================================================
PLAYER LOADED
========================================================= */

iframe.addEventListener(

"load",

() => {


setStatus(

  "Player connected",

  "Owncast video is ready",

  true

);


}

);

/* =========================================================
FULLSCREEN
========================================================= */

fullscreenButton.addEventListener(

"click",

() => {


const frame =
  document.getElementById(
    "playerFrame"
  );


if (frame.requestFullscreen) {

  frame.requestFullscreen();

}


}

);

/* =========================================================
OPEN OWNCAST PLAYER
========================================================= */

popoutButton.addEventListener(

"click",

() => {


window.open(

  OWNCAST_URL,

  "_blank",

  "noopener"

);


}

);

/* =========================================================
COPY WEBSITE LINK
========================================================= */

copyLink.addEventListener(

"click",

async () => {


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


}

);

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
