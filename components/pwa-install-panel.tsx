"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/emoji-data";

type InstallState =
  | "waiting"
  | "ready"
  | "installing"
  | "installed"
  | "dismissed"
  | "unavailable";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
};

type NavigatorWithStandalone = Navigator & { standalone?: boolean };

type WindowWithInstallPrompt = Window & {
  __emojiInstallPrompt?: InstallPromptEvent | null;
};

const installUi = {
  en: {
    title: "Install Emoji Copy & Paste",
    description: "Install the web app for quick access and offline use. No traditional installer or Apps & Games account is required.",
    waiting: "Checking whether this browser can install the app…",
    ready: "This browser can install Emoji Copy & Paste.",
    installing: "Installation requested. Complete the browser prompt.",
    installed: "Emoji Copy & Paste is installed on this device.",
    dismissed: "Installation was cancelled. Reopen this install page to try again.",
    unavailable: "Automatic installation is not available in this browser. You can continue in the browser and use its Add to Home Screen or Install App option when available.",
    install: "Install Web App",
    continue: "Continue in browser",
  },
  hr: {
    title: "Instaliraj Emoji Copy & Paste",
    description: "Instalirajte web-aplikaciju za brži pristup i rad izvan mreže. Nije potreban klasični instalacijski program ni Apps & Games račun.",
    waiting: "Provjerava se podržava li ovaj preglednik instalaciju…",
    ready: "Ovaj preglednik može instalirati Emoji Copy & Paste.",
    installing: "Instalacija je zatražena. Dovršite postupak u poruci preglednika.",
    installed: "Emoji Copy & Paste je instaliran na ovom uređaju.",
    dismissed: "Instalacija je otkazana. Za novi pokušaj ponovno otvorite ovu stranicu za instalaciju.",
    unavailable: "Automatska instalacija nije dostupna u ovom pregledniku. Aplikaciju možete nastaviti koristiti u pregledniku i, kada je dostupno, upotrijebiti opciju Dodaj na početni zaslon ili Instaliraj aplikaciju.",
    install: "Instaliraj Web App",
    continue: "Nastavi u pregledniku",
  },
  de: {
    title: "Emoji Copy & Paste installieren",
    description: "Installiere die Web-App für schnellen Zugriff und Offline-Nutzung. Ein klassisches Installationsprogramm oder Apps-&-Games-Konto ist nicht erforderlich.",
    waiting: "Es wird geprüft, ob dieser Browser die Installation unterstützt…",
    ready: "Dieser Browser kann Emoji Copy & Paste installieren.",
    installing: "Installation angefordert. Schließe die Browser-Abfrage ab.",
    installed: "Emoji Copy & Paste ist auf diesem Gerät installiert.",
    dismissed: "Die Installation wurde abgebrochen. Öffne diese Installationsseite erneut, um es noch einmal zu versuchen.",
    unavailable: "Die automatische Installation ist in diesem Browser nicht verfügbar. Du kannst die App im Browser weiterverwenden und, sofern verfügbar, Zum Startbildschirm hinzufügen oder App installieren verwenden.",
    install: "Web-App installieren",
    continue: "Im Browser fortfahren",
  },
  it: {
    title: "Installa Emoji Copy & Paste",
    description: "Installa la Web App per un accesso rapido e l'uso offline. Non servono un programma di installazione tradizionale né un account Apps & Games.",
    waiting: "Verifica della possibilità di installare l'app in questo browser…",
    ready: "Questo browser può installare Emoji Copy & Paste.",
    installing: "Installazione richiesta. Completa la richiesta del browser.",
    installed: "Emoji Copy & Paste è installata su questo dispositivo.",
    dismissed: "L'installazione è stata annullata. Riapri questa pagina di installazione per riprovare.",
    unavailable: "L'installazione automatica non è disponibile in questo browser. Puoi continuare a usare l'app nel browser e, quando disponibile, scegliere Aggiungi alla schermata Home o Installa app.",
    install: "Installa Web App",
    continue: "Continua nel browser",
  },
  es: {
    title: "Instalar Emoji Copy & Paste",
    description: "Instala la aplicación web para acceder rápidamente y usarla sin conexión. No necesitas un instalador tradicional ni una cuenta de Apps & Games.",
    waiting: "Comprobando si este navegador permite instalar la aplicación…",
    ready: "Este navegador puede instalar Emoji Copy & Paste.",
    installing: "Instalación solicitada. Completa el aviso del navegador.",
    installed: "Emoji Copy & Paste está instalada en este dispositivo.",
    dismissed: "La instalación se canceló. Vuelve a abrir esta página de instalación para intentarlo de nuevo.",
    unavailable: "La instalación automática no está disponible en este navegador. Puedes seguir usando la aplicación en el navegador y, cuando esté disponible, usar Añadir a pantalla de inicio o Instalar aplicación.",
    install: "Instalar Web App",
    continue: "Continuar en el navegador",
  },
} as const;

function isStandalone(media: MediaQueryList) {
  return media.matches || (navigator as NavigatorWithStandalone).standalone === true;
}

export function PwaInstallPanel({ language }: { language: Language }) {
  const [active, setActive] = useState(false);
  const [installState, setInstallState] = useState<InstallState>("waiting");
  const promptRef = useRef<InstallPromptEvent | null>(null);
  const mediaRef = useRef<MediaQueryList | null>(null);
  const activeRef = useRef(false);
  const text = installUi[language] || installUi.en;

  /* Query-string activation and standalone detection are browser-only state. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const installRequested =
      new URLSearchParams(window.location.search).get("install") === "web";
    if (!installRequested) return;

    activeRef.current = true;
    setActive(true);
    const media = window.matchMedia("(display-mode: standalone)");
    mediaRef.current = media;
    const installWindow = window as WindowWithInstallPrompt;

    const markInstalled = () => {
      promptRef.current = null;
      installWindow.__emojiInstallPrompt = null;
      setInstallState("installed");
    };

    const syncCapturedPrompt = () => {
      if (isStandalone(media)) {
        markInstalled();
        return;
      }

      const captured = installWindow.__emojiInstallPrompt;
      if (captured && typeof captured.prompt === "function") {
        promptRef.current = captured;
        setInstallState("ready");
      }
    };

    if (isStandalone(media)) markInstalled();
    else syncCapturedPrompt();

    const handleBeforeInstallPrompt = (event: Event) => {
      if (!activeRef.current) return;
      const installEvent = event as InstallPromptEvent;
      event.preventDefault();

      if (isStandalone(media)) {
        markInstalled();
        return;
      }

      installWindow.__emojiInstallPrompt = installEvent;
      promptRef.current = installEvent;
      setInstallState(
        typeof installEvent.prompt === "function" ? "ready" : "unavailable",
      );
    };

    const handleModeChange = () => {
      if (isStandalone(media)) markInstalled();
    };

    const handleCapturedPrompt = () => {
      if (!activeRef.current) return;
      syncCapturedPrompt();
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );
    window.addEventListener("appinstalled", markInstalled);
    window.addEventListener(
      "emoji-install-prompt-ready",
      handleCapturedPrompt,
    );
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleModeChange);
    } else {
      media.addListener(handleModeChange);
    }

    const timer = window.setTimeout(() => {
      if (!activeRef.current) return;
      setInstallState((current) =>
        current === "waiting" ? "unavailable" : current,
      );
    }, 3000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      window.removeEventListener("appinstalled", markInstalled);
      window.removeEventListener(
        "emoji-install-prompt-ready",
        handleCapturedPrompt,
      );
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", handleModeChange);
      } else {
        media.removeListener(handleModeChange);
      }
      activeRef.current = false;
      promptRef.current = null;
      mediaRef.current = null;
    };
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const install = async () => {
    const media = mediaRef.current;
    if (media && isStandalone(media)) {
      setInstallState("installed");
      return;
    }

    const prompt = promptRef.current;
    if (!prompt || typeof prompt.prompt !== "function") {
      setInstallState("unavailable");
      return;
    }

    setInstallState("installing");
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (media && isStandalone(media)) {
        setInstallState("installed");
      } else if (choice?.outcome === "dismissed") {
        setInstallState("dismissed");
      } else {
        setInstallState("installing");
      }
    } catch {
      setInstallState("unavailable");
    } finally {
      promptRef.current = null;
    }
  };

  const continueInBrowser = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("install");
    window.history.replaceState(window.history.state, "", url);
    activeRef.current = false;
    promptRef.current = null;
    setActive(false);
  };

  if (!active) return null;

  return (
    <section
      className="web-install-shell"
      aria-labelledby="emoji-web-install-title"
      data-install-state={installState}
    >
      <div className="web-install-card">
        <div className="web-install-icon" aria-hidden="true">
          <Download size={24} />
        </div>
        <div className="web-install-copy">
          <h2 id="emoji-web-install-title">{text.title}</h2>
          <p>{text.description}</p>
          <p className="web-install-status" role="status" aria-live="polite">
            {text[installState]}
          </p>
        </div>
        <div className="web-install-actions">
          <Button
            className="web-install-primary"
            onClick={install}
            disabled={installState !== "ready"}
          >
            <Download />
            {text.install}
          </Button>
          <Button variant="outline" onClick={continueInBrowser}>
            {text.continue}
          </Button>
        </div>
      </div>
    </section>
  );
}
