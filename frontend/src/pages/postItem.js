import React, { useContext, useState } from 'react'
import UserContext from '../contexts/userContext'
import { Button, Input, message, Form, Alert, Upload, Layout, Row, Col, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"
import categories from "../categories";

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost' // 默认值为'http://www.dijkstraliu.com'
const apiPort = process.env.REACT_APP_BACKEND_PORT || '8080' // 默认值为'5000'

const { Content } = Layout
function PostItem () {
  const { contextUsername, contextUserID } = useContext(UserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
  const [fileList, setFileList] = useState([])

  const { Option } = Select
  const navigate = useNavigate()
  async function handleNewItem () {
    if (!name || !description || !category || !price) {
      message.error('All fields are required!')
      return
    }

    // Create a new FormData object for handling file uploads and form data
    const formData = new FormData()

    // Append the form data in the order as seen in the screenshot
    formData.append('owner', contextUsername)
    formData.append('name', name)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('price', price)

    // Append the images; fileList should be an array of File objects
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj)
    })


    const response = await fetch(`${apiUrl}:${apiPort}/items`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      message.success('Item added successfully')
      navigate('/home')
    } else {
      const data = await response.json()
      setError(data.message || 'An error occurred while adding the item.')
      console.error('Error from server:', data)
    }
  }

  const handleUploadChange = async ({ fileList: newFileList }) => {
    const processedFiles = await Promise.all(newFileList.map(async file => {
      if (!file.originFileObj) return file; // 如果文件没有originFileObj属性，则直接返回

      const processedFile = await processImage(file.originFileObj);
      return {
        ...file,
        originFileObj: processedFile,
      };
    }));

    setFileList(processedFiles);
  };

  async function processImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let [newWidth, newHeight] = img.width / img.height < 3 / 4 ?
            [img.height * (3 / 4), img.height] :
            [img.width, img.width * (4 / 3)];

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, newWidth, newHeight);

        ctx.drawImage(img, (newWidth - img.width) / 2, (newHeight - img.height) / 2);

        canvas.toBlob(blob => {
          const newFile = new File([blob], file.name, { type: file.type });
          resolve(newFile);
        }, file.type);
      };

      img.onerror = reject;
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        {error && <Alert message={error} type="error" showIcon closable />}
        <Row justify="center" gutter={32} style={{ height: '100%', marginTop: "3%" }}>
          <Col span={12}>
            <Form layout="vertical">
              <Form.Item label="Item Name" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              </Form.Item>
              <Form.Item label="Description" required>
                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
              </Form.Item>
              <Form.Item label="Category" required>
                <Select
                    value={category}
                    onChange={setCategory} // Simplified for brevity
                    placeholder="Category"
                >
                  {categories.map(cat => (
                      <Select.Option key={cat.value} value={cat.value}>
                        {cat.label}
                      </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Estimated Price" required>
                <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
              </Form.Item>
              <Form.Item label="Upload Image">
                <Upload
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false} // prevent auto uploading
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleNewItem}>
                  Add Item
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
export default PostItem
