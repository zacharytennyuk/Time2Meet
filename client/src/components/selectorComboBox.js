import React, { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Selector = ({ invitedFriends, onInviteFriend }) => {
    const friends = [
        { name: "Kylie" },
        { name: "Veronica" },
        { name: "Winnie" },
        { name: "Zach" },
    ];

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleSelect = (friendName) => {
        onInviteFriend(friendName);
    };

    return (
        <div>
            <label className="block text-blue-900">Invited Friends</label>
            <div className="mt-1 p-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700">
                <div className="flex" onClick={() => setOpen(!open)}>
                    {invitedFriends.length > 0 ? invitedFriends.join(", ") : "Select Friends"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
                </div>
                {open && (
                    <div>
                        <input
                            type="text"
                            className="p-2 w-full"
                            placeholder="Search friends..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        />
                        <ul className="bg-white overflow-y-auto max-h-60">
                            {friends.filter(friend => friend.name.toLowerCase().includes(inputValue)).map((friend) => (
                                <li
                                    key={friend.name}
                                    className={`p-2 text-sm hover:bg-sky-600 hover:text-white cursor-pointer ${
                                        invitedFriends.includes(friend.name) ? "bg-sky-600 text-white" : ""
                                    }`}
                                    onClick={() => handleSelect(friend.name)}
                                >
                                    {friend.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Selector;
