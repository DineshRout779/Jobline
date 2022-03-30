import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import axios from 'axios';
import { api } from '../../backend/api';
import { useAppContext } from '../../context/AppContext';

const ApplicantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [applicant, setApplicant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await axios.get(`${api}/applicant/${id}`);
        setApplicant(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    const timeout = setTimeout(() => {
      fetchApplicant();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  return (
    <div className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>{applicant.name}</h2>
          <p>
            <strong>Email:</strong> {applicant.email}
          </p>
          <p>
            <strong>Description:</strong> {applicant.desc || 'No Description'}
          </p>
          <p>
            <strong>Location:</strong> {applicant.location || 'No Location'}
          </p>
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
export default ApplicantDetails;
