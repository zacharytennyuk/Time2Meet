import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Friends({}) {
    const navigate = useNavigate();
    
    // Event handler for Home button click
    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };

    return (
        <div>

            <div className='flex '>
                Friends
            </div>
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
    );
}