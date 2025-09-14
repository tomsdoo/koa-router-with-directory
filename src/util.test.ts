import { describe, expect, it, vi } from "vitest";
import { extractHandlerMappings, hasMethod } from "@/util";

const { router, targetModule } = vi.hoisted(() => ({
  router: {
    get() {},
    post() {},
    put() {},
    patch() {},
    delete() {},
    options() {},
  },
  targetModule: {
    async get(ctx: unknown, next: unknown) {},
    async post(ctx: unknown, next: unknown) {},
  },
}));

describe("hasMethod()", () => {
  it("false if route is null", () => {
    expect(hasMethod(null, "get")).toBe(false);
  });

  it("accepts class instance", () => {
    class TestRouter {
      get() {}
    }
    expect(hasMethod(new TestRouter(), "get")).toBe(true);
    expect(hasMethod(new TestRouter(), "post")).toBe(false);
  });

  it.each([
    {
      methodName: "get",
      expected: true,
    },
    {
      methodName: "post",
      expected: true,
    },
    {
      methodName: "put",
      expected: true,
    },
    {
      methodName: "patch",
      expected: true,
    },
    {
      methodName: "delete",
      expected: true,
    },
    {
      methodName: "options",
      expected: true,
    },
    {
      methodName: "nothing",
      expected: false,
    },
  ])("$methodName exists: $expected", ({ methodName, expected }) => {
    expect(hasMethod(router, methodName)).toBe(expected);
  });
});

describe("extractHandlerMappings()", () => {
  it.each([
    {
      method: "GET",
      handlerName: "get",
      expectedExists: true,
    },
    {
      method: "POST",
      handlerName: "post",
      expectedExists: true,
    },
    {
      method: "PUT",
      handlerName: "put",
      expectedExists: false,
    },
  ])(
    "{ method: $method, handlerName: $handlerName } exists: $expectedExists",
    ({ method, handlerName, expectedExists }) => {
      expect(
        extractHandlerMappings(targetModule, ["GET", "POST", "PUT"]),
      ).toSatisfy((mappings: { method: string; handlerName: string }[]) => {
        expect(
          mappings.find(
            (mapping) =>
              mapping.method === method && mapping.handlerName === handlerName,
          ) != null,
        ).toBe(expectedExists);
        return true;
      });
    },
  );
});
