import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import axios from 'axios';
import { api } from '../../backend/api';

const Job = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${api}/job/${id}`);
        setJob(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
      }
    };

    fetchJob();
  }, [id]);

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
            <strong>{job.applicants.length} </strong> Applicants
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <button className='btn m-0'>Apply Now</button>
        </>
      )}
    </div>
  );
};
export default Job;
