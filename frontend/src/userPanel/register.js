import React, { useContext, useState } from 'react'
import UserContext from '../contexts/userContext'
import { Input, Button, Alert } from 'antd'

const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';

function Register ({ onClose }) {
    const { contextUsername, contextUserID } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userID, setUserID] = useState('') // Renamed from schoolId to userID
    const [error, setError] = useState(null)
    const { setContextUsername, setContextUserID } = useContext(UserContext)

    async function handleRegister () {
        if (!userID || !username || !password || !phone) {
            setError('All fields are required!')
            return
        }
        const response = await fetch(`${apiUrl}:${apiPort}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: "goodEmailAddress@wustl.edu",
                phone: phone,
                studentId: userID,
            }),
        })

        // const data = await response.json();

        // Start by checking the response status
        if (response.ok) {
            // Response is OK, but there's no content to parse.
            // Proceed with the assumption that registration was successful.

            // Update context or state as necessary here
            setContextUsername(username)
            setContextUserID(userID)
            // Close the modal or navigate away
            onClose()

        } else {
            // If the request was not successful, try to parse the error and display it.
            try {
                const data = await response.json()
                setError(data.message || 'An error occurred during registration.')
            } catch (error) {
                // If parsing the JSON failed (e.g., due to an empty body), fall back to a default error message.
                setError('An error occurred during registration.')
            }
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
            {/*<Input*/}
            {/*    type="email"*/}
            {/*    value={email}*/}
            {/*    onChange={(e) => setEmail(e.target.value)}*/}
            {/*    placeholder="Email"*/}
            {/*    style={{ marginBottom: '10px' }}*/}
            {/*/>*/}
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
    )
}

export default Register