import React from 'react';

const UserContext = React.createContext();
const clearUser = () => {
    setContextUsername (null);
    setContextUserID(null);
}

const userContextValue = {
    contextUsername,
    setContextUsername,
    contextUserID,
    setContextUserID,
    clearUser
  };
  
  <UserContext.Provider value={userContextValue}> ... </UserContext.Provider>
  
export default UserContext;