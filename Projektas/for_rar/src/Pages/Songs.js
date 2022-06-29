import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'

 
const Songs = () => {

  return (
    <div className="Page">
      {/* <h1>You are in the Songs page!</h1> */}
      <br></br>
      <div className='stuff'>
      <div className="songs-nav songnavigation">
        

        {/* naudot <a> kad padaryt viska clickalbe? bet tada positions get bogged */}
        <div className="singlesong zoom">
            <Link to="/songs/supercharger">
              <p>Supercharger</p>
              <img src="/images/supercharger.jpg" width="300" height="300" alt="Super charger image "></img>
            </Link>

        </div>

        <div className="singlesong zoom">
          <Link to="/songs/cyberbiden">
            <p>CyberBiden</p>
            <img src="/images/cyberbiden.jpg" width="300" height="300" alt="cbdn"></img>
          </Link>
        </div>

        <div className="singlesong zoom">
          <Link to="/songs/mundane">
          <p>Mundane</p>
          <img src="/images/mundane.jpg" width="300" height="300" alt="mndn "></img>
          </Link>
        </div>

        <div className="singlesong zoom">
          <Link to="/songs/nothing">
          <p>Nothing</p>
          <img src="/images/nothing.jpg" width="300" height="300" alt="frgt "></img>
          </Link>
        </div>
        

      </div>
      <Outlet />
      </div>
    </div>
  )
}
  
export default Songs