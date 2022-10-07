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

  it("paths", () => {
    const expected = [
      "/:user/:article/",
      "/:user/:connection_string/",
      "/path1/:name/",
      "/path2/:value/",
    ];

    assert.equal(
      JSON.stringify(
        Array.from(new Set(router.stack.map(({ path }) => path))).sort()
      ),
      JSON.stringify(expected.sort())
    );
  });

  it("combinations", () => {
    const expected = [
      { method: "GET", path: "/:user/:article/" },
      { method: "GET", path: "/:user/:connection_string/" },
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
