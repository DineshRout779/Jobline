import { Link } from 'react-router-dom';

const ApplicantRegister = () => {
  return (
    <div className='container flex justify-center align-center flex-column min-h-90'>
      <div className='text-center my-1'>
        <h1 className='m-0'>Register</h1>
        <p className='m-0'>as an applicant</p>
      </div>

      <form className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='name'
            id='name'
            className='form-control'
            placeholder='Enter Full Name'
          />
        </div>
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
            value='Register'
            className='form-control btn btn-submit m-0'
          />
        </div>
      </form>
      <p className='text-center'>
        Register as a Company? <Link to='/company/register'>Register</Link>
      </p>
    </div>
  );
};
export default ApplicantRegister;
