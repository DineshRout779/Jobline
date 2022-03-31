import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const JobList = () => {
  const { state } = useAppContext();
  const { jobs } = state;

  return (
    <ul className='job-list'>
      {jobs.length !== 0 ? (
        jobs.map((job) => {
          return (
            <li key={job._id} className='job'>
              <div className='flex justify-between align-center'>
                <h3 className='m-0'>{job.title}</h3>
                <button className='btn m-0'>Apply Now</button>
              </div>
              <p>
                <strong>Company: </strong>
                {job.company}
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
      )}
    </ul>
  );
};
export default JobList;
