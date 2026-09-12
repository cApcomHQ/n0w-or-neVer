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
   This must match the domain where the website runs.
*/

const TWITCH_PARENT =
  "capcomhq.github.io";


/* =========================================================
   ELEMENTS
========================================================= */

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

const toast =
  document.getElementById("toast");

const openTwitch =
  document.getElementById("openTwitch");

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
   TWITCH CHAT
========================================================= */

twitchChat.src =
  `https://www.twitch.tv/embed/${TWITCH_CHANNEL}/chat?parent=${TWITCH_PARENT}&darkpopout`;


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


  headerStatusDot.classList.toggle(
    "offline",
    !live
  );


  chatLiveDot.classList.toggle(
    "offline",
    !live
  );

}


/* =========================================================
   TWITCH PLAYER
========================================================= */

let twitchEmbed =
  null;

let twitchPlayer =
  null;


/*
   Wait until the Twitch Embed API is available.
*/

function initializeTwitch() {

  if (
    !window.Twitch ||
    !Twitch.Embed
  ) {

    setTimeout(
      initializeTwitch,
      100
    );

    return;

  }


  setStatus(
    "Twitch channel",
    "Loading official Twitch player…",
    false
  );


  twitchEmbed =
    new Twitch.Embed(
      "twitchPlayer",
      {

        width:
          1280,

        height:
          720,

        channel:
          TWITCH_CHANNEL,

        parent:
          [
            TWITCH_PARENT
          ],

        layout:
          "video",

        autoplay:
          false,

        muted:
          false,

        allowfullscreen:
          true,

        theme:
          "dark"

      }
    );


  /*
     Player is ready.
  */

  twitchEmbed.addEventListener(
    Twitch.Embed.VIDEO_READY,
    () => {

      twitchPlayer =
        twitchEmbed.getPlayer();


      setStatus(
        "Twitch ready",
        "Press play to watch the stream",
        false
      );


      initializePlayerEvents();

    }
  );


  /*
     Stream playback started.
  */

  twitchEmbed.addEventListener(
    Twitch.Embed.VIDEO_PLAY,
    () => {

      setStatus(
        "LIVE",
        "n0w or neVer · cApcom",
        true
      );

    }
  );

}


/* =========================================================
   TWITCH PLAYER EVENTS
========================================================= */

function initializePlayerEvents() {

  if (!twitchPlayer) {
    return;
  }


  /*
     Channel online.
  */

  twitchPlayer.addEventListener(
    Twitch.Player.ONLINE,
    () => {

      setStatus(
        "LIVE",
        "cApcom is currently live on Twitch",
        true
      );

    }
  );


  /*
     Channel offline.
  */

  twitchPlayer.addEventListener(
    Twitch.Player.OFFLINE,
    () => {

      setStatus(
        "Channel offline",
        "Follow cApcom on Twitch for the next stream",
        false
      );

    }
  );


  /*
     Video is playing.
  */

  twitchPlayer.addEventListener(
    Twitch.Player.PLAYING,
    () => {

      setStatus(
        "LIVE",
        "n0w or neVer · cApcom",
        true
      );

    }
  );


  /*
     Playback paused.
  */

  twitchPlayer.addEventListener(
    Twitch.Player.PAUSE,
    () => {

      if (
        twitchPlayer.getEnded &&
        twitchPlayer.getEnded()
      ) {

        return;

      }


      setStatus(
        "Twitch ready",
        "Stream playback paused",
        false
      );

    }
  );

}


/* =========================================================
   START TWITCH
========================================================= */

initializeTwitch();


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
