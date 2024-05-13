
import { useParams } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
// import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Activate() {

  const { token } = useParams();




  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/accountActivation`,
      data: { token }
    })
      .then((response) => {
        console.log('Success:', token, response);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('Failed:', token, error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => {
    return (
      <div className='text-center'>
        <h1 className='p-5'>Hey Ready to activate your account</h1>
        <button className='btn btn-outline-primary' onClick={handleSubmit}>
          Activate Account
        </button>
        <p>token: {token}</p>
      </div>
    );
  };

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
}
