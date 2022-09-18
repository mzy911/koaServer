const router = require("koa-router")(); // 注意：不是koa-route
const koaForm = require("formidable-upload-koa");
const path = require("path");
const send = require("koa-send");
const fs = require("fs");
const koaBody = require("koa-body");

const { Hash } = require("crypto");
const { get } = require("http");
const { isExistsFile } = require("../utils/utile");

// 1、检测是否上传完毕（秒传）
router.post("/upload/check/uploaded", koaBody(), async (ctx, next) => {
  let { name } = ctx.request.body;
  const newFilePath = path.join(__dirname, `../public/uploadMultiple/${name}`);
  const isExist = await isExistsFile(newFilePath);
  console.log("name", name, isExist);

  ctx.body = {
    exist: isExist,
  };
});

// 2、获取上传过的chunk
router.post(
  "/upload/check/chunk",
  koaForm({
    uploadDir: path.join(__dirname, "../public/uploadMultiple/"), // 文件存放的位置
    keepExtensions: true, // 包含扩展名
  }),
  async (ctx, next) => {
    const { hash, name, type, size } = ctx.req.fields;
    const imgName = ctx.req.files.file.path.split("/").slice(-1)[0];
    fs.renameSync(
      path.join(__dirname, `../public/uploadMultiple/${imgName}`),
      path.join(__dirname, `../public/uploadMultiple/${hash}.gif`)
    );
    //修改图片之前的名字
    ctx.body = {
      mag: "lala",
    };
  }
);

// 3、合并chunk
router.post("/upload/merge/chunk", koaBody(), async (ctx, next) => {
  let { hash, suffix, name, chunkNum } = ctx.request.body;
  const newFilePath = path.join(__dirname, `../public/uploadMultiple/${name}`);

  const isExist = await isExistsFile(newFilePath);
  if (!isExist) {
    const fileWriteStream = fs.createWriteStream(newFilePath, {
      flags: "a",
    });
    for (let i = 1; i <= chunkNum; i++) {
      await mergeFiles(
        path.join(__dirname, `../public/uploadMultiple/${hash}${i}.${suffix}`),
        i
      );
    }
    function mergeFiles(fileName, index) {
      return new Promise((resolve, reject) => {
        var rs = fs.createReadStream(fileName);
        rs.on("data", function (data) {
          fileWriteStream.write(data);
        });
        rs.on("end", function () {
          fs.unlink(fileName, () => {});
          resolve("xx");
          if (index == chunkNum) {
            fileWriteStream.end();
          }
        });
      });
    }
  }

  ctx.body = {
    msg: "合并",
  };
});

module.exports = router;
