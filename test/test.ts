import Router from "koa-router";
import { attachDirToRouter } from "../src/index";
import * as path from "path";
import { strict as assert } from "assert";
import { describe, it, before } from "mocha";

let router: Router;

describe(`routes`, () => {
  before(async () => {
    router = await attachDirToRouter(
      new Router(),
      path.join(__dirname, "routes/")
    );
  });

  it("count of paths", () => {
    const pathSet = new Set(router.stack.map(({ path }) => path));
    assert.equal(pathSet.size, 2);
  });

  it("combinations", () => {
    const expected = [
      { method: "GET", path: "/path1/:name/" },
      { method: "GET", path: "/path2/:value/" },
      { method: "POST", path: "/path2/:value/" },
    ];

    assert(
      expected.every(({ method, path }) =>
        router.stack.find(
          ({ methods, path: layerPath }) =>
            methods.includes(method) && path === layerPath
        )
      )
    );
  });
});
