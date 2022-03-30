import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAppContext } from '../../context/AppContext';

const JobList = () => {
  const { state } = useAppContext();
  const { isApplicant, jobs } = state;

  return (
    <div className='container'>
      <div className='flex justify-between align-center'>
        <h1>All Jobs</h1>
        {!isApplicant && (
          <Link className='btn btn-rev' to='/jobs/add'>
            <AiOutlinePlus className='svg-icon' /> Post a Job
          </Link>
        )}
      </div>

      <ul className='job-list'>
        {jobs.map((job) => {
          return (
            <li key={job.id} className='job'>
              <div className='flex justify-between align-center'>
                <h2 className='m-0'>{job.title}</h2>
                <button className='btn'>Apply Now</button>
              </div>
              <p>
                <strong>Company: </strong>
                {job.company}
              </p>
              <div>
                <Link to={`/jobs/${job.id}`} className='btn btn-rev m-0'>
                  Learn More
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default JobList;
