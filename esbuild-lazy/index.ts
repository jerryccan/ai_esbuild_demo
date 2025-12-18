console.log("App start");

async function main() {
  // 通过动态 import 异步加载 lodash
  const { default: _ } = await import("lodash");

  const msg = _.join(["Hello", "esbuild", "async", "lodash"], " ");
  const el = document.createElement("div");
  el.id = "app";
  el.textContent = msg;
  document.body.appendChild(el);
}

main().catch((err) => {
  console.error("Failed to load lodash asynchronously:", err);
});
