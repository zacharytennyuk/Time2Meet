import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateAccountTextBox from '../components/createAccountTextBox';
import SubmitButton from '../components/submitButton';
import Dropdown from '../components/dropDownTimes';

export default function Event() {
    const navigate = useNavigate();

    // state variables to hold event data
    const [events, setEvents] = useState({
        eventName: '',
        eventType: '',
        eventLocation: '',
        eventDate: '',
        eventDescription: '',
        eventInvitedFriends: '', 
        eventStartTime: '',
    });

    // state variable for event types
    const [eventTypes, setEventTypes] = useState([]);

    //  update event state when input fields change
    const updateEvent = (event) => {
        const { name, value } = event.target;
        setEvents(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //  fetch event types from backend or set default values
    useEffect(() => {
        const fetchEventTypes = async () => {
        
            try {
                
                const response = await axios.get('/api/event-types');
                setEventTypes(response.data);
            } catch (error) {
                console.error('Error catching event types:', error);
                // set default event types 
                setEventTypes([' Personal', ' School', ' Work']);
            }
           
        };
        fetchEventTypes();
    }, []);

    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        // checks if all fields are entered
        if (
            !eventData.eventName.trim()
            || !eventData.eventType.trim() 
            || !eventData.event.trim()
            || !eventData.password.trim())
        {
            alert("Hold your horses! Please complete all fields to create your account :O");
            return;
        }
       
        // if account is created successfully, go to home page
        try {
            //send to backend with axios
            const response = await axios.post('http://localhost:5200/api/users/create-account', formData);
            
            alert(response.data.message); // "Account created!"
            localStorage.setItem('userToken', token);
            navigate('/user-home');

        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // "Please choose a different username."
            } else {
                console.error('Unidentified error :/', error);
            }
        }
        try {
            await axios.post('http://localhost:5200/api/events/create-event', events);
            fetchEvents();

        } catch (error) {
            console.error('Error While Creating Event', error);
        }
    };

    const handleEventTypeChange = (eventType) => {
        setEvents(prevState => ({
            ...prevState,
            eventType: eventType
        }));
    };

    return (
        <div>
            {/* TITLE DIV */}
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create An Event
            </h1>

            <button onClick={handleHomeButtonClick}>
                {/* SVG Icon for House */}
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" strokeWidth="5" strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                    <polygon points="10 20 40 20 40 45 10 45 " stroke="rgb(30 58 138)" strokeWidth="5" strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                    <polygon points="38 10 38 20 " stroke="rgb(30 58 138)" strokeWidth="7.5" strokeLinecap="round" fill="rgb(30 58 138)" strokeLinejoin="round"/>
                    <polygon points="20 30 20 48 30 48 30 30" stroke="white" strokeWidth="5" strokeLinecap="round" fill="white" strokeLinejoin="round"/>
                </svg>
            </button>

            
            
            <form onSubmit={handleFormSubmit}>
              {/* 3-COLUMN DIV*/}
              <div className='grid grid-cols-3 p-2 px-12 gap-2'> 
                {/* COLUMN 1*/}
                <div>
                <CreateAccountTextBox
                      label="Event Name"
                      type="text"
                      name="eventName"
                      value={events.eventName}
                      onChange={updateEvent}
                  />

              <div className='grid grid-cols-2  gap-1'> 
                <div>
                  <label className="block text-blue-900">Start Time</label>
                  <Dropdown/>
                </div>

              
                <div>
                  <label className="block text-blue-900">End Time</label>
                  <Dropdown/>
                </div>

                <CreateAccountTextBox
                    label="Event Location"
                    type="text"
                    name="eventLocation"
                    value={events.eventLocation}
                    onChange={updateEvent}
                />
              </div>
                

              </div>
                 

                {/* COLUMN 2*/}
                <div>
                <CreateAccountTextBox
                    label="Event Description"
                    type="text"
                    name="eventDescription"
                    value={events.eventDescription}
                    onChange={updateEvent}
                />
                  
                  <label className="block text-blue-900">Event Type</label>
                    {eventTypes.map((type) => (
                        <div key={type}>
                            <input type="checkbox" id={type} name="eventType" value={type} onChange={() => handleEventTypeChange(type)} />
                            <label htmlFor={type}>{type}</label>
                        </div>
                    ))}
                </div>

                  {/* COLUMN 3*/}
                <div>
                <CreateAccountTextBox
                    label="Event Date"
                    type="date"
                    name="eventDate"
                    value={events.eventDate}
                    onChange={updateEvent}
                />
                
                <CreateAccountTextBox
                    label="Invited Friends"
                    type="text"
                    name="Invited Friends"
                    value={events.eventInvitedFriends}
                    onChange={updateEvent}
                />

                </div>
              </div>  {/* END FORM */} 
               
              <div class="flex justify-center items-center h-screen">
              <SubmitButton>Create An Event</SubmitButton>
              </div>
            </form>
        </div>
    );
}