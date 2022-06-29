import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Songs from './Pages/Songs';

import Supercharger from './Songs/Supercharger';
import CyberBiden from './Songs/CyberBiden';
import Mundane from './Songs/Mundane';
import Nothing from './Songs/Nothing';


import SongRequest from './Pages/SongRequest';
import NewsLetter from './Pages/NewsLetter';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';


  
function App() {

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("https://infinite-river-94748.herokuapp.com/");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="songs">Songs</Link>
          <Link to="songrequest">Song Request</Link>
          <Link to="newsletter">Newsletter</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="songrequest" element={<SongRequest />} />
          <Route path="newsletter" element={<NewsLetter/>} />
          <Route path="/songs" element={<Songs />} >
            <Route path="supercharger" element={<Supercharger socket={socket} />} />
            <Route path="cyberbiden" element={<CyberBiden socket={socket}  />} />
            <Route path="mundane" element={<Mundane socket={socket}  />} />
            <Route path="nothing" element={<Nothing socket={socket}  />} />


          
          </Route>
        </Routes>
     </Router>
    </div>
  );
}
  
export default App;