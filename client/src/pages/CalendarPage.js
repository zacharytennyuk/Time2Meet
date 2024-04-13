import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import EventTile from '../components/eventTile';

// Checkbox component
const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center">
    <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-5 w-5 text-blue-600"/>
    <span className="ml-2 text-white">{label}</span>
  </label>
);

const Dialog = ({ isOpen, onClose, checkedWork, setCheckedWork, checkedPersonal, setCheckedPersonal, checkedSchool, setCheckedSchool }) => {
    const handleCheckedWork = () => {
        setCheckedWork(!checkedWork);
    };

    const handleCheckedPersonal = () => {
        setCheckedPersonal(!checkedPersonal);
    };

    const handleCheckedSchool = () => {
        setCheckedSchool(!checkedSchool);
    };

    return (
        <div className='flex bg-blue-400 p-8 m-2 rounded-xl place-contents-center justify-center'>
            <div className='flex grid grid-rows-4 ml-4 mr-4'>
                <Checkbox label="Work" checked={checkedWork} onChange={handleCheckedWork} />
                <Checkbox label="Personal" checked={checkedPersonal} onChange={handleCheckedPersonal} />
                <Checkbox label="School" checked={checkedSchool} onChange={handleCheckedSchool} />
                <button className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm pt-2 pb-2 mt-2' onClick={onClose}>Apply</button>
            </div>
        </div>
    );
};

export default function Calendar() {
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [checkedWork, setCheckedWork] = React.useState(false);
    const [checkedPersonal, setCheckedPersonal] = React.useState(false);
    const [checkedSchool, setCheckedSchool] = React.useState(false);
  
    // Function to open dialog with filter button
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    // Function to close dialog
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('Monthly');

    // State to keep track of the current month
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

    // State to keep track of the current week index
    const [currentWeekIndex, setCurrentWeekIndex] = useState(() => {
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const pastDaysOfYear = ((currentDate - firstDayOfYear) / 86400000)+1; // Calculate days past since beginning of the year
        // first day of the year is a monday not a sunday so an additional offset is needed
        return Math.floor(pastDaysOfYear / 7); // Calculate current week index
    });

    // Event handler for Monthly button click
    const handleMonthlyButtonClick = () => {
        setActiveTab('Monthly');
        setCurrentMonthIndex(new Date().getMonth());
    };

    // Event handler for Weekly button click
    const handleWeeklyButtonClick = () => {
        setActiveTab('Weekly');
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000; // Calculate days past since beginning of the year
        setCurrentWeekIndex(Math.floor(pastDaysOfYear / 7)); // Calculate current week index
    };

    // Event handler for Prev button click
    const handlePrevButtonClick = () => {
        if(activeTab == 'Monthly')
        {
            //update monthly index
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
            setCurrentWeekIndex(currentWeekIndex - 1);
            if(currentWeekIndex<1)
            {
                setCurrentWeekIndex(0);
                alert("Only dates for 2024 are currently valid")
            }
        }
    };

    // Event handler for Next button click
    const handleNextButtonClick = () => {
        if(activeTab == 'Monthly')
        {
            //update monthly index
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
            setCurrentWeekIndex(currentWeekIndex + 1);
            if(currentWeekIndex>51)
            {
                setCurrentWeekIndex(52);
                alert("Only dates for 2024 are currently valid")
            }
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

    const Weeks2024 = [
        ["Dec 31st", "Jan 1st", "Jan 2nd", "Jan 3rd", "Jan 4th", "Jan 5th", "Jan 6th"],
        ["Jan 7th", "Jan 8th", "Jan 9th", "Jan 10th", "Jan 11th", "Jan 12th", "Jan 13th"],
        ["Jan 14th", "Jan 15th", "Jan 16th", "Jan 17th", "Jan 18th", "Jan 19th", "Jan 20th"],
        ["Jan 21st", "Jan 22nd", "Jan 23rd", "Jan 24th", "Jan 25th", "Jan 26th", "Jan 27th"],
        ["Jan 28th", "Jan 29th", "Jan 30th", "Jan 31st", "Feb 1st", "Feb 2nd", "Feb 3rd"],
        ["Feb 4th", "Feb 5th", "Feb 6th", "Feb 7th", "Feb 8th", "Feb 9th", "Feb 10th"],
        ["Feb 11th", "Feb 12th", "Feb 13th", "Feb 14th", "Feb 15th", "Feb 16th", "Feb 17th"],
        ["Feb 18th", "Feb 19th", "Feb 20th", "Feb 21st", "Feb 22nd", "Feb 23rd", "Feb 24th"],
        ["Feb 25th", "Feb 26th", "Feb 27th", "Feb 28th", "Feb 29th", "Mar 1st", "Mar 2nd"],
        ["Mar 3rd", "Mar 4th", "Mar 5th", "Mar 6th", "Mar 7th", "Mar 8th", "Mar 9th"],
        ["Mar 10th", "Mar 11th", "Mar 12th", "Mar 13th", "Mar 14th", "Mar 15th", "Mar 16th"],
        ["Mar 17th", "Mar 18th", "Mar 19th", "Mar 20th", "Mar 21st", "Mar 22nd", "Mar 23rd"],
        ["Mar 24th", "Mar 25th", "Mar 26th", "Mar 27th", "Mar 28th", "Mar 29th", "Mar 30th"],
        ["Mar 31st", "Apr 1st", "Apr 2nd", "Apr 3rd", "Apr 4th", "Apr 5th", "Apr 6th"],
        ["Apr 7th", "Apr 8th", "Apr 9th", "Apr 10th", "Apr 11th", "Apr 12th", "Apr 13th"],
        ["Apr 14th", "Apr 15th", "Apr 16th", "Apr 17th", "Apr 18th", "Apr 19th", "Apr 20th"],
        ["Apr 21st", "Apr 22nd", "Apr 23rd", "Apr 24th", "Apr 25th", "Apr 26th", "Apr 27th"],
        ["Apr 28th", "Apr 29th", "Apr 30th", "May 1st", "May 2nd", "May 3rd", "May 4th"],
        ["May 5th", "May 6th", "May 7th", "May 8th", "May 9th", "May 10th", "May 11th"],
        ["May 12th", "May 13th", "May 14th", "May 15th", "May 16th", "May 17th", "May 18th"],
        ["May 19th", "May 20th", "May 21st", "May 22nd", "May 23rd", "May 24th", "May 25th"],
        ["May 26th", "May 27th", "May 28th", "May 29th", "May 30th", "May 31st", "Jun 1st"],
        ["Jun 2nd", "Jun 3rd", "Jun 4th", "Jun 5th", "Jun 6th", "Jun 7th", "Jun 8th"],
        ["Jun 9th", "Jun 10th", "Jun 11th", "Jun 12th", "Jun 13th", "Jun 14th", "Jun 15th"],
        ["Jun 16th", "Jun 17th", "Jun 18th", "Jun 19th", "Jun 20th", "Jun 21st", "Jun 22nd"],
        ["Jun 23rd", "Jun 24th", "Jun 25th", "Jun 26th", "Jun 27th", "Jun 28th", "Jun 29th"],
        ["Jun 30th", "Jul 1st", "Jul 2nd", "Jul 3rd", "Jul 4th", "Jul 5th", "Jul 6th"],
        ["Jul 7th", "Jul 8th", "Jul 9th", "Jul 10th", "Jul 11th", "Jul 12th", "Jul 13th"],
        ["Jul 14th", "Jul 15th", "Jul 16th", "Jul 17th", "Jul 18th", "Jul 19th", "Jul 20th"],
        ["Jul 21st", "Jul 22nd", "Jul 23rd", "Jul 24th", "Jul 25th", "Jul 26th", "Jul 27th"],
        ["Jul 28th", "Jul 29th", "Jul 30th", "Jul 31st", "Aug 1st", "Aug 2nd", "Aug 3rd"],
        ["Aug 4th", "Aug 5th", "Aug 6th", "Aug 7th", "Aug 8th", "Aug 9th", "Aug 10th"],
        ["Aug 11th", "Aug 12th", "Aug 13th", "Aug 14th", "Aug 15th", "Aug 16th", "Aug 17th"],
        ["Aug 18th", "Aug 19th", "Aug 20th", "Aug 21st", "Aug 22nd", "Aug 23rd", "Aug 24th"],
        ["Aug 25th", "Aug 26th", "Aug 27th", "Aug 28th", "Aug 29th", "Aug 30th", "Aug 31st"],
        ["Sep 1st", "Sep 2nd", "Sep 3rd", "Sep 4th", "Sep 5th", "Sep 6th", "Sep 7th"],
        ["Sep 8th", "Sep 9th", "Sep 10th", "Sep 11th", "Sep 12th", "Sep 13th", "Sep 14th"],
        ["Sep 15th", "Sep 16th", "Sep 17th", "Sep 18th", "Sep 19th", "Sep 20th", "Sep 21st"],
        ["Sep 22nd", "Sep 23rd", "Sep 24th", "Sep 25th", "Sep 26th", "Sep 27th", "Sep 28th"],
        ["Sep 29th", "Sep 30th", "Oct 1st", "Oct 2nd", "Oct 3rd", "Oct 4th", "Oct 5th"],
        ["Oct 6th", "Oct 7th", "Oct 8th", "Oct 9th", "Oct 10th", "Oct 11th", "Oct 12th"],
        ["Oct 13th", "Oct 14th", "Oct 15th", "Oct 16th", "Oct 17th", "Oct 18th", "Oct 19th"],
        ["Oct 20th", "Oct 21st", "Oct 22nd", "Oct 23rd", "Oct 24th", "Oct 25th", "Oct 26th"],
        ["Oct 27th", "Oct 28th", "Oct 29th", "Oct 30th", "Oct 31st", "Nov 1st", "Nov 2nd"],
        ["Nov 3rd", "Nov 4th", "Nov 5th", "Nov 6th", "Nov 7th", "Nov 8th", "Nov 9th"],
        ["Nov 10th", "Nov 11th", "Nov 12th", "Nov 13th", "Nov 14th", "Nov 15th", "Nov 16th"],
        ["Nov 17th", "Nov 18th", "Nov 19th", "Nov 20th", "Nov 21st", "Nov 22nd", "Nov 23rd"],
        ["Nov 24th", "Nov 25th", "Nov 26th", "Nov 27th", "Nov 28th", "Nov 29th", "Nov 30th"],
        ["Dec 1st", "Dec 2nd", "Dec 3rd", "Dec 4th", "Dec 5th", "Dec 6th", "Dec 7th"],
        ["Dec 8th", "Dec 9th", "Dec 10th", "Dec 11th", "Dec 12th", "Dec 13th", "Dec 14th"],
        ["Dec 15th", "Dec 16th", "Dec 17th", "Dec 18th", "Dec 19th", "Dec 20th", "Dec 21st"],
        ["Dec 22nd", "Dec 23rd", "Dec 24th", "Dec 25th", "Dec 26th", "Dec 27th", "Dec 28th"],
        ["Dec 29th", "Dec 30th", "Dec 31st", "Jan 1st", "Jan 2nd", "Jan 3rd", "Jan 4th"]];
    

    return (
        <div className='Calendar'>
            <div className= 'flex flex-col h-screen w-screen bg-blue-0' >
                <div className='h-1/6 w-full bg-blue-50 border-b-4 border-blue-900 flex justify-center items-center relative'>
                    <div className='grid grid-cols-6 gap-4 h-full w-full'>
                        <div className='flex items-end mr-5 ml-5'>
                            <button className={`h-1/2 w-full rounded-t-2xl border-4 border-b-0 ${activeTab === 'Monthly' ? 'bg-blue-900 border-blue-900 text-blue-50' : 'bg-blue-50 text-blue-900 border-blue-900'}`} onClick={handleMonthlyButtonClick}>
                                Monthly
                            </button> 
                        </div>
                        <div className='flex items-end mr-10'>
                            <button className={`h-1/2 w-full rounded-t-2xl border-4 border-b-0 ${activeTab === 'Weekly' ? 'bg-blue-900 border-blue-900 text-blue-50' : 'bg-blue-50 text-blue-900 border-blue-900'}`} onClick={handleWeeklyButtonClick}>
                                Weekly
                            </button> 
                        </div>
                        <div className='flex justify-center items-center col-span-2 text-3xl text-blue-900'>
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
                            <button onClick={openDialog}>
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
                <div className='flex h-full w-full justify-center overflow-x-hidden overflow-y-scroll p-2 bg-blue-200'>
                    {activeTab === 'Monthly' ? (
                        <div className='flex flex-col items-center'> 
                            {isDialogOpen && (
                                <Dialog
                                    isOpen={isDialogOpen}
                                    onClose={closeDialog}
                                    checkedWork={checkedWork}
                                    setCheckedWork={setCheckedWork}
                                    checkedPersonal={checkedPersonal}
                                    setCheckedPersonal={setCheckedPersonal}
                                    checkedSchool={checkedSchool}
                                    setCheckedSchool={setCheckedSchool}
                                />
                            )}
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
                                            <div key={dayIndex} className={`border-2 p-2 w-auto h-40 justify-center items-center ${day === 0 ? 'bg-blue-200 border-blue-200 z-0' : 'bg-white outline outline-3 outline-blue-900 border-blue-900 text-blue-900 z-40'}`}>
                                                {day !== 0 && day}
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className='flex rounded-2xl border-4 border-blue-900 justify-center items-center m-4 p-2 bg-white'>
                                <div className='flex text-black font-bold'>
                                    Event Info
                                </div>
                            </div>
                        </div>     
                    ) : (
                        <div className='flex flex-col items-center'> 
                            {isDialogOpen && (
                                <Dialog
                                    isOpen={isDialogOpen}
                                    onClose={closeDialog}
                                    checkedWork={checkedWork}
                                    setCheckedWork={setCheckedWork}
                                    checkedPersonal={checkedPersonal}
                                    setCheckedPersonal={setCheckedPersonal}
                                    checkedSchool={checkedSchool}
                                    setCheckedSchool={setCheckedSchool}
                                />
                            )}
                            <div className='grid grid-cols-7 p-2 gap-12'>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full text-center'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Sunday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][0]}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Monday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][1]}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Tuesday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][2]}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Wednesday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][3]}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Thursday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][4]}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Friday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][5]}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl bg-blue-900 text-blue-50 text-xl justify-center items-center p-2 w-full'>
                                    <div className='grid-row-2'>
                                        <div className='text-center'>
                                            Saturday
                                        </div>
                                        <div className='text-center'>
                                            {Weeks2024[currentWeekIndex][6]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-7 p-2 px-12 gap-2'>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center  p-2 h-auto w-full bg-white'>
                                    <div className='justify-center'>
                                    <EventTile></EventTile>
                                    <EventTile></EventTile>
                                    </div>
                                </div>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center items-center p-2 w-full bg-white'>
                                    <EventTile></EventTile>
                                    
                                </div>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center items-center p-2 w-full bg-white'>
                                    <EventTile></EventTile>
                                </div>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center items-center p-2 w-full bg-white'>
                                    <EventTile></EventTile>
                                </div>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center items-center p-2 w-full bg-white'>
                                    <EventTile></EventTile>
                                </div>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center items-center p-2 w-full bg-white'>
                                    <EventTile></EventTile>
                                </div>
                                <div className='flex rounded-2xl border-4 border-blue-900 text-xl justify-center items-center p-2 w-full bg-white'>
                                    <EventTile></EventTile>
                                </div>
                            </div>
                            <div className='flex rounded-2xl border-4 border-blue-900 justify-center items-center m-4 p-2 bg-white '>
                                <span className=" flex text-black font-bold">
                                    Event Info
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
