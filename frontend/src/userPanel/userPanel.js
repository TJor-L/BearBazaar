import React from 'react';
import { Modal } from 'antd';
import Login from './login';
import Register from './register';
import * as Const from '../const';

function UserPanel({ onClose, selectedUserPanel }) {
    // 判断是否显示 Modal
    const isVisible = [Const.LOGIN, Const.REGISTER].includes(selectedUserPanel);

    // 根据 selectedUserPanel 确定要显示的组件内容
    let content;
    if (selectedUserPanel === Const.LOGIN) {
        content = <Login onClose={onClose} />;
    } else if (selectedUserPanel === Const.REGISTER) {
        content = <Register onClose={onClose} />;
    }

    return (
        <Modal
            visible={isVisible}
            onCancel={onClose}
            footer={null} // 不显示默认的底部按钮
            centered // 让 Modal 垂直居中
        >
            {content}
        </Modal>
    );
}

export default UserPanel;
