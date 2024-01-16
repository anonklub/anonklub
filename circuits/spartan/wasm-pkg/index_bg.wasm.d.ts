/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function init_panic_hook(): void;
export function prepare(): void;
export function prove(a: number, b: number, c: number, d: number, e: number): void;
export function verify(a: number, b: number): number;
export function prove_membership(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): void;
export function verify_membership(a: number, b: number): number;
export function get_roots(a: number, b: number, c: number): void;
export function get_msg_hash(a: number, b: number, c: number): void;
export function generate_merkle_proof(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
