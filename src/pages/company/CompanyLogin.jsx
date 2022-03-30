import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../backend/api';
import { useAppContext } from '../../context/AppContext';

const CompanyLogin = () => {
  const { state, dispatch } = useAppContext();
  const { user, isApplicant } = state;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const { email, password } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${api}/auth/login/company`, values);
      if (res.data.user) {
        dispatch({ type: 'LOGIN', payload: res.data.user });
        navigate('/');
      }
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    user
      ? isApplicant
        ? navigate('/applicant')
        : navigate('/company')
      : navigate('/company/login');
  }, [user, isApplicant, navigate]);

  return (
    <div className='container flex justify-center align-center flex-column min-h-90'>
      <div className='text-center my-1'>
        <h1 className='m-0'>Login</h1>
        <p className='m-0'>as an company</p>
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            placeholder='Enter Email'
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-control'
            placeholder='Enter Password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className='form-group my-1'>
          <input
            type='submit'
            value='Login'
            className='form-control btn btn-submit m-0'
          />
        </div>
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      </form>
      <p className='text-center'>
        Login as a Applicant? <Link to='/applicant/login'>Login</Link>
      </p>
    </div>
  );
};
export default CompanyLogin;
