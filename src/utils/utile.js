const route = require("koa-route"); // 路由
const fs = require("fs");
const path = require("path");

// 写入文档
const wirteFile = (path, data) => {
  fs.writeFile(
    path.resolve(path.join(__dirname, `../public/data/${path}`)),
    data,
    "utf-8"
  );
};

// 读取
const readFileSync = (path) => {
  return fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
};

// 读取
const isExists = (filePath, callBack) => {
  fs.exists(filePath, (exists) => {
    if (!exists) {
      callBack();
    } else {
      console.log("文件已存在");
    }
  });
};

module.exports = {
  wirteFile,
  readFileSync,
  isExists,
};
