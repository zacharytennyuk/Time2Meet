import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TextBox from '../components/textBox';


const Login = (props)  => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // might not be necessary - z
  // const [usernameFinal, setUsernameFinal] = useState('');
  // const [passwordFinal, setPasswordFinal] = useState('');

  const navigate = useNavigate();

  // Callback function to update username state
  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  // Callback function to update password state
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  // Event handler for Login button click
  const handleLoginButtonClick = async () => {
    // setUsernameFinal(username);
    // setPasswordFinal(password);

     // checks if all fields are entered
     if (
      !username.trim()
      || !password.trim())
    {
      alert("Hold your horses! Please complete all fields to login :O");
      return;
    }

    try{
      const login = await axios.post('http://localhost:5200/api/users/login', {
        userName: username,
        password: password,
      });
      
      const id = login.data.id; // Assuming the response includes the userId
      
      localStorage.setItem('token', login.data.token);
      

      

      if (login.data.token && login.data.id){
        localStorage.setItem('token', login.data.token);
        localStorage.setItem('id', login.data.id);

        // console.log("token:", localStorage.token);
        // console.log("id:", localStorage.id);

        navigate('/user-home');
      } else{
        alert('Username or password is incorrect.');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Unidentified login error, please try again!');
      }
    }

  };

   // Event handler for Create an Account button click
   const handleCreateButtonClick = () => {
    navigate('/create-account');
  };

  return (
    <div className="Login">
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
              <TextBox text-3xl
              placeholder="Enter your password"
              label="Password"
              type="password"
              inputValue={password}
              onInputChange={handlePasswordChange}
              />
            </div>
            <div className='flex justify-center items-center h-full w-full gap-6'> 
              <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-1/3'onClick={handleLoginButtonClick}>Login</button>
              <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-1/3'onClick={handleCreateButtonClick}>Create an Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
