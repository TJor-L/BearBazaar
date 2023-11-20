import React, { useContext, useState } from 'react';
import UserContext from '../contexts/userContext';
import { Input, Modal, Avatar, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './ChatBox.css'; // 保证有适当的CSS来样式化聊天框

import fakeMessages from "../fakedata/fakeMessages";

function ChatBox({ onClose }) {
    const { contextUsername } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    // 获取与当前用户有对话记录的用户列表
    const usersWithChat = Array.from(new Set(
        fakeMessages.filter(msg => msg.sender.username === contextUsername || msg.receiver.username === contextUsername)
            .map(msg => msg.sender.username === contextUsername ? msg.receiver.username : msg.sender.username)
    ));

    // 获取与选定用户的对话记录，并按时间排序
    const selectedUserMessages = fakeMessages.filter(msg =>
        (msg.sender.username === contextUsername && msg.receiver.username === selectedUser) ||
        (msg.sender.username === selectedUser && msg.receiver.username === contextUsername)
    ).sort((a, b) => new Date(a.send_date) - new Date(b.send_date));

    // 处理新消息发送
    const handleSendMessage = () => {
        console.log(`Sending message: ${newMessage}`);
        setNewMessage('');
    };

    return (
        <Modal
            open={true}
            title="Chat Box"
            onCancel={onClose}
            footer={null}
            width="50%"
            bodyStyle={{ height: '50vh' }} // 设置模态框内容区域的高度
            className="chat-box-modal"
        >
            <div className="chat-box-container">
                <div className="user-list" style={{ maxHeight: '70vh', overflowY: 'auto' }}> {/* 设置用户列表区域的最大高度和滚动 */}
                    {usersWithChat.map(user => (
                        <div key={user} className="user-list-item" onClick={() => setSelectedUser(user)}>
                            <Avatar icon={<UserOutlined />} />
                            <div className="username">{user}</div>
                        </div>
                    ))}
                </div>
                <div className="message-area" > {/* 设置消息区域的最大高度和滚动 */}
                    <div className="messages" style={{ height: '50vh', overflowY: 'auto' }}>
                    {selectedUserMessages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender.username === contextUsername ? 'sent' : 'received'}`}>
                            <div className="message-date">{msg.send_date}</div>
                            <div className="message-content">{msg.content}</div>
                        </div>
                    ))}
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
