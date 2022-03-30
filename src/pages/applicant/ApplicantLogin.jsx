import { Link } from 'react-router-dom';

const ApplicantLogin = () => {
  return (
    <div className='container flex justify-center align-center flex-column min-h-90'>
      <div className='text-center my-1'>
        <h1 className='m-0'>Login</h1>
        <p className='m-0'>as an applicant</p>
      </div>

      <form className='form'>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            className='form-control'
            placeholder='Enter Email'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='form-control'
            placeholder='Enter Password'
          />
        </div>
        <div className='form-group my-1'>
          <input
            type='submit'
            value='Login'
            className='form-control btn btn-submit m-0'
          />
        </div>
      </form>
      <p className='text-center'>
        Login as a Company? <Link to='/company/login'>Login</Link>
      </p>
    </div>
  );
};
export default ApplicantLogin;
