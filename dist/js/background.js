(()=>{var e={665:function(e,r,s){"use strict";var n=this&&this.__awaiter||function(e,r,s,n){return new(s||(s=Promise))((function(t,a){function i(e){try{o(n.next(e))}catch(e){a(e)}}function g(e){try{o(n.throw(e))}catch(e){a(e)}}function o(e){var r;e.done?t(e.value):(r=e.value,r instanceof s?r:new s((function(e){e(r)}))).then(i,g)}o((n=n.apply(e,r||[])).next())}))},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const a=t(s(93150)),i=s(93980);a.default.runtime.onInstalled.addListener((function(){})),a.default.runtime.onConnect.addListener((e=>{console.log("连接中------------"),e.onMessage.addListener((e=>n(void 0,void 0,void 0,(function*(){console.log("接收消息：",e)}))))})),a.default.runtime.onMessage.addListener((function(e,r,s){console.log("Message from the content script: "+e.type);const t=e=>n(this,void 0,void 0,(function*(){try{yield s(e)}catch(e){console.error(e)}}));return"setModel"===e.type?(e.messages.isAnkiSpace,(0,i.getDefaultDeckName)().then((e=>n(this,void 0,void 0,(function*(){let r=e.defaultDeckName;""!==r&&void 0!==r||(r="Duolingo");try{const s=yield(0,i.ankiAction)("modelNames",6);if(console.log("modelNames:"),console.log(s),!s.error){let n=[],a=[{modelName:"Duolingo",cardTemplates:[{name:"Card1",Front:"{{Front}}",Back:"{{Front}}\n                      <hr id=answer>\n                      {{Back}}"}],inOrderFields:["Front","Back"],isAnkiSpace:!1}].map((e=>new Promise(((t,a)=>{s.result.includes(e.modelName)?(0,i.ankiAction)("modelFieldNames",6,{modelName:e.modelName}).then((s=>{s.result.length<2?n.push({defaultDeckName:r,modelName:e.modelName,field1:s.result[0],field2:null,isAnkiSpace:e.isAnkiSpace}):n.push({defaultDeckName:r,modelName:e.modelName,field1:s.result[0],field2:s.result[1],isAnkiSpace:e.isAnkiSpace}),t()})):(0,i.ankiAction)("createModel",6,{modelName:e.modelName,inOrderFields:e.inOrderFields,cardTemplates:e.cardTemplates,isCloze:e.isAnkiSpace,css:i.cardStyle}).then((s=>{s.error||n.push({defaultDeckName:r,modelName:e.modelName,field1:s.result.flds[0].name,field2:s.result.flds[1].name,isAnkiSpace:e.isAnkiSpace}),t()}))}))));Promise.all(a).then((()=>{console.log(n),t({type:"setModel",result:"success",data:n,error:e.error})})).catch((e=>{console.error("Error:",e)}))}}catch(e){t({type:"setModel",result:"failure",error:e})}})))),!0):"addNote"===e.type?(console.log("addNote"),(()=>{n(this,void 0,void 0,(function*(){const r=(yield a.default.storage.local.get({mistakes:[]})).mistakes,s=yield(0,i.getUserInfo)();r.length>10&&!s.verified||(0,i.ankiAction)(e.messages.anki_action_type,6,e.messages.anki_arguments).then((s=>{t({type:"addToAnki",result:"success",data:s.result,error:s.error});let n=r;n.unshift(e.messages.anki_arguments),n.length>100&&(n=n.slice(0,100)),a.default.storage.local.set({mistakes:n})})).catch((e=>{console.error(e),t({type:"addToAnki",result:"failure",error:e.error})}))}))})(),!0):void 0}))},93980:function(e,r,s){"use strict";var n=this&&this.__awaiter||function(e,r,s,n){return new(s||(s=Promise))((function(t,a){function i(e){try{o(n.next(e))}catch(e){a(e)}}function g(e){try{o(n.throw(e))}catch(e){a(e)}}function o(e){var r;e.done?t(e.value):(r=e.value,r instanceof s?r:new s((function(e){e(r)}))).then(i,g)}o((n=n.apply(e,r||[])).next())}))},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.cardStyle=r.getUserInfo=r.getSettings=r.getDefaultDeckName=r.ankiAction=void 0;const a=t(s(93150));function i(e,r,s={}){return new Promise(((n,t)=>{fetch("http://127.0.0.1:8765",{method:"POST",body:JSON.stringify({action:e,version:r,params:s})}).then((e=>e.json())).then((e=>{n(e)})).catch((e=>{t({result:[],error:"Please open the Anki client and install the Anki-Connect plugin before trying again."})}))}))}r.ankiAction=i,r.getDefaultDeckName=()=>new Promise(((e,r)=>{let s="";a.default.storage.sync.get(["ankiDeckName"]).then((r=>n(void 0,void 0,void 0,(function*(){r.ankiDeckName?s=r.ankiDeckName:yield i("deckNames",6).then((r=>{!0!==r.result.includes("Duolingo")?i("createDeck",6,{deck:"Duolingo"}).then((r=>{s="Duolingo",e({defaultDeckName:s})})):(s="Duolingo",e({defaultDeckName:s}))})).catch((e=>{}))}))))})),r.getSettings=function(){return n(this,void 0,void 0,(function*(){return yield a.default.storage.sync.get({newLicenseKey:""})}))},r.getUserInfo=()=>new Promise(((e,r)=>{a.default.storage.sync.get(["newLicenseKey"]).then((s=>n(void 0,void 0,void 0,(function*(){a.default.runtime.lastError&&r(chrome.runtime.lastError);let t=!1;if(s.newLicenseKey){const e="https://6r4atckmdr.us.aircode.run/index",r={Authorization:"Bearer "+s.newLicenseKey,"Content-Type":"application/json"};yield fetch(e,{headers:r}).then((e=>n(void 0,void 0,void 0,(function*(){yield e.json().then((e=>{t=e.verified}))}))))}e({verified:t})}))))})),r.cardStyle="\n\n  .card {\n    font-family: arial;\n    font-size: 18px;\n    color: rgb(0 0 0 / 84%);\n    background-color: white;\n    text-align: left;\n    line-height: 1.6;\n  }\n\n  blockquote {\n    border-left: 5px solid #ccc;\n    padding: 8px 16px;\n    margin-left:0;\n    margin-right:0;\n\t\tbackground-color: rgb(0 0 0 / 4%);\n  }\n\n  a {\n    text-decoration: underline;\n  }\n\n  img {\n    max-height: 320px;\n  }\n\n  .ankiSpace {\n    color:#F08A24;\n  }\n\n  .keyWord {\n    color:#F08A24;\n  }\n\n  table {\n    border: 1px solid #ccc;\n    border-collapse: collapse;\n    margin:0;\n    padding:0;\n    width: 100%;\n  }\n\n  table tr {\n    border: 1px solid #ddd;\n    padding: 5px;\n  }\n\n  table th, table td {\n    padding: 10px;\n    text-align: left;\n  }\n\n  table th {\n    letter-spacing: 1px;\n    text-transform: uppercase;\n  }"},93150:function(e,r){var s,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=function(e){"use strict";if(!globalThis.chrome?.runtime?.id)throw new Error("This script should only be loaded in a browser extension.");if(void 0===globalThis.browser||Object.getPrototypeOf(globalThis.browser)!==Object.prototype){const r="The message port closed before a response was received.",s=e=>{const s={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(s).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class n extends WeakMap{constructor(e,r=undefined){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const t=(r,s)=>(...n)=>{e.runtime.lastError?r.reject(new Error(e.runtime.lastError.message)):s.singleCallbackArg||n.length<=1&&!1!==s.singleCallbackArg?r.resolve(n[0]):r.resolve(n)},a=e=>1==e?"argument":"arguments",i=(e,r,s)=>new Proxy(r,{apply:(r,n,t)=>s.call(n,e,...t)});let g=Function.call.bind(Object.prototype.hasOwnProperty);const o=(e,r={},s={})=>{let n=Object.create(null),m={has:(r,s)=>s in e||s in n,get(m,l,A){if(l in n)return n[l];if(!(l in e))return;let c=e[l];if("function"==typeof c)if("function"==typeof r[l])c=i(e,e[l],r[l]);else if(g(s,l)){let r=((e,r)=>function(s,...n){if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${a(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${a(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((a,i)=>{if(r.fallbackToNoCallback)try{s[e](...n,t({resolve:a,reject:i},r))}catch(t){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,t),s[e](...n),r.fallbackToNoCallback=!1,r.noCallback=!0,a()}else r.noCallback?(s[e](...n),a()):s[e](...n,t({resolve:a,reject:i},r))}))})(l,s[l]);c=i(e,e[l],r)}else c=c.bind(e);else if("object"==typeof c&&null!==c&&(g(r,l)||g(s,l)))c=o(c,r[l],s[l]);else{if(!g(s,"*"))return Object.defineProperty(n,l,{configurable:!0,enumerable:!0,get:()=>e[l],set(r){e[l]=r}}),c;c=o(c,r[l],s["*"])}return n[l]=c,c},set:(r,s,t,a)=>(s in n?n[s]=t:e[s]=t,!0),defineProperty:(e,r,s)=>Reflect.defineProperty(n,r,s),deleteProperty:(e,r)=>Reflect.deleteProperty(n,r)},l=Object.create(e);return new Proxy(l,m)},m=e=>({addListener(r,s,...n){r.addListener(e.get(s),...n)},hasListener:(r,s)=>r.hasListener(e.get(s)),removeListener(r,s){r.removeListener(e.get(s))}}),l=new n((e=>"function"!=typeof e?e:function(r){const s=o(r,{},{getContent:{minArgs:0,maxArgs:0}});e(s)})),A=new n((e=>"function"!=typeof e?e:function(r,s,n){let t,a,i=!1,g=new Promise((e=>{t=function(r){i=!0,e(r)}}));try{a=e(r,s,t)}catch(e){a=Promise.reject(e)}const o=!0!==a&&((m=a)&&"object"==typeof m&&"function"==typeof m.then);var m;if(!0!==a&&!o&&!i)return!1;return(o?a:g).then((e=>{n(e)}),(e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",n({__mozWebExtensionPolyfillReject__:!0,message:r})})).catch((e=>{console.error("Failed to send onMessage rejected reply",e)})),!0})),c=({reject:s,resolve:n},t)=>{e.runtime.lastError?e.runtime.lastError.message===r?n():s(new Error(e.runtime.lastError.message)):t&&t.__mozWebExtensionPolyfillReject__?s(new Error(t.message)):n(t)},d=(e,r,s,...n)=>{if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${a(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${a(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((e,r)=>{const t=c.bind(null,{resolve:e,reject:r});n.push(t),s.sendMessage(...n)}))},u={devtools:{network:{onRequestFinished:m(l)}},runtime:{onMessage:m(A),onMessageExternal:m(A),sendMessage:d.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:d.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},x={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return s.privacy={network:{"*":x},services:{"*":x},websites:{"*":x}},o(e,u,s)};e.exports=s(chrome)}else e.exports=globalThis.browser},void 0===(n=s.apply(r,[e]))||(e.exports=n)}},r={};!function s(n){var t=r[n];if(void 0!==t)return t.exports;var a=r[n]={exports:{}};return e[n].call(a.exports,a,a.exports,s),a.exports}(665)})();