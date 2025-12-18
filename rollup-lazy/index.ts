console.log("Rollup demo start")

async function main() {
  const { default: _ } = await import("lodash")
  const msg = _.join(["Hello", "rollup", "async", "lodash"], " ")
  const el = document.createElement("div")
  el.id = "app"
  el.textContent = msg
  document.body.appendChild(el)
}

main().catch((err) => {
  console.error("Failed to load lodash asynchronously:", err)
})
