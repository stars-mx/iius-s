/**
* @fileoverview 滚动处理函数
* @author Luoob
*/
export interface ScrollCondig {
    target?: string;
    speed?: number;
}
export interface IScrollIns {
    scrollTo: (distance: number, fn?: () => void) => void;
    scrollToTop: (fn?: () => void) => void;
}
/**
 * 页面滚动
 * @param {ScrollCondig} option
 * @returns {IScrollIns}
 */
declare function scroll(option?: ScrollCondig): IScrollIns;
export default scroll;
