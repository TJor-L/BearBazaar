import UserContext from '../contexts/userContext';
import {useContext, useState} from 'react';

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
  }

  return (
      <div className="login">
        {error && <p className="error">{error}</p>}
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
  );
}

export default Login;