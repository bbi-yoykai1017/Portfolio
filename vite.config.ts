// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "fs/promises";
import path from "path";

function rootIndexHtmlPlugin() {
  return {
    name: "serve-root-index-html",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.method !== "GET") return next();
        const url = req.url?.split("?")[0];
        if (url !== "/index.html") return next();

        try {
          const html = await fs.readFile(path.resolve(process.cwd(), "index.html"), "utf-8");
          res.setHeader("content-type", "text/html; charset=utf-8");
          res.end(html);
        } catch (error) {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [rootIndexHtmlPlugin()],
  },
});
