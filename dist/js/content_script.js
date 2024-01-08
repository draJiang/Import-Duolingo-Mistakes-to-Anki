/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Components/Nav.tsx":
/*!********************************!*\
  !*** ./src/Components/Nav.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nav = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const icon128_png_1 = __importDefault(__webpack_require__(/*! ../assets/icon128.png */ "./src/assets/icon128.png"));
function Nav(props) {
    const [count, setCount] = (0, react_1.useState)(0);
    const [currentURL, setCurrentURL] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
    }, []);
    return (react_1.default.createElement("div", { id: "ScouterNav", style: {
            cursor: 'move',
            position: 'absolute',
            width: '100%', top: 0,
            background: 'white',
            zIndex: 9999
        }, onMouseDown: props.onMouseDown },
        react_1.default.createElement("img", { src: icon128_png_1.default }),
        react_1.default.createElement("div", { className: "rightBtnBox", style: { flex: 1, textAlign: 'right' } })));
}
exports.Nav = Nav;


/***/ }),

/***/ "./src/ContentScript/PopupCard/index.tsx":
/*!***********************************************!*\
  !*** ./src/ContentScript/PopupCard/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PopupCard = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Nav_1 = __webpack_require__(/*! ../../Components/Nav */ "./src/Components/Nav.tsx");
function PopupCard(props) {
    // 窗口拖拽逻辑
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const windowElement = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // 设置窗口的默认位置
        if (windowElement.current) {
            // Check the boundaries
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elementWidth = windowElement.current.clientWidth;
            const elementHeight = windowElement.current.clientHeight;
            const minX = 0;
            const minY = 0;
            const maxX = windowWidth - elementWidth;
            const maxY = windowHeight - elementHeight;
            const newX = maxX - 20;
            const newY = props.selection.anchorNode.parentElement.offsetTop + props.selection.anchorNode.parentElement.clientHeight + 20;
            const clampedX = Math.max(minX, Math.min(newX, maxX));
            const clampedY = Math.max(minY, Math.min(newY, maxY));
            // console.log(props.selection.getRangeAt(0));
            windowElement.current.style.left = `${clampedX}px`;
            windowElement.current.style.top = `${clampedY}px`;
        }
    }, [props]);
    // 窗口拖拽时触发
    (0, react_1.useEffect)(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            // console.log('useEffect return');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);
    const handleMouseDown = (event) => {
        // console.log('PopupCard:handleMouseDown');
        setDragging(true);
        if (windowElement.current) {
            const rect = windowElement.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            windowElement.current.dataset.offsetX = String(offsetX);
            windowElement.current.dataset.offsetY = String(offsetY);
        }
        // setOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
    };
    const handleMouseMove = (event) => {
        // // console.log('PopupCard:handleMouseMove');
        // // console.log(dragging);
        if (dragging && windowElement.current) {
            // Use requestAnimationFrame to throttle the mousemove event handling
            // 鼠标相对窗口左上角的偏移
            const offsetX = parseFloat(windowElement.current.dataset.offsetX || '');
            const offsetY = parseFloat(windowElement.current.dataset.offsetY || '');
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;
            // Check the boundaries
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elementWidth = windowElement.current.clientWidth;
            const elementHeight = windowElement.current.clientHeight;
            const minX = 0;
            const minY = 0;
            const maxX = windowWidth - elementWidth;
            const maxY = windowHeight - elementHeight;
            const clampedX = Math.max(minX, Math.min(newX, maxX));
            const clampedY = Math.max(minY, Math.min(newY, maxY));
            // Only update the position if it's within the boundaries
            // newX >= minX && newX <= maxX && newY >= minY && newY <= maxY
            if (true) {
                // setPosition({ x: clampedX, y: clampedY });
                windowElement.current.style.left = `${clampedX}px`;
                windowElement.current.style.top = `${clampedY}px`;
            }
            else {}
        }
    };
    const handleMouseUp = () => {
        // // console.log('PopupCard:handleMouseUp');
        setDragging(false);
    };
    return (react_1.default.createElement("div", { id: "LearningEnglish2023", ref: windowElement },
        react_1.default.createElement(Nav_1.Nav, { onMouseDown: handleMouseDown }),
        react_1.default.createElement("div", { className: 'contentBox', style: {
                marginTop: '45px'
            } }, "PopupCard")));
}
exports.PopupCard = PopupCard;
;


/***/ }),

/***/ "./src/ContentScript/index.tsx":
/*!*************************************!*\
  !*** ./src/ContentScript/index.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const PopupCard_1 = __webpack_require__(/*! ./PopupCard */ "./src/ContentScript/PopupCard/index.tsx");
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const APP_NAME = '__jiang-Import-Duolingo-Mistakes-to-Anki';
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
function showPopupCard(msg, MyBox, shadowRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(cssinjs_1.StyleProvider, { container: shadowRoot },
                react_1.default.createElement(PopupCard_1.PopupCard, { selection: msg }))), MyBox);
    });
}
let ANKI_INFO;
let USER_INFO;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // 获取用户信息
    USER_INFO = yield (0, util_1.getUserInfo)();
    console.log('USER_INFO:');
    console.log(USER_INFO);
    // 页面载入后获取 Anki 牌组信息
    webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {
        ANKI_INFO = result.data;
    });
}))();
// 记录上一次获取到的错题信息，避免重复添加相同的错题
let prevValues = null;
// 创建观察器实例
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        // 用户回答问题错误（如果页面上存在类名为 'kVhsm' 且 data-test 属性包含 'blame-incorrect' 的 div 元素）
        const targetDiv = document.querySelector('div.kVhsm[data-test*="blame-incorrect"]');
        if (targetDiv) {
            const newValues = getValues();
            console.log(newValues);
            // 返回一个对象 {front: B, back: A}
            if (newValues.front !== '' && newValues.back !== '' &&
                (prevValues === null ||
                    newValues.front !== prevValues.front &&
                        newValues.back !== prevValues.back)) {
                addToAnki(newValues);
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
const addToAnki = (note) => {
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
    };
    let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote' }, });
};
// 从页面上读取问题和答案
function getValues() {
    let f = '';
    let b = '';
    let audio = [];
    // 英文-中文：英文填空+英文选项（正面需要发音）
    const divElement1 = document.querySelector('div._1y-0G._3IQqi._2RC-4.d84Fd');
    if (divElement1) {
        const aElement = divElement1.querySelector('div[dir="ltr"]');
        const bElement = document.querySelector('div._1UqAr._3Qruy');
        if (aElement && bElement) {
            f = '';
            const spans = aElement.querySelectorAll('span');
            const answers = [];
            spans.forEach(span => {
                if (span.className === '_2Iqyl') {
                    // 填空题的画线部分
                    f += '(';
                    // 从aElement下属的data-test="challenge-judge-text"的span元素中获取答案
                    const answerSpans = divElement1.querySelectorAll('span[data-test="challenge-judge-text"]');
                    answerSpans.forEach(answerSpan => {
                        answers.push(answerSpan.textContent);
                    });
                    f += answers.join('/');
                    f += ')';
                }
                else if (span.className === 'g-kCu') {
                    f += span.textContent;
                }
            });
            b = bElement.textContent;
            // 发音
            audio = getAudio(f);
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
            audio = getAudio(f);
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
        f += '<br><br>' + divElement3.querySelector('div._9XgpY._2Hg6H._1dBSx._3slGi').textContent + '<br><br>';
        // 处理选项
        const answers = [];
        // 从aElement下属的data-test="challenge-judge-text"的span元素中获取答案
        const answerSpans = divElement3.querySelectorAll('span[data-test="challenge-judge-text"]');
        answerSpans.forEach((answerSpan, index) => {
            answers.push(answerSpan.textContent);
            f += index + '. ' + answerSpan.textContent + '<br>';
        });
        // 问题中存在语音播放按钮则表示此问题需要发音
        if (divElement3.querySelector('button._1nlVc._2fOC9')) {
            // 发音
            audio = getAudio(f);
        }
    }
    return { front: f, back: b, audio: audio };
}
const getAudio = (f) => {
    let audio = [];
    const title = document.title; // 获取网页的标题
    let audioUrl = 'https://dict.youdao.com/dictvoice?type=0&audio=';
    if (title.includes('日语')) {
        audioUrl = 'https://dict.youdao.com/dictvoice?le=jap&type=0&audio=';
    }
    else if (title.includes('韩语')) {
        audioUrl = 'https://dict.youdao.com/dictvoice?le=ko&type=0&audio=';
    }
    else if (title.includes('xxxx')) {
        audioUrl = 'https://dict.youdao.com/dictvoice?type=0&audio=';
    }
    else {
        audioUrl = 'https://dict.youdao.com/dictvoice?type=0&audio=';
    }
    if (f) {
        const t = new Date().getTime().toString();
        audio = [{
                "url": audioUrl + f,
                "filename": t + ".mp3",
                "fields": [
                    "Front"
                ]
            }];
    }
    return audio;
};


/***/ }),

/***/ "./src/utils/util.ts":
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cardStyle = exports.getUserInfo = exports.getSettings = exports.getDefaultDeckName = exports.ankiAction = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
// 将信息添加到 Anki
function ankiAction(action, version, params = {}) {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8765', {
            method: "POST",
            body: JSON.stringify({ "action": action, "version": version, "params": params })
        }).then(response => response.json()).then((data) => {
            // console.log(data);
            resolve(data);
        }).catch((error) => {
            reject({ 'result': [], 'error': 'Please open the Anki client and install the Anki-Connect plugin before trying again.' });
        });
    });
}
exports.ankiAction = ankiAction;
// 获取 Anki 的 Deck 名称，添加到卡片会存放到这里
const getDefaultDeckName = () => {
    return new Promise((resolve, reject) => {
        let defaultDeckName = '';
        // 获取用户设置的 Deck Name
        webextension_polyfill_1.default.storage.sync.get(["ankiDeckName"]).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log('result:');
            // console.log(result);
            if (result.ankiDeckName) {
                // 用户有设置
                defaultDeckName = result.ankiDeckName;
            }
            else {
                // 用户未设置
                // 获取 Anki 的牌组列表
                yield ankiAction('deckNames', 6).then((result) => {
                    // // 将第一个牌组作为默认牌组
                    // return result.result[0]
                    //判断是否存在 Duolingo 牌组
                    if (result.result.includes('Duolingo') !== true) {
                        // 不包含，创建 Duolingo 牌组
                        ankiAction("createDeck", 6, { "deck": "Duolingo" }).then((response) => {
                            defaultDeckName = 'Duolingo';
                            resolve({ 'defaultDeckName': defaultDeckName });
                        });
                    }
                    else {
                        defaultDeckName = 'Duolingo';
                        resolve({ 'defaultDeckName': defaultDeckName });
                    }
                }).catch((error) => {
                    // console.log(error);
                    // return []
                });
            }
            // resolve({ 'defaultDeckName': defaultDeckName })
        }));
    });
};
exports.getDefaultDeckName = getDefaultDeckName;
// 获取配置信息
function getSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        let items = yield webextension_polyfill_1.default.storage.sync.get({
            "newLicenseKey": ''
        });
        return items;
    });
}
exports.getSettings = getSettings;
// 获取用户相关信息
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        webextension_polyfill_1.default.storage.sync.get(['newLicenseKey']).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            if (webextension_polyfill_1.default.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            let verified = false;
            if (result.newLicenseKey) {
                // 判断用户
                const url = 'https://6r4atckmdr.us.aircode.run/index';
                const headers = { 'Authorization': 'Bearer ' + result.newLicenseKey, 'Content-Type': 'application/json', };
                yield fetch(url, {
                    headers: headers
                }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                    yield response.json().then((data) => {
                        verified = data.verified;
                    });
                }));
            }
            resolve({ 'verified': verified });
        }));
    });
};
exports.getUserInfo = getUserInfo;
exports.cardStyle = `

  .card {
    font-family: arial;
    font-size: 18px;
    color: rgb(0 0 0 / 84%);
    background-color: white;
    text-align: left;
    line-height: 1.6;
  }

  blockquote {
    border-left: 5px solid #ccc;
    padding: 8px 16px;
    margin-left:0;
    margin-right:0;
		background-color: rgb(0 0 0 / 4%);
  }

  a {
    text-decoration: underline;
  }

  img {
    max-height: 320px;
  }

  .ankiSpace {
    color:#F08A24;
  }

  .keyWord {
    color:#F08A24;
  }

  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin:0;
    padding:0;
    width: 100%;
  }

  table tr {
    border: 1px solid #ddd;
    padding: 5px;
  }

  table th, table td {
    padding: 10px;
    text-align: left;
  }

  table th {
    letter-spacing: 1px;
    text-transform: uppercase;
  }`;


/***/ }),

/***/ "./src/assets/icon128.png":
/*!********************************!*\
  !*** ./src/assets/icon128.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"content_script": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchrome_extension_typescript_starter"] = self["webpackChunkchrome_extension_typescript_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/ContentScript/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9OYXYudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvUG9wdXBDYXJkL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db250ZW50U2NyaXB0L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy91dGlscy91dGlsLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29uMTI4LnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmF2ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgaWNvbjEyOF9wbmdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYXNzZXRzL2ljb24xMjgucG5nXCIpKTtcbmZ1bmN0aW9uIE5hdihwcm9wcykge1xuICAgIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKDApO1xuICAgIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiU2NvdXRlck5hdlwiLCBzdHlsZToge1xuICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIHRvcDogMCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICB6SW5kZXg6IDk5OTlcbiAgICAgICAgfSwgb25Nb3VzZURvd246IHByb3BzLm9uTW91c2VEb3duIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBpY29uMTI4X3BuZ18xLmRlZmF1bHQgfSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJpZ2h0QnRuQm94XCIsIHN0eWxlOiB7IGZsZXg6IDEsIHRleHRBbGlnbjogJ3JpZ2h0JyB9IH0pKSk7XG59XG5leHBvcnRzLk5hdiA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IE5hdl8xID0gcmVxdWlyZShcIi4uLy4uL0NvbXBvbmVudHMvTmF2XCIpO1xuZnVuY3Rpb24gUG9wdXBDYXJkKHByb3BzKSB7XG4gICAgLy8g56qX5Y+j5ouW5ou96YC76L6RXG4gICAgY29uc3QgW2RyYWdnaW5nLCBzZXREcmFnZ2luZ10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IHdpbmRvd0VsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDorr7nva7nqpflj6PnmoTpu5jorqTkvY3nva5cbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAwO1xuICAgICAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgICAgICBjb25zdCBtYXhYID0gd2luZG93V2lkdGggLSBlbGVtZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBtYXhYIC0gMjA7XG4gICAgICAgICAgICBjb25zdCBuZXdZID0gcHJvcHMuc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5vZmZzZXRUb3AgKyBwcm9wcy5zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LmNsaWVudEhlaWdodCArIDIwO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFggPSBNYXRoLm1heChtaW5YLCBNYXRoLm1pbihuZXdYLCBtYXhYKSk7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWSA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG5ld1ksIG1heFkpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApKTtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS5sZWZ0ID0gYCR7Y2xhbXBlZFh9cHhgO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICAgICAgfVxuICAgIH0sIFtwcm9wc10pO1xuICAgIC8vIOeql+WPo+aLluaLveaXtuinpuWPkVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgfTtcbiAgICB9LCBbZHJhZ2dpbmddKTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZURvd24nKTtcbiAgICAgICAgc2V0RHJhZ2dpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXRPZmZzZXQoeyB4OiBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ueCwgeTogZXZlbnQuY2xpZW50WSAtIHBvc2l0aW9uLnkgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZU1vdmUnKTtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coZHJhZ2dpbmcpO1xuICAgICAgICBpZiAoZHJhZ2dpbmcgJiYgd2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIHRocm90dGxlIHRoZSBtb3VzZW1vdmUgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICAgIC8vIOm8oOagh+ebuOWvueeql+WPo+W3puS4iuinkueahOWBj+enu1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHBhcnNlRmxvYXQod2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WCB8fCAnJyk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0WDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0WTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtaW5YID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvd0hlaWdodCAtIGVsZW1lbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRZID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obmV3WSwgbWF4WSkpO1xuICAgICAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHBvc2l0aW9uIGlmIGl0J3Mgd2l0aGluIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICAvLyBuZXdYID49IG1pblggJiYgbmV3WCA8PSBtYXhYICYmIG5ld1kgPj0gbWluWSAmJiBuZXdZIDw9IG1heFlcbiAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0UG9zaXRpb24oeyB4OiBjbGFtcGVkWCwgeTogY2xhbXBlZFkgfSk7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWFg+e0oOWIsOi+vui+ueeVjFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAvLyB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgPSBTdHJpbmcob2Zmc2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoKSA9PiB7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdQb3B1cENhcmQ6aGFuZGxlTW91c2VVcCcpO1xuICAgICAgICBzZXREcmFnZ2luZyhmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiTGVhcm5pbmdFbmdsaXNoMjAyM1wiLCByZWY6IHdpbmRvd0VsZW1lbnQgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTmF2XzEuTmF2LCB7IG9uTW91c2VEb3duOiBoYW5kbGVNb3VzZURvd24gfSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnY29udGVudEJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNDVweCdcbiAgICAgICAgICAgIH0gfSwgXCJQb3B1cENhcmRcIikpKTtcbn1cbmV4cG9ydHMuUG9wdXBDYXJkID0gUG9wdXBDYXJkO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5jb25zdCBQb3B1cENhcmRfMSA9IHJlcXVpcmUoXCIuL1BvcHVwQ2FyZFwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91dGlsXCIpO1xuY29uc3QgY3NzaW5qc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2Nzc2luanNcIik7XG5jb25zdCBBUFBfTkFNRSA9ICdfX2ppYW5nLUltcG9ydC1EdW9saW5nby1NaXN0YWtlcy10by1BbmtpJztcbi8vIC8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xuLy8gbGV0IE15Qm94OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChBUFBfTkFNRSk7XG4vLyAvLyBjb250YWluZXIg5om/6L29IFVJIOe7hOS7tlxuLy8gbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4vLyAvLyDkvb/nlKggc2hhZG93IOadpemalOemu+agt+W8j1xuLy8gbGV0IHNoYWRvd1Jvb3Q6IGFueSA9IHVuZGVmaW5lZFxuLy8gaWYgKE15Qm94ICE9PSBudWxsICYmIE15Qm94ICE9PSB1bmRlZmluZWQpIHtcbi8vICAgLy8g5aaC5p6c5bey5a2Y5Zyo5a655ZmoXG4vLyAgIC8vIGNvbnNvbGUubG9nKCflt7LlrZjlnKggQm94IOWuueWZqCcpO1xuLy8gICAvLyDnp7vpmaTml6flrrnlmajvvIzpgb/lhY3lh7rnjrAgMiDkuKrkuLvlrrnlmajkvJrlr7zoh7QgVUkg5riy5p+T6ZSZ6K+vXG4vLyAgIE15Qm94LnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKE15Qm94KTtcbi8vIH1cbi8vIC8vIOWIm+W7uuS4u+WuueWZqFxuLy8gTXlCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuLy8gTXlCb3guaWQgPSBBUFBfTkFNRVxuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5hcHBlbmRDaGlsZChNeUJveCk7XG4vLyBNeUJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnIC8v6buY6K6k6ZqQ6JePXG4vLyBzaGFkb3dSb290ID0gTXlCb3g/LmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbi8vIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJ1xuLy8gc2hhZG93Um9vdD8uYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuLy8gLy8g5ZyoIFNoYWRvdyBET00g5Lit5re75Yqg5qC35byP77yaXG4vLyBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4vLyBzdHlsZS50ZXh0Q29udGVudCA9IGBcbi8vICAgI0xlYXJuaW5nRW5nbGlzaDIwMjMge1xuLy8gICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuLy8gICAgIHdpZHRoOiA0MDBweDtcbi8vICAgICBoZWlnaHQ6IDUwMHB4O1xuLy8gICAgIGNvbG9yOiAjMzMzO1xuLy8gICAgIHBvc2l0aW9uOiBmaXhlZDtcbi8vICAgICBkaXNwbGF5OiBmbGV4O1xuLy8gICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4vLyAgICAgZm9udC1zaXplOiAxMy40cHg7XG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbi8vICAgICB6LWluZGV4OiA5OTk5O1xuLy8gICAgIG92ZXJmbG93OiBoaWRkZW47XG4vLyAgICAgYm94LXNoYWRvdzogMnB4IDRweCAxNnB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgLTFweCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcbi8vICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4vLyAgICAgfVxuLy8gICAgICNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2IHtcbi8vICAgICAgIGRpc3BsYXk6IGZsZXg7XG4vLyAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuLy8gICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbi8vICAgICAgIHBhZGRpbmc6IDEwcHggMTlweDtcbi8vICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4vLyAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbi8vICAgICAgIH1cbi8vICAgICAgICNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2IGltZyB7XG4vLyAgICAgICB3aWR0aDogYXV0bztcbi8vICAgICAgIGhlaWdodDogMjRweDtcbi8vICAgICAgIG1hcmdpbi1yaWdodDogNnB4O1xuLy8gICAgICAgfVxuLy8gICBgXG4vLyBzaGFkb3dSb290Py5hcHBlbmRDaGlsZChzdHlsZSk7XG4vLyAvLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXop6blj5HvvIlcbi8vIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbi8vICAgY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbi8vICAgY29uc29sZS5sb2cobXNnKTtcbi8vICAgaWYgKG1zZy50eXBlID09PSAnb3BlblBvcHVwQ2FyZCcpIHtcbi8vICAgICAvLyDlpITnkIbnqpflj6Ncbi8vICAgICBpZiAoTXlCb3ggIT09IG51bGwgJiYgTXlCb3ggIT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgLy8g5aaC5p6c5bey5a2Y5Zyo5a655ZmoXG4vLyAgICAgICAvLyBjb25zb2xlLmxvZygn5bey5a2Y5ZyoIEJveCDlrrnlmagnKTtcbi8vICAgICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4vLyAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbi8vICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZygn5LiN5a2Y5ZyoIEJveCDlrrnlmagnKTtcbi8vICAgICB9XG4vLyAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcbi8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcidcbi8vICAgICBzaGFkb3dSb290Py5hcHBlbmRDaGlsZChjb250YWluZXIpXG4vLyAgICAgLy8g5pi+56S656qX5Y+j77yMd2luZG93LmdldFNlbGVjdGlvbigpIOaYr+W9k+WJjem8oOagh+mAieS4reeahOWMuuWfn+S/oeaBr1xuLy8gICAgIGNvbnNvbGUubG9nKHdpbmRvdy5nZXRTZWxlY3Rpb24oKSk7XG4vLyAgICAgc2hvd1BvcHVwQ2FyZCh3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdClcbi8vICAgICAvLyDnm5HlkKzpobXpnaLngrnlh7vkuovku7Zcbi8vICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuLy8gICAgICAgaWYgKE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwpIHtcbi8vICAgICAgICAgLy8g5aaC5p6c54K55Ye755qE5LiN5piv5o+S5Lu256qX5Y+j5Y+K5YW25a2Q5YWD57Sg77yM5YiZ5YWz6Zet56qX5Y+jXG4vLyAgICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbi8vICAgICAgICAgICAvLyDpmpDol4/nqpflj6Ncbi8vICAgICAgICAgICBjb250YWluZXIucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfSk7XG4vLyDmmL7npLrlupTnlKjnqpflj6NcbmZ1bmN0aW9uIHNob3dQb3B1cENhcmQobXNnLCBNeUJveCwgc2hhZG93Um9vdCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUG9wdXBDYXJkXzEuUG9wdXBDYXJkLCB7IHNlbGVjdGlvbjogbXNnIH0pKSksIE15Qm94KTtcbiAgICB9KTtcbn1cbmxldCBBTktJX0lORk87XG5sZXQgVVNFUl9JTkZPO1xuKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIFVTRVJfSU5GTyA9IHlpZWxkICgwLCB1dGlsXzEuZ2V0VXNlckluZm8pKCk7XG4gICAgY29uc29sZS5sb2coJ1VTRVJfSU5GTzonKTtcbiAgICBjb25zb2xlLmxvZyhVU0VSX0lORk8pO1xuICAgIC8vIOmhtemdoui9veWFpeWQjuiOt+WPliBBbmtpIOeJjOe7hOS/oeaBr1xuICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ3NldE1vZGVsJywgJ21lc3NhZ2VzJzoge30sIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBBTktJX0lORk8gPSByZXN1bHQuZGF0YTtcbiAgICB9KTtcbn0pKSgpO1xuLy8g6K6w5b2V5LiK5LiA5qyh6I635Y+W5Yiw55qE6ZSZ6aKY5L+h5oGv77yM6YG/5YWN6YeN5aSN5re75Yqg55u45ZCM55qE6ZSZ6aKYXG5sZXQgcHJldlZhbHVlcyA9IG51bGw7XG4vLyDliJvlu7rop4Llr5/lmajlrp7kvotcbmNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICAvLyDnlKjmiLflm57nrZTpl67popjplJnor6/vvIjlpoLmnpzpobXpnaLkuIrlrZjlnKjnsbvlkI3kuLogJ2tWaHNtJyDkuJQgZGF0YS10ZXN0IOWxnuaAp+WMheWQqyAnYmxhbWUtaW5jb3JyZWN0JyDnmoQgZGl2IOWFg+e0oO+8iVxuICAgICAgICBjb25zdCB0YXJnZXREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYua1Zoc21bZGF0YS10ZXN0Kj1cImJsYW1lLWluY29ycmVjdFwiXScpO1xuICAgICAgICBpZiAodGFyZ2V0RGl2KSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBnZXRWYWx1ZXMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAvLyDov5Tlm57kuIDkuKrlr7nosaEge2Zyb250OiBCLCBiYWNrOiBBfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlcy5mcm9udCAhPT0gJycgJiYgbmV3VmFsdWVzLmJhY2sgIT09ICcnICYmXG4gICAgICAgICAgICAgICAgKHByZXZWYWx1ZXMgPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzLmZyb250ICE9PSBwcmV2VmFsdWVzLmZyb250ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZXMuYmFjayAhPT0gcHJldlZhbHVlcy5iYWNrKSkge1xuICAgICAgICAgICAgICAgIGFkZFRvQW5raShuZXdWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIHByZXZWYWx1ZXMgPSBuZXdWYWx1ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlgZzmraLop4Llr5/ku6XpmLLmraLml6DpmZDlvqrnjq9cbiAgICAgICAgICAgIC8vIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4vLyDphY3nva7op4Llr5/lmahcbmNvbnN0IG9ic2VydmVyQ29uZmlnID0ge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlXG59O1xuLy8g6YCJ5oup55uu5qCH6IqC54K5XG5jb25zdCB0YXJnZXROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuLy8g5byA5aeL6KeC5a+f55uu5qCH6IqC54K5XG5pZiAodGFyZ2V0Tm9kZSkge1xuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgb2JzZXJ2ZXJDb25maWcpO1xufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyDmt7vliqDliLAgQW5raSDkuK1cbmNvbnN0IGFkZFRvQW5raSA9IChub3RlKSA9PiB7XG4gICAgY29uc3QgcCA9IHtcbiAgICAgICAgXCJub3RlXCI6IHtcbiAgICAgICAgICAgIFwiZGVja05hbWVcIjogQU5LSV9JTkZPWzBdLmRlZmF1bHREZWNrTmFtZSxcbiAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IEFOS0lfSU5GT1swXS5tb2RlbE5hbWUsXG4gICAgICAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgICAgICAgICAgICAgW0FOS0lfSU5GT1swXS5maWVsZDFdOiBub3RlLmZyb250LFxuICAgICAgICAgICAgICAgIFtBTktJX0lORk9bMF0uZmllbGQyXTogbm90ZS5iYWNrXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhdWRpb1wiOiBub3RlLmF1ZGlvLFxuICAgICAgICAgICAgXCJ0YWdzXCI6IFtcbiAgICAgICAgICAgICAgICBcIkR1b2xpbmdvXCJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhZGROb3RlJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hcmd1bWVudHMnOiBwLCAnYW5raV9hY3Rpb25fdHlwZSc6ICdhZGROb3RlJyB9LCB9KTtcbn07XG4vLyDku47pobXpnaLkuIror7vlj5bpl67popjlkoznrZTmoYhcbmZ1bmN0aW9uIGdldFZhbHVlcygpIHtcbiAgICBsZXQgZiA9ICcnO1xuICAgIGxldCBiID0gJyc7XG4gICAgbGV0IGF1ZGlvID0gW107XG4gICAgLy8g6Iux5paHLeS4reaWh++8muiLseaWh+Whq+epuivoi7HmlofpgInpobnvvIjmraPpnaLpnIDopoHlj5Hpn7PvvIlcbiAgICBjb25zdCBkaXZFbGVtZW50MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5fMXktMEcuXzNJUXFpLl8yUkMtNC5kODRGZCcpO1xuICAgIGlmIChkaXZFbGVtZW50MSkge1xuICAgICAgICBjb25zdCBhRWxlbWVudCA9IGRpdkVsZW1lbnQxLnF1ZXJ5U2VsZWN0b3IoJ2RpdltkaXI9XCJsdHJcIl0nKTtcbiAgICAgICAgY29uc3QgYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuXzFVcUFyLl8zUXJ1eScpO1xuICAgICAgICBpZiAoYUVsZW1lbnQgJiYgYkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGYgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IHNwYW5zID0gYUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYW5zd2VycyA9IFtdO1xuICAgICAgICAgICAgc3BhbnMuZm9yRWFjaChzcGFuID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbi5jbGFzc05hbWUgPT09ICdfMklxeWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWhq+epuumimOeahOeUu+e6v+mDqOWIhlxuICAgICAgICAgICAgICAgICAgICBmICs9ICcoJztcbiAgICAgICAgICAgICAgICAgICAgLy8g5LuOYUVsZW1lbnTkuIvlsZ7nmoRkYXRhLXRlc3Q9XCJjaGFsbGVuZ2UtanVkZ2UtdGV4dFwi55qEc3BhbuWFg+e0oOS4reiOt+WPluetlOahiFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbnN3ZXJTcGFucyA9IGRpdkVsZW1lbnQxLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW5bZGF0YS10ZXN0PVwiY2hhbGxlbmdlLWp1ZGdlLXRleHRcIl0nKTtcbiAgICAgICAgICAgICAgICAgICAgYW5zd2VyU3BhbnMuZm9yRWFjaChhbnN3ZXJTcGFuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcnMucHVzaChhbnN3ZXJTcGFuLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGYgKz0gYW5zd2Vycy5qb2luKCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIGYgKz0gJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzcGFuLmNsYXNzTmFtZSA9PT0gJ2cta0N1Jykge1xuICAgICAgICAgICAgICAgICAgICBmICs9IHNwYW4udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBiID0gYkVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAvLyDlj5Hpn7NcbiAgICAgICAgICAgIGF1ZGlvID0gZ2V0QXVkaW8oZik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g6Iux5paHL+aXpeivrS3kuK3mlofvvJrkuK3mlofnv7vor5HkuLrlpJbmlofjgIHoi7Hmlocv5pel6K+tLeS4reaWh++8muWkluaWh+e/u+ivkeS4uuS4reaWh++8iOato+mdoumcgOimgeWPkemfs++8ieOAgeaXpeivrS3kuK3mlofvvJrpgInmi6nkuK3mloflr7nlupTnmoTml6Xor63ljZXor41cbiAgICBjb25zdCBkaXZFbGVtZW50MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5fMWxEbVcuZDg0RmQnKTtcbiAgICBpZiAoZGl2RWxlbWVudDIpIHtcbiAgICAgICAgY29uc3QgYUVsZW1lbnQgPSBkaXZFbGVtZW50Mi5xdWVyeVNlbGVjdG9yKCdkaXYuXzFLVXh2Ll8xMXJ0RCcpO1xuICAgICAgICBjb25zdCBiRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5fMVVxQXIuXzNRcnV5Jyk7XG4gICAgICAgIGYgPSBhRWxlbWVudCA/IGFFbGVtZW50LnRleHRDb250ZW50IDogbnVsbDtcbiAgICAgICAgYiA9IGJFbGVtZW50ID8gYkVsZW1lbnQudGV4dENvbnRlbnQgOiBudWxsO1xuICAgICAgICAvLyBfMlVwTHIgXzF4NmJjIF8xN0RYaCB3aHVTUSBfMmd3dFQgXzFubFZjIF8yZk9DOSB0NXdGSiBfM2R0U3UgXzI1Q25jIF8zeUFqTiBVQ3J6NyB5VHBHa1xuICAgICAgICAvLyDpl67popjkuK3lrZjlnKjor63pn7Pmkq3mlL7mjInpkq7liJnooajnpLrmraTpl67popjpnIDopoHlj5Hpn7NcbiAgICAgICAgaWYgKGRpdkVsZW1lbnQyLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5fMW5sVmMuXzJmT0M5JykpIHtcbiAgICAgICAgICAgIC8vIOWPkemfs1xuICAgICAgICAgICAgYXVkaW8gPSBnZXRBdWRpbyhmKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDoi7Hmlocv5pel6K+tLeS4reaWh++8muWkluaWh+e/u+ivkeS4uuS4reaWh++8iOato+mdoumcgOimgeWPkemfs++8iVxuICAgIC8vIGNvbnN0IGRpdkVsZW1lbnQzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Ll8xWmgtZC5fMWxEbVcuZDg0RmQnKTtcbiAgICAvLyBpZiAoZGl2RWxlbWVudDMpIHtcbiAgICAvLyAgIGNvbnN0IGFFbGVtZW50ID0gZGl2RWxlbWVudDMucXVlcnlTZWxlY3RvcignZGl2Ll8xS1V4di5fMTFydEQnKTtcbiAgICAvLyAgIGNvbnN0IGJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Ll8xVXFBci5fM1FydXknKTtcbiAgICAvLyAgIGYgPSBhRWxlbWVudCA/IGFFbGVtZW50LnRleHRDb250ZW50IDogbnVsbDtcbiAgICAvLyAgIGIgPSBiRWxlbWVudCA/IGJFbGVtZW50LnRleHRDb250ZW50IDogbnVsbDtcbiAgICAvLyAgIC8vIOWPkemfs1xuICAgIC8vICAgYXVkaW8gPSBnZXRBdWRpbyhmKVxuICAgIC8vIH1cbiAgICAvLyDml6Xor60t5Lit5paH77ya6YCJ5oup5Lit5paH5a+55bqU55qE5pel6K+t5Y2V6K+NXG4gICAgLy8gY29uc3QgZGl2RWxlbWVudDQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuXzN4QkFKLl8xbERtVy5kODRGZCcpO1xuICAgIC8vIGlmIChkaXZFbGVtZW50NCkge1xuICAgIC8vICAgY29uc3QgYUVsZW1lbnQgPSBkaXZFbGVtZW50NC5xdWVyeVNlbGVjdG9yKCdkaXYuXzFLVXh2Ll8xMXJ0RCcpO1xuICAgIC8vICAgY29uc3QgYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuXzFVcUFyLl8zUXJ1eScpO1xuICAgIC8vICAgZiA9IGFFbGVtZW50ID8gYUVsZW1lbnQudGV4dENvbnRlbnQgOiBudWxsO1xuICAgIC8vICAgYiA9IGJFbGVtZW50ID8gYkVsZW1lbnQudGV4dENvbnRlbnQgOiBudWxsO1xuICAgIC8vIH1cbiAgICAvLyDlj6Por61cbiAgICAvLyDoi7Hor63lkKzliptcbiAgICBjb25zdCBkaXZFbGVtZW50MyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5fM1ZtOEIuXzJSQy00LmQ4NEZkJyk7XG4gICAgaWYgKGRpdkVsZW1lbnQzKSB7XG4gICAgICAgIGNvbnN0IGFFbGVtZW50ID0gZGl2RWxlbWVudDMucXVlcnlTZWxlY3RvcignZGl2Ll8xaVBYSC5fMkhnNkgnKTtcbiAgICAgICAgY29uc3QgYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuXzFVcUFyLl8zUXJ1eScpO1xuICAgICAgICBmID0gYUVsZW1lbnQgPyBhRWxlbWVudC50ZXh0Q29udGVudCA6IG51bGw7XG4gICAgICAgIGIgPSBiRWxlbWVudCA/IGJFbGVtZW50LnRleHRDb250ZW50IDogbnVsbDtcbiAgICAgICAgZiArPSAnPGJyPjxicj4nICsgZGl2RWxlbWVudDMucXVlcnlTZWxlY3RvcignZGl2Ll85WGdwWS5fMkhnNkguXzFkQlN4Ll8zc2xHaScpLnRleHRDb250ZW50ICsgJzxicj48YnI+JztcbiAgICAgICAgLy8g5aSE55CG6YCJ6aG5XG4gICAgICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcbiAgICAgICAgLy8g5LuOYUVsZW1lbnTkuIvlsZ7nmoRkYXRhLXRlc3Q9XCJjaGFsbGVuZ2UtanVkZ2UtdGV4dFwi55qEc3BhbuWFg+e0oOS4reiOt+WPluetlOahiFxuICAgICAgICBjb25zdCBhbnN3ZXJTcGFucyA9IGRpdkVsZW1lbnQzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW5bZGF0YS10ZXN0PVwiY2hhbGxlbmdlLWp1ZGdlLXRleHRcIl0nKTtcbiAgICAgICAgYW5zd2VyU3BhbnMuZm9yRWFjaCgoYW5zd2VyU3BhbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGFuc3dlcnMucHVzaChhbnN3ZXJTcGFuLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIGYgKz0gaW5kZXggKyAnLiAnICsgYW5zd2VyU3Bhbi50ZXh0Q29udGVudCArICc8YnI+JztcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOmXrumimOS4reWtmOWcqOivremfs+aSreaUvuaMiemSruWImeihqOekuuatpOmXrumimOmcgOimgeWPkemfs1xuICAgICAgICBpZiAoZGl2RWxlbWVudDMucXVlcnlTZWxlY3RvcignYnV0dG9uLl8xbmxWYy5fMmZPQzknKSkge1xuICAgICAgICAgICAgLy8g5Y+R6Z+zXG4gICAgICAgICAgICBhdWRpbyA9IGdldEF1ZGlvKGYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGZyb250OiBmLCBiYWNrOiBiLCBhdWRpbzogYXVkaW8gfTtcbn1cbmNvbnN0IGdldEF1ZGlvID0gKGYpID0+IHtcbiAgICBsZXQgYXVkaW8gPSBbXTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnRpdGxlOyAvLyDojrflj5bnvZHpobXnmoTmoIfpophcbiAgICBsZXQgYXVkaW9VcmwgPSAnaHR0cHM6Ly9kaWN0LnlvdWRhby5jb20vZGljdHZvaWNlP3R5cGU9MCZhdWRpbz0nO1xuICAgIGlmICh0aXRsZS5pbmNsdWRlcygn5pel6K+tJykpIHtcbiAgICAgICAgYXVkaW9VcmwgPSAnaHR0cHM6Ly9kaWN0LnlvdWRhby5jb20vZGljdHZvaWNlP2xlPWphcCZ0eXBlPTAmYXVkaW89JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGl0bGUuaW5jbHVkZXMoJ+mfqeivrScpKSB7XG4gICAgICAgIGF1ZGlvVXJsID0gJ2h0dHBzOi8vZGljdC55b3VkYW8uY29tL2RpY3R2b2ljZT9sZT1rbyZ0eXBlPTAmYXVkaW89JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGl0bGUuaW5jbHVkZXMoJ3h4eHgnKSkge1xuICAgICAgICBhdWRpb1VybCA9ICdodHRwczovL2RpY3QueW91ZGFvLmNvbS9kaWN0dm9pY2U/dHlwZT0wJmF1ZGlvPSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdWRpb1VybCA9ICdodHRwczovL2RpY3QueW91ZGFvLmNvbS9kaWN0dm9pY2U/dHlwZT0wJmF1ZGlvPSc7XG4gICAgfVxuICAgIGlmIChmKSB7XG4gICAgICAgIGNvbnN0IHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgICAgICBhdWRpbyA9IFt7XG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogYXVkaW9VcmwgKyBmLFxuICAgICAgICAgICAgICAgIFwiZmlsZW5hbWVcIjogdCArIFwiLm1wM1wiLFxuICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJGcm9udFwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfV07XG4gICAgfVxuICAgIHJldHVybiBhdWRpbztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jYXJkU3R5bGUgPSBleHBvcnRzLmdldFVzZXJJbmZvID0gZXhwb3J0cy5nZXRTZXR0aW5ncyA9IGV4cG9ydHMuZ2V0RGVmYXVsdERlY2tOYW1lID0gZXhwb3J0cy5hbmtpQWN0aW9uID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG4vLyDlsIbkv6Hmga/mt7vliqDliLAgQW5raVxuZnVuY3Rpb24gYW5raUFjdGlvbihhY3Rpb24sIHZlcnNpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6ODc2NScsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IFwiYWN0aW9uXCI6IGFjdGlvbiwgXCJ2ZXJzaW9uXCI6IHZlcnNpb24sIFwicGFyYW1zXCI6IHBhcmFtcyB9KVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh7ICdyZXN1bHQnOiBbXSwgJ2Vycm9yJzogJ1BsZWFzZSBvcGVuIHRoZSBBbmtpIGNsaWVudCBhbmQgaW5zdGFsbCB0aGUgQW5raS1Db25uZWN0IHBsdWdpbiBiZWZvcmUgdHJ5aW5nIGFnYWluLicgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5hbmtpQWN0aW9uID0gYW5raUFjdGlvbjtcbi8vIOiOt+WPliBBbmtpIOeahCBEZWNrIOWQjeensO+8jOa3u+WKoOWIsOWNoeeJh+S8muWtmOaUvuWIsOi/memHjFxuY29uc3QgZ2V0RGVmYXVsdERlY2tOYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBkZWZhdWx0RGVja05hbWUgPSAnJztcbiAgICAgICAgLy8g6I635Y+W55So5oi36K6+572u55qEIERlY2sgTmFtZVxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoW1wiYW5raURlY2tOYW1lXCJdKS50aGVuKChyZXN1bHQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Jlc3VsdDonKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmFua2lEZWNrTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+acieiuvue9rlxuICAgICAgICAgICAgICAgIGRlZmF1bHREZWNrTmFtZSA9IHJlc3VsdC5hbmtpRGVja05hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDnlKjmiLfmnKrorr7nva5cbiAgICAgICAgICAgICAgICAvLyDojrflj5YgQW5raSDnmoTniYznu4TliJfooahcbiAgICAgICAgICAgICAgICB5aWVsZCBhbmtpQWN0aW9uKCdkZWNrTmFtZXMnLCA2KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8g5bCG56ys5LiA5Liq54mM57uE5L2c5Li66buY6K6k54mM57uEXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiByZXN1bHQucmVzdWx0WzBdXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5a2Y5ZyoIER1b2xpbmdvIOeJjOe7hFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5pbmNsdWRlcygnRHVvbGluZ28nKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5LiN5YyF5ZCr77yM5Yib5bu6IER1b2xpbmdvIOeJjOe7hFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5raUFjdGlvbihcImNyZWF0ZURlY2tcIiwgNiwgeyBcImRlY2tcIjogXCJEdW9saW5nb1wiIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERlY2tOYW1lID0gJ0R1b2xpbmdvJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHsgJ2RlZmF1bHREZWNrTmFtZSc6IGRlZmF1bHREZWNrTmFtZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERlY2tOYW1lID0gJ0R1b2xpbmdvJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyAnZGVmYXVsdERlY2tOYW1lJzogZGVmYXVsdERlY2tOYW1lIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIFtdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXNvbHZlKHsgJ2RlZmF1bHREZWNrTmFtZSc6IGRlZmF1bHREZWNrTmFtZSB9KVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXREZWZhdWx0RGVja05hbWUgPSBnZXREZWZhdWx0RGVja05hbWU7XG4vLyDojrflj5bphY3nva7kv6Hmga9cbmZ1bmN0aW9uIGdldFNldHRpbmdzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCBpdGVtcyA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7XG4gICAgICAgICAgICBcIm5ld0xpY2Vuc2VLZXlcIjogJydcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0U2V0dGluZ3MgPSBnZXRTZXR0aW5ncztcbi8vIOiOt+WPlueUqOaIt+ebuOWFs+S/oeaBr1xuY29uc3QgZ2V0VXNlckluZm8gPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KFsnbmV3TGljZW5zZUtleSddKS50aGVuKChyZXN1bHQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2ZXJpZmllZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5uZXdMaWNlbnNlS2V5KSB7XG4gICAgICAgICAgICAgICAgLy8g5Yik5pat55So5oi3XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gJ2h0dHBzOi8vNnI0YXRja21kci51cy5haXJjb2RlLnJ1bi9pbmRleCc7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyByZXN1bHQubmV3TGljZW5zZUtleSwgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgfTtcbiAgICAgICAgICAgICAgICB5aWVsZCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmaWVkID0gZGF0YS52ZXJpZmllZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZSh7ICd2ZXJpZmllZCc6IHZlcmlmaWVkIH0pO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRVc2VySW5mbyA9IGdldFVzZXJJbmZvO1xuZXhwb3J0cy5jYXJkU3R5bGUgPSBgXG5cbiAgLmNhcmQge1xuICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgY29sb3I6IHJnYigwIDAgMCAvIDg0JSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBsaW5lLWhlaWdodDogMS42O1xuICB9XG5cbiAgYmxvY2txdW90ZSB7XG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjY2NjO1xuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgIG1hcmdpbi1sZWZ0OjA7XG4gICAgbWFyZ2luLXJpZ2h0OjA7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMCAwIC8gNCUpO1xuICB9XG5cbiAgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIH1cblxuICBpbWcge1xuICAgIG1heC1oZWlnaHQ6IDMyMHB4O1xuICB9XG5cbiAgLmFua2lTcGFjZSB7XG4gICAgY29sb3I6I0YwOEEyNDtcbiAgfVxuXG4gIC5rZXlXb3JkIHtcbiAgICBjb2xvcjojRjA4QTI0O1xuICB9XG5cbiAgdGFibGUge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgICBtYXJnaW46MDtcbiAgICBwYWRkaW5nOjA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICB0YWJsZSB0ciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gIH1cblxuICB0YWJsZSB0aCwgdGFibGUgdGQge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuXG4gIHRhYmxlIHRoIHtcbiAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIH1gO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQVlBQUFERFBtSExBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBaktTVVJCVkhnQjdaMVBiQlJWSE1kL1ZmblRLTFJzUUFKTnlnRGVURU1KM0t4Sm00Z1gvK0VGazNxZ1BTbGViRy9seEhLQ2VHbTlRRHkxWER4NGFWRTRjYkFFcnFaRjVhaE1TWlNZa05KR1NEVlY2bngzZDdadnhwbk83dXo3ODl0NTc1TThkbVlXQlB1KzgvdjNmbStHeU9Gd09Cd09oNDEwYlBIZFlERE8xajc5WUt3RVk2bjI2UXZYd2s5SEc1SW1nQXZCS0ZOeitPU0UwbllrQ1dBa0dOT2tEcCtjVU5pUUpJRHZxV3IyVGVPVEU0cHlrZ1N3SVo2Y0craW00Wk83YUhYdGVXVThmTEllakg4cW4rSzExYitla3lGOGNrTEpUYVlBbGk0ZW9hN09GeWlMdWhDY1VOcUtUQUdzZlBFYXljUUpoUmN2a1daZ1RmbzZkMlQrUG9OQzhXb2pDNThLSUJUdEFtZ1VKeFE5c0JWQW96aWh0RWJiQzZCUkNpS1V4ZHE0Rm94NWtvRDJJTEFvTUFobS9XQmNETVlNdFlBVGdHSTBDTVduRm9UZ0JNQ0VMS0dFNTFzd0U0eHhhakpPY0FKb0l5Q0V1NytzMGMzN1QrbnJILzVNK2kxK01JWnFudzNoQk5DbVBGeGVwOHUzbHBPRTRGTVRJbkFDYUhNZ2hIZS8raTN1SG54cVVBVFpSWDRIYTNwTDIrakg4eDZkZTZOYnZPd0ZZellZM1ZsLzNnbWdJRno2WUM5TnZGVVNML1VIWTRFeWFndE9BQVZpNHUwU0RaL1lKVjd5cU5yZjRhWDlHU2VBZ25IcC9YM1V1eWRTNFBXb0tvSkVkK0FFVURCUThyNXlabi84c2hlTXlhVGY3d1JRUUFhT2R0TEFrYzc0NVpIYWlPQUVVRkFtVHBXU0xzTUtSRnlCRTBCQmdSV0l4UUlBa3o4bVhuQUNLRER2dlA1SzB1WFB4Uk1uZ0FLVEVBY0FXSUhCOE1RSm9NRDA5V3hQKytwc2VNQ3FJd2dyWFhkL1hTTkg5ZTZGSDIrRnJwMHZwbjExT2hpak9HQWxnS3QzVjRLbHptZmtRRUZuYitzQ1NOL1BBVGZnQmNObjVRS3czdTJvMG5jd3UzK3hSVHo4d3NvQy9QVDczL1hqL3Y1KzZ1N09YTXdxRlBQejgvWGpycDNLNzAwUHY3QVJRS1VWU3VpTG01NmVyb2pBRmhZWEYrbjQ4ZVAxODk0OTIwZ0hiRnlBZVBjRG15WWZySzZ1MW8vaHV4dlpqeWtETmdJUS9iOXRrdzhlUEhoUVA5WjE5d00rRnVEUnBnV3d6ZmVEcGFXbCtyR3V1eCt3ZEFFMldnRGY5K3ZIVmxvQTBRVjRua2UyRVJXQXZ0aWNwUVU0ZHV3WTJjYkt5dVorRHVzc1FEd0Z0REVHUUJvWTBsdXl6QUxZbmdLS2R6L1FVQVNxdzhZQ2hOZ1lBTjY3ZHk5eXJxRU1YSWVIQlZDY0FsNi9mcDA2T2pxa0RmejNaQ0phQUowcElHRG5BbFJZQUxIR0xvTkRodzZSVE1RTVFPZmREOWk1QUJVcG9CaGd5VUMyU0VVQjZQVC9nTVZpa09vVVVCUUFldWFiWFdlLytmTlRPdi9kNDhxeENndGxxZ2dFakF0QWRRcUl5UmQ5Yk4vQjdVMFhXbFNucUpFYVFFbnZsQmgzQWFwVHdIaU5QWStQVlIyam1MUUF4Z1dnT2dVVUE4QzhBZGJENWMyOTl5cGlsRWdNMEdsWkRLQTZCUlQ5ZjkrQm5BSjRzbDQvTHBmTE5EVTFSYXJJKzIvTWkza0JLRGF2b2dEeU5GbkduK0FGZngydjNNbkV1anFBeWhRd0hnRG1XV1VUemI5cWROY0FBQ3NMSURzRmxCRUFRalJYenJ4S091anFmSkYwWTFRQXFsTkFHUUVnbnNFelhOSWJtZXZFcUFCVXA0Q2kvNGNweDlPME9ETjhZbmZsN1N3Nk1XNEJRbFFIZ05VbmJhNFRaL0I2SHQwWURRSlZwb0R4QUxBZDBKMEJBRFl1UUxZRlFFYUJ6U1djUVpDS3VrS0k3aG9BWU9NQ1pLZUFzQ2dqSXlQRUdiR3ZRT2RtRUJHekxzRHlSdEJJbGRKQURRQVlFNEJyQkRXN0NCUmlUQUMyTjRJQ1Uzc0JSSXhhZ0JBYkp4OVk3UUpzM3dzWVgxU3l6Z0xZdmhmUVpDdTRDQXNYWU9OZVFGTmJ3ZUt3c0FDMnA0QzYrd0JGalB6TjhTWUxWTVJ1Mzc1Tm5JRklaY1lxTWpxVlpHQkdBTEVtQys0Vk83Q3dzQ0ExVmpIWkNTeGl4QVZ3WDVWTFF1VlN0YWtBRUJoeUFac1dBRHRoVE5UQXN4QXJsYkluUDU0QzZ0NE5KR0pFQUdJQTJOZXpnMjU4MGtQY09QL3Q0OHFUUzRIc0xJVkxDZ2lNU0U5TUFmRjhZUHl3dWFHeVRpRStFY3prNUFNV01RRHVORzRQaVZZcEFGTlBCRXZDa0FEKzMycjk4YlZIV1M5SDFrWjhwVkwyZG5BdUtTRFFMb0MwREFBLzlNKysrWU00b0hxbE1ySUtXRExibWEvOWI0L1hBQ1luSjJsOGZMeHlITVlENTk0MHV6Z2t1aVBWbTBGTnh3RDZCU0JZQVB4d3g4YkdLcTFSWVE4LzRvRXcrdWFBN0F3QWs4OWxIUUFZY0FHYkZpQXNyYzdPenJKZEVGSVpBQUpUeThBaFJtT0FjTkloQks0ZHZFV3RBSVlZalFIRXUzNXdjSkEyTmphbzZIQm9BeE14YWdGc2JBU0pMQVB2TWIvbjBHZ00wTlhWUmJZUmZWNlJlUmVnVlFEeEdzRGh3NGZKTnJnMGdvVG9GVUNzQmlDN3dzYWQrUE1LVFZjQmdWWUIyTjRLTHI0WENIQllCdGY2TDdDOUZaelRLbUNJc1JqQXhrNWdjVE1vaHhRUUdJc0JiQk1BOHYrNXVibjZlY3FyM2JWakxBYXdTUUNZL0tHaG9mbzU4bi9kajRKSncxZ01ZRXNHZ01nZmt5OVdBQ2RPbFlnTDJnUmdXdzBBK3h4R1IwY3JyNE9OVHo2WHV4OW9pMFRpTlFEeDBTaEZBcFUrM1BYaXBJZGc4am5kL1VDYkFPS3ZocCtabVNGYlFOdjNsWS8yQjRIZnk4UU5iUUlRL2I4dFlPTHg2RGQwT0hIYyt3QzBDUUNGaitHVHU2bm9JTC9Id1A4dmwyTFBWbWdUQU13ZlJ4Tm9Penp0a2tNYlRnQ1dreVNBOW5xK3FxTWxrZ1FRV2JQa3NsdkhvWVlrQVVTNkZsYlgvaVZIY1VrU3dMeDR3bTNUcGtNdW1SYmc1djFuNUNndWFSYWdIZ2hpbzJTOGpPc29EbWxwNEpmaEFTYWYwMTQ5aDF6U0JEQkZnaFdBQUp3VktDWnBBc0RrUjZ6QTVWdkw1R2d2cnQ3SnR0d2RXM3lIdHQyRllIamhoUnVmOXREQWtlYmZ2dW1RUTFpVHFid0FhM2s5ZGkzOXV4Ukdnekd6bFFBQW12Y1h3aE1zYWQ0WjYyWFQwZHF1U0o3SXZEUWtBREFXak1ud0JBMk5zQVJPQkd3bU1pOGZCbU91RVFHQWNqQXVoQ2V3QkpmZTI4ZXF0NjBWMm53aTg0S21UTDlSQVlBeUNTSUFhUEJBanhzWGEyRHBST2JoSWxYbms1b1JBSWk0Z3hEWlFuQVRxWlQ2NUlObUJRQVNSUURRQWpWd3RKUDZEbXl2dkhRWndGMGdqWFFUcVFYa2ZhdTFUd3kvZHQydm5jOVFiTGsvandCQW1XTHV3Q0dWcklsY1NmbXVhZklLQUpUSmlTQUxiUk9abDFZRUFBYURnY2Q3ZVZSczJFOWtYbG9WQVBDb2FnM09FbjhLTzVGNWtTR0FFSS8wQ2NGTnBDUmtDaUNrT3hpbnFlb2Urb094MVN2QjNFUWFSb1VBa3ZCb00wN3dZNThPaDhQaE1NSi9FT1NDRmdBVzgrSUFBQUFBU1VWT1JLNUNZSUk9XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29udGVudF9zY3JpcHRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=