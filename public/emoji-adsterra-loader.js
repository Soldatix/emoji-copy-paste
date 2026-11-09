/* Emoji Copy & Paste — original Adsterra GET CODE for the approved hostname.
 * Script tags are server-rendered at the top of <body>, outside the client
 * emoji interface, to support parser-time execution without React rerenders.
 * Only the relevant viewport format is requested after prior advertising consent.
 * No preview requests, no auto-refresh/retry, and no advertising offline.
 * The parser-time document.write technique is used in Apps & Games web pilots;
 * it has not received independent provider approval.
 */
(() => {
  "use strict";
  if (location.hostname !== "emoji.appsandgames.org") return;
  if (document.readyState !== "loading") return;
  if (navigator.onLine === false) return;

  const current = document.currentScript;
  const slot = current?.parentElement;
  const area = slot?.parentElement;
  const unit = current?.dataset.unit;
  if (!slot?.classList.contains("emoji-ad-unit") || area?.id !== "emoji-ad-area") return;

  const desktop = matchMedia("(min-width: 800px)").matches;
  const mobile = matchMedia("(min-width: 320px) and (max-width: 799px)").matches;
  if (!((desktop && unit === "desktop") || (mobile && unit === "mobile"))) return;

  let allowed = false;
  try {
    const cookie = document.cookie.split(";").map(s => s.trim())
      .find(s => s.startsWith("ag_privacy_choices_v1="));
    const choice = cookie && JSON.parse(decodeURIComponent(
      cookie.slice("ag_privacy_choices_v1=".length)));
    const age = choice && Date.now() - choice.timestamp;
    allowed = !!choice && choice.version === 1 &&
      choice.partnerRevision === "adsterra-2026-11" &&
      choice.advertising === true && Number.isFinite(age) &&
      age >= 0 && age <= 180 * 24 * 60 * 60 * 1000;
  } catch (_) { allowed = false; }
  if (!allowed) return;

  const snippets = {
    desktop: "<script>\n  atOptions = {\n    'key' : 'a938e870666b71d12b5a38aefca6480a',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/a938e870666b71d12b5a38aefca6480a\"></script>",
    mobile: "<script>\n  atOptions = {\n    'key' : 'ff9d2632207ad91e50fbc4ceec640cf1',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/ff9d2632207ad91e50fbc4ceec640cf1\"></script>"
  };
  area.hidden = false;
  slot.hidden = false;
  const label = document.createElement("span");
  label.className = "emoji-ad-label";
  label.textContent = "Advertisement";
  slot.insertBefore(label, current);
  document.write(snippets[unit]);
})();
