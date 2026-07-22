import { useEffect, useRef, useState } from "react";
import data from "../content/portfolio.json";

const BANNER = [
  "welcome. type 'help' — everything else is discretion.",
  "",
];

function runCommand(raw) {
  const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);

  switch (cmd) {
    case "":
      return [];
    case "help":
      return [
        "available commands:",
        "  whoami       who is this guy?",
        "  cv           download the latest CV (freshly compiled from LaTeX)",
        "  skills       list the toolbox",
        "  projects     things I'm proud of",
        "  journey      india → germany speedrun",
        "  german       language learning progress",
        "  chai         ☕ essential infrastructure",
        "  sudo hire-me you know you want to",
        "  clear        clean the screen",
        "  exit         close terminal",
      ];
    case "whoami":
      return [
        `${data.name} — ${data.role}`,
        data.summary,
      ];
    case "cv":
      window.open(data.cvEn, "_blank");
      return ["ok: opening CV… compiled from LaTeX by GitHub Actions, always fresh."];
    case "skills":
      return Object.entries(data.skills).map(
        ([group, items]) => `  ${group}: ${items.join(", ")}`
      );
    case "projects":
      return data.projects.flatMap((p) => [
        `▸ ${p.title} (${p.period})`,
        `  ${p.pitch}`,
      ]);
    case "journey":
      return data.journey.map(
        (s) => `  ${s.year}  ${s.place} — ${s.title} @ ${s.org}`
      );
    case "german":
      return [
        `  level: ${data.german.current} → grinding toward ${
          data.german.levels[data.german.levels.indexOf(data.german.current) + 1]
        }`,
        `  ${data.german.note}`,
      ];
    case "chai":
      return [
        "  ( (",
        "   ) )",
        " ........",
        " |      |]",
        " \\      /",
        "  `----'",
        "ok: chai brewed. productivity +∞%.",
      ];
    case "sudo":
      if (args.join(" ") === "hire-me" || args.join(" ") === "hire me") {
        window.location.href = `mailto:${data.email}?subject=Let's talk!`;
        return ["ok: permission granted. opening mail client…"];
      }
      return [`sudo: ${args.join(" ")}: command not found. try 'sudo hire-me'`];
    case "hire-me":
    case "hire":
      return ["permission denied. try: sudo hire-me"];
    case "rm":
      return ["nice try. I *modernize* legacy systems, I don't delete them."];
    case "konami":
      return ["↑ ↑ ↓ ↓ ← → ← → B A — but you didn't hear it from me."];
    default:
      return [`command not found: ${cmd}. type 'help'`];
  }
}

export default function Terminal({ onFirstOpen }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(BANNER);
  const [input, setInput] = useState("");
  const openedOnce = useRef(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (
        (e.key === "~" || e.key === "`") &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA"
      ) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      if (!openedOnce.current) {
        openedOnce.current = true;
        onFirstOpen?.();
      }
    }
  }, [open, onFirstOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const cmd = input;
    setInput("");
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    if (cmd.trim().toLowerCase() === "exit") {
      setOpen(false);
      setLines(BANNER);
      return;
    }
    setLines((prev) => [
      ...prev,
      { text: `visitor@darshan:~$ ${cmd}`, type: "cmd" },
      ...runCommand(cmd).map((text) => ({ text, type: "out" })),
    ]);
  };

  return (
    <div className="term-overlay" onClick={() => setOpen(false)}>
      <div
        className="term-window"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        role="dialog"
        aria-label="Interactive terminal"
      >
        <div className="term-bar">
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="term-title">visitor@darshan — ~</span>
          <button className="term-close" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className="term-body" ref={bodyRef}>
          {lines.map((line, i) => {
            const text = typeof line === "string" ? line : line.text;
            const type = typeof line === "string" ? "out" : line.type;
            return (
              <div
                key={i}
                className={`term-line ${type === "cmd" ? "term-line--cmd" : ""}`}
              >
                {text}
              </div>
            );
          })}
        </div>
        <form className="term-input-row" onSubmit={submit}>
          <span className="term-prompt">visitor@darshan:~$</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
