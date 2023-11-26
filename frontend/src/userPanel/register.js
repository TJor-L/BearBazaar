import React, { useContext, useState } from 'react'
import UserContext from '../contexts/userContext'
import { Input, Button, Alert } from 'antd'

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost'
const apiPort = process.env.REACT_APP_BACKEND_PORT || '8080'

function Register ({ onClose }) {
    const { setContextUsername, setContextUserID } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userID, setUserID] = useState('')
    const [verificationCode, setVerificationCode] = useState('') // To store the verification code sent to the user
    const [inputCode, setInputCode] = useState('') // To store the user's input for verification
    const [error, setError] = useState(null)

    const generateVerificationCode = () => {
        // Function to generate a random 6-digit code
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    const sendVerificationCode = async () => {
        if (!email) {
            setError('Please enter your email to receive a verification code.')
            return
        }
        const code = generateVerificationCode()
        setVerificationCode(code)

        try {
            const params = new URLSearchParams()
            params.append('email', email)
            params.append('code', code)

            const response = await fetch(`${apiUrl}:${apiPort}/email-verification/send-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            })

            if (!response.ok) throw new Error('Failed to send verification code.')
        } catch (error) {
            setError(error.message || 'Failed to send verification code.')
        }
    }

    async function handleRegister () {
        if (!userID.match(/^\d{6}$/)) {
            setError('Student ID illegal!');
            return;
        }
        if (!phone.match(/^\d{10,13}$/)) {
            setError('Phone number illegal!');
            return;
        }
        if (!userID || !username || !password || !phone || !verificationCode || !inputCode) {
            setError('All fields are required, including the verification code!')
            return
        }
        if (inputCode !== verificationCode) {
            setError('Verification code is incorrect!')
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
                email: email,
                phone: phone,
                studentId: userID, // Changed from studentId to userID to match the state name
            }),
        })

        if (response.ok) {
            // console.log("OKK")
            // setContextUsername(username);
            // setContextUserID(userID);
            onClose()
        } else {
            try {
                const data = await response.json()
                setError(data.message || 'An error occurred during registration.')
            } catch (error) {
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
                placeholder="WashU Student ID"
                style={{ marginBottom: '10px' }}
            />
            <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <Input
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Email Verification Code"
                        style={{ flexGrow: 1, marginRight: '10px' }}
                    />
                    <Button onClick={sendVerificationCode}>Send Verification Code</Button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handleRegister}>Register</Button>
            </div>
        </div>
    )
}

export default Register
