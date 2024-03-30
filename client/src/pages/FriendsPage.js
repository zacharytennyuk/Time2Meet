import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAccountTextBox from '../components/createAccountTextBox';
import SubmitButton from '../components/submitButton';
import { useNavigate } from 'react-router-dom'

export default function Friends({}) {
    const navigate = useNavigate();

    const [friends, setFriends] = useState({
        addFriends: '',
        deleteFriends: ''
    });
    
      //  update event state when input fields change
      const updateFriends = (event) => {
        const { name, value } = event.target;
        setFriends(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const addFriends = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/friends', friends);
           // fetchFriends();

        } catch (error) {
            console.error('Error While Creating Event', error);
        }
    };

    // Event handler for Home button click
    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };

    return (
        <div>
            <div className= 'flex flex-col h-screen w-screen bg-blue-0'>
                <div className='h-1/6 w-full border-b-4 border-blue-900 flex justify-center items-center relative'>
                    <div className='grid grid-cols-5 w-full items-center justify-center'>
                        <div className='flex col-start-3 text-3xl text-center justify-center text-blue-900'>
                            Friends
                        </div>
                        <div className='flex col-start-5 place-content-end p-4'>
                            <button onClick={handleHomeButtonClick}>
                                {/* SVG Icon for House */}
                                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" stroke-width="5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
                                    <polygon points="10 20 40 20 40 45 10 45 "stroke="rgb(30 58 138)" stroke-width="5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
                                    <polygon points="38 10 38 20 "stroke="rgb(30 58 138)" stroke-width="7.5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
                                    <polygon points="20 30 20 48 30 48 30 30"stroke="white" stroke-width="5"stroke-linecap="round" fill="white" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex h-full w-full bg-blue-200'>
                    <div classname='flex grid grid-cols-2 grid-rows-2'>
                        <div className='flex col-start-1 row-span-2 bg-blue-400'>
                            Your Friends
                        </div>
                        <div className='flex col-start-2 row-span-1 bg-blue-400'>
                            Add Friends
                        </div>
                        <div className='flex col-start-2 row-span-1 bg-blue-400'>
                            Incoming Friend Requests
                        </div>

                    </div>
                </div>
            </div>
        <h1>Friends Page</h1>
            <button onClick={handleHomeButtonClick}>
                {/* SVG Icon for House */}
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" stroke-width="5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
                    <polygon points="10 20 40 20 40 45 10 45 "stroke="rgb(30 58 138)" stroke-width="5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
                    <polygon points="38 10 38 20 "stroke="rgb(30 58 138)" stroke-width="7.5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
                    <polygon points="20 30 20 48 30 48 30 30"stroke="white" stroke-width="5"stroke-linecap="round" fill="white" stroke-linejoin="round"/>
                </svg>
            </button>
            <h2>Your Friends </h2>

            <form onSubmit = {addFriends}>
              <CreateAccountTextBox
                    label="Invite Friends"
                    type="text"
                    name= "addFriends"
                    value={friends.addFriends}
                    onChange={updateFriends}
                />
              <SubmitButton> Add Friend </SubmitButton>
            </form>
        </div>
    );
}