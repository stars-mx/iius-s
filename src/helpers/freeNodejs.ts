/** Detect free variable `global` from Node.js. */
export const freeGlobal =
    typeof global === 'object' &&
    global !== null &&
    global.Object === Object &&
    global

/** Detect free variable `exports`. */
export const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
// @ts-ignore
export const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
export const moduleExports = freeModule && freeModule.exports === freeExports

/** Detect free variable `process` from Node.js. */
// @ts-ignore
export const freeProcess = moduleExports && freeGlobal.process
