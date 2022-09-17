const koaBody = require("koa-body");
const router = require("koa-router")(); // 注意：不是koa-route
const route = require("koa-route");
const fs = require("fs");
const qs = require("qs");
const path = require("path");

// 新增数据
router.post("/package/item/add", koaBody(), async (ctx) => {
  let getData = ctx.request.body;
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data.push(getData);
  fs.writeFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    JSON.stringify({ data: data }),
    "utf-8"
  );
  ctx.body = { msg: "添加成功" };
});

// 更新列表数据 /
router.post("/package/item/update", koaBody(), async (ctx) => {
  let getData = ctx.request.body;
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data = data.map((item) => {
    if (item.id == getData.id) {
      return getData;
    } else {
      return item;
    }
  });
  fs.writeFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    JSON.stringify({ data: data }),
    "utf-8"
  );
  ctx.body = { msg: "更新数据成功" };
});

// 删除数据
router.post("/package/item/delete", koaBody(), async (ctx) => {
  let getData = ctx.request.body;
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data = data.filter((item) => item.id != getData.id);
  fs.writeFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    JSON.stringify({ data: data }),
    "utf-8"
  );
  ctx.body = { msg: "添加成功" };
});

// 获取当前数据详情
router.get("/package/item/detail", koaBody(), async (ctx) => {
  let id = ctx.url.split("=")[1];
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data = data.filter((item) => item.id == id);
  if (data[0]) {
    ctx.body = { msg: "获取成功", data: data[0] };
  } else {
    ctx.body = { msg: "获取失败" };
  }
});

// 获取列表数据 /
router.post("/package/item/page/list", koaBody(), async (ctx) => {
  let body = ctx.request.body;
  let readData = fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
  let data = JSON.parse(readData).data;
  data = Object.entries(body).reduce((res, [key, item]) => {
    return res.filter((cur) => cur[key] == item);
  }, data);
  ctx.response.body = {
    total: data.length || 0,
    list: data || [],
  };
});

exports.mineComponentRouter = router;
// module.exports = router;
