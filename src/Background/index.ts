import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { getDefaultDeckName, ankiAction, cardStyle } from '../utils/util'

// 插件安装事件
browser.runtime.onInstalled.addListener(function () {

});

// 卸载插件后打开指定链接
// browser.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdobGQN3O0Ck4fVrgfvRZMme3de-2OaEp1pFtibZkU0koc37w/viewform?usp=sf_link");

// 创建右键菜单
// browser.contextMenus.create({
//     id: "1",
//     title: "hello",
//     contexts: ["selection", "page"],
// },
//     () => {
//         browser.runtime.lastError
//     });


// 右键菜单点击事件
// browser.contextMenus.onClicked.addListener(async function (info, _tab) {

//     console.log('右键菜单点击事件');

//     browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//         console.log(tabs);
//         const activeTab = tabs[0]
//         let tID = activeTab.id ?? -1

//         if (activeTab && activeTab.id !== undefined) {

//             // 唤起 Content Script 中的 PopupCard
//             let b = browser.tabs.sendMessage(tID, { type: 'openPopupCard', info, })

//             // 已知情况：刚安装插件时直接使用会报错（刷新页面后使用则正常），此时需要载入 content_script.js 才行
//             b.catch(e => {
//                 console.log(e);
//                 console.log('catch');

//                 browser.scripting.executeScript({
//                     target: { tabId: tID },
//                     files: ["js/vendor.js", "js/content_script.js"],
//                 }).then(() => {
//                     console.log('chrome.scripting.executeScript');
//                 }).then(() => {
//                     browser.tabs.sendMessage(tID, { type: 'open-souter', info, })
//                 })

//             })

//         }


//     })

// })

// 长连接，处理 Content Script 发来的消息
browser.runtime.onConnect.addListener(port => {
    // 收到 content script 消息
    console.log('连接中------------')

    // 接收 content script 的消息
    port.onMessage.addListener(async (msg: any) => {
        console.log('接收消息：', msg)
    })
})


browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request: any, sender: any, sendResponse: any) {

    console.log("Message from the content script: " + request.type);

    // Define sendResponse as an async function
    const asyncSendResponse = async (response: any) => {
        try {
            await sendResponse(response);
        } catch (error) {
            console.error(error);
        }
    };

    if (request.type === 'setModel') {

        const isAnkiSpace = request.messages.isAnkiSpace


        // 获取 DeckName
        getDefaultDeckName().then(async (result: any) => {

            let defaultDeckName = result.defaultDeckName

            if (defaultDeckName === '' || defaultDeckName === undefined) {
                defaultDeckName = 'Duolingo'
            }

            // 获取用户的所有 model 名称

            try {

                const modelNames: any = await ankiAction('modelNames', 6)

                console.log('modelNames:');
                console.log(modelNames);

                if (!modelNames.error) {

                    const models = [
                        {
                            'modelName': 'Duolingo',
                            'cardTemplates': [
                                {
                                    'name': 'Card1',
                                    'Front': '{{Front}}',
                                    'Back': `{{Front}}
                      <hr id=answer>
                      {{Back}}`

                                }
                            ],
                            'inOrderFields': ["Front", "Back"],
                            'isAnkiSpace': false

                        },
                        // {
                        //     'modelName': 'Scouter Cloze Text',
                        //     'cardTemplates': [
                        //         {
                        //             'name': 'Card2',
                        //             'Front': '{{cloze:Text}}',
                        //             'Back': `{{cloze:Text}}
                        //         <br>{{More}}`
                        //         }
                        //     ],
                        //     'inOrderFields': ["Text", "More"],
                        //     'isAnkiSpace': true
                        // }
                    ]

                    // 遍历模型数组，如果存在则返回给 content，如果不存在则新建

                    // 用于存储 model 相关的数据，返回给 content 将笔记添加到 Anki
                    let modelData: any = []



                    let promises = models.map((model) => {

                        return new Promise<void>((resolve, reject) => {

                            if (modelNames.result.includes(model.modelName)) {

                                // 如果有 Scouter Model 则获取 Model 的字段
                                ankiAction('modelFieldNames', 6, { 'modelName': model.modelName }).then((result: any) => {

                                    if (result.result.length < 2) {
                                        // 字段少于 2 个时无法添加笔记，引导用户修改

                                        modelData.push(
                                            { 'defaultDeckName': defaultDeckName, 'modelName': model.modelName, 'field1': result.result[0], 'field2': null, 'isAnkiSpace': model.isAnkiSpace }
                                        )

                                    } else {

                                        modelData.push(
                                            { 'defaultDeckName': defaultDeckName, 'modelName': model.modelName, 'field1': result.result[0], 'field2': result.result[1], 'isAnkiSpace': model.isAnkiSpace }
                                        )

                                    }

                                    resolve(); // Resolve the Promise

                                })

                            } else {
                                // 如果没有 Scouter 默认的 Model，则创建

                                ankiAction('createModel', 6, {
                                    'modelName': model.modelName,
                                    'inOrderFields': model.inOrderFields,
                                    'cardTemplates': model.cardTemplates,
                                    'isCloze': model.isAnkiSpace,
                                    'css': cardStyle
                                }).then((result: any) => {

                                    if (!result.error) {

                                        modelData.push(
                                            { 'defaultDeckName': defaultDeckName, 'modelName': model.modelName, 'field1': result.result.flds[0].name, 'field2': result.result.flds[1].name, 'isAnkiSpace': model.isAnkiSpace }
                                        )

                                    }

                                    resolve(); // Resolve the Promise
                                })

                            }


                        })



                    })

                    // 等待所有 Promise 完成
                    Promise.all(promises).then(() => {
                        console.log(modelData);
                        asyncSendResponse({ type: 'setModel', result: 'success', data: modelData, error: result.error });
                    }).catch((error) => {
                        console.error('Error:', error);
                    });



                }

            } catch (error) {

                asyncSendResponse({ type: 'setModel', result: 'failure', error: error });

            }




        })

        // browser.storage.sync.get({ 'ankiDeckName': 'Default' }).then((result) => {


        // })



        return true;

    }


    if (request.type === 'addNote') {
        console.log('addNote');

        ankiAction(request.messages.anki_action_type, 6, request.messages.anki_arguments).then((result: any) => {

            // 反馈处理结果
            asyncSendResponse({ type: 'addToAnki', result: 'success', data: result.result, error: result.error });

        })
            .catch((error) => {

                console.error(error);
                asyncSendResponse({ type: 'addToAnki', result: 'failure', error: error.error });

            });

        // Return true to inform sendResponse that you will be calling it asynchronously
        return true;

    }




}

//////////////////////////////////////////////////////////////////////////////

