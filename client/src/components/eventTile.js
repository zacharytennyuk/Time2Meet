import React, { useState } from 'react';

function EventTile({ eventName, eventInfo }) {
    const [showInfo, setShowInfo] = useState(false);

    const handleButtonClick = () => {
        setShowInfo(!showInfo); // Toggle the visibility of the information
    };

    return (
        <div>
            <button
                type="button"
                className="flex items-center bg-blue-400 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={handleButtonClick} // Toggle the visibility of the information on button click
            >
                <span className="mr-2">{eventName}</span>
            </button>
            {showInfo && (
                <div className="mt-2 bg-gray-100 p-3 rounded-lg">
                    <h2 className="text-lg font-semibold">{eventName}</h2>
                    <p>{eventInfo}</p>
                </div>
            )}
        </div>
    );
}

export default EventTile;
