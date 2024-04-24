import React from 'react';

// Event buttons are for the User Home Page and display the event name, date, and start and end times
function EventButton({ eventName, eventDate, eventStartTime, eventEndTime }) {
    return (
        <div className="flex flex-col rounded-lg bg-blue-600 m-2 p-2">
            <div className="text-lg text-center font-bold text-white">{eventName}</div>
            <div className="text-white">Date: {eventDate}</div>
            <div className="flex mt-2">
                <div className="mr-auto text-white">Start Time: {eventStartTime}&nbsp;&nbsp;&nbsp;End Time: {eventEndTime}</div>
            </div>
        </div>
    );
}

export default EventButton;
