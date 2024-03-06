// //import 'bootstrap/dist/css/bootstrap.min.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from './Home'
// import Login from './Login'
// import './App.css'
// import { useEffect, useState } from 'react'

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false)
//   const [email, setEmail] = useState('')

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
//           <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App

import './App.css';
import { useState } from 'react';

const TextBox = (props) => {
  // Event handler to update the state when the input changes
  const handleInputChange = (event) => {
    // Call the callback function passed from the App component
    props.onInputChange(event.target.value);
  };

  return (
    <div>
      <label className='text-xl' htmlFor="textBox">{props.label}: </label>
      {/* Input box */}
      <input className='text-xl h-12 rounded-lg border-2 border-blue-500 size-full p-4'
        type="text"
        id="textBox"
        value={props.inputValue}
        onChange={handleInputChange}
        placeholder={props.placeholder}
      />
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFinal, setUsernameFinal] = useState('');
  const [passwordFinal, setPasswordFinal] = useState('');

  // Callback function to update username state
  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  // Callback function to update password state
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  // Event handler for Login button click
  const handleLoginButtonClick = () => {
    setUsernameFinal(username);
    setPasswordFinal(password);
  };

   // Event handler for Create an Account button click
   const handleCreateButtonClick = () => {
    //new window here
  };

  return (
    <div className="App">
      <div className='flex h-screen w-screen place-content-center bg-blue-300'>
        <div className='flex h-3/4 w-2/5 self-center justify-center overflow-hidden rounded-3xl bg-blue-50'> 
          <div className='grid grid-rows h-full w-full'>
            <div className='flex justify-center items-center h-full w-full text-5xl'>
              Login
            </div>
            <div className='flex justify-center items-center h-full w-full'> 
              <TextBox text-3xl
              placeholder="Enter your username"
              label="Username"
              inputValue={username}
              onInputChange={handleUsernameChange}
              />
            </div>
            <div className='flex justify-center items-center h-full w-full'> 
              <TextBox 
              placeholder="Enter your password"
              label="Password"
              inputValue={password}
              onInputChange={handlePasswordChange}
              />
            </div>
            <div className='flex justify-center items-center h-full w-full gap-6'> 
              <button className='bg-blue-400 outline outline-offset-2 outline-blue-500 rounded-3xl size-1/3'onClick={handleLoginButtonClick}>Login</button>
              <button className='bg-blue-400 outline outline-offset-2 outline-blue-500 rounded-3xl size-1/3'onClick={handleCreateButtonClick}>Create an Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
