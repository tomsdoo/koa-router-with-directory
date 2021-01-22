import Router from "koa-router";
import * as fs from "fs";
import * as path from "path";

export async function attachDirToRouter( router: Router, provided_path: string ) {
  const files = await (async function readdirRecursively(dir: string, files: string[] = []) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const dirs : string[] = [];
    for(const dirent of dirents) {
      const mypath = `${dir}/${dirent.name}`;
      [
        dirent.isDirectory() ? dirs : [],
        dirent.isFile() ? files : []
      ].forEach((arr) => {
        arr.push(mypath);
      });
    }
    for(const d of dirs) {
      files = await readdirRecursively(d, files);
    }
    return Promise.resolve(files);
  })
  (provided_path);

  files
  // .filter((file) => path.extname(file) === ".js")
  .filter((file) => path.basename(file) === "index.js")
  .forEach((file) => {
    const f = path.relative(provided_path, file);
    const tempm = require(file);
    const mpath = `/${f.slice(0, f.lastIndexOf("/")+1)}`.replace(/_/g, ":");
    const basename = path.basename(f, path.extname(f));
    ["get","post","put","delete"]
    .filter((method) => {
      for(const tempmethod in tempm){
        if(tempmethod.toUpperCase() === method.toUpperCase()){return true;}
      }
      return false;
    })
    .forEach((method) => {
      // @ts-ignore
      router[method](`${mpath}${basename === "index" ? "" : basename}`, tempm[method]);
    });
  });
  return Promise.resolve(router);

};

export default attachDirToRouter;
