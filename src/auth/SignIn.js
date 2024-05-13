import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { authenticate, isAuth } from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export default function SignIn() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "submit"
    });
    const { email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmit = event =>  {
        event.preventDefault();
        setValues({ ...values, buttonText: "Submitting" })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }

        })
            .then((response) => {
                // console.log('SIGNUP SUCCESS', response)
                //save the responce (user, token) in localstorage/cookie
                authenticate(response, ()=>{
                    setValues({ ...values, email: '', password: '', buttonText: 'submitted' })
                toast.success(`Hey ${response.data.user.name}, Welcome back`)
                })
                
                
            })
            .catch((error) => {
                console.log('SIGNIN ERROR', error.response.data.error)
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error);
            })
    };

    const signinForm = () => {
        return (
            <form >
                <div className="form-group">
                    <label id ='foremail' htmlFor="exampleInputEmail1">Email </label>
                    <input onChange={handleChange("email")} value={email} type="email" className="form-control" placeholder="Enter email" />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label id ='forpassword' htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handleChange("password")} value={password} type="password" className="form-control" placeholder="Password" />
                </div>
                <button id ='forbutton' onClick={handleSubmit} type="submit" className="btn btn-primary my-2">{buttonText}</button>
                <div className="form-group">
                <Link to='/password/forgot' className=" nav-link">
                    Forgot password
                </Link>
                </div>
            </form>
        )
    };
    return (
        
            <Layout>
                <div className='col-md-6 offset-md-3'>
                    <ToastContainer />
                        {isAuth() ? navigate('/') : null}
                    <h1 className='p-5 text-center'>Sign In</h1>
                    {signinForm()}
                </div>
            </Layout>
       
    )
}

