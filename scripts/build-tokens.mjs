// Consyst UI — сборка токенов.
// Источник: src/tokens/primitives.json + src/tokens/semantic.json
// Результат:
//   1) переменные в src/styles/consyst.css (между маркерами <generated>)
//   2) src/tokens/contrast.json — отчёт по контрасту для документации
// Если пара текст/фон не проходит WCAG AA — скрипт завершается с ошибкой.
// Запуск: npm run tokens
import fs from "node:fs";

const primitives = JSON.parse(fs.readFileSync("src/tokens/primitives.json", "utf8"));
const semantic = JSON.parse(fs.readFileSync("src/tokens/semantic.json", "utf8"));
const THEMES = ["light", "dark"];

/* ---------------- helpers ---------------- */
const isRef = (v) => /^[a-z]+-\d+$/.test(v);
const resolveHex = (v) => {
  if (!isRef(v)) return v;
  const [family, step] = v.split("-");
  const hex = primitives[family]?.[step];
  if (!hex) throw new Error(`Неизвестный примитив: ${v}`);
  return hex;
};
const toVar = (v) => (isRef(v) ? `var(--${v})` : v);

function rgb(color) {
  if (color.startsWith("#")) {
    const h = color.slice(1);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const m = color.match(/rgba?\(([^)]+)\)/);
  return m[1].split(",").slice(0, 3).map((x) => Number(x.trim()));
}
function luminance(color) {
  const [r, g, b] = rgb(color).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/* ---------------- flatten semantic ---------------- */
const tokens = {}; // name -> { light, dark, note, group }
for (const [group, items] of Object.entries(semantic.groups)) {
  for (const [name, [light, dark, note]] of Object.entries(items)) tokens[name] = { light, dark, note, group };
}

/* ---------------- CSS ---------------- */
const out = [];
out.push(":root {");
out.push("  /* Слой 1 — примитивы (не используйте в компонентах напрямую) */");
for (const [family, steps] of Object.entries(primitives)) {
  if (family.startsWith("$")) continue;
  for (const [step, hex] of Object.entries(steps)) out.push(`  --${family}-${step}: ${hex};`);
}
out.push("}");
out.push("");
for (const theme of THEMES) {
  const selector = theme === "light" ? ':root,\n[data-theme="light"]' : '[data-theme="dark"]';
  out.push(`/* Слой 2 — семантика: ${theme} */`);
  out.push(`${selector} {`);
  out.push(`  color-scheme: ${theme};`);
  let last = "";
  for (const [name, t] of Object.entries(tokens)) {
    if (t.group !== last) {
      out.push(`  /* ${t.group} */`);
      last = t.group;
    }
    out.push(`  --color-${name}: ${toVar(t[theme])};`);
  }
  out.push("}");
  out.push("");
}

const file = "src/styles/consyst.css";
const START = "/* <generated> */";
const END = "/* </generated> */";
const css = fs.readFileSync(file, "utf8");
const a = css.indexOf(START);
const b = css.indexOf(END);
if (a < 0 || b < 0) throw new Error("В consyst.css нет маркеров <generated>");
fs.writeFileSync(file, css.slice(0, a + START.length) + "\n" + out.join("\n") + css.slice(b));

/* ---------------- contrast ---------------- */
const report = [];
let failed = 0;
for (const [fg, bg, min] of semantic.contrast.pairs) {
  const row = { fg, bg, min };
  for (const theme of THEMES) {
    const fgHex = resolveHex(tokens[fg][theme]);
    const bgHex = resolveHex(tokens[bg][theme]);
    const ratio = Math.round(contrast(fgHex, bgHex) * 100) / 100;
    row[theme] = ratio;
    if (ratio < min) {
      failed++;
      console.error(`✗ ${theme}: --color-${fg} на --color-${bg} = ${ratio} (нужно ≥ ${min})`);
    }
  }
  report.push(row);
}
const resolved = {};
for (const [name, t] of Object.entries(tokens)) {
  resolved[name] = { light: t.light, dark: t.dark, lightHex: resolveHex(t.light), darkHex: resolveHex(t.dark), note: t.note, group: t.group };
}
fs.writeFileSync("src/tokens/contrast.json", JSON.stringify({ pairs: report, tokens: resolved }, null, 2));

const count = Object.values(primitives).filter((v) => typeof v === "object").reduce((n, s) => n + Object.keys(s).length, 0);
console.log(`Примитивов: ${count}, семантических: ${Object.keys(tokens).length} × ${THEMES.length} темы, пар контраста: ${report.length}`);
if (failed) {
  console.error(`Контраст: ${failed} нарушений WCAG AA`);
  process.exit(1);
}
console.log("Контраст: все пары проходят WCAG AA ✓");
