import React, { useContext, useState, useEffect} from 'react';
import { Avatar, Button, Input, Card, List, Row, Col, Layout, Modal} from 'antd';
import { UserOutlined, EditOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import UserContext from '../contexts/userContext';
import {Link, useNavigate} from 'react-router-dom';
import * as Const from "../const";

const { Content } = Layout;
function UserProfilePage() {
  const { contextUsername, contextUserID } = useContext(UserContext);
  const [email, setEmail] = useState('fake@email.com'); // fake data
  const [phone, setPhone] = useState('123-456-7890'); // fake data
  const [password, setPassword] = useState('fakePassword123'); // fake data
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(contextUserID==='');

  useEffect(() => {
    if (contextUserID==='') {
      setShowModal(true);
    }
  }, [contextUserID]);

  if (contextUserID === '' && !showModal) {
    navigate('/' + Const.HOME);
    return null;
  }
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
      <>
        {showModal && (
            <Modal
                title="Reminder"
                visible={showModal}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                footer={null}
                centered
            >
              <p>You need to login or register first.</p>
            </Modal>
        )}

        {!showModal && (
          <Layout style={{ minHeight: '100vh' }}>
            <Content>
          <Row justify="center" gutter={32} style={{ height: '100%', marginTop:"50px"}}>
            <Col span={6}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Avatar size={128} icon={<UserOutlined />} />
                <h2 style={{ marginTop: '20px' }}>{contextUsername}</h2>
                <p>ID: {contextUserID}</p>
              </div>
              <Card>
                {isEditing ? (
                    <>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ marginBottom: '10px' }} />
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" style={{ marginBottom: '10px' }} />
                      <Input.Password
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          style={{ marginBottom: '10px' }}
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                      <Button type="primary" block onClick={handleSave}>Save</Button>
                    </>
                ) : (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta title="Email" description={email} />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta title="Phone" description={phone} />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                              title="Password"
                              description={
                                <Input.Password
                                    readOnly
                                    value={password}
                                    bordered={false}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    visibilityToggle
                                />
                              }
                          />
                        </List.Item>
                      </List>
                      <Button icon={<EditOutlined />} block onClick={handleEdit}>Edit</Button>
                    </>

                )}
              </Card>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Button onClick={() => navigate('/A')}>A</Button>
              <Button onClick={() => navigate('/B')}>B</Button>
              <Button onClick={() => navigate('/C')}>C</Button>
              <Button onClick={() => navigate('/D')}>D</Button>
            </Col>
          </Row>
            </Content>
          </Layout>
        )}
      </>
  );
}

export default UserProfilePage;
