import fg from "fast-glob";
import http from "http";
import * as path from "path";
import { extractHandlerMappings, hasMethod } from "@/util";

const METHODS = http.METHODS.map((method) => method.toLowerCase());

export async function attachDirToRouter<T>(
  router: T,
  source: string,
): Promise<T> {
  if (router == null || typeof router !== "object") {
    throw new Error("router instance is required");
  }

  const files = await fg(`${source}/**/*.(ts|js)`, { onlyFiles: true });
  const indexFiles = files
    .filter((file) => path.basename(file) === "index.js")
    .sort();

  for (const file of indexFiles) {
    const f = path.relative(source, file);
    const targetModule = await import(file);
    const modulePath = `/${f.slice(0, f.lastIndexOf(path.sep) + 1)}`.replace(
      /\/_/g,
      "/:",
    );
    const basename = path.basename(f, path.extname(f));
    for (const { method, handlerName } of extractHandlerMappings(
      targetModule,
      METHODS,
    )) {
      if (hasMethod(router, method) === false) {
        continue;
      }
      router[method](
        `${modulePath}${basename === "index" ? "" : basename}`.replace(
          /\\/g,
          "/",
        ),
        targetModule[handlerName],
      );
    }
  }
  return router;
}
