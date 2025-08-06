const path = "./dist";

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".yaml": "application/x-yaml",
  ".yml": "application/x-yaml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    let reqPath = decodeURIComponent(url.pathname);

    if (reqPath === "/") {
      reqPath = "/index.html";
    }

    const filePath = `${path}${reqPath}`;
    const file = Bun.file(filePath);

    if (!file.exists()) {
      return new Response("404 Not Found", { status: 404 });
    }

    const ext = reqPath.match(/\.[^.]+$/)?.[0] || "";
    const contentType = mimeTypes[ext] || "application/octet-stream";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
      },
    });
  },
});

console.log(`🚀 Swagger UI running at http://localhost:${server.port}`);
