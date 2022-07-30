// @ts-ignore
import Router from "koa-router";
import { attachDirToRouter } from "../src/index";
import * as path from "path";
import { strict as assert } from "assert";
import { describe, it, before } from "mocha";

const router = new Router();

let r_router = router;

describe(`routes`, () => {
  before(async () => {
    r_router = await attachDirToRouter(
      router,
      path.join(__dirname, "routes/")
    );
  });

  it("count of paths", () => {
    const pathSet = new Set();
    r_router.stack.forEach(({ path }) => {
      pathSet.add(path);
    });
    assert.equal(pathSet.size, 2);
  });

  it(`get routes`, () => {
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
  });
});
