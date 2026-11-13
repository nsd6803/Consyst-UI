// Генерирует векторные иконки для src/registry/icons.tsx из Font Awesome Free Solid.
// Иконки становятся inline-SVG: не нужен шрифт, работают на любом устройстве.
//
// Список иконок задаётся в самом icons.tsx строками вида
//   export const IconHome = createIcon("IconHome", [512, 512, "M…"]); // house
// Скрипт берёт имя FA из комментария и обновляет ширину, высоту и path.
// Чтобы добавить иконку: допишите строку с любым path ("") и нужным именем
// FA в комментарии, затем запустите `npm run icons`.
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const proIndex = process.argv.indexOf("--pro");
const proDir = proIndex > -1 ? process.argv[proIndex + 1] : undefined;

const require = createRequire(import.meta.url);
const fas = require("@fortawesome/free-solid-svg-icons");
const file = new URL("../src/registry/icons.tsx", import.meta.url);

// имя FA (включая алиасы) → определение
const byName = new Map();
for (const def of Object.values(fas)) {
  if (!def || !Array.isArray(def.icon)) continue;
  byName.set(def.iconName, def);
  for (const alias of def.icon[2]) if (typeof alias === "string" && !byName.has(alias)) byName.set(alias, def);
}

const lineRe = /^export const (Icon\w+) = createIcon\("(Icon\w+)", .*\); \/\/ ([a-z0-9-]+)(.*)$/;
const missing = [];
let count = 0;
const src = readFileSync(file, "utf8")
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((line) => {
    const m = line.match(lineRe);
    if (!m) return line;
    const [, name, , fa, rest] = m;
    // Опционально: локальная папка Font Awesome Pro (svgs-full/solid) — `npm run icons -- --pro <папка>`
    if (proDir && existsSync(`${proDir}/${fa}.svg`)) {
      const svg = readFileSync(`${proDir}/${fa}.svg`, "utf8");
      const [, pw, ph] = svg.match(/viewBox="0 0 (\d+) (\d+)"/) ?? [];
      const pd = [...svg.matchAll(/ d="([^"]+)"/g)].map((x) => x[1]).join(" ");
      if (pw && pd) {
        count++;
        return `export const ${name} = createIcon("${name}", [${pw}, ${ph}, "${pd}"]); // ${fa}${rest}`;
      }
    }
    const def = byName.get(fa);
    if (!def) {
      missing.push(`${name} (${fa})`);
      return line;
    }
    const [w, h, , , path] = def.icon;
    const d = Array.isArray(path) ? path.join(" ") : path;
    count++;
    return `export const ${name} = createIcon("${name}", [${w}, ${h}, "${d}"]); // ${fa}${rest}`;
  })
  .join("\n");

writeFileSync(file, src);
console.log(`Иконок: ${count}`);
if (missing.length) {
  console.error(`Нет во Font Awesome Free: ${missing.join(", ")}`);
  process.exit(1);
}
