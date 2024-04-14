import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [chat, setChat] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsGenerating(true);

        setChat(null);

        try {
            const result = await axios.post(`http://localhost:5200/api/chats/create-chat`, { prompt: inputText });
            console.log(result);
            
            setChat(result.data.CHAT);
            console.log(chat);
            
        } catch (error) {
            console.error("Error fetching panel:", error);
            alert("Error generating panel: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-xl text-blue-800 text-center'>
                Chat with me!
            </div>

        {isGenerating && <div className='text-xl text-blue-800'>Generating chat...</div>}

        {!isGenerating && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type here..."
                    className='flex w-96 text-xl h-40'
                    required
                />
                <br />
                <button type="submit" className='bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-2xl text-sm px-5 py-2.5 mb-2'>Generate</button>
            </form>
        )}
        <div className='text-xl text-blue-800 text-center mb-8'>
            Generated Chat: {chat}
        </div>
    </div>
    );
}