/**
 * 复制内容到剪切板
 * @param {string} val
 * @returns {any}
 */
 const copy = () => {
	let el: any = null
	const id = 'copy-id'

	return {
		exec(val: string) {
			let copyInput = el
			if (!copyInput) {
				const inputEl = document.getElementById(id)
				if (inputEl != null) {
					el = inputEl
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
		}
	}
}

export default copy