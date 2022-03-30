import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const JobList = () => {
  const { state } = useAppContext();
  const { jobs, isApplicant, user } = state;

  return (
    <ul className='job-list'>
      {isApplicant
        ? jobs.map((job) => {
            return (
              <li key={job.id} className='job'>
                <div className='flex justify-between align-center'>
                  <h3 className='m-0'>{job.title}</h3>
                  <button className='btn m-0'>Apply Now</button>
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
          })
        : [...jobs]
            .filter((job) => job.company === user.name)
            .map((job) => {
              return (
                <li key={job.id} className='job'>
                  <div className='flex justify-between align-center'>
                    <h3 className='m-0'>{job.title}</h3>
                    <Link to={`/jobs/${job.id}/applicants`} className='btn m-0'>
                      See applicants
                    </Link>
                  </div>
                </li>
              );
            })}
    </ul>
  );
};
export default JobList;
