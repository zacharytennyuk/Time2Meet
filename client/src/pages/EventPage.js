import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateAccountTextBox from '../components/createAccountTextBox';
import SubmitButton from '../components/submitButton';
import Dropdown from '../components/dropDownTimes';
import Selector from '../components/selectorComboBox';
import ChatPage from '../pages/ChatPage';

export default function Event() {
    const navigate = useNavigate();
    // state variables to hold event data
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventStartTime: '',
        eventEndTime: '',
        eventType: '',
        eventInvitedFriends: [], 
        eventLocation: '',
        eventUser: localStorage.id,
    });


    //  update event state when input fields change
    const updateEvent = (event) => {
        const { name, value } = event.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateTimeField = (fieldName, value) => {
        setEventData(prevState => ({
          ...prevState,
          [fieldName]: value,
        }));
      };

    //  event types
    const eventTypes = ['Personal', 'School', 'Work'];

    const handleEventTypeChange = (eventType) => {
        setEventData(prevState => ({
            ...prevState,
            eventType: eventType
        }));
    };

    const [invitedFriends, setInvitedFriends] = useState([]);

    const updateInvitedFriends = (friendName) => {
        console.log("Updating friends with: ", friendName);
        let updatedInvitedFriends;
        if (invitedFriends.includes(friendName)) {
            updatedInvitedFriends = invitedFriends.filter(name => name !== friendName);
        } else {
            updatedInvitedFriends = [...invitedFriends, friendName];
        }
        setInvitedFriends(updatedInvitedFriends);
    
        // Update eventData with the new list of invited friends
        setEventData(prevState => ({
            ...prevState,
            eventInvitedFriends: updatedInvitedFriends
        }));
    };
    
    

    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        // checks if all required fields are entered
        if (
            !eventData.eventName.trim()
            || !eventData.eventDate.trim()
            || !eventData.eventStartTime.trim()
            || !eventData.eventEndTime.trim()
            || !eventData.eventType.trim())
        {
            alert("Please complete all required fields to create your event.");
            return;
        }

        if (eventData.eventStartTime > eventData.eventEndTime)
        {
            alert("End Time cannot be before Start Time.");
            return;
        }
       
        try {
            //send to backend with axios
            console.log("token:", localStorage.token);
            console.log("id:", localStorage.id);
            const response = await axios.post('http://localhost:5200/api/events/create-event', eventData);
            alert(response.data.message);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error('Unidentified error :/', error);
            }
        }
    };

    return (
        <div className= 'flex flex-col h-screen bg-blue-200'>
            <div className='h-1/6 w-full border-b-4 bg-white border-blue-900 flex justify-center items-center relative'>
                <div className='grid grid-cols-5 w-full items-center justify-center'>
                    <div className='flex col-start-3 text-3xl text-center justify-center text-blue-900'>
                        Create an Event
                    </div>
                    <div className='flex col-start-5 place-content-end p-4'>
                         <button onClick={handleHomeButtonClick}>
                             {/* SVG Icon for House */}
                             <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" strokeWidth="5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                <polygon points="10 20 40 20 40 45 10 45 "stroke="rgb(30 58 138)" strokeWidth="5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>                                    <polygon points="38 10 38 20 "stroke="rgb(30 58 138)" strokeWidth="7.5"strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                                <polygon points="20 30 20 48 30 48 30 30"stroke="white" strokeWidth="5"strokeLinecap="round" fill="white" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-blue-200 overflow-y-scroll'>
                <form onSubmit={handleFormSubmit}>
                {/* 3-COLUMN DIV*/}

                    <div className='grid grid-cols-3 p-2 px-12 gap-2 m-4'> 
                    {/* COLUMN 1, name, time, and location*/}
                    <div className='col-start-1'>
                    <CreateAccountTextBox
                        label="Event Name"
                        type="text"
                        name="eventName"
                        value={eventData.eventName}
                        onChange={updateEvent}
                    />

                    <div className='grid grid-cols-2 gap-1'>
                        <div>
                            <label className="block text-blue-900">Start Time</label>
                            <Dropdown onChange={(value) => updateTimeField('eventStartTime', value)} />
                        </div>
                        <div>
                            <label className="block text-blue-900">End Time</label>
                            <Dropdown onChange={(value) => updateTimeField('eventEndTime', value)} />
                        </div>
                    </div>

                    <CreateAccountTextBox
                        label="Event Location"
                        type="text"
                        name="eventLocation"
                        value={eventData.eventLocation}
                        onChange={updateEvent}
                    />
                </div>
                    
                    {/* COLUMN 2, description and eventType*/}
                    <div className='col-start-2 flex flex-col items-center'>
                    <CreateAccountTextBox
                        label="Event Description"
                        type="text"
                        name="eventDescription"
                        value={eventData.eventDescription}
                        onChange={updateEvent}
                    />
                
                <div>
                    <label className="block text-blue-900">Event Type</label>
                    <select
                        name="eventType"
                        value={eventData.eventType}
                        onChange={updateEvent}
                        className="flex border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
                    >
                        <option value=""> Select an event type</option>
                        {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    </div>
                    </div>

                    {/* COLUMN 3, date and friends */}
                    <div className='col-start-3'>
                    <CreateAccountTextBox
                        label="Event Date"
                        type="date"
                        name="eventDate"
                        value={eventData.eventDate}
                        onChange={updateEvent}
                    />
                    
                    {/*Invited Friends */}
                    <Selector
                        invitedFriends={invitedFriends}
                        onInviteFriend={updateInvitedFriends}
                    />
                    </div>
                </div>  {/* END FORM */} 
                
                <div className="flex justify-center items-center">
                    <SubmitButton>Create An Event</SubmitButton>
                </div>
                </form>
                <div className='flex justify-center items-center w-full mt-8'>
                    <ChatPage>

                    </ChatPage>
                </div>
            </div>
        </div>
    );
}