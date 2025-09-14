import fg from "fast-glob";
import * as path from "path";

export async function attachDirToRouter<T>(
  router: T,
  source: string,
): Promise<T> {
  const files = await fg(`${source}/**/*.(ts|js)`, { onlyFiles: true });
  for (const file of files
    .filter((file) => path.basename(file) === "index.js")
    .sort()) {
    const f = path.relative(source, file);
    const tempm = await import(file);
    const mpath = `/${f.slice(0, f.lastIndexOf(path.sep) + 1)}`.replace(
      /\/_/g,
      "/:",
    );
    const basename = path.basename(f, path.extname(f));
    ["get", "post", "put", "delete"]
      .map((method) => {
        for (const tempmethod in tempm) {
          if (tempmethod.toUpperCase() === method.toUpperCase()) {
            return { method, functionname: tempmethod };
          }
        }
        return { method, functionname: null };
      })
      .filter(({ functionname }) => functionname != null)
      .forEach(({ method, functionname }) => {
        // @ts-expect-error method exists
        router[method as Method](
          `${mpath}${basename === "index" ? "" : basename}`.replace(/\\/g, "/"),
          // @ts-expect-error functionname exists
          tempm[functionname],
        );
      });
  }
  return router;
}
