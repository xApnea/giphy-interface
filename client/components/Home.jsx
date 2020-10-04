import React, { useContext } from 'react';

import Gif from './Gif.jsx';
import UserContext from './context/Context.jsx';

function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <h3>Home</h3>
      {
          userData.user
          ? <Gif />
          :
            <p>Log In to get started!</p>
        }

    </div>
  )
}

export default Home;