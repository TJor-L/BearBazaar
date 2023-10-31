import UserContext from '../contexts/userContext'
import { useContext, useState } from 'react'
import { Input, Button, Alert } from 'antd'
const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';
function Login ({ onClose }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {
        contextUsername,
        setContextUsername,
        contextUserID,
        setContextUserID,
    } = useContext(UserContext)
    const [error, setError] = useState(null)

    const handleLogin = async () => {
        setError(null)

        if (!username || !password) {
            setError('Username and password are required')
            return
        }
        console.log(username, password)
        try {
            const response = await fetch(`${apiUrl}:${apiPort}/login`, {  // Replace with your actual login endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            console.log(response)
            // Check if the response indicates a successful login
            if (response.ok) {
                const { token, userId } = await response.json()  // Extract token from response body (adjust depending on your backend's response structure)
                localStorage.setItem('authToken', token)  // Store the token (consider more secure alternatives in a production environment)
                onClose()
                setContextUserID(userId)
                setContextUsername(username)

                // Redirect to your app's main page, or perform another appropriate action
                // For example, using useHistory from 'react-router-dom' if you're in a React Router environment:
                // history.push('/main');
            } else {
                // If the server responded with an error status, handle it here
                const errorInfo = await response.json()  // Try to extract more info about what went wrong
                setError(errorInfo.message || 'Login failed. Please try again.')
            }
        } catch (error) {
            // Handle network errors or any other issues related to the fetch call
            setError('There was a problem logging in')
        }
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
    )
}

export default Login