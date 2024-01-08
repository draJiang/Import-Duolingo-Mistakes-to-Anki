import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import { getUserInfo, getSettings } from "../utils/util"

import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import styled, { css } from 'styled-components';

const Button = styled.button<{ type?: 'primary' | 'second' | 'link' }>`
  width: 300px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 16px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 18px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 20px;

  &:active {
    transform: translateY(3px);
    box-shadow: none;
  }

  ${props => props.type === 'primary' && css`
    color: white;
    border: 0;
    background: #1CB0F6;
    box-shadow: 0px 4px 0px 0px #1899D6;
  `}

  ${props => props.type === 'second' && css`
    color: #1899D6;
    border: 2px solid #E5E5E5;
    background: #FFF;
    box-shadow: 0px 2px 0px 0px #E5E5E5;
  `}

  ${props => props.type === 'link' && css`
    text-decoration: none;
    color: #1CB0F6;
    background: transparent;
    border: none;
    box-shadow: none;
  `}
`;


import { userInfoType } from "../types"

export const DefaultPopup = () => {

    const [mistakes, setMistakes] = useState([]);
    const [verified, setVerified] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement>(null); // 创建 ref，指定类型为 HTMLInputElement
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {


        //记录错题
        const getMistakes = browser.storage.local.get({ "mistakes": [] })
        getMistakes.then((result) => {

            console.log(result);
            setMistakes(result.mistakes)

        })

        getSettings().then(async (items) => {
            // setOpenApiKey(items.openApiKey ?? null);
            console.log(items);
            setInputValue(items.newLicenseKey);

        })

        getUserInfo().then((userInfo: userInfoType) => {

            // 更新 UI
            setVerified(userInfo.verified)

        })

    }, []);

    // 保存设置
    const saveOptions = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); // 阻止表单的默认提交行为

        // 通过 ref 获取 input 元素的值
        if (inputRef.current) {
            const inputValue = inputRef.current.value;


            // Saves options to chrome.storage.sync.
            browser.storage.sync.set(
                {
                    newLicenseKey: inputValue
                }
            ).then(item => {

                // Update status to let user know options were saved.
                // setStatus(' ✅ Saved')

                // setTimeout(() => {
                //     setStatus('')
                // }, 2000);

            })

            // thisGetBalance(values['licenseKey'])

            // 更新订阅状态
            thisGetUserStatus()
        }


    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // 更新 inputValue
    };

    const thisGetUserStatus = (): Promise<userInfoType> => {

        return new Promise((resolve, reject) => {

            getUserInfo().then((userInfo: userInfoType) => {

                // 更新 UI
                setVerified(userInfo.verified)


                resolve(userInfo)

            })

        })





    }

    return (
        <>
            <div id="DefaultPopup" style={{
                width: '400px',
                padding: '20px 20px 10px 20px',
                fontFamily: 'din-round,sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className='bg-red-400 text-lg' style={{ margin: '20px 4px' }}>

                    {verified ?

                        <>
                            已收集 {mistakes.length} 个错题
                        </>
                        :
                        <>
                            已收集 {mistakes.length}/10 个错题，激活解锁上限
                        </>
                    }
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <form onSubmit={saveOptions} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline'
                        }}>

                            {/* <input placeholder='请输入激活码' type='password' ref={inputRef} value={inputValue} onChange={handleInputChange} style={{ marginBottom: '10px' }} /> */}

                            <input
                                style={{
                                    borderRadius: '16px',
                                    border: '2px solid #E5E5E5',
                                    background: '#F7F7F7',
                                    display: 'flex',
                                    width: '300px',
                                    height: '49px',
                                    padding: '15.758px 19.8px 14.242px 20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}
                                placeholder='请输入激活码' type='password' ref={inputRef} value={inputValue} onChange={handleInputChange}
                            />
                            <span style={{
                                position: 'relative',
                                width: 0,
                                right: '30px',
                                height: '47px',
                                backgroundColor: '#F7F7F7',
                                textAlign: 'center',
                                lineHeight: '47px',
                            }}>
                                {verified === null ? '⌛' : verified ? '✅' : '❌'}
                            </span>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <Button
                                type="primary"

                            >激活</Button>

                            <Button
                                type="second"
                                onClick={() => window.open('https://jiang.lemonsqueezy.com/checkout/buy/c34834c6-e13d-48b3-84e3-d3c332ea1189')}
                            >获取激活码</Button>

                            <Button
                                type="link"
                                onClick={() => window.open('https://jiangzilong.notion.site/Duolingo-Anki-f89c9ba9f8614c8fa0ff5cbceadb56ed')}
                            >使用说明</Button>



                            {/* <Button type="submit" style={{ width: '100%', marginBottom: '10px' }}>激活</Button>
                            <Button variant="light" as='a' style={{ width: '100%' }} onClick={() => window.open('https://jiang.lemonsqueezy.com/checkout/buy/c34834c6-e13d-48b3-84e3-d3c332ea1189')}>购买激活码</Button>
                            <Button variant="link" onClick={() => window.open('https://jiangzilong.notion.site/Duolingo-Anki-f89c9ba9f8614c8fa0ff5cbceadb56ed')}>使用说明</Button> */}

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <DefaultPopup />
    </React.StrictMode>
    ,
    document.getElementById("root")
);
