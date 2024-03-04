import { wrap } from 'comlink';
let SpartanEcdsaWorker;
if (typeof window !== 'undefined') {
    SpartanEcdsaWorker = wrap(new Worker(new URL('./worker.js', import.meta.url)));
}
export { SpartanEcdsaWorker };
