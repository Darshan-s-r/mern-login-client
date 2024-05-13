import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { isAuth } from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export default function SignUp() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        buttonText: "submit"
    });
    const { name, email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        // console.log(event.target.value); 
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmit = event =>  {
        event.preventDefault();
        setValues({ ...values, buttonText: "Submitting" })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }

        })
            .then((response) => {
                console.log('SIGNUP SUCCESS', response)
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'submitted' })
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log('SIGNUP ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error);
            })
    };

    const signupForm = () => {
        return (
            <form >
                <div className="form-group">
                    <label id ='forname' htmlFor="exampleInputEmail1">Name </label>
                    <input onChange={handleChange("name")} value={name} type="name" className="form-control" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label id ='foremail' htmlFor="exampleInputEmail1">Email </label>
                    <input onChange={handleChange("email")} value={email} type="email" className="form-control" placeholder="Enter email" />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label id ='forpassword' htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handleChange("password")} value={password} type="password" className="form-control" placeholder="Password" />
                </div>
                <button id ='forbutton' onClick={handleSubmit} type="submit" className="btn btn-primary mt-2">{buttonText}</button>
            </form>
        )
    };
    return (
        
            <Layout>
                <div className='col-md-6 offset-md-3'>
                    <ToastContainer />
                    {isAuth() ? navigate('/') : null}
                    <h1 className='p-5 text-center'>Sign Up</h1>
                    {signupForm()}
                </div>
            </Layout>
       
    )
}

