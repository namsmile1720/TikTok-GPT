import styles from './ChatGPT-box.module.scss';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import axios from 'axios';

function ChatBoxGPT() {
    const user = {
        id: 1,
        avatarUrl: 'https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg',
        avatarAltText: 'KendoReact Conversational UI RICSU',
    };
    const bot = {
        id: 0,
    };
    const initialMessages = [
        {
            author: bot,
            timestamp: new Date(),
            text: 'Hello im chat GPT, can i help you ?',
        },
    ];
    const [messages, setMessages] = useState(initialMessages);
    // openAI API
    const fetchChatAPI = (dataMes) => {
        const options = {
            method: 'POST',
            url: 'https://chatgpt53.p.rapidapi.com/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '30af2a3413msh210fec5dfd50b19p17955bjsn6c236f20722d',
                'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com',
            },
            data: {
                messages: [
                    {
                        role: 'user',
                        content: dataMes,
                    },
                ],
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data.choices[0].message.content);
                let botRep = [
                    {
                        author: {
                            id: 0,
                        },
                        timestamp: new Date(),
                        text: response.data.choices[0].message.content,
                    },
                ];
                setMessages([...messages, botRep[0]]);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const addNewMessage = (event) => {
        setMessages([...messages, event.message]);
        fetchChatAPI(event.message.text, messages);
        // const initialMessages = [
        //     {
        //         author: {
        //             id: 0,
        //             avatarUrl: 'https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg',
        //         },
        //         timestamp: new Date(),
        //         text: 'Hello ?',
        //     },
        // ];
        // console.log(event.message);
        // console.log(initialMessages[0]);

        // setMessages([...messages, initialMessages[0]]);
    };

    // console.log(messages);

    return (
        <div>
            <Chat
                user={user}
                messages={messages}
                onMessageSend={addNewMessage}
                placeholder={'Type a message...'}
                width={400}
            />
        </div>
    );
}

export default ChatBoxGPT;
