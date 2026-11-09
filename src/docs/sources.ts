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
