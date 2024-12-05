import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/actions'; // Adjust the path as necessary
import socket from '../socket'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import avatar1 from '../assets/avatar.png'; 
import avatar2 from '../assets/avatar2.png';

const Home = () => {
  const location = useLocation();
  const { name,avatar } = location.state || {};
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const [newMessage, setNewMessage] = useState('');
  

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off('message');
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Emit the message to the server
      const messageData = { text: newMessage, sender: name, timestamp: new Date().toLocaleTimeString() };
      socket.emit('message', messageData);
      
      setNewMessage('');
    }
  };

  return (
    <>
      <div style={{ fontFamily: 'Merienda', backgroundImage: 'linear-gradient(to bottom right, #00bbff, red)', minHeight: '100vh' }}>
        <div style={{ paddingLeft: '20%' }} className='row w-100 pt-4'>
          <div className='col-2 border border-dark bg-info rounded' style={{ width: '70px', height: '90vh' }}>
            <h1 className='py-3' style={{ fontFamily: 'Nabla', textAlign: 'center' }}>C</h1>
            <div style={{ paddingTop: '10vh' }} className='d-flex flex-column align-items-center gap-5 fs-3 text-dark'>
              <i className="fa-solid fa-message"></i>
              <i className="fa-solid fa-user"></i>
              <i className="fa-solid fa-users"></i>
              <i className="fa-solid fa-gear"></i>
              <Link to={'/'}><i className="fa-solid fa-power-off text-dark"></i></Link>
              <img width={'50px'} height={'50px'} className='rounded-circle mt-5' src={avatar} alt="" />
            </div>
          </div>
          <div className='col-8 bg-light rounded border border-dark position-relative'>
            {/* Top bar */}
            <div style={{ width: '100%', height: '70px', left: '0px' }} className='bg-info position-absolute rounded-top z-3'>
              <div className='d-flex align-items-center gap-3 my-3 mx-2'>
                <img width={'45px'} height={'45px'} className='rounded-circle' src={avatar} alt="" />
                <h5 className='text-dark'>{name || 'User '}</h5>
              </div>
            </div>
            {/* Message container */}
            <div style={{ height: '71vh', left: '0px', top: '70px', overflowY: 'scroll' }} className='bg-light w-100 position-absolute z-1'>
              {messages.map((msg, index) => (
                <div key={index} className={`d-flex text-dark align-items-center my-2 ${msg.sender === name ? 'justify-content-end' : 'justify-content-start'}`}>
                  {msg.sender !== name && (
                    <img width={'45px'} height={'45px'} className='rounded-circle me-2' src={msg.sender === name ? avatar1 : avatar2} alt="" />
                  )}
                  <div className={`position-relative my-3  ${msg.sender === name ? 'bg-info text-light' : 'bg-dark text-light'} p-2 rounded`}>
                    <p className='mb-0'>{msg.text}</p>
                    <span className='position-absolute text-dark text-center ' style={{ top: '50px', fontSize: '0.8rem', width: '90px',left:msg.sender === name ? '-35px':'-10px'}}>
                      {msg.timestamp}
                    </span>
                  </div>
                  {msg.sender === name && (
                    <img width={'45px'} height={'45px'} className='rounded-circle ms-2' src={avatar} alt="" />
                  )}
                  <h5  style={{ position: 'absolute', marginTop: '80px', textAlign: 'center', marginLeft: msg.sender === name ? '0px' : '10px', marginRight: msg.sender === name ? '10px' : '0px' }}>{msg.sender}</h5>
                </div>
              ))}
            </div>
            {/* Message Typing bar */}
            <div style={{ width: '100%', height: '75px', left: '0px' }} className='bg-light position-absolute bottom-0 rounded-bottom border border-top-2 z-3'>
              <div className='d-flex align-items-center justify-content-evenly mt-3 text-dark'>
                <input
                  style={{ width: '40vw', height: '40px' }}
                  className='form-control'
                  type="text"
                  placeholder='Enter Message....'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  
                />
                <i className="fa-regular fa-face-smile p-2 fs-4 rounded bg-light"></i>
                <i className="fa-solid fa-link p-2 fs-4 rounded bg-light"></i>
                <button className='btn p-0' onClick={handleSendMessage}>
                  <i className="fa-solid fa-paper-plane p-2 fs-4 rounded bg-dark text-light"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home