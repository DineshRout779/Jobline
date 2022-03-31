import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../backend/api';
import ButtonSpinner from '../../components/ButtonSpinner';
import { useAppContext } from '../../context/AppContext';

const CompanyRegister = () => {
  const { state } = useAppContext();
  const { user, isApplicant } = state;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post(`${api}/auth/register/company`, values);
      if (res.data) {
        setIsLoading(false);
        navigate('/company/login');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    user
      ? isApplicant
        ? navigate('/applicant')
        : navigate('/company')
      : navigate('/company/register');
  }, [user, isApplicant, navigate]);

  return (
    <div className='container flex justify-center align-center flex-column min-h-90'>
      <div className='text-center my-1'>
        <h1 className='m-0'>Register</h1>
        <p className='m-0'>as an company</p>
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Company Name</label>
          <input
            type='name'
            name='name'
            id='name'
            className='form-control'
            placeholder='Enter Company Name'
            value={name}
            onChange={handleChange}
          />
        </div>
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
          <button className='form-control btn btn-submit m-0' type='submit'>
            {isLoading ? <ButtonSpinner /> : 'Register'}
          </button>
        </div>
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      </form>
      <p className='text-center'>
        Register as an applicant? <Link to='/applicant/register'>Register</Link>
      </p>
    </div>
  );
};
export default CompanyRegister;
