import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/nextindex.ts"],
  format: ["cjs","esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
