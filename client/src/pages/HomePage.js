import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later
    navigate('/Login');
  };

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome to</div>
      </div>
      <div className='flex bg-blue-200 border border-blue-400 border-8 rounded-3xl w-3/5 shadow-2xl drop-shadow-lg'>
        <div className='grid grid-cols-5 place-items-center p-8'>
          <div className='flex col-start-1 col-span-2 justify-center content-center items-center text-8xl text-blue-900'>
            Time
          </div>
          <div className='flex bg-blue-400 size-36 col-start-3 rounded-full place-items-center justify-center'>
            <svg height="144" width="144" xmlns="http://www.w3.org/2000/svg">
              <circle r="60" cx="72" cy="72" fill="white" stroke="rgb(30 58 138)" strokeWidth="10" />
              <polyline points= "72 72 72 25"stroke="rgb(30 58 138)" strokeWidth="10" strokeLinecap="round" />
              <polyline points= "72 72 100 50"stroke="rgb(30 58 138)" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          <div className='flex col-start-4 col-span-2 justify-center content-center items-center text-8xl text-blue-900 pl-2'>
            Meet
          </div>
        </div>
      </div>
      <div className='flex text-2xl pt-8 pb-4'>
        Craft your ideal schedule here!
      </div>
      <div className='flex bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-2xl text-2xl px-5 py-2.5 mr-2 mb-2' >
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
