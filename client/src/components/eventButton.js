function EventButton () {
    return (
        <button
            type=""
            className="flex items-center bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
        <span className="mr-2">Event Name</span>
        <span className="mr-auto">Event Time</span>
        <span className="mr-auto">Person Inviting</span>
        <button className="mr-5 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Join</button>
        <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Ignore</button>
        </button>
    );
  };
  
  export default EventButton;