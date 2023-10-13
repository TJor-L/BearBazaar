import React, {useContext, useState} from 'react';
import UserContext from '../contexts/userContext';
import { Input, Button, Alert } from 'antd';

function Register({onClose}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userID, setUserID] = useState(''); // Renamed from schoolId to userID
  const [error, setError] = useState(null);
  const {setContextUsername, setContextUserID} = useContext(UserContext);

  async function handleRegister() {
    if (!userID || !username || !password || !phone || !email) {
      setError('All fields are required!');
      return;
    }
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        phoneNumber: phone,
        studentId: userID,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration was successful. Update the context values.
      setContextUsername(username);
      setContextUserID(userID);
      onClose();
    } else {
      setError(data.message || 'An error occurred during registration.');
    }
  }

    return (
        <div className="register">
            <h2>Register</h2>
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={{ marginBottom: '10px' }}
            />
            <Input
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                placeholder="User ID"
                style={{ marginBottom: '10px' }}
            />
            <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ marginBottom: '10px' }}
            />
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ marginBottom: '10px' }}
            />
            <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handleRegister}>Register</Button>
            </div>
        </div>
    );
}

export default Register;