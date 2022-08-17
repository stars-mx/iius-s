/**
 * 点击下载文件
 * @param {string | Blob} blob
 * @param {string} fileName
 * @param {boolean} isUrl
 * @returns {void}
 */
const download = (blob, fileName, isUrl = false) => {
    let downloadUrl = '';
    if (isUrl && typeof blob === 'string') {
        downloadUrl = blob;
    }
    else {
        downloadUrl = window.URL.createObjectURL(blob);
    }
    const link = document.createElement('a');
    link.setAttribute('name', 'download-file');
    link.target = '_target';
    link.rel = 'noopener';
    link.download = fileName;
    link.href = downloadUrl;
    link.click();
};

/**
* @fileoverview 滚动处理函数
* @author Luoob
*/
/**
 * 页面滚动
 * @param {ScrollCondig} option
 * @returns {IScrollIns}
 */
function scroll(option = {}) {
    const defaultConfig = {
        target: '',
        speed: 100 // 值越小，速度越快
    };
    const cubic = (value) => Math.pow(value, 3);
    const easeInOutCubic = (value) => value < 0.5
        ? cubic(value * 2) / 2
        : 1 - cubic((1 - value) * 2) / 2;
    /**
     * 检查元素是否及格
     * @param {HTMLElement} target
     * @returns {HTMLElement}
     */
    function inspectTarget(target) {
        // weixin 内置浏览器
        // 正常情况下 document.documentElement 的 scrollTop 为 0
        if (target.scrollTop <= 0) {
            target = document.body;
        }
        return target;
    }
    option = { ...defaultConfig, ...option };
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
        const iel = inspectTarget(targetEl);
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

/**
* @fileoverview 创建色调管理器
* @author Luoob
*/
function createTone(option) {
    let oldTone = '';
    const InnerTone = {
        System: 'System',
        Light: 'Light',
        Dark: 'Dark'
    };
    const DefaultToneValue = InnerTone.System;
    const iQuery = '(prefers-color-scheme: dark)';
    const isSupported = window && 'matchMedia' in window && typeof window.matchMedia === 'function';
    const mq = window.matchMedia(iQuery);
    function filterTone(tone) {
        return tone.toLocaleLowerCase();
    }
    function updateClass(tone) {
        oldTone && document.documentElement.classList.remove(oldTone);
        const targetTone = filterTone(tone);
        targetTone && document.documentElement.classList.add(targetTone);
        oldTone = targetTone;
        if (option.onUpdate && typeof option.onUpdate === 'function') {
            option.onUpdate(targetTone);
        }
    }
    function isDarkMode() {
        return mq && mq.matches;
    }
    function isSystem(tone) {
        return tone === InnerTone.System;
    }
    function createIsModeObj(list) {
        return list.reduce((prev, cur) => {
            return Object.assign(prev, {
                [`is${cur}`]() {
                    return getMode() === cur;
                }
            });
        }, {});
    }
    function update() {
        if (!isSupported) {
            return;
        }
        const tone = isDarkMode() ? InnerTone.Dark : InnerTone.Light;
        // 设置本地缓存
        localStorage.setItem(option.key, tone);
        // 修改 class
        updateClass(tone);
    }
    function listenSystem() {
        if (!mq) {
            return;
        }
        if ('addEventListener' in mq) {
            mq.addEventListener('change', update);
        }
        else {
            // @ts-ignore
            mq.addListener(update);
        }
    }
    function cancelListenSystem() {
        if (!mq) {
            return;
        }
        if ('removeEventListener' in mq) {
            mq.removeEventListener('change', update);
        }
        else {
            // @ts-ignore
            mq.removeListener(update);
        }
    }
    function getMode() {
        return (localStorage.getItem(option.key) || DefaultToneValue);
    }
    function setMode(tone) {
        let classTone = tone;
        if (isSystem(tone)) {
            classTone = isDarkMode() ? InnerTone.Dark : InnerTone.Light;
            listenSystem();
        }
        else {
            cancelListenSystem();
        }
        // 设置本地缓存
        localStorage.setItem(option.key, tone);
        // 修改 class
        updateClass(classTone);
    }
    const isToneModeObj = isSupported && createIsModeObj(option.tones);
    const isInnerModeObj = isSupported && createIsModeObj([InnerTone.Dark, InnerTone.Light, InnerTone.System]);
    if (isSupported) {
        return {
            getMode,
            setMode,
            cancel: cancelListenSystem,
            init() {
                setMode(getMode());
            },
            ...isToneModeObj,
            ...isInnerModeObj
        };
    }
    return false;
}

/**
 * 复制内容到剪切板
 * @param {string} val
 * @returns {any}
 */
const copy = () => {
    let el = null;
    const id = 'copy-id';
    return {
        exec(val) {
            let copyInput = el;
            if (!copyInput) {
                const inputEl = document.getElementById(id);
                if (inputEl != null) {
                    el = inputEl;
                }
                else {
                    copyInput = document.createElement('input');
                    copyInput.id = id;
                    copyInput.setAttribute('style', 'position:fixed;top:-200%;');
                    document.body.appendChild(copyInput);
                    el = copyInput;
                }
            }
            copyInput.value = val;
            copyInput.select();
            copyInput.disabled = true;
            const result = document.execCommand('Copy');
            copyInput.disabled = false;
            if (result) {
                return true;
            }
            return false;
        }
    };
};

/**
 * 向 < 10 的数值进行补 0
 * @param {number} n
 * @returns {string | number}
 */
const padZero = (n) => {
    if (!Number.isInteger(n)) {
        return n;
    }
    return (n < 10 ? `0${n}` : String(n));
};

/**
 * 创建倒计时
 * @param {number} time 毫秒数
 * @returns {{
 *  year: string
 *  month: string
 *  day: string
 *  hour: string
 *  minute: string
 *  second: string
 * }}
 */
const createCountDown = (time) => {
    const resetTime = {
        year: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12))),
        month: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30))),
        day: padZero(Math.floor(time / (1000 * 60 * 60 * 24))),
        hour: padZero(Math.floor((time / (1000 * 60 * 60)) % 24)),
        minute: padZero(Math.floor((time / (1000 * 60)) % 60)),
        second: padZero(Math.floor((time / 1000) % 60))
    };
    return resetTime;
};

/**
 * 创建时间(单位：毫秒 | 秒)
 * @param {Option} option
 * @param {string} unit
 * @returns {number}
 */
const createTime = (option, unit = 'millisecond') => {
    const { hour = 0, minute = 0, second = 0 } = option;
    const times = unit === 'millisecond' ? 1000 : 1;
    let totalTime = 0;
    if (hour) {
        totalTime += hour * 60 * 60 * times;
    }
    if (minute) {
        totalTime += minute * 60 * times;
    }
    if (second) {
        totalTime += second * times;
    }
    return totalTime;
};

/**
 * 延迟函数返回，返回一个新函数
 * 输入一个函数，默认情况下，执行时间在 delay 时间或之后返回执行结果
 * @param {Function} fn      执行的函数
 * @param {number} delay     延迟时间(单位：毫秒)
 * @returns {Function}
 */
const delay = (fn, delay = 500) => {
    // eslint-disable-next-line
    return (...args) => new Promise(async (resolve, reject) => {
        const start = +new Date();
        let result = null;
        const isAsyncFn = (fn) => Object.prototype.toString.call(fn).includes('AsyncFunction');
        try {
            if (isAsyncFn(fn)) {
                result = await fn(...args);
            }
            else {
                result = fn(...args);
            }
            const interval = +new Date() - start;
            // 1000 代表一秒
            if (interval < delay) {
                setTimeout(() => {
                    resolve(result);
                }, delay - interval);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

/**
 * 把数字格式化为千分位形式
 * @method toThousands
 * @param {number | string} num 要格式化的数字
 * @return {string} 千分位形式的数字
 */
const toThousands = (num) => {
    let result = '';
    num = (num || 0).toString();
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
};

/**
 * 当数字小于10万时，返回带千分位的数字；
 * 当数字大于等于10万小于一亿时，返回以万为单位的数字；
 * 当数字大于等于一亿时，返回以亿为单位的数字
 * @method formatNumber
 * @param {number} num 要格式化的数字
 * @return {string} 格式化后的数字
 */
const formatNumber = (num) => {
    num = Number(num);
    if (isNaN(num)) {
        return num;
    }
    return num < 100000
        ? toThousands(num)
        : num < 100000000
            ? (num / 10000).toFixed(1) + '万'
            : (num / 100000000).toFixed(1) + '亿';
};

/**
 * 压缩图片方法
 * @param {file} file 文件
 * @param {number} quality 图片质量(取值0 - 1之间默认0.92)
 */
const compressImg = (file, quality) => {
    let qualitys = 0.52;
    if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
        qualitys = 0.85;
    }
    if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
        qualitys = 0.92;
    }
    if (quality) {
        qualitys = quality;
    }
    return new Promise(resolve => {
        console.log(file);
        // @ts-ignore
        if ((file.size / 1024).toFixed(2) < 300) {
            resolve({
                file
            });
        }
        else {
            const reader = new FileReader(); // 创建 FileReader
            reader.onload = ({ target: { 
            // @ts-ignore
            result: src } }) => {
                const image = new Image(); // 创建 img 元素
                image.onload = async () => {
                    const canvas = document.createElement('canvas'); // 创建 canvas 元素
                    const context = canvas.getContext('2d');
                    let targetWidth = image.width;
                    let targetHeight = image.height;
                    const originWidth = image.width;
                    const originHeight = image.height;
                    let maxWidth = 1600;
                    let maxHeight = 1600;
                    if (1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) &&
                        parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024) {
                        targetWidth = originWidth;
                        targetHeight = originHeight;
                        // 图片尺寸超过的限制
                        if (originWidth > maxWidth || originHeight > maxHeight) {
                            if (originWidth / originHeight > maxWidth / maxHeight) {
                                // 更宽，按照宽度限定尺寸
                                targetWidth = maxWidth;
                                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                            }
                            else {
                                targetHeight = maxHeight;
                                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                            }
                        }
                    }
                    if (10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) &&
                        parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024) {
                        maxWidth = 1400;
                        maxHeight = 1400;
                        targetWidth = originWidth;
                        targetHeight = originHeight;
                        // 图片尺寸超过的限制
                        if (originWidth > maxWidth || originHeight > maxHeight) {
                            if (originWidth / originHeight > maxWidth / maxHeight) {
                                // 更宽，按照宽度限定尺寸
                                targetWidth = maxWidth;
                                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                            }
                            else {
                                targetHeight = maxHeight;
                                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                            }
                        }
                    }
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    context?.clearRect(0, 0, targetWidth, targetHeight);
                    context?.drawImage(image, 0, 0, targetWidth, targetHeight); // 绘制 canvas
                    const canvasURL = canvas.toDataURL('image/jpeg', qualitys);
                    const buffer = atob(canvasURL.split(',')[1]);
                    let length = buffer.length;
                    const bufferArray = new Uint8Array(new ArrayBuffer(length));
                    while (length--) {
                        bufferArray[length] = buffer.charCodeAt(length);
                    }
                    const miniFile = new File([bufferArray], file.name, {
                        type: 'image/jpeg'
                    });
                    console.log({
                        file: miniFile,
                        origin: file,
                        beforeSrc: src,
                        afterSrc: canvasURL,
                        beforeKB: Number((file.size / 1024).toFixed(2)),
                        afterKB: Number((miniFile.size / 1024).toFixed(2)),
                        qualitys
                    });
                    resolve({
                        file: miniFile,
                        origin: file,
                        beforeSrc: src,
                        afterSrc: canvasURL,
                        beforeKB: Number((file.size / 1024).toFixed(2)),
                        afterKB: Number((miniFile.size / 1024).toFixed(2))
                    });
                };
                image.src = src;
            };
            reader.readAsDataURL(file);
        }
    });
};

/**
 * 通过检测设备 ua
 * 判断是否是移动端设备
 * @returns {any}
 */
const isMobileByUa = (userAgent = window.navigator.userAgent) => {
    const reg = /(Android|iPhone|Windows Phone|iPad|webOS|BlackBerry|mobile)/i;
    return reg.test(userAgent);
};

/**
  * 是否移动端
 * @param {string} width
  * @returns {any}
  */
const isMobile = (width = '768') => {
    const isMobileUa = isMobileByUa();
    if (isMobileUa) {
        return true;
    }
    return document.documentElement.clientWidth <= parseInt(width);
};

export { compressImg, copy, createCountDown, createTime, createTone, delay, download, formatNumber, isMobile, isMobileByUa, padZero, scroll, toThousands };
