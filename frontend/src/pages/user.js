import React, { useContext, useState, useEffect } from 'react';
import { Avatar, Button, Input, Card, List, Row, Col, Layout, Modal } from 'antd';
import { UserOutlined, EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import UserContext from '../contexts/userContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Const from "../const";

const { Content } = Layout;

function UserProfilePage() {
  const { contextUsername, contextUserID } = useContext(UserContext);
  const { urlUserID } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Dijkstra');
  const [userDescription, setUserDescription] = useState('This user is very handsome!!!');
  const [email, setEmail] = useState('fake@email.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [password, setPassword] = useState('fakePassword123');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
  };
  // useEffect(() => {
  //   // Fetch user details from server
  //   // fetch(`/api/users/${urlUserID}`)
  //   //     .then(response => response.json())
  //   //     .then(data => {
  //   //       setEmail(data.email || 'fake@email.com'); // fake data
  //   //       setPhone(data.phone || '123-456-7890'); // fake data
  //   //       setPassword(data.password || 'fakePassword123'); // fake data
  //   //     });
  //
  // }, [contextUserID, urlUserID]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };


  return (
      <>
            <Layout style={{ minHeight: '100vh' }}>
              <Content>
                <Row justify="center" gutter={32} style={{ height: '100%', marginTop: "50px" }}>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <Avatar size={128} icon={<UserOutlined />} />
                      <h2 style={{ marginTop: '20px' }}>{userName}</h2>
                      <p>ID: {urlUserID}</p>
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
                              {contextUserID === urlUserID && (
                                  <>
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
                                    <Button icon={<EditOutlined />} block onClick={handleEdit}>Edit</Button>
                                  </>
                              )}
                            </List>
                          </>
                      )}
                    </Card>
                  </Col>
                  {contextUserID === urlUserID ? (
                      <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Button onClick={() => navigate('/A')}>A</Button>
                        <Button onClick={() => navigate('/B')}>B</Button>
                        <Button onClick={() => navigate('/C')}>C</Button>
                        <Button onClick={() => navigate('/D')}>D</Button>
                        <Card title="Description" bordered={true} style={{ width: "100%" }}>
                          {isEditingDescription ? (
                              <>
                                <Input.TextArea
                                    value={userDescription}
                                    onChange={(e) => setUserDescription(e.target.value)}
                                    placeholder="User Description"
                                    style={{ marginBottom: '10px' }}
                                    rows={4} // 你可以根据需要设置这个值来调整高度
                                />
                                <Button type="primary" onClick={handleSaveDescription}>Save</Button>

                              </>
                          ) : (
                              <>
                                <p>{userDescription}</p>
                                <Button icon={<EditOutlined />} onClick={handleEditDescription}>Edit</Button>
                              </>
                          )}
                        </Card>
                      </Col>
                  ) : (
                      <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Card title="Description" bordered={true} style={{ width: "100%" }}>
                          <p>{userDescription}</p>
                        </Card>
                      </Col>
                  )}

                </Row>
              </Content>
            </Layout>
      </>
  );
}

export default UserProfilePage;
