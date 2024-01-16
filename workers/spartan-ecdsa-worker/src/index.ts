import { wrap, Remote } from "comlink";
import { ISpartanEcdsaWorker } from "./interface";

let SpartanEcdsaWorker: Remote<ISpartanEcdsaWorker>;

if (typeof window !== 'undefined') {
    SpartanEcdsaWorker = wrap<ISpartanEcdsaWorker>(new Worker(new URL("./worker.js", import.meta.url)));
}

export { SpartanEcdsaWorker };
export { type ProveMembershipFn, type VerifyMembershipFn } from "./interface";