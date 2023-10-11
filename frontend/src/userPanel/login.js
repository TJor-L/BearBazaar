import UserContext from '../contexts/userContext';
import { useContext, useState } from 'react';
import { Input, Button, Alert } from 'antd';

function Login({onClose}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    contextUsername,
    setContextUsername,
    contextUserID,
    setContextUserID,
  } = useContext(UserContext);
  const [error, setError] = useState(null);

  async function handleLogin() {
    setContextUsername('Dijkstra');
    setContextUserID('508764');
    onClose();
    // if (!username || !password) {
    //   setError('All fields are required!');
    //   return;
    // }
    // const response = await fetch('http://localhost:8080/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // });

    // const data = await response.json();
    // if (response.ok) {
    //   setContextUsername(username);
    //   setContextUserID('066666');
    //   onClose();
    // } else {
    //   setContextUsername('Dijkstra');
    //   setContextUserID('508764');
    //   setError(data.message || 'An error occurred during login.');
    // }
// =======
//     if (!username || !password) {
//       setError('All fields are required!');
//       return;
//     }
//
//     try {
//       // Mocking fetch response
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network delay
//
//       // Replace the lines below with actual conditions for your use case
//       if (username === 'testUser' && password === 'testPassword') {
//         setContextUsername(username);
//         setContextUserID('12345'); // Mock user ID
//         setError(null);
//         onClose(); // Trigger whatever should happen after a successful login
//       } else {
//         setError('Invalid credentials');
//       }
//
//       // Comment or remove the following lines related to the actual fetch
//       /*
//       const response = await fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//
//       if (!response.ok) {
//         const data = await response.json();
//         setError(data.message || `An error occurred: ${response.status} ${response.statusText}`);
//         return;
//       }
//
//       const data = await response.json();
//       setContextUsername(username);
//       setContextUserID('066666'); // You may want to use real user ID from response data
//       onClose();
//       */
//
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError('An unexpected error occurred');
//     }
//>>>>>>> 0e56097faf1f6f53f2b8f5da60300dc86e2dd94e
  }


    return (
        <div className="login">
            <h2>Login</h2>
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
            <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={{ marginBottom: '10px' }}
            />
            <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}

export default Login;