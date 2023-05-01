// Auto-generated with deno_bindgen
import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.2/plug.ts"

function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v as bigint)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/debug", import.meta.url)
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
