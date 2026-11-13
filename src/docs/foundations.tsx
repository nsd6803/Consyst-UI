import { useState } from "react";
import * as Icons from "@/components/ui/icons";
import { Search } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H2, H3, PageHeader } from "./pages";
import { CodeBlock } from "./code";
import primitives from "@/tokens/primitives.json";
import report from "@/tokens/contrast.json";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
    window.setTimeout(() => setCopied((c) => (c === text ? null : c)), 1400);
  };
  return { copied, copy };
}

type TokenInfo = { light: string; dark: string; lightHex: string; darkHex: string; note: string; group: string };
const tokens = report.tokens as Record<string, TokenInfo>;
const palette = Object.fromEntries(Object.entries(primitives).filter(([k]) => !k.startsWith("$"))) as Record<string, Record<string, string>>;

const Code = ({ children }: { children: React.ReactNode }) => <code className="docs-inline-code">{children}</code>;

/* ------------------------------------------------------------------ */
/* Токены и темы                                                       */
/* ------------------------------------------------------------------ */

export function TokensPage() {
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Токены и темы"
        description="Как устроены переменные дизайн-системы: три слоя, как в Ant Design, и пары «фон/текст», как в shadcn/ui."
      />
      <H2>Три слоя</H2>
      <div className="docs-layers">
        <div className="docs-layer">
          <p className="docs-layer__title">Примитивы</p>
          <p className="docs-p">
            <Code>--blue-600</Code>, <Code>--neutral-500</Code>. Не зависят от смысла. В компонентах <b>не используются</b>.
          </p>
        </div>
        <div className="docs-layer">
          <p className="docs-layer__title">Семантика</p>
          <p className="docs-p">
            <Code>--color-primary</Code>, <Code>--color-fg-secondary</Code>, <Code>--color-danger-subtle</Code>. Значения
            разные в light и dark.
          </p>
        </div>
        <div className="docs-layer">
          <p className="docs-layer__title">Компоненты</p>
          <p className="docs-p">
            <Code>--button-height</Code>, <Code>--table-row-height</Code>. Объявлены в CSS компонента, ссылаются на семантику.
          </p>
        </div>
      </div>
      <CodeBlock
        language="css"
        code={`/* 1. примитив */
--blue-600: #155dfc;

/* 2. семантика (light / dark) */
:root               { --color-primary: var(--blue-600); }
[data-theme="dark"] { --color-primary: var(--blue-600); --color-primary-hover: var(--blue-700); }

/* 3. компонент */
.cs-button { --button-accent: var(--color-primary); background: var(--button-accent); }
.cs-button--danger { --button-accent: var(--color-danger); }`}
      />

      <H2>Темы</H2>
      <p className="docs-p">
        Тема переключается атрибутом <Code>data-theme</Code> на <Code>&lt;html&gt;</Code>. Компоненты не меняются — меняются
        только значения семантических токенов. Попробуйте переключатель темы внизу сайдбара.
      </p>
      <CodeBlock code={`document.documentElement.dataset.theme = "dark"; // или "light"`} />

      <H2>Именование</H2>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Шаблон</th>
              <th>Пример</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><Code>--color-{"{роль}"}</Code></td><td><Code>--color-bg</Code>, <Code>--color-fg</Code>, <Code>--color-border</Code></td><td>Базовые поверхности, текст, границы</td></tr>
            <tr><td><Code>--color-{"{роль}"}-{"{вариант}"}</Code></td><td><Code>--color-fg-secondary</Code>, <Code>--color-bg-muted</Code></td><td>Градация важности</td></tr>
            <tr><td><Code>--color-{"{тон}"}</Code></td><td><Code>--color-primary</Code>, <Code>--color-danger</Code></td><td>Заливка смыслового цвета</td></tr>
            <tr><td><Code>--color-{"{тон}"}-{"{состояние}"}</Code></td><td><Code>--color-primary-hover</Code>, <Code>--color-success-subtle</Code>, <Code>--color-danger-fg</Code></td><td>Состояния и пары фон/текст</td></tr>
            <tr><td><Code>--space-{"{n}"}</Code></td><td><Code>--space-4</Code> = 16px</td><td>n × 4px</td></tr>
            <tr><td><Code>--control-height-{"{size}"}</Code></td><td><Code>--control-height-md</Code> = 40px</td><td>Высота контролов</td></tr>
          </tbody>
        </table>
      </div>
      <H2>Источник правды</H2>
      <p className="docs-p">
        Цвета — в <Code>src/tokens/*.json</Code>. Команда <Code>npm run tokens</Code> генерирует CSS и проверяет контраст.
        Остальные токены (типографика, отступы, радиусы, тени, движение) — в статичной части <Code>consyst.css</Code>.
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Цвета                                                               */
/* ------------------------------------------------------------------ */

function Ratio({ value, min }: { value: number; min: number }) {
  const level = value >= 7 ? "AAA" : value >= 4.5 ? "AA" : value >= 3 ? "AA Large" : "Fail";
  return (
    <span className={value >= min ? "docs-ratio docs-ratio--ok" : "docs-ratio docs-ratio--fail"}>
      {value.toFixed(2)} · {level}
    </span>
  );
}

export function ColorsPage() {
  const { copied, copy } = useCopy();
  const groups = Object.entries(tokens).reduce<Record<string, [string, TokenInfo][]>>((acc, [name, t]) => {
    (acc[t.group] ??= []).push([name, t]);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Цвета"
        description="В интерфейсе используйте только семантические цвета — у каждого есть значение для светлой и тёмной темы. Клик копирует переменную."
        figma="12596:476"
      />
      {Object.entries(groups).map(([group, items]) => (
        <section key={group}>
          <H2>{group}</H2>
          <div className="docs-tokens">
            {items.map(([name, t]) => {
              const v = `var(--color-${name})`;
              return (
                <button key={name} type="button" className="docs-token" onClick={() => copy(v)}>
                  <span className="docs-token__swatches">
                    <span style={{ background: t.lightHex }} title={`light: ${t.light}`} />
                    <span style={{ background: t.darkHex }} title={`dark: ${t.dark}`} />
                  </span>
                  <span className="docs-token__text">
                    <span className="docs-token__name">{copied === v ? "Скопировано ✓" : `--color-${name}`}</span>
                    <span className="docs-token__ref">
                      {t.light} · {t.dark}
                    </span>
                    {t.note && <span className="docs-token__note">{t.note}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <H2>Контраст</H2>
      <p className="docs-p">
        Пары проверяются при каждой сборке токенов: текст — минимум 4.5:1, крупные элементы и фокус — 3:1 (WCAG 2.1 AA).
      </p>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Пара</th>
              <th>Light</th>
              <th>Dark</th>
            </tr>
          </thead>
          <tbody>
            {report.pairs.map((p) => (
              <tr key={p.fg + p.bg}>
                <td>
                  <span className="docs-pair" style={{ background: tokens[p.bg].lightHex, color: tokens[p.fg].lightHex }}>
                    Аа
                  </span>
                  <Code>{p.fg}</Code> на <Code>{p.bg}</Code>
                </td>
                <td>
                  <Ratio value={p.light} min={p.min} />
                </td>
                <td>
                  <Ratio value={p.dark} min={p.min} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Примитивы</H2>
      <p className="docs-p">
        Палитра, на которую ссылается семантика. Neutral — фирменный холодный серый, остальные — шкалы 50–950. Переменная —{" "}
        <Code>--{"{палитра}"}-{"{шаг}"}</Code>.
      </p>
      <div className="docs-palette">
        {Object.entries(palette).map(([family, shades]) => (
          <div key={family} className="docs-palette__row">
            <span className="docs-palette__name">{family}</span>
            <div className="docs-palette__shades" style={{ gridTemplateColumns: `repeat(${Object.keys(shades).length}, minmax(0, 1fr))` }}>
              {Object.entries(shades).map(([s, hex]) => {
                const v = `var(--${family}-${s})`;
                return (
                  <button key={s} type="button" className="docs-palette__shade" onClick={() => copy(v)} title={v}>
                    <span style={{ background: hex }} />
                    <b>{s}</b>
                    <small>{copied === v ? "✓" : hex}</small>
                  </button>
                );
              })}
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

const roles: [string, string, string, string][] = [
  ["display", "cs-display", "Rosatom Bold 40/48", "Цифры на дашборде, промо"],
  ["h1", "cs-h1", "Rosatom Bold 32/40", "Заголовок страницы"],
  ["h2", "cs-h2", "Rosatom Bold 24/32", "Раздел страницы, модалка"],
  ["h3", "cs-h3", "Rosatom Bold 20/28", "Карточка, блок"],
  ["h4", "cs-h4", "Inter Semibold 16/24", "Подзаголовок в тексте"],
  ["body-lg", "cs-body-lg", "Inter Regular 16/24", "Вводный текст"],
  ["body", "cs-body", "Inter Regular 14/20", "Основной текст интерфейса"],
  ["label", "cs-label", "Inter Medium 14/20", "Подписи полей, кнопки"],
  ["body-sm", "cs-body-sm", "Inter Regular 12/16", "Таблицы, метаданные"],
  ["caption", "cs-caption", "Inter Regular 12/16, secondary", "Подсказки, время"],
];

export function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Типографика"
        description="Роли вместо матрицы «размер × вес». Заголовки — Rosatom, текст — Inter. Межстрочный интервал кратен 4px."
        figma="12606:16"
      />
      <H2>Роли</H2>
      <div className="docs-type">
        {roles.map(([name, cls, spec, use]) => (
          <div key={name} className="docs-type__row">
            <div className="docs-type__meta">
              <b>.{cls}</b>
              <span>{spec}</span>
              <span>{use}</span>
            </div>
            <div className={cls}>Практика в «ПроДвижении»</div>
          </div>
        ))}
      </div>
      <H2>Шкала</H2>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Токен</th>
              <th>Размер</th>
              <th>Межстрочный</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["xs", 12, 16],
                ["sm", 14, 20],
                ["md", 16, 24],
                ["lg", 18, 28],
                ["xl", 20, 28],
                ["2xl", 24, 32],
                ["3xl", 32, 40],
                ["4xl", 40, 48],
              ] as const
            ).map(([n, s, l]) => (
              <tr key={n}>
                <td>
                  <Code>--text-{n}</Code> · <Code>--leading-{n}</Code>
                </td>
                <td>{s}px</td>
                <td>{l}px</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <H2>Использование</H2>
      <CodeBlock
        code={`<h1 className="cs-h1">Практиканты</h1>
<p className="cs-body">Основной текст</p>

/* или в своём CSS */
.title { font: var(--font-weight-bold) var(--text-2xl)/var(--leading-2xl) var(--font-display); }`}
      />
      <H2>Правила</H2>
      <ul className="docs-list">
        <li>Rosatom — только заголовки (h1–h3, display). Длинный текст и интерфейс — Inter.</li>
        <li>Основной текст интерфейса — 14px. 12px — только для вторичной информации.</li>
        <li>Веса Inter: 400, 500, 600. Жирный 700 — только в Rosatom.</li>
        <li>
          Цифры в таблицах — <Code>font-variant-numeric: tabular-nums</Code>.
        </li>
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Отступы и размеры                                                   */
/* ------------------------------------------------------------------ */

const space: [string, number][] = [
  ["0", 0], ["0-5", 2], ["1", 4], ["1-5", 6], ["2", 8], ["2-5", 10], ["3", 12], ["4", 16], ["5", 20], ["6", 24], ["8", 32], ["10", 40], ["12", 48], ["16", 64],
];

export function SpacingPage() {
  const { copied, copy } = useCopy();
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Отступы и размеры"
        description="Базовая единица — 4px (как sizeUnit в Ant Design). 14 шагов вместо 34: этого хватает для любого экрана."
        figma="12606:1050"
      />
      <H2>Spacing</H2>
      <div className="docs-spacing">
        {space.map(([n, px]) => (
          <button key={n} type="button" className="docs-spacing__row" onClick={() => copy(`var(--space-${n})`)}>
            <code className="docs-inline-code">--space-{n}</code>
            <span className="docs-spacing__px">{copied === `var(--space-${n})` ? "✓" : `${px}px`}</span>
            <span className="docs-spacing__bar" style={{ width: Math.max(px * 2, 2) }} />
          </button>
        ))}
      </div>
      <H3>Когда какой</H3>
      <ul className="docs-list">
        <li>
          <Code>1–2</Code> (4–8px) — внутри компонента: иконка и текст, подпись и поле.
        </li>
        <li>
          <Code>3–4</Code> (12–16px) — между полями формы, внутри карточки.
        </li>
        <li>
          <Code>6–8</Code> (24–32px) — между блоками и карточками.
        </li>
        <li>
          <Code>10–16</Code> (40–64px) — между крупными разделами страницы.
        </li>
      </ul>

      <H2>Размеры контролов</H2>
      <p className="docs-p">
        Общая шкала для Button, Input, Search, Select, MultiSelect (как controlHeight в Ant Design). Элементы одного размера
        стоят в одну строку без подгонки.
      </p>
      <div className="docs-controls">
        {(["sm", "md", "lg"] as const).map((s) => (
          <div key={s} className="docs-controls__row">
            <code className="docs-inline-code">--control-height-{s}</code>
            <span className="docs-spacing__px">{{ sm: 32, md: 40, lg: 48 }[s]}px</span>
            <div style={{ display: "flex", gap: 8, flex: 1 }}>
              <Input size={s} placeholder="Поле" aria-label={`Поле ${s}`} />
              <Button size={s}>Кнопка</Button>
            </div>
          </div>
        ))}
      </div>
      <H3>Какой размер выбрать</H3>
      <ul className="docs-list">
        <li>
          <b>md (40)</b> — по умолчанию: формы, тулбары, модалки.
        </li>
        <li>
          <b>sm (32)</b> — плотные интерфейсы: строки таблиц, фильтры, поповеры.
        </li>
        <li>
          <b>lg (48)</b> — главные действия на мобильных и в онбординге.
        </li>
      </ul>

      <H2>Брейкпоинты</H2>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Мин. ширина</th>
              <th>Где</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>sm</td><td>640px</td><td>Крупные телефоны</td></tr>
            <tr><td>md</td><td>768px</td><td>Планшеты: шапка сворачивает действия</td></tr>
            <tr><td>lg</td><td>1024px</td><td>Ноутбуки: сайдбар развёрнут</td></tr>
            <tr><td>xl</td><td>1280px</td><td>Десктоп: таблицы во всю ширину</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Радиусы, тени, движение                                             */
/* ------------------------------------------------------------------ */

const radiusPx: Record<string, string> = { xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "12px", "2xl": "16px", "3xl": "24px", full: "9999px" };

export function EffectsPage() {
  const { copied, copy } = useCopy();
  const shadows: [string, string][] = [
    ["xs", "Thumb переключателя, активная вкладка"],
    ["sm", "Карточки (--shadow-card)"],
    ["md", "Меню, поповеры (--shadow-popover)"],
    ["lg", "Тосты"],
    ["xl", "Модалки (--shadow-dialog)"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Радиусы, тени, движение"
        description="Все радиусы выводятся из одного --radius (как в shadcn). Тени — по назначению, а не по «силе»."
        figma="12611:1566"
      />
      <H2>Радиусы</H2>
      <p className="docs-p">
        Базовый <Code>--radius: 8px</Code>. Измените его — все скругления системы изменятся пропорционально.
      </p>
      <div className="docs-radii">
        {Object.keys(radiusPx).map((n) => (
          <button key={n} type="button" className="docs-radius" onClick={() => copy(`var(--radius-${n})`)}>
            <span className="docs-radius__box" style={{ borderRadius: `var(--radius-${n})` }} />
            <b>--radius-{n}</b>
            <small>{copied === `var(--radius-${n})` ? "Скопировано" : radiusPx[n]}</small>
          </button>
        ))}
      </div>

      <H2>Тени</H2>
      <div className="docs-radii">
        {shadows.map(([s, use]) => (
          <button key={s} type="button" className="docs-radius" onClick={() => copy(`var(--shadow-${s})`)}>
            <span className="docs-radius__box docs-radius__box--shadow" style={{ boxShadow: `var(--shadow-${s})` }} />
            <b>--shadow-{s}</b>
            <small>{copied === `var(--shadow-${s})` ? "Скопировано" : use}</small>
          </button>
        ))}
      </div>

      <H2>Фокус</H2>
      <p className="docs-p">
        Все интерактивные элементы показывают <Code>--focus-ring</Code> при навигации с клавиатуры (<Code>:focus-visible</Code>).
        Нажмите Tab на этой странице, чтобы увидеть.
      </p>

      <H2>Движение</H2>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Токен</th>
              <th>Значение</th>
              <th>Для чего</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><Code>--duration-fast</Code></td><td>100ms</td><td>Hover, цвет, рамка</td></tr>
            <tr><td><Code>--duration-base</Code></td><td>160ms</td><td>Меню, переключатели, аккордеон</td></tr>
            <tr><td><Code>--duration-slow</Code></td><td>240ms</td><td>Модалки, тосты, сайдбар</td></tr>
            <tr><td><Code>--ease-standard</Code></td><td>cubic-bezier(0.2, 0, 0, 1)</td><td>Изменение состояния</td></tr>
            <tr><td><Code>--ease-out</Code></td><td>cubic-bezier(0.16, 1, 0.3, 1)</td><td>Появление элементов</td></tr>
          </tbody>
        </table>
      </div>

      <H2>Слои (z-index)</H2>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Токен</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["dropdown", 1000],
                ["sticky", 1020],
                ["overlay", 1040],
                ["modal", 1050],
                ["popover", 1060],
                ["tooltip", 1070],
                ["toast", 1080],
              ] as const
            ).map(([n, v]) => (
              <tr key={n}>
                <td>
                  <Code>--z-{n}</Code>
                </td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Иконки                                                              */
/* ------------------------------------------------------------------ */

export function IconsPage() {
  const { copied, copy } = useCopy();
  const [q, setQ] = useState("");
  const list = (Object.entries(Icons).filter(([n]) => n.startsWith("Icon") && n !== "Icon") as [string, (p: Icons.IconProps) => JSX.Element][]).filter(([n]) =>
    n.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        eyebrow="Основы"
        title="Иконки"
        description="Font Awesome Solid — векторные SVG-иконки: шрифт не нужен, на телефоне отображаются так же. Цвет наследуется от текста, размер внутри контролов задаёт сам контрол. Клик копирует JSX."
        figma="12531:2608"
      />
      <div style={{ maxWidth: 320, marginBottom: 16 }}>
        <Search placeholder="Найти иконку" aria-label="Найти иконку" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />
      </div>
      <div className="docs-icons">
        {list.map(([name, Icon]) => (
          <button key={name} type="button" className="docs-icon" onClick={() => copy(`<${name} />`)}>
            <Icon size={20} />
            <span>{copied === `<${name} />` ? "Скопировано" : name.replace("Icon", "")}</span>
          </button>
        ))}
      </div>
      <H2>Размеры</H2>
      <ul className="docs-list">
        <li>
          <Code>--icon-size-sm</Code> 14px — в sm-контролах и плотных списках.
        </li>
        <li>
          <Code>--icon-size-md</Code> 16px — по умолчанию.
        </li>
        <li>
          <Code>--icon-size-lg</Code> 20px — в lg-кнопках, пустых состояниях.
        </li>
      </ul>
      <H2>Использование</H2>
      <CodeBlock
        code={`import { IconSearch, Icon } from "@/components/ui/icons";

<IconSearch />                          // декоративная — скрыта от скринридера
<IconSearch label="Поиск" />            // смысловая — озвучивается
<IconSpinner spin />                    // вращение

// любая другая иконка Font Awesome Free
import { faHouse } from "@fortawesome/free-solid-svg-icons";
<Icon icon={faHouse} />`}
      />
      <p className="docs-p">
        Иконка без текста рядом — например, кнопка-иконка — обязательно получает <Code>aria-label</Code> на кнопке.
      </p>
    </>
  );
}
