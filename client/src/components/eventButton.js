import React from 'react';

function EventButton({ eventName, eventDate, eventStartTime, eventEndTime }) {
    return (
        <div className="flex flex-col rounded-lg bg-blue-600 m-2 p-2">
            <div className="text-lg text-center font-bold text-white">{eventName}</div>
            <div className="text-white">Date: {eventDate}</div>
            <div className="flex mt-2">
                <div className="mr-auto text-white">Start Time: {eventStartTime}&nbsp;&nbsp;&nbsp;End Time: {eventEndTime}</div>
                {/* <div>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">Join</button>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Ignore</button>
                </div> */}
            </div>
        </div>
    );
}

export default EventButton;
