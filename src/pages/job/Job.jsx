import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { jobs } from '../../data';

const Job = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = () => {
      const job = jobs.find((item) => item.id === parseInt(id));
      setJob(job);
      setIsLoading(false);
    };

    const timeout = setTimeout(() => {
      fetchJob();
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
          <h2>{job.title}</h2>
          <p>
            <strong>Company:</strong> {job.company}
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
