import logo from './logo.png';
import './App.css';
import Navigation from "./navigation";
import Body from "./Body"
import {useState} from "react";

function App() {
    const [selectedPage, setSelectedPage] = useState('home')

    function handleOnNavigationItemClick(pageName) {
        setSelectedPage(pageName)
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Bear Bazaar!!</p>
         <Navigation onNavigationItemClick={handleOnNavigationItemClick}/>
      </header>
        <Body selectedPage={selectedPage}/>
    </div>
  );
}

export default App;
