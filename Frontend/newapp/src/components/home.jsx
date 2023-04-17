import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeEvent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>Your data Sucessfully stored in the database.</p>
      {user && (
        <div>
          <h3>Name: {user.username}</h3>
          <p>Email: {user.email}</p>
          {user.disc && <p>Description: {user.disc}</p>}
        </div>
      )}

      <button type="submit">Register</button>
      <button type="button" onClick={() => navigate('/')}>
        Back to login
      </button>
    </div>
  );
};

export default HomeEvent;







// import { useNavigate } from "react-router-dom";
// // import React, { useState } from "react";



// const HomeEvent = () => {

//     const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Home Page</h2>


     
 
//         <button type="submit">Register</button>
//         <button type="button" onClick={() => navigate("/")}>Back to login</button>

//     </div>
//   );
// };

// export default HomeEvent;
