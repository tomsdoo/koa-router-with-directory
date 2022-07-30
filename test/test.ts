// @ts-ignore
import Router from "koa-router";
import { attachDirToRouter } from "../src/index";
import * as path from "path";

const assert = require("assert");

const router = new Router();

describe(`routes`, () => {
  it(`get routes`, (done) => {
    (async () => {
      const r_router = await attachDirToRouter(router, path.join(__dirname, "routes/"));
      const myset = new Set();
      r_router.stack.forEach((layer: any) => {
        myset.add(layer.path);
      });
      assert(myset.size === 2, "count of paths");
      const result = [
        {method: "GET", path: "/path1/:name/"},
        {method: "GET", path: "/path2/:value/"},
        {method: "POST", path: "/path2/:value/"},
        // {method: "GET", path: "/path2/:value/test"},
        // {method: "PUT", path: "/path2/:value/test"},
      ].every((tempo) => {
        return r_router.stack.some((layer: any) => {
          return layer.methods.includes(tempo.method) && layer.path === tempo.path;
        });
      });
      assert(result, "some combinations are missing");
      done();
    })();
  });
});
