export function hasMethod(
  router: unknown,
  method: string,
): router is {
  [method]: (
    path: string,
    handler: (ctx: unknown, next: unknown) => Promise<void>,
  ) => void;
} {
  if (router == null || typeof router !== "object") {
    return false;
  }
  return method in router;
}

export function extractHandlerMappings(
  targetModule: {
    [key: string]: (ctx: unknown, next?: unknown) => Promise<void>;
  },
  methods: string[],
) {
  const results: {
    method: string;
    handlerName: string;
  }[] = [];
  for (const method of methods) {
    for (const targetMethod in targetModule) {
      if (targetMethod.toUpperCase() === method.toUpperCase()) {
        results.push({
          method,
          handlerName: targetMethod,
        });
      }
    }
  }
  return results;
}
