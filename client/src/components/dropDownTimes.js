import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Times = () => {
  let times = [];
  for (let hour = 1; hour <= 24; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    times.push(formattedHour);
  }
  return times;
};

export default function Dropdown({onChange}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const times = Times();

  const changeTime = (hour) => {
    setSelectedOption(hour);
    onChange(hour);
  };
  return (
    <Menu as="div" className="relative inline-block text-left mt-1 p-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700">
      <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        {selectedOption || 'Select Time'}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items>
          <div className="py-1">
            {times.map((hour) => (
              <Menu.Item key={hour}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      changeTime(hour);
                    }}
                  >
                    {hour}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
