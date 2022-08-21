/**
 * 复制内容到剪切板
 * @returns {{exec: (val: string) => boolean}}
 */
export const createCopy = () => {
    let el: null | HTMLInputElement = null
    const id = '[iius-copy]:id'

    return {
        exec (val: string) {
            let copyInput = el
            if (copyInput == null) {
                const inputEl = document.getElementById(id) as HTMLInputElement
                if (inputEl != null) {
                    copyInput = el = inputEl
                } else {
                    copyInput = document.createElement('input')
                    copyInput.id = id
                    copyInput.setAttribute('style', 'position:fixed;top:-200%;')
                    document.body.appendChild(copyInput)
                    el = copyInput
                }
            }
            copyInput.value = val
            copyInput.select()
            copyInput.disabled = true
            const result = document.execCommand('Copy')
            copyInput.disabled = false
            if (result) {
                return true
            }
            return false
        },
        remove () {
            if (el != null) {
                el.remove()
                el = null
            }
        }
    }
}
