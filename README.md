# koa-router-with-directory

## Installation
``` sh
npm install koa-router-with-directory
```

# Usage

call attachDirToRouter before start koa server
``` typescript
import Koa from "koa";
import Router from "koa-router";
import { attachDirToRouter } from "koa-router-with-directory";
import * as path from "path";

const router = new Router();

const app = new Koa();
const port = 8080;

attachDirToRouter(router, path.join(__dirname, "routes/"))
  .then((rrouter) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port, () => {
      console.log(`listening ${port}`);
    });
  });
```

the project directory should be like below.
``` sh
project
|- routes
| |- some
| | |_ path
| |   |_ index.js
| |
| |_ another
|   |_ path
|     |_ index.js
|
|_ server.js
```

routed files should be named "index.js" and have one or more methods named get|post|put|delete.
``` typescript
import { Context } ffrom "koa";
export function get(ctx: Context){}
export function post(ctx: Context){}
export function put(ctx: Context){}
export function Delete(ctx: Context){}
```
