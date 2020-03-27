/*
 * @Author: wangqiang
 * @Date: 2020-03-25 22:35:47
 * @LastEditors: wangqiang
 * @LastEditTime: 2020-03-27 16:13:34
 * @FilePath: \tengxunyun\watermark-component\src\index.js
 * @Descripttion: 
 */
import loadMark from './loadMark'
import { monitorDom } from './util'
import { DEFAULT_SETTINGS } from './constants'

/*加载水印-添加浏览器窗口监听事件-添加dom变化监听事件*/
export function watermark(settings = {}) {
    loadMark(settings)
    // 添加浏览器窗口监听事件
    window.addEventListener('resize', function () {
        loadMark(settings)
    })
    const watermarkId = settings.id || DEFAULT_SETTINGS.id
    const watermarkParentSelector = settings.parentSelector || DEFAULT_SETTINGS.parentSelector
    const watermarkStyleStr = document.getElementById(watermarkId).getAttribute('style')
    // 添加dom变化监听事件
    const isSupportMutationObserve = monitorDom(watermarkParentSelector, (mutations, observer) => {
        // 当节点被删除
        if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === watermarkId) {
            loadMark(settings)
            return 
        }
        // 当属性发生样式改变
        if (mutations[0].target.id === watermarkId && mutations[0].attributeName && mutations[0].attributeName === 'style' && mutations[0].oldValue && (mutations[0].oldValue !== watermarkStyleStr || mutations[0].target.style.position == '' || mutations[0].target.style.backgroundImage == '' || mutations[0].target.style.top == '' || mutations[0].target.style.left == '' || mutations[0].target.style.bottom == '' || mutations[0].target.style.right == '')) {
            console.log('属性变化了')
            mutations[0].target.style = watermarkStyleStr
            return 
        }
    })
    // 不支持MutationObserve时的降级方案Mutation Events
    if (!isSupportMutationObserve) {
        observeNode.addEventListener('DOMNodeRemoved', function () {
            loadMark(settings)
        }, false)
    }
}
