import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const navigate = useNavigate();
    
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('Monthly');

    // Event handler for Monthly button click
    const handleMonthlyButtonClick = () => {
        setActiveTab('Monthly');
    };

    // Event handler for Weekly button click
    const handleWeeklyButtonClick = () => {
        setActiveTab('Weekly');
    };

    // Event handler for Filter button click
    const handleFilterButtonClick = () => {
        
    };

    // Event handler for Prev button click
    const handlePrevButtonClick = () => {
        
    };

    // Event handler for Weekly button click
    const handleNextButtonClick = () => {
        
    };


    return (
        <div className='Calendar'>
            <div className= 'flex h-screen w-screen bg-blue-0' >
                <div className='grid grid-rows-2 gap-4 h-full w-full'>
                    <div className='flex h-1/4 w-full bg-blue-50 border-b-4 border-blue-900'>
                        <div className='grid grid-cols-6 gap-4 h-full w-full'>
                            <div className='flex items-end mr-5 ml-5'>
                                <button className={`h-1/2 w-full rounded-t-2xl border-2 border-b-0 ${activeTab === 'Monthly' ? 'bg-blue-900 border-blue-900 text-blue-50' : 'bg-blue-50 border-blue-900'}`} onClick={handleMonthlyButtonClick}>
                                    Monthly
                                </button> 
                            </div>
                            <div className='flex items-end mr-10'>
                                <button className={`h-1/2 w-full rounded-t-2xl border-2 border-b-0 ${activeTab === 'Weekly' ? 'bg-blue-900 border-blue-900 text-blue-50' : 'bg-blue-50 border-blue-900'}`} onClick={handleWeeklyButtonClick}>
                                    Weekly
                                </button> 
                            </div>
                            <div className='flex justify-center items-center col-span-2 text-3xl'>
                                Your Schedule
                            </div>
                            <div className='flex justify-end items-center'>
                                <button onClick={handleFilterButtonClick}>
                                    {/* SVG Icon for Filter */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                                        <polygon points="0 0 50 0 25 25" stroke="rgb(30 58 138)" strokeWidth="5" fill="rgb(30 58 138)" stroke-linecap="round" stroke-linejoin="round"/>
                                        <polygon points="20 10 20 45 30 40 30 10" stroke="rgb(30 58 138)" strokeWidth="5" fill="rgb(30 58 138)" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <button className='flex rounded-l-2xl p-2 bg-blue-900' onClick={handlePrevButtonClick}>
                                    {/* SVG Icon for Prev */}
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="5 25 25 45 25 5" stroke="white" stroke-width="5" fill="white" stroke-linecap="round" stroke-linejoin="round"/>
                                        <polygon points="20 15 45 15 45 35 20 35" stroke="white" stroke-width="5" fill="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> 
                                </button>
                                <button className='flex rounded-r-2xl p-2 bg-blue-900' onClick={handleNextButtonClick}>
                                    {/* SVG Icon for Next */}
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="45 25 25 45 25 5" stroke="white" strokeWidth="5" fill="white" strokeLinecap="round" strokeLinejoin="round"/>
                                        <polygon points="30 15 5 15 5 35 30 35" stroke="white" strokeWidth="5" fill="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex '>
                        {activeTab === 'Monthly' ? (
                            <h1>Monthly</h1>
                        ) : (
                            <h1>Weekly</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
