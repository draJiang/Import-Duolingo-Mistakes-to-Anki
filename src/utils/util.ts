import browser from 'webextension-polyfill'
import {userInfoType} from "../types"

// 将信息添加到 Anki
export function ankiAction(action: any, version: any, params = {}) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:8765', {
      method: "POST",
      body: JSON.stringify({ "action": action, "version": version, "params": params })
    }).then(response => response.json()).then((data) => {

      // console.log(data);
      resolve(data)

    }).catch((error) => {
      reject({ 'result': [], 'error': 'Please open the Anki client and install the Anki-Connect plugin before trying again.' })
    })

  });
}

// 获取 Anki 的 Deck 名称，添加到卡片会存放到这里
export const getDefaultDeckName = () => {
  return new Promise((resolve, reject) => {

    let defaultDeckName = ''

    // 获取用户设置的 Deck Name
    browser.storage.sync.get(["ankiDeckName"]).then(async (result) => {
      // console.log('result:');
      // console.log(result);

      if (result.ankiDeckName) {
        // 用户有设置


        defaultDeckName = result.ankiDeckName
      } else {
        // 用户未设置
        // 获取 Anki 的牌组列表
        await ankiAction('deckNames', 6).then((result: any) => {

          // // 将第一个牌组作为默认牌组
          // return result.result[0]

          //判断是否存在 Duolingo 牌组
          if (result.result!.includes('Duolingo') !== true) {
            // 不包含，创建 Duolingo 牌组
            ankiAction("createDeck", 6, { "deck": "Duolingo" }).then((response) => {

              defaultDeckName = 'Duolingo'
              resolve({ 'defaultDeckName': defaultDeckName })

            })

          } else {
            defaultDeckName = 'Duolingo'
            resolve({ 'defaultDeckName': defaultDeckName })
          }




        }).catch((error) => {

          // console.log(error);
          // return []

        })

      }

      // resolve({ 'defaultDeckName': defaultDeckName })

    })

  })



}

// 获取配置信息
export async function getSettings() {
  let items = await browser.storage.sync.get({
      "newLicenseKey": ''
  })
  return items
}

// 获取用户相关信息
export const getUserInfo = (): Promise<userInfoType> => {

  return new Promise((resolve, reject) => {

    browser.storage.sync.get(['newLicenseKey']).then(async (result) => {

      if (browser.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }

      let verified = false

      if (result.newLicenseKey) {
        // 判断用户
        const url = 'https://6r4atckmdr.us.aircode.run/index'
        const headers = { 'Authorization': 'Bearer ' + result.newLicenseKey, 'Content-Type': 'application/json', }

        await fetch(url, {
          headers: headers
        }).then(async (response) => {

          await response.json().then((data) => {
            verified = data.verified
          })

        })
      }

      resolve({ 'verified': verified })

    })


  });

};

export const cardStyle = `

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
  }`