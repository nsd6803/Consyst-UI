import type { ComponentType } from "react";

/** Живые компоненты примеров */
const exampleModules = import.meta.glob<{ default: ComponentType }>("../examples/*.tsx", { eager: true });
/** Исходники примеров — именно их показываем во вкладке «Код» */
const exampleSources = import.meta.glob<string>("../examples/*.tsx", { query: "?raw", import: "default", eager: true });
/** Исходники компонентов для копирования */
const registrySources = import.meta.glob<string>("../registry/*", { query: "?raw", import: "default", eager: true });
const tokensSource = import.meta.glob<string>("../styles/consyst.css", { query: "?raw", import: "default", eager: true });

const base = (p: string) => p.split("/").pop()!.replace(/\.tsx$/, "");

export const examples: Record<string, { Component: ComponentType; code: string }> = {};
for (const [path, mod] of Object.entries(exampleModules)) {
  examples[base(path)] = { Component: mod.default, code: exampleSources[path].trim() };
}

export const registryFile = (name: string) => (registrySources[`../registry/${name}`] ?? "").trim();
export const tokensCss = Object.values(tokensSource)[0].trim();

/** Общие файлы — ставятся один раз при установке (страница «Установка») */
export const BASE_FILES = ["utils.ts", "icons.tsx", "icons.css"];

const exists = (name: string) => `../registry/${name}` in registrySources;
const resolveLocal = (spec: string) => {
  const name = spec.replace(/^\.\//, "");
  if (/\.(css|ts|tsx)$/.test(name)) return exists(name) ? name : null;
  for (const ext of [".tsx", ".ts"]) if (exists(name + ext)) return name + ext;
  return null;
};

/**
 * Все файлы компонента с зависимостями (по импортам) и npm-пакеты.
 * Собственные файлы идут первыми, затем файлы других компонентов, базовые — отдельно.
 */
export function componentFiles(entry: string) {
  const files: string[] = [];
  const npm = new Set<string>();
  const visit = (name: string) => {
    if (files.includes(name)) return;
    files.push(name);
    const src = registrySources[`../registry/${name}`] ?? "";
    for (const m of src.matchAll(/(?:import|from)\s+["']([^"']+)["']/g)) {
      const spec = m[1];
      if (spec.startsWith("./")) {
        const r = resolveLocal(spec);
        if (r) visit(r);
      } else if (spec !== "react" && spec !== "react-dom") {
        npm.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
      }
    }
  };
  visit(entry);
  const stem = entry.replace(/\.tsx?$/, "");
  const own = files.filter((f) => f.replace(/\.(tsx?|css)$/, "") === stem);
  const shared = files.filter((f) => !own.includes(f) && !BASE_FILES.includes(f));
  const base = files.filter((f) => BASE_FILES.includes(f));
  return { own, shared, base, npm: [...npm] };
}
