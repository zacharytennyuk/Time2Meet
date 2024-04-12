import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import FriendTextBox from '../components/friendTextBox'

export default function Friends() {
    const navigate = useNavigate();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [friend, setFriend] = useState('');
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    // Callback function to update friend state
    const handleFriendChange = (value) => {
        setFriend(value);
    };

    // Event handler for Home button click
    const handleAddButtonClick = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5200/api/friends/add-friends', { userName: friend });
            alert(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert(error.response.data.message); // "Please choose a different username."
            } else if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                console.error('Unidentified error :/', error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch friends data when component mounts
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5200/api/friends/display-friends');
                setFriends(response.data.friends);
                //console.log(friends[0]);
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    // Event handler for Home button click
    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };
    return (
            <div className= 'flex flex-col h-screen bg-blue-0'>
                <div className='h-1/6 w-full border-b-4 border-blue-900 flex justify-center items-center relative'>
                    <div className='grid grid-cols-5 w-full items-center justify-center'>
                        <div className='flex col-start-3 text-3xl text-center justify-center text-blue-900'>
                            Friends
                        </div>
                        <div className='flex col-start-5 place-content-end p-4'>
                            <button onClick={handleHomeButtonClick}>
                                {/* SVG Icon for House */}
                                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" strokeWidth="5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                    <polygon points="10 20 40 20 40 45 10 45 "stroke="rgb(30 58 138)" strokeWidth="5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                    <polygon points="38 10 38 20 "stroke="rgb(30 58 138)" strokeWidth="7.5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                    <polygon points="20 30 20 48 30 48 30 30"stroke="white" strokeWidth="5"strokeLinecap="round" fill="white" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex h-full w-full bg-blue-200 overflow-hidden'>
                    <div className='flex grid grid-cols-2 grid-rows-2 h-full w-full'>
                        <div className='flex col-start-1 row-start-1 row-span-2 bg-blue-400 rounded-3xl m-4 p-4'>
                            <div className='flex grid grid-rows-auto w-full h-full'>
                                <div className='flex text-2xl text-white text-center justify-center row-start-1'>
                                    Your Friends
                                </div>
                                <div className='flex row-span-12 overflow-y-scroll justify-center w-full'>
                                    <div className='flex grid grid-rows-26 w-full'>
                                    {alphabet.map((letter, index) => (
                                        <div key={index} className='flex text-center border-b-4 justify-center text-white border-blue'>
                                            {letter}
                                        </div>

                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex col-start-2 row-start-1 row-span-1 bg-blue-400 rounded-3xl p-4 m-4 justify-center'>
                            <div className='flex grid grid-rows-auto'>
                                <div className='flex text-2xl text-white text-center justify-center row-start-1'>
                                    Add Friends
                                </div>
                                <div className='flex row-start-2'>
                                    <FriendTextBox text-3xl
                                        placeholder="Enter friend's username"
                                        label="Add Friend"
                                        inputValue={friend}
                                        onInputChange={handleFriendChange}
                                    />
                                </div>
                                <div className='flex row-start-3 justify-center'>
                                    <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-1/3'onClick={handleAddButtonClick}>Add</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex col-start-2 row-start-2 row-span-1 bg-blue-400 rounded-3xl p-4 m-4 justify-center'>
                            <div className='flex text-2xl text-white text-center justify-center row-start-1'>
                                Incoming Friend Requests
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}