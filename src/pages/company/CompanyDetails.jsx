import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../backend/api';
import Loader from '../../components/Loader';
import { useAppContext } from '../../context/AppContext';

const CompanyDetails = () => {
  const { dispatch } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${api}/company/${id}`);
        setCompany(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchCompany();
  }, [id]);

  return (
    <div className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>{company.name}</h2>
          <p>
            <strong>Email:</strong> {company.email}
          </p>
          <p>
            <strong>Description:</strong> {company.desc}
          </p>
          <p>
            <strong>Location:</strong> {company.location}
          </p>
          <h4>Jobs Posted:</h4>
          <ul className='job-list'>
            {company.jobs.map((job) => {
              return (
                <li key={job.id} className='job'>
                  <div className='flex justify-between align-center'>
                    <h4 className='m-0'>{job.title}</h4>
                    <Link to={`/jobs/${job.id}/applicants`} className='btn m-0'>
                      See applicants
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <br />
          <br />
          <button className='btn m-0' onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};
export default CompanyDetails;
