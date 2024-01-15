import * as wasm from "./index_bg.wasm.js";
import { __wbg_set_wasm } from "./index_bg.js";
__wbg_set_wasm(wasm);
export * from "./index_bg.js";

wasm.__wbindgen_start();
