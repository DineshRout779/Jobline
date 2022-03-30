import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { companies } from '../../data';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = () => {
      const company = companies.find((item) => item.id === parseInt(id));
      setCompany(company);
      setIsLoading(false);
    };

    const timeout = setTimeout(() => {
      fetchCompany();
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
        </>
      )}
    </div>
  );
};
export default CompanyDetails;
