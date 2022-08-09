/**
* @fileoverview 滚动处理函数
* @author Luoob
*/
const defaultConfig = {
    target: '',
    speed: 100 // 值越小，速度越快
};
const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) => value < 0.5
    ? cubic(value * 2) / 2
    : 1 - cubic((1 - value) * 2) / 2;
/**
 * 页面滚动
 * @param {ScrollCondig} option
 * @returns {IScrollIns}
 */
function scroll(option = {}) {
    option = Object.assign(Object.assign({}, defaultConfig), option);
    let cb = null;
    let targetEl = null;
    targetEl = document.documentElement;
    if (option.target) {
        targetEl = document.querySelector(option.target);
        if (!targetEl) {
            throw new Error(`target is not existed: ${option.target}`);
        }
    }
    const scrollTo = (distance, fn) => {
        cb = fn || (() => { });
        const iel = targetEl;
        const beginTime = Date.now();
        const beginValue = iel.scrollTop;
        const interval = Math.abs(beginValue - distance);
        const isUp = distance < beginValue;
        const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
        const frameFunc = () => {
            const progress = (Date.now() - beginTime) / option.speed;
            if (progress < 1) {
                if (isUp) {
                    // 向上 -
                    iel.scrollTop = (beginValue - (interval * (easeInOutCubic(progress))));
                }
                else {
                    // 向下 +
                    iel.scrollTop = (beginValue + (interval * (easeInOutCubic(progress))));
                }
                rAF(frameFunc);
            }
            else {
                iel.scrollTop = distance;
                cb && cb();
            }
        };
        rAF(frameFunc);
    };
    return {
        scrollTo,
        scrollToTop: (fn) => scrollTo(0, fn)
    };
}
export default scroll;
