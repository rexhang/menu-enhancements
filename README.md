# menu-enhancements

这是一个不错的扩展，可以在你打开的任何文件内容区域内右键 直接打开所在的磁盘目录，并且高亮显示，以及复制文件路径等功能。

> 如何开发

```bash
npm i -g yo generator-code vsce
```

初始化选择 `ts` & `yarn`

#### dev
```bash
yarn install
```

`F5` 进行实例化调试，`ctrl+shift+i` 打开 **devtools**

### build
```bash
npm run build
```

### how to install

![image](https://github.com/rexhang/menu-enhancements/assets/14832793/a351b6a7-e1fe-4624-a6d9-5fc371001ddc)

然后勾选[发布/构建]的VSIX文件即可 [传送门](https://github.com/rexhang/menu-enhancements/releases)

### preview

![image](https://github.com/rexhang/menu-enhancements/assets/14832793/6cf636d3-29e4-4808-9a1c-942fd0053d1d)

![image](https://github.com/rexhang/menu-enhancements/assets/14832793/ac947521-0b04-4009-951a-f1b1e609cd1b)

### how to use

如需更改复制文件路径的拼接符号，请到用户设置里面添加这一项

```json
"explorer.copyRelativePathSeparator": "/",
```

ps: 取值范围: `/` `\\` `auto` 默认 `auto` 其中 `\\` 是转义符(\) + `\` 所以最终地址应该是 **app\image\avatar.png** window系统盘路径支持 `/`  到 `\` 的转换 无需担心。

