import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const navigate = useNavigate();
    
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('Monthly');

    // State to keep track of the current month
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

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
        if(activeTab == 'Monthly')
        {
            setCurrentMonthIndex(currentMonthIndex - 1);
            if(currentMonthIndex<1)
            {
                setCurrentMonthIndex(0);
                alert("Only dates for 2024 are currently valid")
            }
        }
        else
        {
            //update weekly index
        }
    };

    // Event handler for Next button click
    const handleNextButtonClick = () => {
        if(activeTab == 'Monthly')
        {
            setCurrentMonthIndex(currentMonthIndex + 1);
            if(currentMonthIndex>10)
            {
                setCurrentMonthIndex(11);
                alert("Only dates for 2024 are currently valid")
            }
        }
        else
        {
            //update weekly index
        }
    };

    // Event handler for Home button click
    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };

    // Array containing the names of the months
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Arrays for days of the month
    const jan24 = [[0, 1, 2, 3, 4, 5, 6],
                    [7,8,9,10,11,12,13],
                    [14,15,16,17,18,19,20],
                    [21,22,23,24,25,26,27],
                    [28,29,30,31]];

    const feb24 = [[0, 0, 0, 0, 1, 2, 3],
                    [4, 5, 6, 7, 8, 9, 10],
                    [11, 12, 13, 14, 15, 16, 17],
                    [18, 19, 20, 21, 22, 23, 24],
                    [25, 26, 27, 28, 29]];

    const mar24 = [[0, 0, 0, 0, 0, 1, 2],
                    [3, 4, 5, 6, 7, 8, 9],
                    [10, 11, 12, 13, 14, 15, 16],
                    [17, 18, 19, 20, 21, 22, 23],
                    [24, 25, 26, 27, 28, 29, 30],
                    [31]];

    const apr24 = [[0, 1, 2, 3, 4, 5, 6],
                    [7, 8, 9, 10, 11, 12, 13],
                    [14, 15, 16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25, 26, 27],
                    [28, 29, 30]];            

    const may24 = [[0, 0, 0, 1, 2, 3, 4],
                    [5, 6, 7, 8, 9, 10, 11],
                    [12, 13, 14, 15, 16, 17, 18],
                    [19, 20, 21, 22, 23, 24, 25],
                    [26, 27, 28, 29, 30, 31]];

    const jun24 = [[0, 0, 0, 0, 0, 0, 1],
                    [2, 3, 4, 5, 6, 7, 8],
                    [9, 10, 11, 12, 13, 14, 15],
                    [16, 17, 18, 19, 20, 21, 22],
                    [23, 24, 25, 26, 27, 28, 29],
                    [30]];

    const jul24 = [[0, 1, 2, 3, 4, 5, 6],
                    [7, 8, 9, 10, 11, 12, 13],
                    [14, 15, 16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25, 26, 27],
                    [28, 29, 30, 31]];

    const aug24 = [[0, 0, 0, 0, 1, 2, 3],
                    [4, 5, 6, 7, 8, 9, 10],
                    [11, 12, 13, 14, 15, 16, 17],
                    [18, 19, 20, 21, 22, 23, 24],
                    [25, 26, 27, 28, 29, 30, 31]];

    const sep24 = [[1, 2, 3, 4, 5, 6, 7],
                    [8, 9, 10, 11, 12, 13, 14],
                    [15, 16, 17, 18, 19, 20, 21],
                    [22, 23, 24, 25, 26, 27, 28],
                    [29, 30]];

    const oct24 = [[0, 0, 1, 2, 3, 4, 5],
                    [6, 7, 8, 9, 10, 11, 12],
                    [13, 14, 15, 16, 17, 18, 19],
                    [20, 21, 22, 23, 24, 25, 26],
                    [27, 28, 29, 30, 31]];

    const nov24 = [[0, 0, 0, 0, 0, 1, 2],
                    [3, 4, 5, 6, 7, 8, 9],
                    [10, 11, 12, 13, 14, 15, 16],
                    [17, 18, 19, 20, 21, 22, 23],
                    [24, 25, 26, 27, 28, 29, 20]];

    const dec24 = [[1, 2, 3, 4, 5, 6, 7],
                    [8, 9, 10, 11, 12, 13, 14],
                    [15, 16, 17, 18, 19, 20, 21],
                    [22, 23, 24, 25, 26, 27, 28],
                    [29, 30, 31]];

    const year2024 = [jan24, feb24, mar24, apr24, may24, jun24, jul24, aug24, sep24, oct24, nov24, dec24];

    return (
        <div className='Calendar'>
            <div className= 'flex flex-col h-screen w-screen bg-blue-0' >
                <div className='h-1/6 w-full bg-blue-50 border-b-4 border-blue-900 flex justify-center items-center relative'>
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
                        <div className='flex justify-end items-center gap-x-6'>
                            <button onClick={handleHomeButtonClick}>
                                {/* SVG Icon for House */}
                                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" strokeWidth="5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                    <polygon points="10 20 40 20 40 45 10 45 "stroke="rgb(30 58 138)" strokeWidth="5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                    <polygon points="38 10 38 20 "stroke="rgb(30 58 138)" strokeWidth="7.5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                    <polygon points="20 30 20 48 30 48 30 30"stroke="white" strokeWidth="5"strokeLinecap="round" fill="white" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button onClick={handleFilterButtonClick}>
                                {/* SVG Icon for Filter */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                                    <polygon points="0 0 50 0 25 25" stroke="rgb(30 58 138)" strokeWidth="5" fill="rgb(30 58 138)" strokeLinecap="round" strokeLinejoin="round"/>
                                    <polygon points="20 10 20 45 30 40 30 10" stroke="rgb(30 58 138)" strokeWidth="5" fill="rgb(30 58 138)" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <button className='flex rounded-l-2xl p-2 bg-blue-900' onClick={handlePrevButtonClick}>
                                {/* SVG Icon for Prev */}
                                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="5 25 25 45 25 5" stroke="white" strokeWidth="5" fill="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <polygon points="20 15 45 15 45 35 20 35" stroke="white" strokeWidth="5" fill="white" strokeLinecap="round" strokeLinejoin="round"/>
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
                <div className='flex h-full w-full justify-center overflow-x-hidden overflow-y-scroll p-2'>
                    {activeTab === 'Monthly' ? (
                        <div className='flex flex-col items-center'> 
                            <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-4xl text-center py-2 px-8 w-fit'>
                                {monthNames[currentMonthIndex]}
                            </div>
                            <div className='grid grid-cols-7 p-2 gap-12'>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Sunday
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Monday
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Tuesday
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Wednesday
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Thursday
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Friday
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    Saturday
                                </div>
                            </div>
                            <div className='grid grid-cols-7 items-center justify-center w-screen px-16'>
                                {year2024[currentMonthIndex].map((week, weekIndex) => (
                                    <React.Fragment key={weekIndex}>
                                        {week.map((day, dayIndex) => (
                                            <div key={dayIndex} className={`border-2 p-2 w-auto h-40 justify-center items-center ${day === 0 ? 'bg-white border-white z-0' : 'bg-white outline outline-3 outline-blue-900 border-blue-900 text-blue-900 z-40'}`}>
                                                {day !== 0 && day}
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className='flex rounded-2xl border-4 border-blue-900 justify-center items-center m-4 p-2'>
                                <div>
                                    Event Info
                                </div>
                            </div>
                        </div>     
                    ) : (
                        <div className=''> 
                            Weekly Calendar
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
