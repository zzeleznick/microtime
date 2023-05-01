import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.2/plug.ts"

const url = new URL("./target/release", import.meta.url)
let uri = url.toString()
if (!uri.endsWith("/")) uri += "/"

let darwin: string | { aarch64: string; x86_64: string } = uri
  + "libmicrotime.dylib"

if (url.protocol !== "file:") {
  // Assume that remote assets follow naming scheme
  // for each macOS artifact.
  darwin = {
    aarch64: uri + "libmicrotime_arm64.dylib",
    x86_64: uri + "libmicrotime.dylib",
  }
}

const opts = {
  name: "microtime",
  urls: {
    darwin,
    windows: uri + "microtime.dll",
    linux: uri + "libmicrotime.so",
  },
  policy: CachePolicy.NONE,
}
const _lib = await prepare(opts, {
  now: { parameters: [], result: "u64", nonblocking: false },
})

export function now() {
  let rawResult = _lib.symbols.now()
  const result = rawResult
  return result
}
