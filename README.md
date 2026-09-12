# n0w or neVer — Official Twitch Website

## Branding
- Clan: n0w or neVer
- Creator / owner: cApcom
- Official logo: logo.png
- Discord: https://discord.gg/TmPJpB9x
- Twitch: https://www.twitch.tv/capcomhq

## Twitch embeds used
- Video player: https://player.twitch.tv/?channel=capcomhq&parent=capcomhq.github.io
- Live chat (read-only): https://www.twitch.tv/embed/capcomhq/chat?parent=capcomhq.github.io

Both embeds are plain iframes (no Twitch.Embed JS API), built and inserted by script.js. The video iframe fills 100% width and height of its 16:9 frame via CSS. Twitch shows its own "channel offline" screen inside the player automatically when cApcom isn't live — no custom logic needed for that.

### Channel / domain settings
Both `TWITCH_CHANNEL` and `TWITCH_PARENT` are set at the top of script.js:
- `TWITCH_CHANNEL` — the Twitch channel name (currently `capcomhq`).
- `TWITCH_PARENT` — must exactly match the hostname the site is served from (e.g. `capcomhq.github.io`), no `https://`, no path, no trailing slash. If either the channel or the domain ever changes, update both values there.

## GitHub Pages deployment
1. Open your repository.
2. Upload index.html, style.css, script.js and logo.png to the repository root.
3. Commit the changes.
4. In repository Settings > Pages, select Deploy from a branch.
5. Select branch main and folder /(root).
6. Save and wait for GitHub Pages to publish.

## Important
- If you deploy to a new domain or a different GitHub Pages URL, update `TWITCH_PARENT` in script.js first — otherwise Twitch will refuse to load the player/chat there.
- Live status isn't tracked automatically anymore (a plain iframe can't report that back to the page). Twitch's own offline screen inside the player is the source of truth for whether cApcom is live.
