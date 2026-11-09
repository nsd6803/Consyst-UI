import { useState } from "react";
import * as Icons from "@/components/ui/icons";
import { H2, PageHeader } from "./pages";
import { CodeBlock } from "./code";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
    window.setTimeout(() => setCopied((c) => (c === text ? null : c)), 1400);
  };
  return { copied, copy };
}

/* ------------------------------------------------------------------ */
/* Цвета                                                               */
/* ------------------------------------------------------------------ */

const semantic: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Accents",
    items: [
      ["primary", "--color-accent-primary", "blue / 600"],
      ["secondary", "--color-accent-secondary", "violet / 500"],
      ["success", "--color-accent-success", "green / 600"],
      ["warning", "--color-accent-warning", "orange / 400"],
      ["error", "--color-accent-error", "red / 600"],
      ["info", "--color-accent-info", "blue / 400"],
    ],
  },
  {
    group: "Background",
    items: [
      ["primary", "--color-bg-primary", "base / white"],
      ["primary-alpha-50", "--color-bg-primary-alpha-50", "white 50%"],
      ["secondary", "--color-bg-secondary", "base / white-secondary"],
      ["muted", "--color-bg-muted", "base / stroke"],
      ["neutral", "--color-bg-neutral", "base / gray"],
      ["inverse", "--color-bg-inverse", "base / black"],
      ["primary-subtle", "--color-bg-primary-subtle", "blue / 600 15%"],
      ["success-subtle", "--color-bg-success-subtle", "green / 500 15%"],
      ["warning-subtle", "--color-bg-warning-subtle", "orange / 400 15%"],
      ["error-subtle", "--color-bg-error-subtle", "red / 500 15%"],
      ["info-subtle", "--color-bg-info-subtle", "blue / 500 15%"],
    ],
  },
  {
    group: "Text, icon & border",
    items: [
      ["text-primary", "--color-text-primary", "base / black"],
      ["text-secondary", "--color-text-secondary", "base / gray"],
      ["text-inverse", "--color-text-inverse", "base / white"],
      ["icon-secondary", "--color-icon-secondary", "base / gray"],
      ["border-default", "--color-border-default", "base / stroke"],
      ["border-strong", "--color-border-strong", "slate / 200"],
      ["border-emphasis", "--color-border-emphasis", "base / gray"],
    ],
  },
];

const primitives: { name: string; shades: [string, string][] }[] = [
  { name: "gray", shades: [["100", "#f3f4f6"], ["200", "#e5e7eb"], ["300", "#d1d5dc"], ["400", "#99a1af"], ["500", "#6a7282"], ["600", "#4a5565"], ["700", "#364153"]] },
  { name: "blue", shades: [["100", "#dbeafe"], ["400", "#51a2ff"], ["500", "#2b7fff"], ["600", "#155dfc"], ["700", "#1447e6"]] },
  { name: "green", shades: [["200", "#b9f8cf"], ["300", "#7bf1a8"], ["500", "#00c951"], ["600", "#00a63e"], ["700", "#008236"]] },
  { name: "red", shades: [["200", "#ffc9c9"], ["300", "#ffa2a2"], ["500", "#fb2c36"], ["600", "#e7000b"], ["700", "#c10007"]] },
  { name: "orange", shades: [["200", "#ffd6a8"], ["300", "#ffb86a"], ["400", "#ff8904"], ["700", "#ca3500"]] },
  { name: "amber", shades: [["500", "#fd9a00"], ["600", "#e17100"], ["700", "#bb4d00"]] },
];

export function ColorsPage() {
  const { copied, copy } = useCopy();
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Цвета"
        description="Семантические цвета привязаны к смыслу и контексту использования. Используйте их, а не примитивы. Клик по цвету копирует переменную."
        figma="12596:476"
      />
      {semantic.map((g) => (
        <section key={g.group}>
          <H2>{g.group}</H2>
          <div className="docs-swatches">
            {g.items.map(([name, v, ref]) => (
              <button key={v} type="button" className="docs-swatch" onClick={() => copy(`var(${v})`)}>
                <span className="docs-swatch__color" style={{ background: `var(${v})` }} />
                <span className="docs-swatch__name">{name}</span>
                <span className="docs-swatch__var">{copied === `var(${v})` ? "Скопировано ✓" : v}</span>
                <span className="docs-swatch__ref">{ref}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
      <H2>Примитивы</H2>
      <p className="docs-p">Базовая палитра, на которой построены семантические цвета.</p>
      <div className="docs-palette">
        {primitives.map((p) => (
          <div key={p.name} className="docs-palette__row">
            <span className="docs-palette__name">{p.name}</span>
            <div className="docs-palette__shades">
              {p.shades.map(([s, hex]) => (
                <button key={s} type="button" className="docs-palette__shade" onClick={() => copy(`var(--color-${p.name}-${s})`)}>
                  <span style={{ background: hex }} />
                  <b>{s}</b>
                  <small>{copied === `var(--color-${p.name}-${s})` ? "✓" : hex}</small>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Типографика                                                         */
/* ------------------------------------------------------------------ */

const titles: [string, number, number][] = [
  ["xl", 44, 60],
  ["lg", 40, 56],
  ["md", 32, 46],
  ["sm", 30, 42],
  ["xs", 24, 32],
];
const bodies: [string, number, number][] = [
  ["xl", 20, 32],
  ["lg", 18, 28],
  ["md", 16, 24],
  ["sm", 14, 21],
  ["xs", 12, 18],
];

export function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Типографика"
        description="Заголовки набираются шрифтом Rosatom (Light, Regular, Bold), основной текст — Inter (Light, Regular, Medium, Bold)."
        figma="12606:16"
      />
      <H2>Title — Rosatom</H2>
      <div className="docs-type">
        {titles.map(([n, size, lh]) => (
          <div key={n} className="docs-type__row">
            <div className="docs-type__meta">
              <b>title/{n}</b>
              <span>
                {size} / {lh}
              </span>
            </div>
            <div className="docs-type__samples" style={{ fontFamily: "var(--font-title)", fontSize: size, lineHeight: `${lh}px` }}>
              <span style={{ fontWeight: 700 }}>Bold</span>
              <span style={{ fontWeight: 400 }}>Regular</span>
              <span style={{ fontWeight: 300 }}>Light</span>
            </div>
          </div>
        ))}
      </div>
      <H2>Body — Inter</H2>
      <div className="docs-type">
        {bodies.map(([n, size, lh]) => (
          <div key={n} className="docs-type__row">
            <div className="docs-type__meta">
              <b>body/{n}</b>
              <span>
                {size} / {lh}
              </span>
            </div>
            <div className="docs-type__samples" style={{ fontFamily: "var(--font-body)", fontSize: size, lineHeight: `${lh}px` }}>
              <span style={{ fontWeight: 700 }}>Bold</span>
              <span style={{ fontWeight: 500 }}>Medium</span>
              <span style={{ fontWeight: 400 }}>Regular</span>
              <span style={{ fontWeight: 300 }}>Light</span>
            </div>
          </div>
        ))}
      </div>
      <H2>Использование</H2>
      <CodeBlock
        language="css"
        code={`.page-title {
  font-family: var(--font-title);
  font-size: 44px;
  font-weight: 700;
  line-height: 60px;
}

.text {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 21px;
}`}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Отступы и радиусы                                                   */
/* ------------------------------------------------------------------ */

const gaps: [string, number][] = [
  ["0", 0], ["0-5", 2], ["1", 4], ["1-5", 6], ["2", 8], ["3", 12], ["4", 16], ["6", 24], ["8", 32], ["12", 48],
];
const radii: [string, number][] = [
  ["none", 0], ["xs", 2], ["sm", 4], ["md", 6], ["lg", 8], ["xl", 12], ["2xl", 16], ["3xl", 24], ["4xl", 32], ["full", 9999],
];

export function SpacingPage() {
  const { copied, copy } = useCopy();
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Отступы и радиусы"
        description="Шкала отступов (gap) используется для padding, margin и gap. Радиусы скругления — для карточек, кнопок и полей."
        figma="12606:1050"
      />
      <H2>Spacing</H2>
      <div className="docs-spacing">
        {gaps.map(([n, px]) => (
          <button key={n} type="button" className="docs-spacing__row" onClick={() => copy(`var(--gap-${n})`)}>
            <code className="docs-inline-code">--gap-{n}</code>
            <span className="docs-spacing__px">{copied === `var(--gap-${n})` ? "✓" : `${px}px`}</span>
            <span className="docs-spacing__bar" style={{ width: Math.max(px * 4, 2) }} />
          </button>
        ))}
      </div>
      <H2>Radius</H2>
      <div className="docs-radii">
        {radii.map(([n, px]) => (
          <button key={n} type="button" className="docs-radius" onClick={() => copy(`var(--radius-${n})`)}>
            <span className="docs-radius__box" style={{ borderRadius: px }} />
            <b>{n}</b>
            <small>{copied === `var(--radius-${n})` ? "Скопировано" : px === 9999 ? "9999px" : `${px}px`}</small>
          </button>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Тени                                                                */
/* ------------------------------------------------------------------ */

export function EffectsPage() {
  const { copied, copy } = useCopy();
  const shadows = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "inner"];
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Тени"
        description="Тени задают глубину. shadow-sm — основная тень карточек, выпадающих меню и уведомлений."
        figma="12611:1566"
      />
      <H2>Shadow</H2>
      <div className="docs-radii">
        {shadows.map((s) => (
          <button key={s} type="button" className="docs-radius" onClick={() => copy(`var(--shadow-${s})`)}>
            <span className="docs-radius__box docs-radius__box--shadow" style={{ boxShadow: `var(--shadow-${s})` }} />
            <b>{s}</b>
            <small>{copied === `var(--shadow-${s})` ? "Скопировано" : `--shadow-${s}`}</small>
          </button>
        ))}
      </div>
      <H2>Disabled opacity</H2>
      <p className="docs-p">
        Неактивные элементы получают <code className="docs-inline-code">opacity: var(--opacity-disabled)</code> — 40%.
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Иконки                                                              */
/* ------------------------------------------------------------------ */

export function IconsPage() {
  const { copied, copy } = useCopy();
  const list = Object.entries(Icons).filter(([n]) => n.startsWith("Icon")) as [string, (p: Icons.IconProps) => JSX.Element][];
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Иконки"
        description="Набор outline-иконок в icons.tsx. Цвет наследуется через currentColor, размер — проп size. Клик копирует JSX."
      />
      <div className="docs-icons">
        {list.map(([name, Icon]) => (
          <button key={name} type="button" className="docs-icon" onClick={() => copy(`<${name} />`)}>
            <Icon size={20} />
            <span>{copied === `<${name} />` ? "Скопировано" : name.replace("Icon", "")}</span>
          </button>
        ))}
      </div>
      <H2>Использование</H2>
      <CodeBlock
        code={`import { IconSearch } from "@/components/ui/icons";

<IconSearch size={16} color="var(--color-accent-primary)" />`}
      />
      <p className="docs-p">
        В Figma иконки взяты из Font Awesome Pro. Если в проекте есть лицензия — можно заменить содержимое icons.tsx на
        иконки Font Awesome, сохранив имена экспортов.
      </p>
    </>
  );
}
