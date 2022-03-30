import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { applicants } from '../../data';
import Loader from '../../components/Loader';

const ApplicantDetails = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = () => {
      const applicant = applicants.find((item) => item.id === parseInt(id));
      setApplicant(applicant);
      setIsLoading(false);
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
            <strong>Description:</strong> {applicant.desc}
          </p>
          <p>
            <strong>Location:</strong> {applicant.location}
          </p>
        </>
      )}
    </div>
  );
};
export default ApplicantDetails;
