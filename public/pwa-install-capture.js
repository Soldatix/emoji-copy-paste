(function () {
  if (new URLSearchParams(window.location.search).get("install") !== "web") {
    return;
  }

  window.__emojiInstallPrompt = window.__emojiInstallPrompt || null;

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    window.__emojiInstallPrompt = event;
    window.dispatchEvent(new Event("emoji-install-prompt-ready"));
  });

  window.addEventListener("appinstalled", function () {
    window.__emojiInstallPrompt = null;
  });
})();
