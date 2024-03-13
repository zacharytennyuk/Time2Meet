import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateAccountTextBox from '../components/createAccountTextBox';
import SubmitButton from '../components/submitButton';

export default function CreateAccount({}) {

    const navigate = useNavigate();

    // form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
    });

    // updates field saves as user types
    const updateFormData = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    // tries to create account
    const createAccount = async (event) => {
        event.preventDefault();

        // checks if all fields are entered
        if (
            !formData.firstName.trim()
            || !formData.lastName.trim() 
            || !formData.userName.trim()
            || !formData.password.trim())
        {
            alert("Hold your horses! Please complete all fields to create your account :O");
            return;
        }

        // if account is created successfully, go to home page
        try {
            //send to backend with axios
            const response = await axios.post('http://localhost:5200/api/users/create-account', formData);

            alert(response.data.message); // "Account created!"

            navigate('/user-home');

        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // "Please choose a different username."
            } else {
                console.error('Unidentified error :/', error);
            }
        }
    };

    return (
        <div className='flex h-screen w-screen place-content-center bg-blue-300'>
            <div className='flex h-3/5 w-2/5 self-center justify-center overflow-hidden rounded-3xl bg-blue-50'> 
                <div className='h-full w-full'>
                    <div className='flex justify-center items-center text-5xl h-1/8 w-full p-4'>
                        Create an account
                    </div>
                    <form className='grid grid-rows-3 grid-cols-2' onSubmit={createAccount}>
                        <div className='flex justify-center items-center h-full w-full p-4'> 
                            <CreateAccountTextBox
                                label="First Name"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={updateFormData}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-full p-4'> 
                            <CreateAccountTextBox
                                label="Last Name"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={updateFormData}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-full p-4'> 
                            <CreateAccountTextBox
                                label="Username"
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={updateFormData}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-full p-4'> 
                            <CreateAccountTextBox
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={updateFormData}
                            />
                        </div>
                        <div className='flex col-span-2 justify-center items-center h-full w-full '> 
                            <SubmitButton>Create Account</SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      );
}
