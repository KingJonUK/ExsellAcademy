/**
 * `next/font/google` shim. The real fonts are loaded via <link> tags in
 * index.html and wired to CSS variables in index.css, so these helpers just
 * return empty class/variable strings.
 */
type FontResult = { className: string; variable: string; style: { fontFamily: string } };

export function Inter(_opts?: unknown): FontResult {
  return { className: "", variable: "", style: { fontFamily: "Inter, sans-serif" } };
}

export function Inter_Tight(_opts?: unknown): FontResult {
  return { className: "", variable: "", style: { fontFamily: "'Inter Tight', sans-serif" } };
}
