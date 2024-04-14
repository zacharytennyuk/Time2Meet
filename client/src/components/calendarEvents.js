import axios from 'axios';

const fetchUserEvents = async (userId) => {
  try {
    const response = await axios.post('http://localhost:3000/read-events', { eventUser: userId });
    return response.data; // This will return the events array
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return null; // Handle errors as needed
  }
};

export default fetchUserEvents;
