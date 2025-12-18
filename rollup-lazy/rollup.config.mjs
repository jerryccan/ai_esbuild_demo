import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import esbuild from "rollup-plugin-esbuild"
import { default as analyze } from "rollup-plugin-analyzer"
import fs from "node:fs/promises"

const outDir = "./dist"

// 构建前清空 dist（跨平台）
const cleanPlugin = {
  name: "clean",
  async buildStart() {
    await fs.rm(outDir, { recursive: true, force: true })
    await fs.mkdir(outDir, { recursive: true })
  },
}

export default {
  input: "./index.ts",
  output: {
    dir: outDir,
    format: "esm",
    sourcemap: "inline", // 行内 sourcemap
    entryFileNames: "[name].js",
    chunkFileNames: "[name]-[hash].js", // 动态 import 产物
  },
  plugins: [
    cleanPlugin,
    resolve({ browser: true }),
    commonjs(),
    esbuild({ target: "es2018" }), // 使用 esbuild 转译 TS
    analyze({ summaryOnly: true }), // 简要体积分析
  ],
}
