import { useAppContext } from '../../context/AppContext';
import JobList from '../../components/JobList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { api } from '../../backend/api';

const ApplicantDashboard = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const { isApplicant, user } = state;

  useEffect(() => {
    user
      ? isApplicant
        ? navigate('/applicant')
        : navigate('/company')
      : navigate('/applicant/login');
  }, [user, isApplicant, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${api}/job`);
        res.data && dispatch({ type: 'FETCH_JOBS', payload: res.data });
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    fetchJobs();
  }, [dispatch]);

  return (
    <div className='container'>
      <h1>Hello, {user?.name}</h1>
      <JobList />
    </div>
  );
};
export default ApplicantDashboard;
