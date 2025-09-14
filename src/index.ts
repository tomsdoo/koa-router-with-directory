import fg from "fast-glob";
import http from "http";
import * as path from "path";

const METHODS = http.METHODS.map((method) => method.toLowerCase());

function hasMethod(
  router: unknown,
  method: string,
): router is {
  [method]: (
    path: string,
    handler: (ctx: unknown, next: unknown) => Promise<void>,
  ) => void;
} {
  if (router == null || typeof router !== "object") {
    return false;
  }
  return method in router;
}

export async function attachDirToRouter<T>(
  router: T,
  source: string,
): Promise<T> {
  if (router == null || typeof router !== "object") {
    throw new Error("router instance is required");
  }

  const files = await fg(`${source}/**/*.(ts|js)`, { onlyFiles: true });
  for (const file of files
    .filter((file) => path.basename(file) === "index.js")
    .sort()) {
    const f = path.relative(source, file);
    const targetModule = await import(file);
    const modulePath = `/${f.slice(0, f.lastIndexOf(path.sep) + 1)}`.replace(
      /\/_/g,
      "/:",
    );
    const basename = path.basename(f, path.extname(f));
    METHODS.map((method) => {
      for (const targetMethod in targetModule) {
        if (targetMethod.toUpperCase() === method.toUpperCase()) {
          return { method, handlerName: targetMethod };
        }
      }
      return { method, handlerName: null };
    })
      .filter(
        (module): module is { method: string; handlerName: string } =>
          module.handlerName != null,
      )
      .forEach(({ method, handlerName }) => {
        if (method in router === false) {
          return;
        }
        if (hasMethod(router, method) === false) {
          return;
        }
        router[method](
          `${modulePath}${basename === "index" ? "" : basename}`.replace(
            /\\/g,
            "/",
          ),
          targetModule[handlerName],
        );
      });
  }
  return router;
}
