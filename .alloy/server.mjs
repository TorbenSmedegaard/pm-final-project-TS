// Lightweight docs viewer for this PM final-project repo.
// Serves repo markdown rendered to HTML, plus raw assets (images, the roadmap HTML).
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

const ROOT = path.resolve(process.env.DOCS_ROOT || "/workspace");
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const SKIP = new Set([".git", "node_modules", ".alloy"]);

async function walk(dir, base = "") {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...(await walk(path.join(dir, entry.name), rel)));
    else out.push(rel);
  }
  return out.sort();
}

function layout({ title, nav, body }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
  :root{--bg:#0b1320;--panel:#111c2d;--line:#22344b;--text:#e8eef6;--muted:#9bb0c6;--accent:#25d0a8}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 Inter,system-ui,sans-serif}
  .wrap{display:flex;min-height:100vh;align-items:stretch}
  nav{width:300px;flex:0 0 300px;background:var(--panel);border-right:1px solid var(--line);padding:24px 20px}
  nav h2{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0 0 16px}
  nav ul{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-direction:column;gap:8px}
  nav a{color:var(--muted);text-decoration:none;font-size:14px;display:block;padding:6px 10px;border-radius:8px}
  nav a:hover,nav a[aria-current=page]{color:var(--text);background:#1a2a3f}
  main{flex:1;min-width:0;padding:40px;display:flex;justify-content:center}
  article{max-width:860px;width:100%}
  h1,h2,h3{line-height:1.25}
  a{color:var(--accent)}
  table{border-collapse:collapse;width:100%;margin:16px 0}
  th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;font-size:14px}
  code,pre{background:#0d1726;border:1px solid var(--line);border-radius:8px}
  code{padding:1px 5px;font-size:14px}
  pre{padding:14px;overflow:auto}
  pre code{border:0;padding:0}
  img{max-width:100%;border-radius:12px;border:1px solid var(--line)}
  blockquote{margin:16px 0;padding:8px 16px;border-left:3px solid var(--accent);color:var(--muted)}
  @media(max-width:900px){.wrap{flex-direction:column}nav{width:auto;flex:none;border-right:0;border-bottom:1px solid var(--line)}main{padding:24px}}
</style></head>
<body><div class="wrap"><nav>${nav}</nav><main><article>${body}</article></main></div></body></html>`;
}

async function buildNav(current) {
  const files = await walk(ROOT);
  const docs = files.filter((f) => f.endsWith(".md"));
  const assets = files.filter((f) => !f.endsWith(".md"));
  const item = (f) =>
    `<li><a href="/${f}"${f === current ? ' aria-current="page"' : ""}>${f}</a></li>`;
  return `<h2>Deliverables</h2><ul>${docs.map(item).join("")}</ul>
    <h2>Assets</h2><ul>${assets.map(item).join("")}</ul>`;
}

const server = http.createServer(async (req, res) => {
  try {
    let rel = decodeURIComponent(new URL(req.url, "http://localhost").pathname).replace(/^\/+/, "");
    if (rel === "" || rel === "index.html") rel = "README.md";
    const abs = path.resolve(ROOT, rel);
    if (!abs.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const stat = await fs.stat(abs).catch(() => null);
    if (!stat || stat.isDirectory()) {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(layout({ title: "Not found", nav: await buildNav(), body: "<h1>404</h1><p>No such document.</p>" }));
      return;
    }
    if (rel.endsWith(".md")) {
      const md = await fs.readFile(abs, "utf8");
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(layout({ title: rel, nav: await buildNav(rel), body: marked.parse(md) }));
      return;
    }
    res.writeHead(200, { "content-type": MIME[path.extname(abs).toLowerCase()] || "application/octet-stream" });
    res.end(await fs.readFile(abs));
  } catch (err) {
    res.writeHead(500).end("Internal error");
  }
});

server.listen(PORT, () => console.log(`docs viewer listening on http://localhost:${PORT}`));
