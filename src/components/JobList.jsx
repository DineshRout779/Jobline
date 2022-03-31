import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { api } from '../backend/api';
import { useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import Modal from './Modal';
import { MdDone } from 'react-icons/md';

const JobList = () => {
  const { state, dispatch } = useAppContext();
  const { jobs, user, isApplicant } = state;
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${api}/job`);
        res.data && dispatch({ type: 'FETCH_JOBS', payload: res.data });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data.error);
      }
    };
    fetchJobs();
  }, [dispatch]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isModalOpen && ref.current && !ref.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isModalOpen]);

  return (
    <ul className='job-list'>
      {isModalOpen && <Modal ref={ref} />}
      {!isLoading ? (
        jobs.length !== 0 ? (
          jobs.map((job) => {
            return (
              <li key={job._id} className='job'>
                <div className='flex justify-between align-center'>
                  <h3 className='m-0'>{job.title}</h3>
                  {isApplicant && (
                    <button className='btn m-0' onClick={handleToggleModal}>
                      {job.applicants.find(
                        (applicant) => applicant._id === user._id
                      ) ? (
                        <>
                          Applied <MdDone />{' '}
                        </>
                      ) : (
                        'Apply Now'
                      )}
                    </button>
                  )}
                </div>
                <p>
                  <strong>Company: </strong>
                  {job.company.name}
                </p>
                <div>
                  <Link to={`/jobs/${job._id}`} className='btn btn-rev m-0'>
                    Learn More
                  </Link>
                </div>
              </li>
            );
          })
        ) : (
          <p>No jobs available</p>
        )
      ) : (
        <Loader />
      )}
    </ul>
  );
};
export default JobList;
