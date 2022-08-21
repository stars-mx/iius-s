import { freeModule, freeProcess } from './freeNodejs'

/** Used to access faster Node.js helpers. */
export const nodeTypes = ((() => {
    try {
        /* Detect public `util.types` helpers for Node.js v10+. */
        /* Node.js deprecation code: DEP0103. */
        const typesHelper = freeModule && freeModule.require && freeModule.require('util').types
        return typesHelper || (freeProcess && freeProcess.binding && freeProcess.binding('util'))
    } catch (e) {}
})())
