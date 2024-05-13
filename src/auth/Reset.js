import React, { useState } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useParams } from 'react-router-dom'

export default function Reset() {
  const {resetPasswordLink} = useParams();
  const [values, setValues] = useState({
    password: "",
    buttonText: "submit"
});
const { password, buttonText } = values;

const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value })
}

const handleSubmit = event =>  {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" })
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/reset-password`,
        data: {
          resetPasswordLink,
          newPassword : password }

    })
        .then((response) => {
            console.log('SIGNUP SUCCESS', response)
            setValues({ ...values, email: '', buttonText: 'submitted' })
            toast.success('your password has been reset')
            })
            
    
        .catch((error) => {
            console.log('SIGNIN ERROR', error)
            setValues({ ...values, buttonText: 'Submit' })
            toast.error(error.response.data.error);
        })
};
  
  const passwordResetForm = () => {
    return (
        <form >
           <div className="form-group">
                    <label id ='forpassword' htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handleChange("password")} value={password} type="password" className="form-control" placeholder="Password" />
                </div>
                <button id ='forbutton' onClick={handleSubmit} type="submit" className="btn btn-primary">{buttonText}</button>
        </form>
    )
};
  return (
    <Layout>
    <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <h1 className='p-5 text-center'>Forgot password</h1>
        {passwordResetForm()}
    </div>
</Layout>
  )
}
