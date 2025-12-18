# esbuild-demo

一个使用 esbuild 打包、通过动态 import 异步加载 lodash 的最小示例。

## 目录
- `index.ts`：入口文件，动态导入 lodash（esbuild-demo/index.ts:1）
- `index.html`：简单页面，加载打包产物（esbuild-demo/index.html:12）
- `esbuild.config.mjs`：构建配置，包含清理、体积分析与行内 source map（esbuild-demo/esbuild.config.mjs:8-9,16,21,24-27）
- `dist/`：打包输出目录

## 快速开始
1. 安装依赖（已安装可跳过）：
   - `npm install`
2. 构建：
   - `npm run build`
   - 每次构建前会自动清空 `dist/`（跨平台清理，见 esbuild-demo/esbuild.config.mjs:8-9）
3. 预览：
   - 直接用浏览器打开 `index.html`，页面会在运行时异步加载 `lodash-*.js`。

## 构建要点
- 代码拆分：`splitting: true` + `format: "esm"`（esbuild-demo/esbuild.config.mjs:14-15）
- 行内 source map：`sourcemap: "inline"`（esbuild-demo/esbuild.config.mjs:16），不会生成独立 `.map` 文件，体积会增大属正常。
- 生成体积元信息：`metafile: true` 并在构建后打印分析报告（esbuild-demo/esbuild.config.mjs:21,24-27）。

## 包体积分析
- 运行 `npm run build` 后，终端会输出 `=== Bundle Size Analysis ===` 报告，展示各产物及其依赖体积占比。
- 进一步可视化：可按需使用 `source-map-explorer`（需额外安装），或开启独立 source map（将 `sourcemap` 改为 `true`）。

## 优化建议（可选）
- 按需引入 lodash 子模块，例如：
  ```ts
  import debounce from "lodash/debounce"
  ```
- 开启压缩：在配置中加入 `minify: true`。
