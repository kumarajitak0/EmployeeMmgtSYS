import React, { useState } from 'react';
import './Style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                // Assuming your server returns a success status or some other indication of success
            if(result.data.loginStatus){
            navigate('/dashboard');  
            }else
            {
                setError(result.data.Error)
            }
            })
            .catch(err => console.log(err));
    };


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'> 
        <div className='p-3 rounded w-25 border loginForm'>

            <div className='text-warning'>
                {error && error}
            </div>

            <h2> Login page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="text" name='email' autoComplete='off' placeholder='Enter your Email' 
                   onChange={(e) => setValues({...values, email: e.target.value})} className='form-control rounded-0'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter your password' 
                    onChange={(e) => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                    
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in </button>
                <div className="mb-1">
                    <input type="checkbox" name='check' id='check' className='me-2'/>
                    <label htmlFor="Password" >You are Agree with terms & conditions</label>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Login;