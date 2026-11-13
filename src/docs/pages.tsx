import { useState, type ReactNode } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/status";
import { IconCheck, IconX } from "@/components/ui/icons";
import { CodeBlock, CopyButton, FileTabs } from "./code";
import { BASE_FILES, componentFiles, examples, registryFile, tokensCss } from "./sources";
import { components, figmaLink, nav, type ComponentDoc } from "./config";
import { go } from "./router";

/* ------------------------------------------------------------------ */
/* Общие блоки                                                         */
/* ------------------------------------------------------------------ */

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-|-$/g, "");

export function H2({ children }: { children: string }) {
  return (
    <h2 id={slugify(children)} className="docs-h2">
      {children}
    </h2>
  );
}
export function H3({ children }: { children: string }) {
  return (
    <h3 id={slugify(children)} className="docs-h3">
      {children}
    </h3>
  );
}

export function PageHeader({
  title,
  description,
  figma,
  isNew,
}: {
  eyebrow: string;
  title: string;
  description: string;
  figma?: string;
  isNew?: boolean;
}) {
  return (
    <header className="docs-page-header">
      <h1 className="docs-h1">
        {title}
        {isNew && (
          <Status tone="accent" size="sm" className="docs-h1__badge">
            Новый
          </Status>
        )}
      </h1>
      <p className="docs-lead">{description}</p>
      {figma && (
        <div className="docs-page-header__links">
          <a className="docs-badge-link" href={figmaLink(figma)} target="_blank" rel="noreferrer">
            <FigmaIcon /> Макет в Figma
          </a>
        </div>
      )}
    </header>
  );
}

export function FigmaIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={(size * 38) / 57} height={size} viewBox="0 0 38 57" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

export function ComponentPreview({ name, wide = false }: { name: string; wide?: boolean }) {
  const [tab, setTab] = useState("preview");
  const ex = examples[name];
  if (!ex) return <p>Пример «{name}» не найден</p>;
  const { Component, code } = ex;
  return (
    <div className="docs-preview">
      <div className="docs-preview__bar">
        <Tabs
          size="sm"
          aria-label="Режим просмотра"
          items={[
            { value: "preview", label: "Превью" },
            { value: "code", label: "Код" },
          ]}
          value={tab}
          onValueChange={setTab}
        />
        <CopyButton text={code} label="Копировать код" />
      </div>
      {tab === "preview" ? (
        <div className={wide ? "docs-preview__stage docs-preview__stage--wide" : "docs-preview__stage"}>
          <Component />
        </div>
      ) : (
        <CodeBlock code={code} copyable={false} maxHeight={520} />
      )}
    </div>
  );
}

function PropsTable({ props }: { props: NonNullable<ComponentDoc["props"]> }) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th>Проп</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td>
                <code className="docs-inline-code docs-inline-code--accent">{p.name}</code>
              </td>
              <td>{p.type ? <code className="docs-inline-code">{p.type}</code> : <span className="docs-muted">—</span>}</td>
              <td>{p.default ? <code className="docs-inline-code">{p.default}</code> : <span className="docs-muted">—</span>}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="docs-steps">{children}</ol>;
}
export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="docs-step">
      <p className="docs-step__title">{title}</p>
      {children}
    </li>
  );
}

function Link({ to, children }: { to: string; children: ReactNode }) {
  return (
    <a className="docs-link" href={`#/${to}`} onClick={(e) => (e.preventDefault(), go(to))}>
      {children}
    </a>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="docs-inline-code">{children}</code>;
}

/* ------------------------------------------------------------------ */
/* Страница компонента                                                 */
/* ------------------------------------------------------------------ */

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const { own, shared, base, npm } = componentFiles(doc.entry);
  const group = nav.find((g) => g.items.some((i) => i.slug === `components/${doc.slug}`))?.title ?? "Компоненты";
  const fileTabs = [...own, ...shared].map((name) => ({ name, code: registryFile(name) }));

  return (
    <>
      <PageHeader eyebrow={group} title={doc.title} description={doc.description} figma={doc.figma} isNew={doc.isNew} />
      <ComponentPreview name={doc.demo} wide={doc.wide} />

      <H2>Установка</H2>
      <Steps>
        <Step title="Один раз на проект: токены, шрифты, базовые файлы">
          <p className="docs-p">
            <Code>consyst.css</Code>, шрифты и {base.map((b, i) => <span key={b}>{i > 0 && ", "}<Code>{b}</Code></span>)} — см.{" "}
            <Link to="installation">Установка</Link>.
          </p>
        </Step>
        {npm.length > 0 && (
          <Step title="Установите зависимости">
            <CodeBlock language="bash" code={`npm i ${npm.join(" ")}`} />
          </Step>
        )}
        <Step title="Скопируйте файлы в components/ui">
          {shared.length > 0 && (
            <p className="docs-p">
              Компонент использует другие компоненты — их файлы тоже во вкладках:{" "}
              {shared.map((d, i) => (
                <span key={d}>
                  {i > 0 && ", "}
                  <Code>{d}</Code>
                </span>
              ))}
              .
            </p>
          )}
          <FileTabs files={fileTabs} />
        </Step>
        <Step title="Используйте">
          <CodeBlock code={doc.usage} />
        </Step>
      </Steps>

      {doc.examples && doc.examples.length > 0 && (
        <>
          <H2>Примеры</H2>
          {doc.examples.map((ex) => (
            <section key={ex.name} className="docs-example">
              <H3>{ex.title}</H3>
              {ex.description && <p className="docs-p">{ex.description}</p>}
              <ComponentPreview name={ex.name} wide={doc.wide} />
            </section>
          ))}
        </>
      )}

      {(doc.dos || doc.donts) && (
        <>
          <H2>Рекомендации</H2>
          <div className="docs-guides">
            {doc.dos && (
              <div className="docs-guide docs-guide--do">
                <p className="docs-guide__title">
                  <IconCheck size={12} /> Делайте
                </p>
                <ul>
                  {doc.dos.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
            {doc.donts && (
              <div className="docs-guide docs-guide--dont">
                <p className="docs-guide__title">
                  <IconX size={12} /> Избегайте
                </p>
                <ul>
                  {doc.donts.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

      {doc.props && (
        <>
          <H2>API</H2>
          <PropsTable props={doc.props} />
        </>
      )}

      {doc.a11y && (
        <>
          <H2>Доступность</H2>
          <ul className="docs-list">
            {doc.a11y.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Введение                                                            */
/* ------------------------------------------------------------------ */

export function IntroPage() {
  const groups = nav.slice(2);
  const count = components.length;
  return (
    <>
      <header className="docs-page-header docs-hero">
        <h1 className="docs-h1">Consyst UI</h1>
        <span className="docs-hero__badge">Дизайн-система платформы «ПроДвижение»</span>
        <p className="docs-lead">
          {count} React-компонентов на общих токенах. Код копируется в проект и дальше принадлежит вам, как в shadcn/ui.
          Токены устроены слоями, как в Ant Design. Поведение и доступность — на Radix. Контраст проверяется
          автоматически, тёмная тема есть из коробки.
        </p>
        <div className="docs-hero__actions">
          <Button onClick={() => go("installation")}>Начать</Button>
          <Button variant="soft" onClick={() => go("principles")}>
            Принципы
          </Button>
        </div>
      </header>

      <H2>Что внутри</H2>
      <div className="docs-cards">
        <div className="docs-card">
          <span className="docs-card__num">1</span>
          <p className="docs-card__title">Токены в 3 слоя</p>
          <p className="docs-card__text">Примитивы → семантика (light / dark) → токены компонентов. Компоненты знают только семантику.</p>
        </div>
        <div className="docs-card">
          <span className="docs-card__num">2</span>
          <p className="docs-card__title">Единый масштаб</p>
          <p className="docs-card__text">Сетка 4px. Контролы 32 / 40 / 48 — кнопка, поле и select одного размера совпадают.</p>
        </div>
        <div className="docs-card">
          <span className="docs-card__num">3</span>
          <p className="docs-card__title">WCAG AA</p>
          <p className="docs-card__text">35 пар «текст/фон» проверяются при сборке токенов. Фокус-ринг, клавиатура, ARIA.</p>
        </div>
      </div>

      <H2>Компоненты</H2>
      {groups.map((g) => (
        <section key={g.title} className="docs-index-group">
          <p className="docs-index-group__title">{g.title}</p>
          <div className="docs-index">
            {g.items.map((it) => {
              const c = components.find((x) => `components/${x.slug}` === it.slug)!;
              return (
                <a key={it.slug} href={`#/${it.slug}`} className="docs-index__item" onClick={(e) => (e.preventDefault(), go(it.slug))}>
                  <span className="docs-index__title">
                    {it.title}
                    {c.isNew && (
                      <Status tone="accent" size="sm">
                        Новый
                      </Status>
                    )}
                  </span>
                  <span className="docs-index__desc">{c.description}</span>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Принципы                                                            */
/* ------------------------------------------------------------------ */

export function PrinciplesPage() {
  const items: [string, string][] = [
    ["Ясность важнее красоты", "Интерфейс «ПроДвижения» — рабочий инструмент: таблицы, формы, согласования. Каждый экран отвечает на вопрос «что мне сделать дальше». Одно главное действие на экран."],
    ["Смысл через семантику", "Цвет передаёт значение, а не вкус: success — согласовано, warning — ждёт, danger — ошибка или необратимое действие. Компоненты используют только семантические токены, поэтому темы и ребрендинг меняют JSON, а не код."],
    ["Заливка, а не обводка", "Consyst — fill UI. Карточки, поля, кнопки, теги и чекбоксы залиты цветом и не имеют рамок. Глубину и иерархию задают перепады фона (bg → bg-subtle → bg-muted) и лёгкая тень (shadow-card), а не линии. Белая поверхность на сером фоне — с тенью, серая на белом — без. Линия допустима только как разделитель строк внутри списка или таблицы, и как кольцо фокуса."],
    ["Единый масштаб", "Всё кратно 4px. Контролы одного размера (sm 32, md 40, lg 48) стоят в строку без подгонки. Межстрочный интервал тоже на сетке 4px, поэтому высоты предсказуемы."],
    ["Доступно по умолчанию", "WCAG 2.1 AA: контраст текста ≥ 4.5:1 (проверяется скриптом), видимый фокус, полная работа с клавиатуры, ARIA из Radix. Подпись поля всегда видима, ошибка — текстом, а не только цветом."],
    ["Код принадлежит команде", "Компоненты копируются в проект, как в shadcn/ui. Нужно поменять — меняйте. Зависимости только там, где без них не обойтись (Radix — поведение оверлеев и меню)."],
    ["Композиция вместо пропсов-монстров", "Card > CardHeader > CardTitle, Field > Input. Небольшие компоненты собираются в блоки продукта (Timeline, ApprovalHistory), а блоки — в экраны."],
  ];
  return (
    <>
      <PageHeader eyebrow="Начало работы" title="Принципы" description="На чём построена система и как принимать решения, когда готового ответа нет." />
      <div className="docs-principles">
        {items.map(([t, d], i) => (
          <div key={t} className="docs-principle">
            <span className="docs-principle__num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="docs-principle__title">{t}</p>
              <p className="docs-principle__text">{d}</p>
            </div>
          </div>
        ))}
      </div>

      <H2>Уровни системы</H2>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Уровень</th>
              <th>Что это</th>
              <th>Примеры</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Токены</td>
              <td>Значения: цвет, отступ, радиус, тень</td>
              <td><Code>--color-primary</Code>, <Code>--space-4</Code>, <Code>--control-height-md</Code></td>
            </tr>
            <tr>
              <td>Компоненты</td>
              <td>Универсальные элементы без бизнес-логики</td>
              <td>Button, Input, Select, Table, Modal</td>
            </tr>
            <tr>
              <td>Блоки</td>
              <td>Части продукта «ПроДвижение» из компонентов</td>
              <td>Timeline, ApprovalHistory, Header</td>
            </tr>
            <tr>
              <td>Экраны</td>
              <td>Страницы приложения — собираются в продукте</td>
              <td>Список практикантов, карточка практики</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Как добавить новый компонент</H2>
      <ol className="docs-list docs-list--ordered">
        <li>Проверьте, нельзя ли собрать задачу из существующих компонентов.</li>
        <li>Используйте только семантические токены и общие размеры контролов. Новые значения — сначала в токены.</li>
        <li>Поведение (фокус, клавиатура, порталы) — из Radix, если есть подходящий примитив.</li>
        <li>Добавьте страницу: превью, примеры, API, рекомендации и доступность.</li>
        <li>Запустите <Code>npm run tokens</Code> и <Code>npm run build</Code> — контраст и типы должны пройти.</li>
      </ol>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Установка                                                           */
/* ------------------------------------------------------------------ */

export function InstallationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Начало работы"
        title="Установка"
        description="Настройка проекта делается один раз. Дальше компоненты копируются со страниц документации."
      />

      <H2>Требования</H2>
      <p className="docs-p">
        React 18+, TypeScript (желательно) и любой сборщик с поддержкой CSS-импортов: Vite, Next.js, Webpack. Tailwind не
        нужен. Поведение сложных компонентов (меню, модалки, select) — на <Code>@radix-ui/*</Code>, нужные пакеты указаны
        на странице каждого компонента.
      </p>

      <H2>Шаги</H2>
      <Steps>
        <Step title="Шрифты в public/fonts">
          <p className="docs-p">
            Заголовки — Rosatom (<Code>Rosatom-Bold.otf</Code> и др.), текст — Inter. Иконки векторные и лежат в{" "}
            <Code>icons.tsx</Code> — шрифт для них не нужен.
          </p>
          <div className="docs-actions-row">
            {["Light", "Regular", "Italic", "Bold"].map((w) => (
              <a key={w} className="docs-badge-link" href={`${import.meta.env.BASE_URL}fonts/Rosatom-${w}.otf`} download>
                Rosatom-{w}.otf
              </a>
            ))}
          </div>
        </Step>
        <Step title="Inter из Google Fonts">
          <CodeBlock
            language="markup"
            code={`<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />`}
          />
        </Step>
        <Step title="Токены consyst.css">
          <p className="docs-p">
            Скопируйте в <Code>src/styles/consyst.css</Code> и импортируйте один раз в точке входа. Тёмная тема — атрибут{" "}
            <Code>data-theme="dark"</Code> на <Code>&lt;html&gt;</Code>.
          </p>
          <FileTabs files={[{ name: "consyst.css", code: tokensCss }]} />
          <CodeBlock
            code={`// main.tsx
import "./styles/consyst.css";

// тёмная тема
document.documentElement.dataset.theme = "dark";`}
          />
        </Step>
        <Step title="Базовые файлы компонентов">
          <p className="docs-p">
            Нужны всем компонентам. Положите в <Code>src/components/ui/</Code>.
          </p>
          <FileTabs files={BASE_FILES.map((name) => ({ name, code: registryFile(name) }))} />
        </Step>
        <Step title="Алиас @/components/ui (по желанию)">
          <p className="docs-p">Во всех примерах импорт идёт из <Code>@/components/ui/…</Code>.</p>
          <CodeBlock
            code={`// tsconfig.json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }

// vite.config.ts
resolve: { alias: { "@": path.resolve(__dirname, "src") } }`}
          />
        </Step>
        <Step title="Провайдеры в корне приложения">
          <CodeBlock
            code={`import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

export function App() {
  return (
    <TooltipProvider>
      <Routes />
      <Toaster />
    </TooltipProvider>
  );
}`}
          />
        </Step>
      </Steps>

      <H2>Обновление токенов</H2>
      <p className="docs-p">
        Цвета хранятся в <Code>src/tokens/primitives.json</Code> и <Code>src/tokens/semantic.json</Code>. Меняете JSON →{" "}
        <Code>npm run tokens</Code> → скрипт пересобирает переменные в <Code>consyst.css</Code> и проверяет контраст по WCAG
        AA. Если пара текст/фон не проходит, сборка падает с понятной ошибкой.
      </p>
    </>
  );
}
