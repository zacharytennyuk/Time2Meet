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

            navigate('/home');

        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // "Please choose a different username."
            } else {
                console.error('Unidentified error :/', error);
            }
        }
    };

    return (
        <div>
            <h2>Create an account</h2>
            <form onSubmit={createAccount}>
                <CreateAccountTextBox
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={updateFormData}
                />
                <br/>
                <CreateAccountTextBox
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={updateFormData}
                />
                <br/>
                <CreateAccountTextBox
                    label="Username"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={updateFormData}
                />
                <br/>
                <CreateAccountTextBox
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={updateFormData}
                />
                <br/>
                <SubmitButton>Create Account</SubmitButton>
            </form>
        </div>
      );
}
