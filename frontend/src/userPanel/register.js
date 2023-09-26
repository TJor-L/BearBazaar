import React, {useContext, useState} from 'react';
import UserContext from '../contexts/userContext';

function Register({onClose}) {
  //Fields needed for registration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userID, setUserID] = useState(''); // Renamed from schoolID to userID
  const [error, setError] = useState(null);
  const {setContextUsername, setContextUserID} = useContext(UserContext);

  async function handleRegister() {
    //Check to see if all fields are filled
    if (!userID || !username || !password || !phone || !email) {
      setError('All fields are required!');
      return;
    }

    //Make a post request
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        phone: phone,
        userID: userID,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration was successful, update the context values
      setContextUsername(username);
      setContextUserID(userID);
      onClose();
      //Registration fialed, display the error message
    } else {
      setError(data.message || 'An error occurred during registration.');
    }
  }

  //Input fields, types, and place to hold the values entered
  return (
      <div className="register">
        {error && <p className="error">{error}</p>}
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="User ID"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
        />
        <button onClick={handleRegister}>Register</button>
      </div>
  );
}

//Export Register to be used elsewhere
export default Register;