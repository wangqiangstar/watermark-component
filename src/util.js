/*
 * @Author: wangqiang
 * @Date: 2020-03-26 11:57:29
 * @LastEditors: wangqiang
 * @LastEditTime: 2020-03-27 10:20:52
 * @FilePath: \tengxunyun\watermark-component\src\util.js
 * @Descripttion: 
 */
/*
  判断文本是否超出canvas的宽度，超出则换行
  @param {string} str:要绘制的字符串
  @param {object} canvas:canvas对象
  @param {number} initX:绘制字符串起始x坐标
  @param {number} initY:绘制字符串起始y坐标
  @param {number} lineHeight:字行高
  @param {number} canvasWidth:单个水印的宽度
*/
const canvasTextAutoLine = parameterObj => {
  let { str, ctx, initX, initY, lineHeight, canvasWidth } = parameterObj
  let lineWidth = 0
  let lastSubStrIndex = 0
  let lines = str.split("\n")
  for (let j = 0; j < lines.length; j++) {
    let words = lines[j].split(' ')
    let line = ''
    for (let i = 0; i < words.length; i++) {
      // lineWidth += ctx.measureText(words[i]).width
      // if (lineWidth > canvasWidth - 50) { // 考虑边界需加50的buffer
      //   ctx.fillText(words.slice(lastSubStrIndex, i), initX, initY)
      //   initY += lineHeight
      //   lineWidth = 0
      //   lastSubStrIndex = i
      // }
      // if (i == words.length - 1) {
      //   ctx.fillText(words.substring(lastSubStrIndex, i + 1), initX, initY)
      // }
      let testLine = line + words[i] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > canvasWidth && i > 0) {
          ctx.fillText(line, initX, initY);
          line = words[i] + ' ';
          initY += lineHeight;
      }
      else {
          line = testLine;
      }
    }
    ctx.fillText(line, initX, initY);
    initY += lineHeight;
  }
  
}

// 监控水印节点变化
const monitorDom = (parentSelector, callBack) => {
  /* 设置监听的dom节点 */
  let observeNode = null
  if (parentSelector) {
    observeNode = document.querySelector(
      parentSelector
    )
  } else {
    observeNode = document.body
  }
  const options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
    attributeFilter: [ "style", "class"]
  }
  const MutationObserver = window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver
  let watermarkObserver = null
  if (!!MutationObserver) {
    watermarkObserver = new MutationObserver(callBack)
    watermarkObserver.observe(observeNode, options)
  } else {
    return false
  }
  return true
}

export { canvasTextAutoLine, monitorDom }
