import { useState } from "react";
import { Highlight, Prism, type PrismTheme } from "prism-react-renderer";
import { IconCheck } from "@/components/ui/icons";

// В prism-react-renderer нет CSS-грамматики — добавляем минимальную.
const P = Prism as unknown as { languages: Record<string, unknown> };
P.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: { pattern: /@[\w-]+[^;{]*/, inside: { keyword: /@[\w-]+/, string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/ } },
  selector: { pattern: /(^|[{};\s])[^{};@]+?(?=\s*\{)/, lookbehind: true },
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
  property: { pattern: /(^|[^-\w])--?[\w-]+(?=\s*:)/, lookbehind: true },
  important: /!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  hexcolor: { pattern: /#[\da-f]{3,8}\b/i, alias: "number" },
  number: /-?\b\d*\.?\d+(?:px|%|em|rem|s|ms|deg|vh|vw|fr)?\b/,
  punctuation: /[(){};:,]/,
};

const theme: PrismTheme = {
  plain: { color: "#1f2937", backgroundColor: "transparent" },
  styles: [
    { types: ["comment"], style: { color: "#99a1af", fontStyle: "italic" } },
    { types: ["keyword", "atrule", "important"], style: { color: "#8e51ff" } },
    { types: ["string", "attr-value"], style: { color: "#00a63e" } },
    { types: ["tag", "selector", "class-name"], style: { color: "#155dfc" } },
    { types: ["function", "maybe-class-name"], style: { color: "#1447e6" } },
    { types: ["attr-name", "property"], style: { color: "#bb4d00" } },
    { types: ["number", "boolean", "constant", "hexcolor"], style: { color: "#c10007" } },
    { types: ["punctuation", "operator"], style: { color: "#6a7282" } },
  ],
};

export function CopyButton({ text, label, className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button type="button" className={["docs-copy", copied && "docs-copy--done", className].filter(Boolean).join(" ")} onClick={copy}>
      {copied ? <IconCheck size={14} strokeWidth={2.5} /> : <CopyIcon />}
      {label && <span>{copied ? "Скопировано" : label}</span>}
      {!label && <span className="docs-sr">{copied ? "Скопировано" : "Копировать"}</span>}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function CodeBlock({
  code,
  language = "tsx",
  title,
  maxHeight,
  copyable = true,
}: {
  code: string;
  language?: string;
  title?: string;
  maxHeight?: number;
  copyable?: boolean;
}) {
  return (
    <div className="docs-code">
      {title && (
        <div className="docs-code__title">
          <span>{title}</span>
        </div>
      )}
      {copyable && <CopyButton text={code} className="docs-code__copy" />}
      <Highlight code={code} language={language} theme={theme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="docs-code__pre" style={{ maxHeight }}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, j) => (
                    <span key={j} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

/** Несколько файлов во вкладках — для блока «Установка» */
export function FileTabs({ files }: { files: { name: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  const file = files[active];
  const lang = file.name.endsWith(".css") ? "css" : "tsx";
  return (
    <div className="docs-files">
      <div className="docs-files__bar">
        <div className="docs-files__tabs" role="tablist">
          {files.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? "docs-files__tab docs-files__tab--active" : "docs-files__tab"}
              onClick={() => setActive(i)}
            >
              {f.name}
            </button>
          ))}
        </div>
        <CopyButton text={file.code} label="Копировать" />
      </div>
      <CodeBlock code={file.code} language={lang} copyable={false} maxHeight={480} />
    </div>
  );
}
