import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "@/plugins/unpkg-path-plugin"
import { fetchPlugin } from "@/plugins/fetch-plugin"

let esbuildService: esbuild.Service

export default async (rawCode: string) => {
  if (!esbuildService) {
    esbuildService = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    })
  }

  try {
    const result = await esbuildService.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,

      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],

      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    })

    return {
      code: result.outputFiles[0].text,
      error: "",
    }
  } catch (error) {
    return {
      code: "",
      // need to change this
      error: "Error in bundling the code",
    }
  }
}
