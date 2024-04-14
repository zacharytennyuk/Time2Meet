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
    <div className="mt-1 p-2 border border-blue-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700">
      <div className="flex bg-white"
        onClick={() => setOpen(!open)}
      >
        {invitedFriends.length > 0 ? invitedFriends.join(", ") : "Select Friends"}
        <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">

        </div >
        {friends.filter(friend => friend.name.toLowerCase().includes(inputValue)).map((friend) => (
          <li
            key={friend.name}
            className={`p-2 text-sm hover:bg-blue-400 hover:text-white cursor-pointer ${
              invitedFriends.includes(friend.name) && "bg-blue-800 text-white"
            }`}
            onClick={() => handleSelect(friend.name)}
          >
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Selector;
