/* =========================================================
   OWNCAST SETTINGS
========================================================= */

const OWNCAST_URL =
  "https://nowornever.ddnss.eu";

const HLS_URL =
  `${OWNCAST_URL}/hls/0/stream.m3u8`;


/* =========================================================
   ELEMENTS
========================================================= */

const video =
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

const playerFrame =
  document.getElementById("playerFrame");


/* =========================================================
   BASIC SETTINGS
========================================================= */

openOwncast.href =
  OWNCAST_URL;

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
   HLS PLAYER
========================================================= */

let playerStarted =
  false;

let hls =
  null;


function startPlayer() {

  if (playerStarted) {
    return;
  }

  playerStarted =
    true;


  setStatus(
    "Stream loading",
    "Connecting to live stream…",
    true
  );


  /*
     Hide custom play overlay.
  */

  playButton.classList.add(
    "is-hidden"
  );


  /*
     HLS.js supported browsers
     such as Chrome, Firefox and Edge.
  */

  if (
    window.Hls &&
    Hls.isSupported()
  ) {

    hls =
      new Hls({

        enableWorker: true,

        lowLatencyMode: true,

        backBufferLength: 30

      });


    hls.loadSource(
      HLS_URL
    );


    hls.attachMedia(
      video
    );


    /*
       HLS manifest loaded.
    */

    hls.on(
      Hls.Events.MANIFEST_PARSED,
      () => {

        setStatus(
          "Stream ready",
          "Live stream connected",
          true
        );


        video.play()
          .then(() => {

            setStatus(
              "LIVE",
              "n0w or neVer · cApcom",
              true
            );

          })
          .catch(() => {

            setStatus(
              "Stream ready",
              "Press play to start the stream",
              true
            );

            playButton.classList.remove(
              "is-hidden"
            );

          });

      }
    );


    /*
       HLS errors.
    */

    hls.on(
      Hls.Events.ERROR,
      (
        event,
        data
      ) => {

        console.warn(
          "HLS error:",
          data
        );


        if (
          data.fatal
        ) {

          switch (
            data.type
          ) {

            case Hls.ErrorTypes.NETWORK_ERROR:

              setStatus(
                "Connection lost",
                "Trying to reconnect…",
                true
              );

              hls.startLoad();

              break;


            case Hls.ErrorTypes.MEDIA_ERROR:

              setStatus(
                "Player recovering",
                "Restarting video playback…",
                true
              );

              hls.recoverMediaError();

              break;


            default:

              setStatus(
                "Stream unavailable",
                "Please try again in a moment",
                false
              );

              hls.destroy();

              hls = null;

              playerStarted =
                false;

              playButton.classList.remove(
                "is-hidden"
              );

              break;

          }

        }

      }
    );

    return;

  }


  /*
     Native HLS support.
     Used by browsers such as Safari.
  */

  if (
    video.canPlayType(
      "application/vnd.apple.mpegurl"
    )
  ) {

    video.src =
      HLS_URL;


    video.addEventListener(
      "loadedmetadata",
      () => {

        setStatus(
          "Stream ready",
          "Live stream connected",
          true
        );


        video.play()
          .then(() => {

            setStatus(
              "LIVE",
              "n0w or neVer · cApcom",
              true
            );

          })
          .catch(() => {

            setStatus(
              "Stream ready",
              "Press play to start the stream",
              true
            );

            playButton.classList.remove(
              "is-hidden"
            );

          });

      },
      {
        once: true
      }
    );


    return;

  }


  /*
     Browser does not support HLS.
  */

  setStatus(
    "HLS not supported",
    "Your browser cannot play this stream",
    false
  );

  playButton.classList.remove(
    "is-hidden"
  );

}


/* =========================================================
   VIDEO EVENTS
========================================================= */

video.addEventListener(
  "playing",
  () => {

    setStatus(
      "LIVE",
      "n0w or neVer · cApcom",
      true
    );

  }
);


video.addEventListener(
  "waiting",
  () => {

    setStatus(
      "Buffering",
      "Waiting for live stream data…",
      true
    );

  }
);


video.addEventListener(
  "error",
  () => {

    setStatus(
      "Playback error",
      "The live stream could not be played",
      false
    );

  }
);


/* =========================================================
   START PLAYER
========================================================= */

playButton.addEventListener(
  "click",
  startPlayer
);


/* =========================================================
   FULLSCREEN
========================================================= */

fullscreenButton.addEventListener(
  "click",
  () => {

    if (
      playerFrame.requestFullscreen
    ) {

      playerFrame.requestFullscreen();

    }

  }
);


/* =========================================================
   OPEN OWNCAST
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
