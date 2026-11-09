"use client";

import { useEffect } from "react";

/**
 * Load the shared first-party privacy choices only after React hydration.
 * This avoids the privacy script appending a button to React-owned HTML while
 * the Emoji app itself is hydrating. The ad loader independently checks the
 * already-stored shared cookie at parser time.
 */
export function PrivacyControls() {
  useEffect(() => {
    if (document.getElementById("emoji-shared-privacy-script")) return;
    const script = document.createElement("script");
    script.id = "emoji-shared-privacy-script";
    script.src = "https://appsandgames.org/privacy-choice.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return <footer className="footer-links emoji-privacy-footer" aria-label="Privacy choices" />;
}
