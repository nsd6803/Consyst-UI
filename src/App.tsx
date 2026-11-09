import { useEffect, useMemo, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconSearch, IconX } from "@/components/ui/icons";
import { components, FIGMA_FILE, flatNav, nav } from "@/docs/config";
import { go, useRoute } from "@/docs/router";
import { ComponentPage, InstallationPage, IntroPage } from "@/docs/pages";
import { ColorsPage, EffectsPage, IconsPage, SpacingPage, TypographyPage } from "@/docs/foundations";

function Page({ route }: { route: string }) {
  if (route === "") return <IntroPage />;
  if (route === "installation") return <InstallationPage />;
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
      { rootMargin: "-80px 0px -70% 0px" },
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

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const all = nav.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));
    if (!q) return all;
    const query = q.toLowerCase();
    return all.filter((i) => {
      const c = components.find((x) => `components/${x.slug}` === i.slug);
      return i.title.toLowerCase().includes(query) || c?.description.toLowerCase().includes(query) || i.group.toLowerCase().includes(query);
    });
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIndex(0);
    }
  }, [open]);
  useEffect(() => setIndex(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>("[data-active]")?.scrollIntoView({ block: "nearest" });
  }, [index]);

  if (!open) return null;
  const pick = (slug: string) => {
    go(slug);
    onClose();
  };

  return (
    <div className="docs-search-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="docs-search" role="dialog" aria-label="Поиск по документации">
        <div className="docs-search__input">
          <IconSearch size={16} />
          <input
            autoFocus
            placeholder="Поиск компонентов…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") (e.preventDefault(), setIndex((i) => Math.min(i + 1, results.length - 1)));
              if (e.key === "ArrowUp") (e.preventDefault(), setIndex((i) => Math.max(i - 1, 0)));
              if (e.key === "Enter" && results[index]) pick(results[index].slug);
              if (e.key === "Escape") onClose();
            }}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="docs-search__list" ref={listRef}>
          {results.length === 0 && <p className="docs-search__empty">Ничего не найдено</p>}
          {results.map((r, i) => (
            <button
              key={r.slug}
              type="button"
              data-active={i === index || undefined}
              className="docs-search__item"
              onMouseEnter={() => setIndex(i)}
              onClick={() => pick(r.slug)}
            >
              <span>{r.title}</span>
              <small>{r.group}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [route]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = flatNav.findIndex((i) => i.slug === route);
  const prev = current > 0 ? flatNav[current - 1] : null;
  const next = current >= 0 && current < flatNav.length - 1 ? flatNav[current + 1] : null;
  const title = flatNav[current]?.title;
  useEffect(() => {
    document.title = title && route ? `${title} — Consyst UI` : "Consyst UI";
  }, [title, route]);

  return (
    <div className="docs">
      <header className="docs-topbar">
        <div className="docs-topbar__inner">
          <button type="button" className="docs-burger" aria-label="Меню" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <IconX size={18} /> : <BurgerIcon />}
          </button>
          <a className="docs-logo" href="#/">
            Consyst UI
          </a>
          <nav className="docs-topnav">
            <a href="#/installation" className={route === "installation" ? "is-active" : undefined}>
              Документация
            </a>
            <a href="#/components/button" className={route.startsWith("components") ? "is-active" : undefined}>
              Компоненты
            </a>
            <a href="#/foundations/colors" className={route.startsWith("foundations") ? "is-active" : undefined}>
              Основы
            </a>
          </nav>
          <div className="docs-topbar__right">
            <button type="button" className="docs-search-trigger" onClick={() => setSearchOpen(true)}>
              <IconSearch size={14} />
              <span>Поиск…</span>
              <kbd>Ctrl K</kbd>
            </button>
            <a className="docs-topbar__figma" href={FIGMA_FILE} target="_blank" rel="noreferrer">
              Figma
            </a>
          </div>
        </div>
      </header>

      <div className="docs-body">
        <aside className={menuOpen ? "docs-sidebar docs-sidebar--open" : "docs-sidebar"}>
          <div className="docs-sidebar__scroll">
            {nav.map((g) => (
              <div key={g.title} className="docs-nav-group">
                <p className="docs-nav-group__title">{g.title}</p>
                {g.items.map((it) => (
                  <a
                    key={it.slug}
                    href={`#/${it.slug}`}
                    className={route === it.slug ? "docs-nav-item docs-nav-item--active" : "docs-nav-item"}
                  >
                    {it.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </aside>
        {menuOpen && <div className="docs-scrim" onClick={() => setMenuOpen(false)} />}

        <main className="docs-main">
          <article className="docs-article">
            <Page route={route} />
            {(prev || next) && (
              <div className="docs-pager">
                {prev ? (
                  <a className="docs-pager__link" href={`#/${prev.slug}`}>
                    <IconChevronLeft size={14} />
                    {prev.title}
                  </a>
                ) : (
                  <span />
                )}
                {next && (
                  <a className="docs-pager__link docs-pager__link--next" href={`#/${next.slug}`}>
                    {next.title}
                    <IconChevronRight size={14} />
                  </a>
                )}
              </div>
            )}
          </article>
          <Toc route={route} />
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function BurgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
