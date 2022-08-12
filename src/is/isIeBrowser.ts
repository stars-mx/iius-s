export function isIeBrowser () {
    // @ts-ignore
    return !!window.ActiveXObject || 'ActiveXObject' in window
}
