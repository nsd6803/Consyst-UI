import { useEffect, useMemo, useRef, useState } from "react";
import { IconBars, IconChevronLeft, IconChevronRight, IconMoon, IconSun, IconX } from "@/components/ui/icons";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs } from "@/components/ui/tabs";
import { Search } from "@/components/ui/search";
import { components, FIGMA_FILE, flatNav, nav } from "@/docs/config";
import { go, useRoute } from "@/docs/router";
import { ComponentPage, FigmaIcon, InstallationPage, IntroPage, PrinciplesPage } from "@/docs/pages";
import { ColorsPage, EffectsPage, IconsPage, SpacingPage, TokensPage, TypographyPage } from "@/docs/foundations";

function Page({ route }: { route: string }) {
  if (route === "") return <IntroPage />;
  if (route === "installation") return <InstallationPage />;
  if (route === "principles") return <PrinciplesPage />;
  if (route === "foundations/tokens") return <TokensPage />;
  if (route === "foundations/colors") return <ColorsPage />;
  if (route === "foundations/typography") return <TypographyPage />;
  if (route === "foundations/spacing") return <SpacingPage />;
  if (route === "foundations/effects") return <EffectsPage />;
  if (route === "foundations/icons") return <IconsPage />;
  const doc = components.find((c) => `components/${c.slug}` === route);
  if (doc) return <ComponentPage key={doc.slug} doc={doc} />;
  return (
    <div className="docs-404">
      <h1 className="docs-h1">Страница не найдена</h1>
      <p className="docs-lead">
        <a className="docs-link" href="#/">
          На главную
        </a>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Toc({ route }: { route: string }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".docs-main h2[id], .docs-main h3[id]"));
    setItems(els.map((el) => ({ id: el.id, text: el.textContent ?? "", level: el.tagName === "H3" ? 3 : 2 })));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40px 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route]);

  if (items.length === 0) return null;
  return (
    <nav className="docs-toc">
      <p className="docs-toc__title">На этой странице</p>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={["docs-toc__item", it.level === 3 && "docs-toc__item--sub", active === it.id && "docs-toc__item--active"]
            .filter(Boolean)
            .join(" ")}
          onClick={() => document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          {it.text}
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("cs-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage недоступен */
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("cs-theme", theme);
    } catch {
      /* storage недоступен */
    }
  }, [theme]);
  return [theme, setTheme] as const;
}

function DocsSidebar({
  route,
  open,
  theme,
  onThemeChange,
}: {
  route: string;
  open: boolean;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // Ctrl/⌘ + K — фокус на поиске
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nav;
    return nav
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => {
          const c = components.find((x) => `components/${x.slug}` === i.slug);
          return (
            i.title.toLowerCase().includes(q) ||
            g.title.toLowerCase().includes(q) ||
            c?.description.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const first = groups[0]?.items[0];
  const navRef = useRef<HTMLElement>(null);

  // Держим активный пункт в видимой части списка
  useEffect(() => {
    navRef.current?.querySelector<HTMLElement>(".docs-nav-item--active")?.scrollIntoView({ block: "nearest" });
  }, [route]);

  // Градиент у краёв списка, когда за ними есть скрытые пункты
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const update = () => {
      el.toggleAttribute("data-fade-top", el.scrollTop > 1);
      el.toggleAttribute("data-fade-bottom", el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [groups]);

  return (
    <aside className={open ? "docs-sidebar docs-sidebar--open" : "docs-sidebar"}>
      <a className="docs-brand" href="#/">
        <span className="docs-brand__name">Consyst UI</span>
      </a>

      <Search
        ref={searchRef}
        size="sm"
        placeholder="Поиск компонентов"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery("")}
        onKeyDown={(e) => {
          if (e.key === "Enter" && first) {
            go(first.slug);
            setQuery("");
            searchRef.current?.blur();
          }
          if (e.key === "Escape") setQuery("");
        }}
      />

      <nav ref={navRef} className="docs-sidebar__nav">
        {groups.map((g) => (
          <div key={g.title} className="docs-nav-group">
            <p className="docs-nav-group__title">{g.title}</p>
            {g.items.map((it) => (
              <a
                key={it.slug}
                href={`#/${it.slug}`}
                className={route === it.slug ? "docs-nav-item docs-nav-item--active" : "docs-nav-item"}
                aria-current={route === it.slug ? "page" : undefined}
              >
                {it.title}
                {it.badge && <span className="docs-nav-item__badge">new</span>}
              </a>
            ))}
          </div>
        ))}
        {groups.length === 0 && <p className="docs-nav-empty">Ничего не найдено</p>}
      </nav>

      <div className="docs-sidebar__footer">
        <Tabs
          variant="pill"
          size="sm"
          fullWidth
          aria-label="Тема"
          value={theme}
          onValueChange={(v) => onThemeChange(v as Theme)}
          items={[
            { value: "light", label: <><IconSun size={12} /> Светлая</> },
            { value: "dark", label: <><IconMoon size={12} /> Тёмная</> },
          ]}
        />
        <a className="docs-figma-btn" href={FIGMA_FILE} target="_blank" rel="noreferrer">
          <FigmaIcon size={16} />
          Открыть в Figma
        </a>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();

  useEffect(() => setMenuOpen(false), [route]);

  const current = flatNav.findIndex((i) => i.slug === route);
  const prev = current > 0 ? flatNav[current - 1] : null;
  const next = current >= 0 && current < flatNav.length - 1 ? flatNav[current + 1] : null;
  const title = flatNav[current]?.title;
  useEffect(() => {
    document.title = title && route ? `${title} — Consyst UI` : "Consyst UI";
  }, [title, route]);

  return (
    <TooltipProvider>
    <div className="docs">
      <header className="docs-mobilebar">
        <button type="button" className="docs-burger" aria-label="Меню" onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? <IconX /> : <IconBars />}
        </button>
        <a href="#/" className="docs-mobilebar__logo">
          Consyst UI
        </a>
      </header>

      <DocsSidebar route={route} open={menuOpen} theme={theme} onThemeChange={setTheme} />
      {menuOpen && <div className="docs-scrim" onClick={() => setMenuOpen(false)} />}

      <main className="docs-main">
        <article className="docs-article">
          <Page route={route} />
          {(prev || next) && (
            <div className="docs-pager">
              {prev ? (
                <a className="docs-pager__link" href={`#/${prev.slug}`}>
                  <IconChevronLeft size={12} />
                  {prev.title}
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a className="docs-pager__link docs-pager__link--next" href={`#/${next.slug}`}>
                  {next.title}
                  <IconChevronRight size={12} />
                </a>
              )}
            </div>
          )}
        </article>
        <Toc route={route} />
      </main>
    </div>
    </TooltipProvider>
  );
}
