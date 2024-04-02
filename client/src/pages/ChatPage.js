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
            // Assuming the backend sends back a response object with the properties you want to display
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
        <div className="ChatPage">
            <h3>Chat with me!</h3>
            
            {isGenerating && <p>Generating chat...</p>}

            {!isGenerating && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type here..."
                        required
                    />
                    <br />
                    <button type="submit">Generate</button>
                </form>
            )}
            <p>Generated Chat: {chat}</p>
        </div>
    );
}
