const koaBody = require("koa-body");
const router = require("koa-router")(); // 注意：不是koa-route
const route = require("koa-route");
const fs = require("fs");
const qs = require("qs");
const path = require("path");

// 更新列表数据 /
router.post("/package/item/up", koaBody(), async (ctx) => {
  let getData = ctx.request.body;
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data = data.map((item) => {
    if (item.id == getData.id) {
      item.status = getData.status;
    }
    return item;
  });
  fs.writeFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    JSON.stringify({ data: data }),
    "utf-8"
  );
  ctx.body = { msg: `${getData.name}已上架` };
});
router.post("/package/item/down", koaBody(), async (ctx) => {
  let getData = ctx.request.body;
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data = data.map((item) => {
    if (item.id == getData.id) {
      item.status = getData.status;
    }
    return item;
  });
  fs.writeFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    JSON.stringify({ data: data }),
    "utf-8"
  );
  ctx.body = { msg: `${getData.name}已下架` };
});

// exports.packageItemAuditPageList = packageItemAuditPageList;
exports.moduleManageApi = router;
// module.exports = router;
