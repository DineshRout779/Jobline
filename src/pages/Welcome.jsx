import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Welcome = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { user, isApplicant } = state;

  useEffect(() => {
    user
      ? isApplicant
        ? navigate('/applicant')
        : navigate('/company')
      : navigate('/');
  }, [user, isApplicant, navigate]);

  return (
    <div className='container flex justify-center align-center flex-column min-h-90'>
      <img src='./images/welcome.svg' className='img-svg' alt='welcome' />
      <h1>Welcome to Jobline</h1>
      <div className='text-center flex'>
        <Link to='applicant/login' className='btn'>
          Login
        </Link>
        <Link to='applicant/register' className='btn btn-rev'>
          Register
        </Link>
      </div>
    </div>
  );
};
export default Welcome;
