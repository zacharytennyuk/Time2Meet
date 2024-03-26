import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAccountTextBox from '../components/createAccountTextBox';
import SubmitButton from '../components/submitButton';

export default function Event() {
    const navigate = useNavigate();

    // state variables to hold event data
    const [events, setEvents] = useState({
        eventType: '',
        eventLocation: '',
        eventDate: '',
        eventDescription: ''
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
                setEventTypes(['Personal', 'School', 'Work']);
            }
           
        };
        fetchEventTypes();
    }, []);

    const handleHomeButtonClick = () => {
        navigate('/user-home');
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/events', events);
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
        <div> {/* TITLE DIV */}
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create An Event
          </h1> 

          <button onClick={handleHomeButtonClick}>
          {/* SVG Icon for House */}
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
              <polygon points="25 5 45 25 5 25" stroke="rgb(30 58 138)" stroke-width="5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
              <polygon points="10 20 40 20 40 45 10 45 "stroke="rgb(30 58 138)" stroke-width="5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
              <polygon points="38 10 38 20 "stroke="rgb(30 58 138)" stroke-width="7.5"stroke-linecap="round" fill="rgb(30 58 138)" stroke-linejoin="round"/>
              <polygon points="20 30 20 48 30 48 30 30"stroke="white" stroke-width="5"stroke-linecap="round" fill="white" stroke-linejoin="round"/>
              </svg>
          </button>

          {/* 3-COLUMN DIV*/}
          <div className='grid grid-cols-3 p-2 px-12 gap-2'>
            
            {/* Event Name */}
            <form className="space-y-2" action="#" method="POST">
            <div>
              <label htmlFor="Event Name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Name
              </label>
            </div>
            <div className="mt-2">
              <input
              id="Event Name"
              name="Event Name"
              type="Event Name"
              autoComplete="Event Name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            </form>
            
              {/* Event Description */}
                <form className="space-y-2" action="#" method="POST">
                  <div>
                    <label htmlFor="Event Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Event Description
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="Event Description"
                      name="Event Description"
                      type="Event Description"
                      autoComplete="Event Description"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </form>
                
              {/* Invited Members */}
              <div>
                <label htmlFor="Event Name" className="block text-sm font-medium leading-6 text-gray-900">
                Invited Members
                </label>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Cohn, Joe
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              12:00
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              1:00
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              2:00
                            </a>
                          )}
                        </Menu.Item>
                        <form method="POST" action="#">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="submit"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block w-full px-4 py-2 text-left text-sm'
                                )}
                              >
                                3:00
                              </button>
                            )}
                          </Menu.Item>
                        </form>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div>
              <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Time Start
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
          
          
          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    12:00
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    1:00
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    2:00
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      3:00
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    
    
    
      <Menu as="div" className="relative inline-block text-left">
        <div>

          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            -
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>

            <h1>Event Page</h1>
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
                <div>
                    <label>Event Type:</label><br />
                    {eventTypes.map((type) => (
                        <div key={type}>
                            <input type="checkbox" id={type} name="eventType" value={type} onChange={() => handleEventTypeChange(type)} />
                            <label htmlFor={type}>{type}</label>
                        </div>
                    ))}
                </div>
                <CreateAccountTextBox
                    label="Event Location"
                    type="text"
                    name="eventLocation"
                    value={events.eventLocation}
                    onChange={updateEvent}
                />
                <CreateAccountTextBox
                    label="Event Date"
                    type="date"
                    name="eventDate"
                    value={events.eventDate}
                    onChange={updateEvent}
                />
                <CreateAccountTextBox
                    label="Event Description"
                    type="text"
                    name="eventDescription"
                    value={events.eventDescription}
                    onChange={updateEvent}
                />
                <SubmitButton>Create An Event</SubmitButton>
            </form>

        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    AM
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    PM
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>

    <div>
    <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Time End
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    12:00
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    1:00
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    2:00
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      3:00
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            -
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    AM
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    PM
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

    </div>

    <div>
      PLACEHOLDER FOR INVITED MEMBERS
    </div>

      {/* Location */}
      <form className="space-y-2" action="#" method="POST">
        <div>
          <label htmlFor="Event Name" className="block text-sm font-medium leading-6 text-gray-900">
          Location
          </label>
        </div>
        <div className="mt-2">
          <input
            id="Location"
            name="Location"
            type="Location"
            autoComplete="Location"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
      </form>

      <div>
        <label htmlFor="Event Name" className="block text-sm font-medium leading-6 text-gray-900">
          Event Type
        </label>

        <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
      </div>
        



      </div>
      </div>
        

      
          
         

          

        
            
                  
    );
}
