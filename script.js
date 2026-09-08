/* =================================
   n0w or neVer
   WEBSITE SCRIPT
================================= */


/* ---------- CURRENT YEAR ---------- */

document.addEventListener("DOMContentLoaded", function () {

    const footer = document.querySelector("footer div:last-child");

    if (footer) {

        const currentYear = new Date().getFullYear();

        footer.textContent =
            "© " + currentYear + " n0w or neVer";

    }

});


/* =================================
   LIVE STATUS
================================= */

/*

Later this section can be connected
to PeerTube.

Example:

STREAM ONLINE

OBS
 ↓
PeerTube
 ↓
Website

The script can automatically change:

STREAM OFFLINE
        ↓
STREAM LIVE

and also update:

- Stream title
- Viewer count
- Game category

*/


/* =================================
   SMOOTH NAVIGATION
================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }

    });

});
