import { build, analyzeMetafile } from "esbuild"
import fs from "node:fs/promises"

const outdir = "./dist"

async function main() {
  // 构建前清空并确保 dist 目录存在（跨平台）
  await fs.rm(outdir, { recursive: true, force: true })
  await fs.mkdir(outdir, { recursive: true })

  const result = await build({
    entryPoints: ["./index.ts"],
    bundle: true,
    splitting: true, // 允许代码拆分，配合 ESM 格式
    format: "esm",
    sourcemap: "inline", // 使用行内 sourcemap
    outdir,
    platform: "browser",
    target: ["es2018"],
    logLevel: "info",
    metafile: true, // 生成构建元信息，便于体积分析
    // 自定义拆分出来的 chunk 文件名：使用原始名称 + 内容哈希
    // 可用占位符：[name]、[hash]、[ext]、[dir]
    chunkNames: "chunks/[name]-[hash]",
  })

  // 输出体积分析报告（tree/table）
  const analysis = await analyzeMetafile(result.metafile, { color: true, verbose: true })
  console.log("\n=== Bundle Size Analysis ===\n")
  console.log(analysis)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
