import { useState, type ReactNode } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@/components/ui/icons";
import { CodeBlock, CopyButton, FileTabs } from "./code";
import { examples, registryFile, tokensCss } from "./sources";
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

export function PageHeader({ eyebrow, title, description, figma }: { eyebrow: string; title: string; description: string; figma?: string }) {
  return (
    <header className="docs-page-header">
      <div className="docs-breadcrumbs">
        <span>{eyebrow}</span>
        <IconChevronRight size={12} />
        <span className="docs-breadcrumbs__current">{title}</span>
      </div>
      <h1 className="docs-h1">{title}</h1>
      <p className="docs-lead">{description}</p>
      {figma && (
        <div className="docs-page-header__links">
          <a className="docs-badge-link" href={figmaLink(figma)} target="_blank" rel="noreferrer">
            <FigmaIcon /> Открыть в Figma
          </a>
        </div>
      )}
    </header>
  );
}

function FigmaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 38 57" aria-hidden="true">
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
          items={[
            { value: "preview", label: "Превью" },
            { value: "code", label: "Код" },
          ]}
          value={tab}
          onChange={setTab}
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
              <td>
                <code className="docs-inline-code">{p.type}</code>
              </td>
              <td>{p.default ? <code className="docs-inline-code">{p.default}</code> : <span className="docs-muted">—</span>}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Steps({ children }: { children: ReactNode }) {
  return <ol className="docs-steps">{children}</ol>;
}
function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="docs-step">
      <p className="docs-step__title">{title}</p>
      {children}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Страница компонента                                                 */
/* ------------------------------------------------------------------ */

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const files = doc.files.map((name) => ({ name, code: registryFile(name) }));
  const deps = doc.files.filter((f) => !f.startsWith(doc.files[0].replace(".tsx", "")));
  const group = nav.find((g) => g.items.some((i) => i.slug === `components/${doc.slug}`))?.title ?? "Компоненты";

  return (
    <>
      <PageHeader eyebrow={group} title={doc.title} description={doc.description} figma={doc.figma} />
      <ComponentPreview name={doc.demo} wide={doc.wide} />

      <H2>Установка</H2>
      <Steps>
        <Step title="Подключите токены и шрифты">
          <p className="docs-p">
            Один раз на проект — см. страницу{" "}
            <a className="docs-link" href="#/installation" onClick={(e) => (e.preventDefault(), go("installation"))}>
              Установка
            </a>
            .
          </p>
        </Step>
        <Step title={`Скопируйте файлы в components/ui`}>
          {deps.length > 0 && (
            <p className="docs-p">
              Вместе с компонентом нужны:{" "}
              {deps.map((d, i) => (
                <span key={d}>
                  <code className="docs-inline-code">{d}</code>
                  {i < deps.length - 1 ? ", " : ""}
                </span>
              ))}
              {deps.some((d) => d === "icons.tsx") && " (общий для всех компонентов)"}.
            </p>
          )}
          <FileTabs files={files} />
        </Step>
        <Step title="Готово — импортируйте компонент">
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

      {doc.props && (
        <>
          <H2>API</H2>
          <PropsTable props={doc.props} />
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
  return (
    <>
      <header className="docs-hero">
        <span className="docs-hero__badge">Дизайн-система проекта «ПроДвижение»</span>
        <h1 className="docs-hero__title">Consyst UI</h1>
        <p className="docs-lead">
          Набор React-компонентов, собранных по макетам Figma. Это не npm-пакет: вы копируете код компонента к себе в
          проект и дальше владеете им — меняете стили, добавляете пропсы, как удобно.
        </p>
        <div className="docs-hero__actions">
          <Button size="medium" onClick={() => go("installation")}>
            Начать
          </Button>
          <Button size="medium" variant="ghost" onClick={() => go("components/button")}>
            Компоненты
          </Button>
        </div>
      </header>

      <H2>Как это работает</H2>
      <div className="docs-cards">
        <div className="docs-card">
          <span className="docs-card__num">1</span>
          <p className="docs-card__title">Токены</p>
          <p className="docs-card__text">Подключите consyst.css — цвета, типографика, отступы, радиусы и тени из Figma в CSS-переменных.</p>
        </div>
        <div className="docs-card">
          <span className="docs-card__num">2</span>
          <p className="docs-card__title">Копируйте</p>
          <p className="docs-card__text">Откройте компонент, скопируйте .tsx и .css в components/ui. Без зависимостей, кроме React.</p>
        </div>
        <div className="docs-card">
          <span className="docs-card__num">3</span>
          <p className="docs-card__title">Используйте</p>
          <p className="docs-card__text">Импортируйте и меняйте под задачу — код ваш. Примеры на каждой странице.</p>
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
                <a
                  key={it.slug}
                  href={`#/${it.slug}`}
                  className="docs-index__item"
                  onClick={(e) => (e.preventDefault(), go(it.slug))}
                >
                  <span className="docs-index__title">{it.title}</span>
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
/* Установка                                                           */
/* ------------------------------------------------------------------ */

export function InstallationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Начало работы"
        title="Установка"
        description="Настройка проекта делается один раз. Дальше компоненты просто копируются со страниц документации."
      />

      <H2>Требования</H2>
      <p className="docs-p">
        React 18+ и любой сборщик, который умеет импортировать CSS (Vite, Next.js, CRA, Webpack). TypeScript желателен,
        но не обязателен. Tailwind и другие библиотеки не нужны.
      </p>

      <H2>Шаги</H2>
      <Steps>
        <Step title="Положите шрифты Rosatom в public/fonts">
          <p className="docs-p">
            Нужны файлы <code className="docs-inline-code">Rosatom-Light.otf</code>,{" "}
            <code className="docs-inline-code">Rosatom-Regular.otf</code>, <code className="docs-inline-code">Rosatom-Italic.otf</code>,{" "}
            <code className="docs-inline-code">Rosatom-Bold.otf</code>. Ими набраны заголовки, остальной текст — Inter.
          </p>
          <div className="docs-actions-row">
            {["Light", "Regular", "Italic", "Bold"].map((w) => (
              <a key={w} className="docs-badge-link" href={`${import.meta.env.BASE_URL}fonts/Rosatom-${w}.otf`} download>
                Rosatom-{w}.otf
              </a>
            ))}
          </div>
        </Step>
        <Step title="Подключите Inter">
          <CodeBlock
            language="markup"
            code={`<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />`}
          />
        </Step>
        <Step title="Добавьте файл токенов consyst.css">
          <p className="docs-p">
            Скопируйте в <code className="docs-inline-code">src/styles/consyst.css</code> и импортируйте один раз в точке входа.
          </p>
          <FileTabs files={[{ name: "consyst.css", code: tokensCss }]} />
          <CodeBlock
            code={`// main.tsx
import "./styles/consyst.css";`}
          />
        </Step>
        <Step title="Настройте алиас @/components/ui (по желанию)">
          <p className="docs-p">
            Во всех примерах импорт идёт из <code className="docs-inline-code">@/components/ui/…</code>. Если алиаса нет —
            замените на относительный путь.
          </p>
          <CodeBlock
            code={`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}

// vite.config.ts
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});`}
          />
        </Step>
        <Step title="Добавьте иконки">
          <p className="docs-p">
            Многие компоненты используют общий файл <code className="docs-inline-code">icons.tsx</code>. Скопируйте его в{" "}
            <code className="docs-inline-code">src/components/ui/icons.tsx</code>.
          </p>
          <FileTabs files={[{ name: "icons.tsx", code: registryFile("icons.tsx") }]} />
        </Step>
        <Step title="Копируйте компоненты">
          <p className="docs-p">
            Каждая страница компонента содержит его исходники с кнопкой «Копировать». Структура в итоге выглядит так:
          </p>
          <CodeBlock
            language="markup"
            copyable={false}
            code={`src/
├─ styles/
│  └─ consyst.css
└─ components/
   └─ ui/
      ├─ icons.tsx
      ├─ button.tsx
      ├─ button.css
      └─ …`}
          />
        </Step>
      </Steps>
    </>
  );
}
