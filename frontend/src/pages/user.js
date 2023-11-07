import React, { useContext, useState, useEffect, } from 'react'
import { Avatar, Button, Input, Card, List, Row, Col, Layout, Modal, message } from 'antd'
import { UserOutlined, EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import UserContext from '../contexts/userContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Const from "../const"

const { Content } = Layout
const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';
function UserProfilePage () {
  const { contextUsername, contextUserID } = useContext(UserContext)
  const { urlUserID } = useParams()
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('fake@email.com')
  const [userDescription, setUserDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)


  useEffect(() => {
    fetch(`${apiUrl}:${apiPort}/user/${urlUserID}`)
      .then(response => {
        if (!response.ok) {
          navigate('/home')
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        setEmail(data.email.address || 'fake@email.com'); // fake data
        setPhone(data.phone)
        setUserName(data.username)
        setUserDescription(data.description)
      })

  }, [contextUserID, urlUserID])

  const handleEditDescription = () => {

    setIsEditingDescription(true)
  }

  const handleSaveDescription = () => {
    fetch(`${apiUrl}:${apiPort}/update`, {
      method: 'PUT',  // Or 'POST' if your API expects that for updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        description: userDescription,
        phone: phone,
        // Add other fields as necessary
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update the user description.')
        }
        return response.json()
      })
      .then(data => {
        console.log('User description updated successfully:', data)
      })
      .catch(error => {
        console.error('There was an error updating the user description:', error)
      })

    setIsEditingDescription(false) // Exit editing mode after saving
  }



  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    fetch(`${apiUrl}:${apiPort}/update`, {
      method: 'PUT',  // Or 'POST' if your API expects that for updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        description: userDescription,
        phone: phone,
        // Add other fields as necessary
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update the user description.')
        }
        return response.json()
      })
      .then(data => {
        console.log('User description updated successfully:', data)
      })
      .catch(error => {
        console.error('There was an error updating the user description:', error)
      })
    setIsEditing(false)
  }


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
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ marginBottom: '10px' }} readOnly={true}/>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" style={{ marginBottom: '10px' }} />
                    {/*<Input.Password*/}
                    {/*    value={password}*/}
                    {/*    onChange={(e) => setPassword(e.target.value)}*/}
                    {/*    placeholder="Password"*/}
                    {/*    style={{ marginBottom: '10px' }}*/}
                    {/*    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}*/}
                    {/*/>*/}
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
                      {contextUserID == urlUserID && (
                        <>
                          {/*<List.Item>*/}
                          {/*  <List.Item.Meta*/}
                          {/*      title="Password"*/}
                          {/*      description={*/}
                          {/*        <Input.Password*/}
                          {/*            readOnly*/}
                          {/*            value={password}*/}
                          {/*            bordered={false}*/}
                          {/*            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}*/}
                          {/*            visibilityToggle*/}
                          {/*        />*/}
                          {/*      }*/}
                          {/*  />*/}
                          {/*</List.Item>*/}
                          <Button icon={<EditOutlined />} block onClick={handleEdit}>Edit</Button>
                        </>
                      )}
                    </List>
                  </>
                )}
              </Card>
            </Col>
            {contextUserID == urlUserID ? (
              <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Button onClick={() => navigate('/posted-item')}>My Posted Items</Button>
                <Button onClick={() => navigate('/transactions')}>Transactions</Button>
                {/*<Button onClick={() => navigate('/C')}>C</Button>
                <Button onClick={() => navigate('/D')}>D</Button> */}
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
  )
}

export default UserProfilePage
