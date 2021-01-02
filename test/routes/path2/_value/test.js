exports.get = function(ctx, next) {
  ctx.response.status = 200;
  ctx.response.type = "application/json";
  ctx.response.body = JSON.stringify({message: "ok"});
};
exports.put = function(ctx, next) {
  ctx.response.status = 200;
  ctx.response.type = "application/json";
  ctx.response.body = JSON.stringify({message: "ok"});
};
