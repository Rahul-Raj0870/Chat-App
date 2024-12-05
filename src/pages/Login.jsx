import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../assets/avatar.png'; 
import avatar2 from '../assets/avatar2.png';
const Login = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [name, setName] = useState('');
  const navigate = useNavigate();
 
   // Define a mapping of names to avatar images
   const avatarMapping = {
    'RJ': avatar1,
    'MJ': avatar2,
    'CJ': avatar2,
    'DJ': avatar1,
  };


  const handleLogin = () => {
     const avatar = avatarMapping[name] || avatar1;
      navigate('/home', { state: { name,avatar } });
  };

 // Update window width on resize
 useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  const containerStyle = {
    width:windowWidth >= 992 ? '800px' : '400px',
    height:'300px'
  }

  return (
    <div style={{ fontFamily: 'Merienda', backgroundImage: 'linear-gradient(to bottom right, #00bbff, red)', minHeight: '100vh' }} className='d-flex justify-content-center'>
      <div className='bg-info mt-5 text-center rounded' style={containerStyle}>
        <h1 className='my-5 text-dark'>Welcome to <span className='fw-bolder'>Connectly</span></h1>
        <input
          style={{ width: '40vw', height: '50px', marginInline: '90px' }}
          className='form-control'
          type="text"
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)} // Update the name state
        />
        <button onClick={handleLogin} className='btn btn-success mt-3 px-5 py-2 fw-bolder'>Login</button>
      </div>
    </div>
  )
}

export default Login