import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import JobList from '../../components/JobList';
import { useEffect } from 'react';

const CompanyDashboard = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { isApplicant, user } = state;

  useEffect(() => {
    user
      ? isApplicant
        ? navigate('/applicant')
        : navigate('/company')
      : navigate('/company/login');
  }, [user, isApplicant, navigate]);

  return (
    <div className='container'>
      <h1>Welcome {user?.name}</h1>
      <div className='flex justify-between align-center my-1'>
        <h3>{isApplicant ? 'All Jobs' : 'Jobs Posted'}</h3>
        {!isApplicant && (
          <Link className='btn btn-rev m-0' to='/jobs/add'>
            <AiOutlinePlus className='svg-icon' /> Post a Job
          </Link>
        )}
      </div>
      <JobList />
    </div>
  );
};
export default CompanyDashboard;
