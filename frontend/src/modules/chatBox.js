import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/userContext';
import { Input, Modal, Avatar, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './ChatBox.css';
import OpenAI from "openai";
import fakeMessages from "../fakedata/fakeMessages";




const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost'
const apiPort = process.env.REACT_APP_BACKEND_PORT || '8080'
function ChatBox({ ws, messages, onClose }) {
    const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
    console.log(openaiApiKey)
    const openai = new OpenAI({apiKey: openaiApiKey, dangerouslyAllowBrowser: true, temperature: 0.5});
    const { contextUsername } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [items, setItems] = useState([])
    const [selectedUserMessages, setSelectedUserMessages] = useState([]);
    // const [ws, setWs] = useState(null);
    // const [isConnected, setIsConnected] = useState(false);
    // const [messages, setMessages] = useState([])


    const [usersWithChat, setUsersWithChat] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const buyerResponse = await fetch(`${apiUrl}:${apiPort}/transaction/buyer/${contextUsername}`);
                const buyerTransactions = await buyerResponse.json();

                const sellerResponse = await fetch(`${apiUrl}:${apiPort}/transaction/seller/${contextUsername}`);
                const sellerTransactions = await sellerResponse.json();
                console.log(sellerTransactions)
                console.log(buyerTransactions)
                // 获取所有相关的用户（买家和卖家）
                const allUsers = [...buyerTransactions, ...sellerTransactions].reduce((acc, transaction) => {
                    if (transaction.buyer.username !== contextUsername && !acc.includes(transaction.buyer.username)) {
                        acc.push(transaction.buyer.username);
                    }
                    if (transaction.seller.username !== contextUsername && !acc.includes(transaction.seller.username)) {
                        acc.push(transaction.seller.username);
                    }
                    return acc;
                }, []);

                // 更新 usersWithChat，只添加新出现的用户
                setUsersWithChat(allUsers);
                console.log(usersWithChat)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, []);


    useEffect(() => {
        // Fetch actual data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}:${apiPort}/items`)

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                setItems(data)
            } catch (error) {
                console.error('There was a problem fetching the items:', error)
            }
        }

        fetchData()
    }, []) //get items for AI use

    useEffect(() => {
        const updatedMessages = messages.filter(msg =>
            (msg.sender === contextUsername && msg.receiver === selectedUser) ||
            (msg.sender === selectedUser && msg.receiver === contextUsername)
        );//.sort((a, b) => new Date(a.send_date) - new Date(xb.send_date));
        setSelectedUserMessages(updatedMessages);
        console.log(selectedUserMessages)
    }, [selectedUser, contextUsername, messages]);



    function getChatHistoryWithAgent() {
        // 构建包含商品信息的字符串
        let itemsDescription = '';
        if (items.length > 0) {
            // 取列表中前十个商品
            console.log(items)
            const topItems = items.slice(0, 10);
            topItems.forEach((item, index) => {
                itemsDescription += `\n${index + 1}.  id: ${item.id} name: ${item.name} - description ${item.description} (Price: $${item.price}) img: ${item.image[0].url}`;
            });
        }

        const systemPrompt = {
            role: "system",
            content: `You are 'BearAgent', a guide assistant for the WashU second-hand trading platform Bear Bazaar. Your role is to help recommend products to users. Here are some items you can recommend: ${itemsDescription}
            \n Your output should be a JSON in this format: {"reply":"", "img":"", "id":""}, for the reply, you should put your reply message in it, for "img", you should put the link of image of the product you recommend, for the "id", you should put the id of the product you recommended"`
        };

        // 筛选与 Agent 的对话
        const agentMessages = selectedUserMessages.filter(msg =>
            (msg.sender.username === "Agent" || msg.receiver.username === "Agent")
        );

        // 将系统提示和消息转换为 OpenAI API 所需的格式
        const history = [systemPrompt, ...agentMessages.map(msg => ({
            role: msg.sender.username === contextUsername ? "user" : "assistant",
            content: msg.content
        }))];

        return history;
    }


    async function getResponse() {
        // 获取与 Agent 的完整对话历史
        const history = getChatHistoryWithAgent();

        // 添加最新的用户消息
        history.push({ role: "user", content: newMessage });

        // 调用 OpenAI API
        const completion = await openai.chat.completions.create({
            messages: history,
            model: "gpt-4",
        });

        return completion.choices[0].message.content;
    }

    const handleSendMessage = async () => {
        console.log(`Sending message: ${newMessage}`);

        // Create a new message object
        const newMsg = {
            sender: contextUsername ,
            receiver: selectedUser ,
            send_date: new Date().toISOString(),
            content: newMessage
        };

        // Update the messages array
      //
        setNewMessage('');
        if (selectedUser === "Agent") {
            setSelectedUserMessages(prevMessages => [...prevMessages, newMsg]);
            const aiResponse = await getResponse(newMessage);
            //const aiResponse = JSON.parse(aiResponseJSON);
            console.log(aiResponse)
            // Create a message object for the AI response
            const responseMsg = {
                sender: "Agent",
                receiver: contextUsername,
                send_date: new Date().toISOString(),
                content: aiResponse
            };

            // Update the messages array with the AI response
            setSelectedUserMessages(prevMessages => [...prevMessages, responseMsg]);
        }
        else {
            console.log(`send1 ${newMessage}`)
            if (ws) {
                console.log(`Sending message: ${JSON.stringify({
                    sender: contextUsername,
                    receiver: selectedUser,
                    content: newMessage,
                    send_date: new Date().toISOString(),
                })}`);
                ws.publish({
                    destination: "/app/send",
                    body: JSON.stringify({
                        sender: contextUsername,
                        receiver: selectedUser,
                        content: newMessage,
                        send_date: new Date().toISOString(),
                    }),
                });

                // 清空输入框
                setNewMessage('');
            } else {
                console.error('WebSocket is not connected.');
            }

        }
    };


    return (
        <Modal
            open={true}
            title="Chat Box"
            onCancel={onClose}
            footer={null}
            width="50%"
            bodyStyle={{ height: '50vh' }}
            className="chat-box-modal"
        >
            <div className="chat-box-container">
                <div className="user-list" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div key="Agent" className="user-list-item" onClick={() => setSelectedUser("Agent")}>
                        <Avatar
                            src={`/agent.jpg`}
                            size={36}
                        />
                        <div className="username">BearAgent</div>
                    </div>
                    {usersWithChat.map(user => (
                        <div key={user} className="user-list-item" onClick={() => setSelectedUser(user)}>
                            <Avatar
                                src={user ? `https://ui-avatars.com/api/?name=${user}` : undefined}
                                size={36}
                                icon={!user && <UserOutlined />}
                            />
                            <div className="username">{user}</div>
                        </div>
                    ))}
                </div>
                <div className="message-area" >
                    <div className="messages" style={{ height: '50vh', overflowY: 'auto' }}>
                        {selectedUserMessages.map((msg, index) => {
                            // 尝试解析msg.content为JSON，如果失败则保留原始字符串
                            let content, isJson = false;
                            try {
                                content = JSON.parse(msg.content);
                                isJson = true;
                            } catch (e) {
                                content = msg.content;
                            }

                            return (
                                <div key={index} className={`message ${msg.sender === contextUsername ? 'sent' : 'received'}`}>
                                    <div className="message-date">{msg.send_date}</div>
                                    <div className="message-content">
                                        {isJson ? (
                                            // 如果是JSON，则显示JSON中的reply和图片
                                            <>
                                                <div>{content.reply}</div>
                                                <img src={content.img} alt="content" style={{ maxWidth: '30%', maxHeight: '50%' }} />
                                                <br/>
                                                <Button onClick={() => window.location.href = `/item/${content.id}`}>Go to Item</Button>
                                            </>

                                        ) : (
                                            // 如果不是JSON，则显示原始字符串
                                            <div>{content}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {selectedUser && <div className="message-input">
                        <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                        <Button onClick={handleSendMessage}>Send</Button>
                    </div>}
                </div>
            </div>
        </Modal>
    );
}

export default ChatBox;
