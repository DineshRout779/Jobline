import { useAppContext } from '../../context/AppContext';
import JobList from '../../components/JobList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ApplicantDashboard = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { isApplicant, user } = state;

  useEffect(() => {
    user
      ? isApplicant
        ? navigate('/applicant')
        : navigate('/company')
      : navigate('/applicant/login');
  }, [user, isApplicant, navigate]);

  return (
    <div className='container'>
      <h1>Hello, {user?.name}</h1>
      <JobList />
    </div>
  );
};
export default ApplicantDashboard;
