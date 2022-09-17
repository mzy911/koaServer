const route = require("koa-route"); // 路由
const fs = require("fs");
const path = require("path");

// 写入文档
const meinv = (ctx) => {
  fs.writeFile(
    path.resolve(path.join(__dirname, "../public/data/mine-component.json")),
    JSON.stringify({ 老师: "你是王不蛋" }),
    "utf-8",
    function (err, dataStr) {}
  );
  ctx.response.type = "png";
  ctx.response.body = fs.readFileSync(
    path.resolve(
      path.join(
        __dirname,
        "../public/image/upload_2ef583fdd8cdeaa5cfbe31671f9008c9.png"
      )
    )
  );
};

// 读取
const main = (ctx) => {
  fs.readFile(
    path.resolve(path.join(__dirname, "../public/data/mine-component.json")),
    "utf-8",
    function (err, dataStr) {}
  );

  ctx.response.type = "html";
  ctx.response.body = '<a href="/">Index Page</a>';
};

module.exports = {
  meinv,
  main,
};
