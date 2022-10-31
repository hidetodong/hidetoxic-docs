# 网易云信SDK H5使用

## 前言
其实作为标准化产品来说，网易云信的demo已经给的比较完整了，基本项目中的IM功能都包括了。但我们公司使用kbone作为小程序和h5的跨端方案，导致不管使用小程序的demo还是h5的demo都没法很好的兼容，无奈只能使用SDK全部重写了。

## 项目建立
### 1.git仓库建立
常规空白仓库建立流程，不赘述
### 2.vue项目建立
使用vue-cli3建立常规项目

## 准备工作
### 1.SDK准备
前往链接 [网易云信SDK下载](https://yunxin.163.com/im-sdk-demo)

将获取的SDK存放至```src/utils```文件夹

### 2.工具函数准备

建立```src/utils/NIM_related.js```

```javascript
import { getUserInfo, getShopInfo } from "../api/index";

export function getServiceParams(params) {
  let user = new Promise((resolve, reject) => {
    getUserInfo()
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  if(params.shop_id){
    let shop = new Promise((resolve, reject) => {
      getShopInfo({
        shop_id: params.shop_id,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return Promise.all([user,shop])
  }
  return Promise.all([user])
}
```
```getServiceParams()```
