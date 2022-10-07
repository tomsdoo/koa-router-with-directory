import Router from "koa-router";
import * as fs from "fs";
import * as path from "path";

export async function attachDirToRouter(
  router: Router,
  providedPath: string
): Promise<Router> {
  const files = await (async function readdirRecursively(
    dir: string,
    files: string[] = []
  ) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const dirs: string[] = [];
    for (const dirent of dirents) {
      const mypath = `${dir}/${dirent.name}`;
      if (dirent.isDirectory()) {
        dirs.push(mypath);
      } else if (dirent.isFile()) {
        files.push(mypath);
      }
    }
    for (const d of dirs) {
      files = await readdirRecursively(d, files);
    }
    return files;
  })(providedPath);

  files
    // .filter((file) => path.extname(file) === ".js")
    .filter((file) => path.basename(file) === "index.js")
    .forEach((file) => {
      const f = path.relative(providedPath, file);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const tempm = require(file);
      const mpath = `/${f.slice(0, f.lastIndexOf(path.sep) + 1)}`.replace(
        /_/g,
        ":"
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
        .filter((mset) => mset.functionname)
        .forEach((mset) => {
          // @ts-expect-error
          router[mset.method](
            `${mpath}${basename === "index" ? "" : basename}`.replace(
              /\\/g,
              "/"
            ),
            // @ts-expect-error
            tempm[mset.functionname]
          );
        });
    });
  return await Promise.resolve(router);
}

export default attachDirToRouter;
