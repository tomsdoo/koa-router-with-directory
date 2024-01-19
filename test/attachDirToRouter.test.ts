import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { attachDirToRouter } from "../src/index";
import { fileURLToPath } from "node:url";

const { spyGet, spyPost, spyPut, spyDelete } = vi.hoisted(() => ({
  spyGet: vi.fn(),
  spyPost: vi.fn(),
  spyPut: vi.fn(),
  spyDelete: vi.fn(),
}));

type Handler = (path: string, f: () => Promise<void>) => unknown;
interface Router {
  get: Handler;
  post: Handler;
  put: Handler;
  delete: Handler;
}

describe("attachDirToRouter()", () => {
  let router: Router;
  beforeEach(() => {
    router = {
      get: spyGet,
      post: spyPost,
      put: spyPut,
      delete: spyDelete,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("proceeding the test files", async () => {
    await attachDirToRouter(
      router,
      fileURLToPath(new URL("./routes/", import.meta.url)),
    );
    expect(spyGet).toHaveBeenCalledTimes(4);
    expect(spyGet).toHaveBeenNthCalledWith(
      1,
      "/:user/:article/",
      expect.anything(),
    );
    expect(spyGet).toHaveBeenNthCalledWith(
      2,
      "/:user/:connection_string/",
      expect.anything(),
    );
    expect(spyGet).toHaveBeenNthCalledWith(
      3,
      "/path1/:name/",
      expect.anything(),
    );
    expect(spyGet).toHaveBeenNthCalledWith(
      4,
      "/path2/:value/",
      expect.anything(),
    );
  });
});
