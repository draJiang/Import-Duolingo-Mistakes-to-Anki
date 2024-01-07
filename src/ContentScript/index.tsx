import browser from 'webextension-polyfill'

import React, { useEffect, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"

import { StyleProvider } from '@ant-design/cssinjs';

const APP_NAME = '__jiang-Import-Duolingo-Mistakes-to-Anki'

// // 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
// let MyBox: HTMLElement | null = document.getElementById(APP_NAME);
// // container 承载 UI 组件
// let container = document.createElement('div')
// // 使用 shadow 来隔离样式
// let shadowRoot: any = undefined

// if (MyBox !== null && MyBox !== undefined) {
//   // 如果已存在容器
//   // console.log('已存在 Box 容器');
//   // 移除旧容器，避免出现 2 个主容器会导致 UI 渲染错误
//   MyBox.parentNode?.removeChild(MyBox);

// }

// // 创建主容器
// MyBox = document.createElement('div')
// MyBox.id = APP_NAME
// document.getElementsByTagName('html')[0].appendChild(MyBox);
// MyBox.style.display = 'none' //默认隐藏

// shadowRoot = MyBox?.attachShadow({ mode: 'open' });
// container.className = 'container'
// shadowRoot?.appendChild(container)

// // 在 Shadow DOM 中添加样式：
// const style = document.createElement('style');
// style.textContent = `
//   #LearningEnglish2023 {
//     font-family: sans-serif;
//     width: 400px;
//     height: 500px;
//     color: #333;
//     position: fixed;
//     display: flex;
//     flex-direction: column;
//     font-size: 13.4px;
//     background-color: #fff;
//     z-index: 9999;
//     overflow: hidden;
//     box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);
//     border-radius: 4px;
//     }

//     #LearningEnglish2023 #ScouterNav {
//       display: flex;
//       justify-content: start;
//       align-items: center;
//       padding: 10px 19px;
//       border-bottom: 1px solid rgba(5, 5, 5, .06);
//       user-select: none;
//       }

//       #LearningEnglish2023 #ScouterNav img {
//       width: auto;
//       height: 24px;
//       margin-right: 6px;
//       }

//   `
// shadowRoot?.appendChild(style);


// // 接收 background 消息（目前是通过浏览器的右键菜单触发）
// browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

//   console.log('content script onMessage:');
//   console.log(msg);
//   if (msg.type === 'openPopupCard') {

//     // 处理窗口

//     if (MyBox !== null && MyBox !== undefined) {
//       // 如果已存在容器

//       // console.log('已存在 Box 容器');
//       MyBox.style.display = 'block'
//       // 移除旧内容，避免 2 次渲染混杂在一起
//       container.parentNode?.removeChild(container);

//     } else {
//       // console.log('不存在 Box 容器');
//     }


//     container = document.createElement('div')
//     container.className = 'container'
//     shadowRoot?.appendChild(container)

//     // 显示窗口，window.getSelection() 是当前鼠标选中的区域信息
//     console.log(window.getSelection());

//     showPopupCard(window.getSelection(), container, shadowRoot)

//     // 监听页面点击事件
//     document.onmousedown = function (event) {

//       if (MyBox !== undefined && MyBox !== null) {
//         // 如果点击的不是插件窗口及其子元素，则关闭窗口
//         if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
//           // 隐藏窗口
//           container.parentNode?.removeChild(container);
//         }
//       }
//     }

//   }

// });

// 显示应用窗口
async function showPopupCard(msg: any, MyBox: any, shadowRoot: any) {

  ReactDOM.render(
    <React.StrictMode>
      <StyleProvider container={shadowRoot}>
        <PopupCard selection={msg} />
      </StyleProvider>
    </React.StrictMode>,
    MyBox
  );

}

let ANKI_INFO: any

// 页面载入后获取 Anki 牌组信息
browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {

  ANKI_INFO = result.data

})


type audioType = Array<{ url: string, filename: string, fields: Array<string> }> | []

// 记录上一次获取到的错题信息，避免重复添加相同的错题
let prevValues: { front: string | null, back: string | null, audio: audioType } | null = null;

// 创建观察器实例
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // 用户回答问题错误（如果页面上存在类名为 'kVhsm' 且 data-test 属性包含 'blame-incorrect' 的 div 元素）
    const targetDiv = document.querySelector('div.kVhsm[data-test*="blame-incorrect"]');
    console.log(targetDiv);

    if (targetDiv) {
      const newValues: { front: string | null, back: string | null, audio: audioType } = getValues();
      console.log(newValues);

      // 返回一个对象 {front: B, back: A}
      if (newValues.front !== '' && newValues.back !== '' &&
        (prevValues === null ||
          newValues.front !== prevValues.front &&
          newValues.back !== prevValues.back)) {

        addToAnki(newValues)
        prevValues = newValues;

      }

      // 停止观察以防止无限循环
      // observer.disconnect();
    }
  });
});

// 配置观察器
const observerConfig = {
  childList: true,
  subtree: true
};

// 选择目标节点
const targetNode = document.querySelector('body');

// 开始观察目标节点
if (targetNode) {
  observer.observe(targetNode, observerConfig);
}


////////////////////////////////////////////////////////////////////////////////////

// 添加到 Anki 中
const addToAnki = (note: { front: string | null, back: string | null, audio: audioType }) => {

  const p = {
    "note": {
      "deckName": ANKI_INFO[0].defaultDeckName,
      "modelName": ANKI_INFO[0].modelName,
      "fields": {
        [ANKI_INFO[0].field1]: note.front,
        [ANKI_INFO[0].field2]: note.back
      },
      "audio": note.audio,
      "tags": [
        "Duolingo"
      ]
    }
  }

  let sending = browser.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote' }, })

}

// 从页面上读取问题和答案
function getValues(): { front: string | null, back: string | null, audio: Array<{ url: string, filename: string, fields: Array<string> }> } {
  let f: string | null = '';
  let b: string | null = '';
  let audio: audioType = []

  // 英文-中文：英文填空+英文选项（正面需要发音）
  const divElement1 = document.querySelector('div._1y-0G._3IQqi._2RC-4.d84Fd');

  if (divElement1) {
    const aElement = divElement1.querySelector('div[dir="ltr"]');
    const bElement = document.querySelector('div._1UqAr._3Qruy');

    if (aElement && bElement) {
      f = '';
      const spans = aElement.querySelectorAll('span');
      const answers: Array<string | null> = [];

      spans.forEach(span => {

        if (span.className === '_2Iqyl') {
          // 填空题的画线部分
          f! += '(';

          // 从aElement下属的data-test="challenge-judge-text"的span元素中获取答案
          const answerSpans = divElement1.querySelectorAll('span[data-test="challenge-judge-text"]');
          answerSpans.forEach(answerSpan => {
            answers.push(answerSpan.textContent);
          });
          f += answers.join('/');
          f! += ')';

        } else if (span.className === 'g-kCu') {
          f! += span.textContent;
        }
      });

      b = bElement.textContent;

      // 发音
      audio = getAudio(f)

    }
  }

  // 英文/日语-中文：中文翻译为外文、英文/日语-中文：外文翻译为中文（正面需要发音）、日语-中文：选择中文对应的日语单词
  const divElement2 = document.querySelector('div._1lDmW.d84Fd');

  if (divElement2) {
    const aElement = divElement2.querySelector('div._1KUxv._11rtD');
    const bElement = document.querySelector('div._1UqAr._3Qruy');

    f = aElement ? aElement.textContent : null;
    b = bElement ? bElement.textContent : null;

    // _2UpLr _1x6bc _17DXh whuSQ _2gwtT _1nlVc _2fOC9 t5wFJ _3dtSu _25Cnc _3yAjN UCrz7 yTpGk

    // 问题中存在语音播放按钮则表示此问题需要发音
    if (divElement2.querySelector('button._1nlVc._2fOC9')) {
      // 发音
      audio = getAudio(f)
    }
  }

  // 英文/日语-中文：外文翻译为中文（正面需要发音）
  // const divElement3 = document.querySelector('div._1Zh-d._1lDmW.d84Fd');

  // if (divElement3) {

  //   const aElement = divElement3.querySelector('div._1KUxv._11rtD');
  //   const bElement = document.querySelector('div._1UqAr._3Qruy');

  //   f = aElement ? aElement.textContent : null;
  //   b = bElement ? bElement.textContent : null;

  //   // 发音
  //   audio = getAudio(f)

  // }

  // 日语-中文：选择中文对应的日语单词
  // const divElement4 = document.querySelector('div._3xBAJ._1lDmW.d84Fd');
  // if (divElement4) {
  //   const aElement = divElement4.querySelector('div._1KUxv._11rtD');
  //   const bElement = document.querySelector('div._1UqAr._3Qruy');

  //   f = aElement ? aElement.textContent : null;
  //   b = bElement ? bElement.textContent : null;
  // }

  // 口语

  // 英语听力
  const divElement3 = document.querySelector('div._3Vm8B._2RC-4.d84Fd');
  if (divElement3) {

    const aElement = divElement3.querySelector('div._1iPXH._2Hg6H');
    const bElement = document.querySelector('div._1UqAr._3Qruy');

    f = aElement ? aElement.textContent : null;
    b = bElement ? bElement.textContent : null;

    f += '<br><br>' + divElement3.querySelector('div._9XgpY._2Hg6H._1dBSx._3slGi')!.textContent + '<br><br>'

    // 处理选项
    const answers: Array<string | null> = [];
    // 从aElement下属的data-test="challenge-judge-text"的span元素中获取答案
    const answerSpans = divElement3.querySelectorAll('span[data-test="challenge-judge-text"]');
    answerSpans.forEach((answerSpan, index) => {
      answers.push(answerSpan.textContent);
      f += index + '. ' + answerSpan.textContent + '<br>'
    });

    // 问题中存在语音播放按钮则表示此问题需要发音
    if (divElement3.querySelector('button._1nlVc._2fOC9')) {
      // 发音
      audio = getAudio(f)
    }

  }

  return { front: f, back: b, audio: audio };
}

const getAudio = (f: string | null) => {
  let audio: audioType = []

  const title = document.title;  // 获取网页的标题
  let audioUrl = 'https://dict.youdao.com/dictvoice?type=0&audio='

  if (title.includes('日语')) {
    audioUrl = 'https://dict.youdao.com/dictvoice?le=jap&type=0&audio='
  } else if (title.includes('韩语')) {
    audioUrl = 'https://dict.youdao.com/dictvoice?le=ko&type=0&audio='
  } else if (title.includes('xxxx')) {
    audioUrl = 'https://dict.youdao.com/dictvoice?type=0&audio='
  } else {
    audioUrl = 'https://dict.youdao.com/dictvoice?type=0&audio='
  }

  if (f) {
    const t = new Date().getTime().toString();
    audio = [{
      "url": audioUrl + f,
      "filename": t + ".mp3",
      "fields": [
        "Front"
      ]
    }]
  }


  return audio

}