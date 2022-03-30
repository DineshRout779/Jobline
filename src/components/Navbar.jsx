import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { state } = useAppContext();
  const { user, isApplicant } = state;

  return (
    <header>
      <div className='container'>
        <nav className='nav flex align-center justify-between'>
          <Link to='/' className='logo'>
            <h2>Jobify</h2>
          </Link>
          <div className='flex align-center'>
            <Link to='/jobs'>All Jobs</Link>
            {isApplicant && <Link to='/applied'>Applied</Link>}
            {!user && (
              <>
                <Link to='/applicant/login' className='btn'>
                  Login
                </Link>
                <Link to='/applicant/register' className='btn btn-rev'>
                  Register
                </Link>
              </>
            )}
            <Link
              to={isApplicant ? `/applicant/${user.id}` : `/company/${user.id}`}
              className='btn btn-avatar'
            >
              {user.name.charAt(0)}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
