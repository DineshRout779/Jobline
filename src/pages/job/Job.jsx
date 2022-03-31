import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import axios from 'axios';
import { api } from '../../backend/api';
import { useAppContext } from '../../context/AppContext';
import ButtonSpinner from '../../components/ButtonSpinner';
import { MdDone } from 'react-icons/md';

const Job = () => {
  const { id } = useParams();
  const { state } = useAppContext();
  const { user, isApplicant } = state;
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isAppling, setIsAppling] = useState(false);
  const [isApplied, setisApplied] = useState(false);

  const handleApplyJob = async () => {
    setIsAppling(true);
    try {
      const res = await axios.put(`${api}/job/${id}/${user._id}`);
      setIsAppling(false);
      res.data && setisApplied(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${api}/job/${id}`);
        setJob(res.data);
        setisApplied(
          res.data.applicants.find((applicant) => applicant._id === user._id)
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
      }
    };

    fetchJob();
  }, [id, user._id]);

  return (
    <div className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>
            <strong>Company:</strong> {job.company.name}
          </p>
          <p>
            <strong>Position:</strong> {job.position}
          </p>
          <p>
            <strong>Job-type:</strong> {job.position}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>{job.applicants.length} </strong>{' '}
            {job.applicantslength > 1 ? 'Applicants' : 'Applicant'}
          </p>
          {job.applicants.length > 0 && (
            <button className='btn btn-rev m-0' onClick={() => setShow(!show)}>
              Show
            </button>
          )}
          {show && (
            <ol className='applicant-list'>
              {job.applicants.length > 0 &&
                job.applicants.map((applicant, i) => {
                  return <li key={applicant._id}>{applicant.name}</li>;
                })}
            </ol>
          )}

          <div className='my-1'>
            {isApplicant && (
              <button className='btn m-0' onClick={handleApplyJob}>
                {isApplied ? (
                  <>
                    Applied <MdDone />
                  </>
                ) : isAppling ? (
                  <>
                    Applying <ButtonSpinner />
                  </>
                ) : (
                  'Apply now'
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Job;
