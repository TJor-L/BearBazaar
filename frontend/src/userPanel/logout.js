import React, {useContext} from 'react';
import UserContext from '../contexts/userContext';

function Logout({onClose}) {
  const {setContextUsername, setContextUserID} = useContext(UserContext);

  const handleLogout = () => {
    // Reset context values
    setContextUsername('');
    setContextUserID('');
    // Add more things that need to be cleared here if needed
    // Close the user panel or navigate to a different page as needed
    onClose();
  };

  return (
    <div className="logout">
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
