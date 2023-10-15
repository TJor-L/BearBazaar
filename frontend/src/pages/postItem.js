import React, { useContext, useState } from 'react';
import UserContext from '../contexts/userContext';
import { Button, Input, message, Form, Alert, Upload, Layout, Row, Col} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
const { Content } = Layout;
function PostItem() {
  const { contextUsername, contextUserID } = useContext(UserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  async function handleNewItem() {
    if (!name || !description || !category || !price) {
      message.error('All fields are required!');
      return;
    }

    const formData = new URLSearchParams();
    formData.append('owner','dijkstra');
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', Number(price));

    // Create a new FormData object for handling file uploads
    const fileData = new FormData();
    fileList.forEach((file) => {
      fileData.append('images', file.originFileObj);
    });

    // Combine the form data and file data into a single FormData
    for (const [key, value] of formData) {
      fileData.append(key, value);
    }

    const response = await fetch('http://localhost:8080/items', {
      method: 'POST',
      body: fileData,
    });

    if (response.ok) {
      message.success('Item added successfully');
    } else {
      const data = await response.json();
      setError(data.message || 'An error occurred while adding the item.');
    }
  }

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
        {error && <Alert message={error} type="error" showIcon closable />}
          <Row justify="center" gutter={32} style={{ height: '100%', marginTop: "3%" }}>
            <Col span={12}>
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </Form.Item>
          <Form.Item label="Description" required>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          </Form.Item>
          <Form.Item label="Category" required>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
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
  );
}
export default PostItem;
