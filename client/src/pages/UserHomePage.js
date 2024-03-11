import React from 'react'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../components/submitButton';

export default function UserHome({}) {
    const navigate = useNavigate();

    // Event handler for Plan an Event button click
    const handleEventButtonClick = () => {
    navigate('/event');
    }

    // Event handler for Your Schedule button click
    const handleScheduleButtonClick = () => {
    navigate('/calendar');
    }

    // Event handler for Friends button click
    const handleFriendsButtonClick = () => {
    navigate('/friends');
    }

    return (
        <div>
        <h1>User Home Page</h1>
        <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-1/3'onClick={handleEventButtonClick}>
            Plan an Event
        </button>
        <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-1/3'onClick={handleScheduleButtonClick}>
            Your Schedule
        </button>
        <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-1/3'onClick={handleFriendsButtonClick}>
            Friends
        </button>
        </div>
    );
}